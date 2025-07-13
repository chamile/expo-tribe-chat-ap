import { MessagesApi } from '@/api-client/messages-api';
import { TMessageJSON } from '@/api-client/types';
import { useEffect, useState } from 'react';

interface UseMessagesReturn {
  messages: TMessageJSON[];
  loading: boolean;
  error: string | null;
}

export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<TMessageJSON[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedMessages = await MessagesApi.getAllMessages();
      setMessages(fetchedMessages);
      
      console.log('Fetched messages:', fetchedMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
  };
}; 