export type SpaceStatus = 'highly_likely' | 'probably' | 'unverified' | 'occupied_soon';

export interface SpaceItem {
  id: string;
  block: string;
  room_number: string;
  floor: string;
  capacity: number;
  ac_type: string;
  wifi_quality: string;
  purpose: string;
  status: SpaceStatus;
  available_from: string;
  available_until: string;
  confirmations: number;
  trusted_contributors: number;
  accurate_reporters: number;
  verified_ago: string;
  tags: string[];
  warning_title?: string | null;
  warning_sub?: string | null;
}

export interface SpaceReportPayload {
  block: string;
  floor: string;
  room_number: string;
  capacity: number;
  ac_type: string;
  wifi_quality: string;
  purpose: string;
  available_from: string;
  available_until: string;
  notes?: string;
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  venue: string;
  date_time: string;
  seats_left: number;
  is_free: boolean;
  category: string;
  tags: string[];
  registration_link?: string;
  stage_info: string;
  badge_time: string;
}

export interface FoodSpotItem {
  id: string;
  name: string;
  location: string;
  delivery_info: string;
  open_till: string;
  is_featured: boolean;
  rating: number;
  taste_rating: number;
  hygiene_rating: number;
  speed_mins: number;
  price_tier: string;
  student_combo: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  seller_name: string;
  price: number;
  tag_label: string;
  status: string;
  pickup_location: string;
  item_subtitle: string;
}

export interface StudentProfile {
  id: string;
  display_name: string;
  trust_score: number;
  rank_title: string;
  next_milestone: string;
  progress_percent: number;
  rooms_reported: number;
  rooms_verified: number;
  accurate_reports: number;
  disputes: number;
  badges: string[];
}
