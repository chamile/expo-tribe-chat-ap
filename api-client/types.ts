export interface TMessageJSON {
  id: string;
  text: string;
  isUser: boolean;
  timestamp?: string;
  userId?: string;
}

// New type matching the sample message structure
export interface MessageWithMeta {
  uuid: string;
  text: string;
  attachments: Attachment[];
  authorUuid: string;
  reactions: Reaction[];
  sentAt: number;
  updatedAt: number;
  replyToMessage?: MessageWithMeta;
}

export interface Attachment {
  uuid: string;
  type: string;
  url: string;
  width?: number;
  height?: number;
}

export interface Reaction {
  uuid: string;
  participantUuid: string;
  value: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
} 