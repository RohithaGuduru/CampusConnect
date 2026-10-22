import { useState, useEffect, useCallback } from 'react';
import { Navbar, NavSection } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpacesSection } from './components/SpacesSection';
import { LiveHappeningsSection } from './components/LiveHappeningsSection';
import { ContributorHubSection } from './components/ContributorHubSection';
import { VerificationExplainerSection } from './components/VerificationExplainerSection';
import { Footer } from './components/Footer';
import { ReportSpaceModal } from './components/ReportSpaceModal';
import { ListItemModal } from './components/ListItemModal';
import { apiService } from './services/api';
import { 
  SpaceItem, 
  EventItem, 
  FoodSpotItem, 
  MarketplaceItem, 
  StudentProfile, 
  SpaceReportPayload 
} from './types';
import { DEMO_SPACES, DEMO_EVENTS, DEMO_FOOD_SPOTS, DEMO_MARKETPLACE, DEMO_PROFILE } from './services/demoData';

export function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [apiHealthStatus, setApiHealthStatus] = useState<'healthy' | 'offline' | 'checking'>('checking');
  
  // Data states
  const [spaces, setSpaces] = useState<SpaceItem[]>(DEMO_SPACES);
  const [events, setEvents] = useState<EventItem[]>(DEMO_EVENTS);
  const [foodSpots, setFoodSpots] = useState<FoodSpotItem[]>(DEMO_FOOD_SPOTS);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>(DEMO_MARKETPLACE);
  const [profile, setProfile] = useState<StudentProfile>(DEMO_PROFILE);

  // Modals & search
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isListItemModalOpen, setIsListItemModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Initial data loading & health check
  const loadInitialData = useCallback(async () => {
    // 1. Health check
    const health = await apiService.checkHealth();
    setApiHealthStatus(health.status);

    // 2. Fetch data from backend or fallback to demo
    const [fetchedSpaces, fetchedEvents, fetchedFood, fetchedMarket, fetchedProfile] = await Promise.all([
      apiService.getSpaces(),
      apiService.getEvents(),
      apiService.getFoodSpots(),
      apiService.getMarketplace(),
      apiService.getProfile(),
    ]);

    setSpaces(fetchedSpaces);
    setEvents(fetchedEvents);
    setFoodSpots(fetchedFood);
    setMarketplace(fetchedMarket);
    setProfile(fetchedProfile);
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Handle navigation from Navbar or Feature Cards
  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'spaces') {
      const el = document.getElementById('spaces-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'events' || section === 'food' || section === 'marketplace') {
      const el = document.getElementById('happenings-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contribute' || section === 'profile') {
      const el = document.getElementById('contributor-hub-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Search handler from Hero
  const handleHeroSearch = (query: string) => {
    setSearchFilter(query);
    const el = document.getElementById('spaces-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Report room action
  const handleReportSpaceSubmit = async (payload: SpaceReportPayload) => {
    await apiService.reportSpace(payload);
    // Reload spaces
    const updated = await apiService.getSpaces();
    setSpaces(updated);
    // Update local profile count
    setProfile(prev => ({
      ...prev,
      rooms_reported: prev.rooms_reported + 1,
      trust_score: Math.min(100, prev.trust_score + 1),
    }));
  };

  // Confirm room action
  const handleConfirmSpace = async (spaceId: string) => {
    await apiService.confirmSpace(spaceId);
    // Locally increment confirmation and re-evaluate status
    setSpaces(prev => prev.map(s => {
      if (s.id === spaceId) {
        const nextConfirm = s.confirmations + 1;
        let nextStatus = s.status;
        if (s.status === 'unverified' && nextConfirm >= 3) nextStatus = 'probably';
        else if (s.status === 'probably' && nextConfirm >= 6) nextStatus = 'highly_likely';
        return {
          ...s,
          confirmations: nextConfirm,
          status: nextStatus,
          verified_ago: 'Just now',
        };
      }
      return s;
    }));
    // Increment profile verified count
    setProfile(prev => ({
      ...prev,
      rooms_verified: prev.rooms_verified + 1,
    }));
  };

  // Occupy room action
  const handleOccupySpace = async (spaceId: string) => {
    await apiService.occupySpace(spaceId);
    setSpaces(prev => prev.map(s => {
      if (s.id === spaceId) {
        return {
          ...s,
          status: 'occupied_soon',
          verified_ago: 'Just now',
          warning_title: 'Class in session / Occupied',
          warning_sub: 'Community member reported room taken',
        };
      }
      return s;
    }));
  };

  // List marketplace item action
  const handleListItemSubmit = async (item: any) => {
    await apiService.createMarketplaceItem(item);
    const updated = await apiService.getMarketplace();
    setMarketplace(updated);
  };

  // Submit club event
  const handleSubmitClubEvent = async (event: any) => {
    await apiService.createEvent(event);
    const updated = await apiService.getEvents();
    setEvents(updated);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-900 font-sans selection:bg-[#ECEBFE] selection:text-[#2E25D2]">
      
      {/* 1. Header / Navbar matching Screenshot 5 */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        apiHealthStatus={apiHealthStatus}
      />

      <main>
        {/* 2. Hero Section & Feature Cards matching Screenshot 5 */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onSearch={handleHeroSearch}
        />

        {/* 3. Real-Time Available Spaces Directory matching Screenshot 4 */}
        <SpacesSection
          spaces={spaces}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onConfirmSpace={handleConfirmSpace}
          onOccupySpace={handleOccupySpace}
          filterSearch={searchFilter}
        />

        {/* 4. What's Happening Right Now? matching Screenshot 3 */}
        <LiveHappeningsSection
          events={events}
          foodSpots={foodSpots}
          marketplace={marketplace}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* 5. Contributor Hub matching Screenshot 2 */}
        <ContributorHubSection
          profile={profile}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenListItemModal={() => setIsListItemModalOpen(true)}
          onSubmitClubEvent={handleSubmitClubEvent}
        />

        {/* 6. Community Verification Explainer matching Screenshot 1 */}
        <VerificationExplainerSection />
      </main>

      {/* 7. Footer matching Screenshot 1 */}
      <Footer />

      {/* Report Empty Space Modal */}
      <ReportSpaceModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSpaceSubmit}
      />

      {/* List Marketplace Item Modal */}
      <ListItemModal
        isOpen={isListItemModalOpen}
        onClose={() => setIsListItemModalOpen(false)}
        onSubmit={handleListItemSubmit}
      />

    </div>
  );
}

export default App;
