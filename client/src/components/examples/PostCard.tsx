import PostCard from '../PostCard';
import { Post } from '@shared/schema';

// TODO: remove mock functionality
const mockPost: Post = {
  id: '1',
  userId: 'user1',
  content: 'Just launched our new product! 🚀 Really excited to share this with the world. Check out the amazing features we\'ve been working on for months.',
  mediaUrls: [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
  ],
  platforms: ['twitter', 'linkedin', 'facebook'],
  status: 'scheduled',
  scheduledAt: new Date(Date.now() + 3600000), // 1 hour from now
  publishedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function PostCardExample() {
  return (
    <div className="max-w-md mx-auto p-4">
      <PostCard post={mockPost} />
    </div>
  );
}