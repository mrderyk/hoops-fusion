export interface NotificationsState {
  isConnecting: boolean;
  isConnected: boolean;
  isOpen: boolean;
  messages: any[];
  unreadCount: number;
}

export interface NotificationMessage {
  text: string;
  route: string;
  isUnread: boolean;
}

export interface NotificationMessageProps {
  isUnread: boolean;
}