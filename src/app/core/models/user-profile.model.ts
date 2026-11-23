export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  document: string;
  city: string;
  memberSince: string;
  linkedGoogle: string | null;
  linkedApple: string | null;
}

export interface UserPreferences {
  currency: string;
  monthStartDay: number;
  paymentReminders: boolean;
  biometricLogin: boolean;
  twoStepVerification: boolean;
}

/** Preferences that are turned on and off with a switch. */
export type TogglePreference = 'paymentReminders' | 'biometricLogin' | 'twoStepVerification';
