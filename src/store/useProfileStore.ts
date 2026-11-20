import { create } from 'zustand';
import { SafeStorage } from '@/utils/safeStorage';
import { SkinProfile } from '@/types/profile';

const PROFILE_STORAGE_KEY = '@fskin_profile';

const DEFAULT_PROFILE: SkinProfile = {
  skinFeel: 'not_sure',
  flaking: 'never',
  blemishes: 'rare',
  sensitivity: 'rarely_sensitive',
  primaryConcerns: ['hydration', 'tone_evenness'],
  allergiesOrSensitivities: [],
  preferredRoutineLength: 'balanced_4to5step',
  sunscreenDaily: false,
  hasConsentedToScan: false,
};

interface ProfileState {
  profile: SkinProfile;
  isLoaded: boolean;
  updateProfile: (partial: Partial<SkinProfile>) => Promise<void>;
  setConsent: (consented: boolean) => Promise<void>;
  loadProfile: () => Promise<void>;
  resetProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: DEFAULT_PROFILE,
  isLoaded: false,

  updateProfile: async partial => {
    const updated = { ...get().profile, ...partial, completedAt: new Date().toISOString() };
    set({ profile: updated });
    try {
      await SafeStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save profile', err);
    }
  },

  setConsent: async consented => {
    const updated = { ...get().profile, hasConsentedToScan: consented };
    set({ profile: updated });
    try {
      await SafeStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save consent', err);
    }
  },

  loadProfile: async () => {
    try {
      const stored = await SafeStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        set({ profile: JSON.parse(stored), isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch (err) {
      console.warn('Failed to load profile', err);
      set({ isLoaded: true });
    }
  },

  resetProfile: async () => {
    set({ profile: DEFAULT_PROFILE });
    try {
      await SafeStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to reset profile', err);
    }
  },
}));
