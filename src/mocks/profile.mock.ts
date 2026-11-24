import { UserPreferences, UserProfile } from '../app/core/models/user-profile.model';

export const USER_PROFILE_MOCK: UserProfile = {
  fullName: 'Andrea Rojas',
  email: 'andrea.rojas@correo.com',
  phone: '+57 300 123 4567',
  document: 'C.C. 1.020.345.678',
  city: 'Bogotá, Colombia',
  memberSince: '2026-03-01',
  linkedGoogle: 'andrea.rojas@gmail.com',
  linkedApple: null,
};

export const USER_PREFERENCES_MOCK: UserPreferences = {
  currency: 'COP',
  monthStartDay: 1,
  paymentReminders: true,
  biometricLogin: true,
  twoStepVerification: false,
};
