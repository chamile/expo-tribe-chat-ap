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
} 