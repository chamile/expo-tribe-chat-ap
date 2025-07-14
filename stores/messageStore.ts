import { MessagesApi } from '@/api-client/messages-api';
import { MessageWithMeta } from '@/api-client/types';
import { create } from 'zustand';

export interface MessageState {
  messages: MessageWithMeta[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (text: string) => void;
  postMessage: (text: string) => Promise<MessageWithMeta | null>;
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
    const newMessage: MessageWithMeta = {
      uuid: Date.now().toString(),
      text: text.trim(),
      attachments: [],
      authorUuid: '1f12596f-cee6-4f3c-9495-de1a17623a6b', // Demo: Alice
      reactions: [],
      sentAt: Date.now(),
      updatedAt: Date.now(),
    };
    set((state) => ({
      messages: [newMessage, ...state.messages],
    }));
    console.log('Message added to store:', newMessage);
  },

  postMessage: async (text: string) => {
    set({ loading: true, error: null });
    try {
      const postedMessage = await MessagesApi.postMessage(text) as MessageWithMeta;
      set((state) => ({
        messages: [ ...state.messages,postedMessage],
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