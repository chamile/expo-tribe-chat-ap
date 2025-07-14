import { apiClient } from './axios-instance';
import { API_ENDPOINTS } from './config';
import { MessageWithMeta } from './types';

export class MessagesApi {
  
  public static async getAllMessages(): Promise<MessageWithMeta[]> {
    try {
      const messages = await apiClient.get<MessageWithMeta[]>(API_ENDPOINTS.MESSAGES.ALL);
      return messages;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new Error('Failed to fetch messages from server');
    }
  }


  public static async postMessage(text: string): Promise<MessageWithMeta> {
    try {
      const message = await apiClient.post<MessageWithMeta>('/messages/new', { text });
      return message;
    } catch (error) {
      console.error('Failed to post message:', error);
      throw new Error('Failed to post message to server');
    }
  }
} 