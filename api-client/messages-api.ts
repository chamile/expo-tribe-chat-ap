import { apiClient } from './axios-instance';
import { API_ENDPOINTS } from './config';
import { TMessageJSON } from './types';

export class MessagesApi {
  
  public static async getAllMessages(): Promise<TMessageJSON[]> {
    try {
      const messages = await apiClient.get<TMessageJSON[]>(API_ENDPOINTS.MESSAGES.ALL);
      return messages;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new Error('Failed to fetch messages from server');
    }
  }

  public static async postMessage(text: string): Promise<TMessageJSON> {
    try {
      const message = await apiClient.post<TMessageJSON>('/messages/new', { text });
      return message;
    } catch (error) {
      console.error('Failed to post message:', error);
      throw new Error('Failed to post message to server');
    }
  }
} 