export type LoginProvider = 'email' | 'google' | 'apple';

export type SocialProvider = Exclude<LoginProvider, 'email'>;

export interface Session {
  email: string;
  provider: LoginProvider;
  startedAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}
