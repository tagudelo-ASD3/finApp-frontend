export type LoginProvider = 'email' | 'google' | 'apple';

export interface Session {
  email: string;
  provider: LoginProvider;
  startedAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}
