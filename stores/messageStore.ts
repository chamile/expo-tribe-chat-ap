import { MessagesApi } from '@/api-client/messages-api';
import { TMessageJSON } from '@/api-client/types';
import { create } from 'zustand';

export interface MessageState {
  messages: TMessageJSON[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (text: string) => void;
  postMessage: (text: string) => Promise<TMessageJSON | null>;
  clearError: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const messages = await MessagesApi.getAllMessages();
      set({ messages, loading: false });
      console.log('Messages fetched and stored:', messages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch messages';
      set({ error: errorMessage, loading: false });
      console.error('Error fetching messages:', error);
    }
  },

  addMessage: (text: string) => {
    const newMessage: TMessageJSON = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      messages: [newMessage, ...state.messages],
    }));
    console.log('Message added to store:', newMessage);
  },

  postMessage: async (text: string) => {
    set({ loading: true, error: null });
    try {
      const postedMessage = await MessagesApi.postMessage(text);
      set((state) => ({
        messages: [postedMessage, ...state.messages],
        loading: false,
      }));
      console.log('Message posted and added to store:', postedMessage);
      return postedMessage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to post message';
      set({ error: errorMessage, loading: false });
      console.error('Error posting message:', err);
      return null;
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 