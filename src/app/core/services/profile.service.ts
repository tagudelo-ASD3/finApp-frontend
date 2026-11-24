import { Injectable } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { USER_PREFERENCES_MOCK, USER_PROFILE_MOCK } from '../../../mocks/profile.mock';
import { TogglePreference, UserPreferences, UserProfile } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  readonly profile = persistedSignal<UserProfile>('profile', USER_PROFILE_MOCK);
  readonly preferences = persistedSignal<UserPreferences>('preferences', USER_PREFERENCES_MOCK);

  togglePreference(key: TogglePreference): void {
    this.preferences.update((preferences) => ({ ...preferences, [key]: !preferences[key] }));
  }
}
