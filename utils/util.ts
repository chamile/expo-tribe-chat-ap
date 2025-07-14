export function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Mock participant info for demo
export const participantMap: Record<string, { name: string; avatar: string }> = {
  '1f12596f-cee6-4f3c-9495-de1a17623a6b': {
    name: 'Alice',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  '3e0c96f5-371b-4e58-bf3d-11f3e77e8f15': {
    name: 'Bob',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  // Add more mock participants as needed
}; 