export type NotificationKind = 'detected' | 'payment' | 'budget' | 'tip';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
