import AccountCard from '../AccountCard';
import { SocialAccount } from '@shared/schema';

// TODO: remove mock functionality
const mockAccount: SocialAccount = {
  id: '1',
  userId: 'user1',
  platform: 'twitter',
  platformUsername: 'johndoe',
  isConnected: true,
  accessToken: 'token123',
  refreshToken: 'refresh123',
  connectedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
};

export default function AccountCardExample() {
  return (
    <div className="max-w-sm mx-auto p-4">
      <AccountCard account={mockAccount} />
    </div>
  );
}