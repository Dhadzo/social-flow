import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, Clock, CheckCircle, AlertCircle, X } from "lucide-react";
import PostCard from "@/components/PostCard";
import { Post, PLATFORMS, POST_STATUSES } from "@shared/schema";
import { format } from "date-fns";

// TODO: remove mock functionality
const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    content: 'Just launched our new product! 🚀 Really excited to share this with the world. Check out the amazing features we\'ve been working on for months.',
    mediaUrls: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'],
    platforms: ['twitter', 'linkedin', 'facebook'],
    status: 'posted',
    scheduledAt: null,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    content: 'Working on some exciting new features. Stay tuned for more updates!',
    mediaUrls: [],
    platforms: ['twitter', 'facebook'],
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 7200000).toISOString(),
    publishedAt: null,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '3',
    userId: 'user1',
    content: 'Behind the scenes of our development process. Here\'s how we build great products.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop'
    ],
    platforms: ['linkedin'],
    status: 'failed',
    scheduledAt: new Date(Date.now() - 7200000).toISOString(),
    publishedAt: null,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    userId: 'user1',
    content: 'Quick update on our latest achievements and milestones.',
    mediaUrls: [],
    platforms: ['twitter'],
    status: 'posted',
    scheduledAt: null,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '5',
    userId: 'user1',
    content: 'Draft post about upcoming features and roadmap.',
    mediaUrls: [],
    platforms: ['twitter', 'linkedin'],
    status: 'draft',
    scheduledAt: null,
    publishedAt: null,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 900000).toISOString(),
  },
];

export default function PostHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || post.platforms?.includes(platformFilter);
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'posted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'draft':
        return <Calendar className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const exportPosts = () => {
    console.log('Exporting posts:', filteredPosts);
    // TODO: Implement CSV export
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-history">
              Post History
            </h1>
            <p className="text-muted-foreground">
              View and manage all your social media posts
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={exportPosts}
            data-testid="button-export"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Search and filter your posts by status, platform, or content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger data-testid="select-status">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {POST_STATUSES.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger data-testid="select-platform">
                    <SelectValue placeholder="All platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All platforms</SelectItem>
                    {PLATFORMS.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Active Filters */}
            {(searchTerm || statusFilter !== 'all' || platformFilter !== 'all') && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm font-medium">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchTerm}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchTerm('')}
                    />
                  </Badge>
                )}
                {statusFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {POST_STATUSES.find(s => s.id === statusFilter)?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setStatusFilter('all')}
                    />
                  </Badge>
                )}
                {platformFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Platform: {PLATFORMS.find(p => p.id === platformFilter)?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setPlatformFilter('all')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {POST_STATUSES.map((status) => {
            const count = mockPosts.filter(post => post.status === status.id).length;
            return (
              <Card key={status.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status.id)}
                    <div>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-xs text-muted-foreground">{status.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Posts Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Posts ({filteredPosts.length})
            </h2>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-2">No posts found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}