import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenTool, Plus, TrendingUp, Users, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import PostCard from "@/components/PostCard";
import AccountCard from "@/components/AccountCard";
import { Post, SocialAccount } from "@shared/schema";

// TODO: remove mock functionality
const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    content: 'Just launched our new product! 🚀 Really excited to share this with the world.',
    mediaUrls: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'],
    platforms: ['twitter', 'linkedin'],
    status: 'posted',
    scheduledAt: null,
    publishedAt: new Date(Date.now() - 3600000),
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    userId: 'user1',
    content: 'Working on some exciting new features. Stay tuned!',
    mediaUrls: [],
    platforms: ['twitter', 'facebook'],
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 7200000),
    publishedAt: null,
    createdAt: new Date(Date.now() - 1800000),
    updatedAt: new Date(Date.now() - 1800000),
  },
];

const mockAccounts: SocialAccount[] = [
  {
    id: '1',
    userId: 'user1',
    platform: 'twitter',
    platformUsername: 'johndoe',
    isConnected: true,
    accessToken: 'token1',
    refreshToken: 'refresh1',
    connectedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    userId: 'user1',
    platform: 'linkedin',
    platformUsername: 'john-doe',
    isConnected: true,
    accessToken: 'token2',
    refreshToken: 'refresh2',
    connectedAt: new Date(Date.now() - 172800000),
  },
  {
    id: '3',
    userId: 'user1',
    platform: 'instagram',
    platformUsername: 'johndoe_official',
    isConnected: false,
    accessToken: null,
    refreshToken: null,
    connectedAt: null,
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const connectedAccounts = mockAccounts.filter(acc => acc.isConnected);
  const scheduledPosts = mockPosts.filter(post => post.status === 'scheduled');
  const recentPosts = mockPosts.filter(post => post.status === 'posted');

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-dashboard">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here\'s what\'s happening with your social media.
          </p>
        </div>
        <Button 
          onClick={() => {
            console.log('Create new post clicked');
            setLocation('/compose');
          }}
          data-testid="button-create-post"
        >
          <PenTool className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-connected-accounts">
              {connectedAccounts.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active social platforms
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-scheduled-posts">
              {scheduledPosts.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready to publish
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <p className="text-xs text-muted-foreground">
              +0.3% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your social media platform connections
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              console.log('Connect account clicked');
              setLocation('/settings');
            }}
            data-testid="button-connect-account"
          >
            <Plus className="h-4 w-4 mr-2" />
            Connect Account
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockAccounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Your latest social media activity
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              console.log('View all posts clicked');
              setLocation('/history');
            }}
            data-testid="button-view-all-posts"
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {mockPosts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No posts yet</p>
              <Button 
                onClick={() => setLocation('/compose')}
                data-testid="button-create-first-post"
              >
                <PenTool className="h-4 w-4 mr-2" />
                Create Your First Post
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}