export const API_CONFIG = {
  BASE_URL: 'https://dummy-chat-server.tribechat.com/api',
  VERSION: '1',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  MESSAGES: {
    ALL: '/messages/all',
  },
} as const; 