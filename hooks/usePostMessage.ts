import { MessagesApi } from '@/api-client/messages-api';
import { TMessageJSON } from '@/api-client/types';
import { useCallback, useState } from 'react';

export function usePostMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<TMessageJSON | null>(null);

  const postMessage = useCallback(async (text: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const result = await MessagesApi.postMessage(text);
      setMessage(result);
      console.log('Posted message:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to post message';
      setError(errorMessage);
      console.error('Error posting message:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postMessage, loading, error, message };
} 