export type NotificationKind = 'detected' | 'payment' | 'budget' | 'tip';

export type NotificationParams = Record<string, string | number>;

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  titleKey: string;
  messageKey: string;
  params: NotificationParams;
  date: string;
  read: boolean;
}

export type NotificationDraft = Omit<AppNotification, 'read'>;
