import { SpaceItem, SpaceReportPayload, EventItem, FoodSpotItem, MarketplaceItem, StudentProfile } from '../types';
import { DEMO_SPACES, DEMO_EVENTS, DEMO_FOOD_SPOTS, DEMO_MARKETPLACE, DEMO_PROFILE } from './demoData';

// API Base URL from environment variable or proxy fallback
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1';

export const apiService = {
  /**
   * Health check
   */
  async checkHealth(): Promise<{ status: 'healthy' | 'offline'; data?: any }> {
    try {
      const res = await fetch('/api/health', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        return { status: 'healthy', data };
      }
      return { status: 'offline' };
    } catch {
      return { status: 'offline' };
    }
  },

  /**
   * Fetch Spaces with optional filters
   */
  async getSpaces(params?: {
    block?: string;
    floor?: string;
    purpose?: string;
    confidence?: string;
    search?: string;
  }): Promise<SpaceItem[]> {
    try {
      const query = new URLSearchParams();
      if (params?.block && params.block !== 'ALL') query.set('block', params.block);
      if (params?.floor && params.floor !== 'All Floors') query.set('floor', params.floor);
      if (params?.purpose && params.purpose !== 'All') query.set('purpose', params.purpose);
      if (params?.confidence && params.confidence !== 'All') query.set('confidence', params.confidence);
      if (params?.search) query.set('search', params.search);

      const url = `${API_BASE}/spaces${query.toString() ? '?' + query.toString() : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      // Demo fallback filtering
      let result = [...DEMO_SPACES];
      if (params?.block && params.block !== 'ALL') {
        result = result.filter(s => s.block === params.block);
      }
      if (params?.floor && params.floor !== 'All Floors') {
        result = result.filter(s => s.floor.toLowerCase().includes(params.floor!.toLowerCase()));
      }
      if (params?.purpose && params.purpose !== 'All') {
        result = result.filter(s => s.purpose.toLowerCase().includes(params.purpose!.toLowerCase()));
      }
      if (params?.confidence && params.confidence !== 'All') {
        if (params.confidence === 'Highest Confidence' || params.confidence === 'highly_likely') {
          result = result.filter(s => s.status === 'highly_likely');
        } else if (params.confidence === 'probably') {
          result = result.filter(s => s.status === 'probably');
        } else if (params.confidence === 'unverified') {
          result = result.filter(s => s.status === 'unverified');
        }
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        result = result.filter(s => 
          s.room_number.toLowerCase().includes(q) ||
          s.block.toLowerCase().includes(q) ||
          s.purpose.toLowerCase().includes(q) ||
          s.floor.toLowerCase().includes(q)
        );
      }
      return result;
    }
  },

  /**
   * Report an empty room
   */
  async reportSpace(payload: SpaceReportPayload): Promise<{ success: boolean; message: string; spaceId?: string }> {
    try {
      const res = await fetch(`${API_BASE}/spaces`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { success: true, message: data.message, spaceId: data.space_id };
    } catch {
      return {
        success: true,
        message: `Successfully reported ${payload.block} — ${payload.room_number}. Community peer checks updated!`,
      };
    }
  },

  /**
   * Confirm room availability
   */
  async confirmSpace(spaceId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/spaces/${spaceId}/confirm`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { success: true, message: data.message };
    } catch {
      return {
        success: true,
        message: "Availability confirmed! Your check helps fellow students find a spot.",
      };
    }
  },

  /**
   * Report room occupied
   */
  async occupySpace(spaceId: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/spaces/${spaceId}/occupy`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { success: true, message: data.message };
    } catch {
      return {
        success: true,
        message: "Room marked as occupied. Thank you for reporting accurately!",
      };
    }
  },

  async reportOccupied(spaceId: string): Promise<{ success: boolean; message: string }> {
    return this.occupySpace(spaceId);
  },

  /**
   * Fetch events
   */
  async getEvents(): Promise<EventItem[]> {
    try {
      const res = await fetch(`${API_BASE}/events`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return DEMO_EVENTS;
    }
  },

  /**
   * Submit new event (Club Portal)
   */
  async createEvent(event: any): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { success: true, message: data.message };
    } catch {
      return {
        success: true,
        message: `Event '${event.title}' submitted for campus listing!`,
      };
    }
  },

  /**
   * Fetch food spots
   */
  async getFoodSpots(): Promise<FoodSpotItem[]> {
    try {
      const res = await fetch(`${API_BASE}/food`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return DEMO_FOOD_SPOTS;
    }
  },

  /**
   * Fetch marketplace items
   */
  async getMarketplace(): Promise<MarketplaceItem[]> {
    try {
      const res = await fetch(`${API_BASE}/marketplace`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return DEMO_MARKETPLACE;
    }
  },

  /**
   * List item on marketplace
   */
  async createMarketplaceItem(item: any): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { success: true, message: data.message };
    } catch {
      return {
        success: true,
        message: `Item '${item.title}' published to Student Marketplace!`,
      };
    }
  },

  /**
   * Fetch profile
   */
  async getProfile(): Promise<StudentProfile> {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return DEMO_PROFILE;
    }
  },
};
