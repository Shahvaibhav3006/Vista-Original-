import { supabase } from './supabase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { Authorization: `Bearer ${session.access_token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const authHeaders = await getAuthHeaders();
  
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error?.code || 'UNKNOWN_ERROR', data.error?.message || 'An error occurred');
  }

  return data.data as T;
}

export const api = {
  // Profiles
  getMe: () => request('/me'),
  updateProfile: (data: any) => request('/me', { method: 'PATCH', body: JSON.stringify(data) }),
  getPassport: () => request('/me/passport'),
  
  // Cities & Places
  getCities: () => request('/cities'),
  getCity: (slug: string) => request(`/cities/${slug}`),
  getPlaces: (slug: string) => request(`/cities/${slug}/places`),
  checkInPlace: (placeId: string, lat: number, lng: number) => 
    request(`/places/${placeId}/check-in`, { method: 'POST', body: JSON.stringify({ lat, lng }) }),

  // Quests
  getQuests: (slug: string) => request(`/cities/${slug}/quests`),
  getQuest: (questId: string) => request(`/quests/${questId}`),
  startQuest: (questId: string) => request(`/quests/${questId}/start`, { method: 'POST' }),
  getQuestProgress: (questId: string) => request(`/quests/${questId}/progress`),
  completeQuestStep: (questId: string, stepId: string) => request(`/quests/${questId}/steps/${stepId}/complete`, { method: 'POST' }),
  submitQuestAnswer: (questId: string, stepId: string, answer: string) => request(`/quests/${questId}/challenges/${stepId}/answer`, { method: 'POST', body: JSON.stringify({ answer }) }),
  completeQuest: (questId: string) => request(`/quests/${questId}/complete`, { method: 'POST' }),
  
  // Storage (Photos)
  getPhotos: () => request('/me/photos'),
  uploadPhoto: (placeId: string, photoData: string, xpGain: number) => 
    request('/photos', { method: 'POST', body: JSON.stringify({ placeId, photoData, xpGain }) }),
  deletePhoto: (photoId: string) => request(`/photos/${photoId}`, { method: 'DELETE' }),

  // Saved Places
  getSavedPlaces: () => request('/me/saved-places'),
  savePlace: (placeId: string) => request(`/me/saved-places/${placeId}`, { method: 'POST' }),
  removeSavedPlace: (placeId: string) => request(`/me/saved-places/${placeId}`, { method: 'DELETE' }),

  // QR Rewards
  redeemQr: (code: string) => request('/qr/redeem', { method: 'POST', body: JSON.stringify({ code }) }),

  // Hidden Gems
  getHiddenGems: (slug: string) => request(`/hidden/${slug}`),
  revealHiddenClue: (hiddenId: string) => request(`/hidden/${hiddenId}/reveal`, { method: 'POST' }),
  discoverHiddenGem: (hiddenId: string) => request(`/hidden/${hiddenId}/discover`, { method: 'POST' }),

  // Teams
  createTeam: (name: string) => request('/teams', { method: 'POST', body: JSON.stringify({ name }) }),
  joinTeam: (joinCode: string) => request('/teams/join', { method: 'POST', body: JSON.stringify({ joinCode }) }),
  leaveTeam: (teamId: string) => request(`/teams/${teamId}/leave`, { method: 'POST' }),
  getTeam: (teamId: string) => request(`/teams/${teamId}`),
  getTeamMembers: (teamId: string) => request(`/teams/${teamId}/members`),
  getLeaderboard: (teamId: string) => request(`/teams/${teamId}/leaderboard`),
  
  // Trail & Replay
  getTrail: () => request('/me/trail'),
  
  // Festivals & Partners
  getFestivals: (slug: string) => request(`/cities/${slug}/festivals`),
  getPartners: (slug: string) => request(`/cities/${slug}/partners`),
};
