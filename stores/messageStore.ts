import { TMessageJSON } from '@/api-client/types';
import { useMessages } from '@/hooks/useMessages';
import { create } from 'zustand';

export interface MessageState {
  messages: TMessageJSON[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (text: string) => void;
  clearError: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => {
  // Use the hook to get the fetchMessages function
  const { fetchMessages: fetchMessagesFromHook } = useMessages();

  return {
    messages: [],
    loading: false,
    error: null,

    fetchMessages: async () => {
      set({ loading: true, error: null });
      await fetchMessagesFromHook(
        (messages) => set({ messages, loading: false }),
        (error) => set({ error, loading: false })
      );
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

    clearError: () => {
      set({ error: null });
    },
  };
}); 