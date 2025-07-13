import { MessagesApi } from '@/api-client/messages-api';
import { TMessageJSON } from '@/api-client/types';
import { useCallback } from 'react';

/**
 * useMessages
 * Returns a fetchMessages function that fetches messages and calls the provided callback with the result.
 */
export function useMessages() {
  const fetchMessages = useCallback(async (onSuccess: (messages: TMessageJSON[]) => void, onError?: (error: string) => void) => {
    try {
      const fetchedMessages = await MessagesApi.getAllMessages();
      onSuccess(fetchedMessages);
      console.log('Fetched messages (from hook):', fetchedMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      if (onError) onError(errorMessage);
      console.error('Error fetching messages (from hook):', err);
    }
  }, []);

  return { fetchMessages };
} 