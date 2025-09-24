import { Post, PLATFORMS, POST_STATUSES } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MoreHorizontal, Eye } from "lucide-react";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostCard({ post, onView, onEdit, onDelete }: PostCardProps) {
  const statusConfig = POST_STATUSES.find(s => s.id === post.status);
  
  return (
    <Card className="hover-elevate" data-testid={`card-post-${post.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              style={{ backgroundColor: statusConfig?.color + '20', color: statusConfig?.color }}
              data-testid={`badge-status-${post.status}`}
            >
              {statusConfig?.name}
            </Badge>
            {post.scheduledAt && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {format(new Date(post.scheduledAt), 'MMM d, h:mm a')}
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => console.log('More options clicked for post:', post.id)}
            data-testid={`button-more-${post.id}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm leading-relaxed" data-testid={`text-content-${post.id}`}>
          {post.content}
        </p>
        
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {post.mediaUrls.slice(0, 4).map((url, index) => (
              <div key={index} className="aspect-video bg-muted rounded-md" data-testid={`media-preview-${index}`}>
                <img 
                  src={url} 
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {post.platforms?.map((platformId) => {
              const platform = PLATFORMS.find(p => p.id === platformId);
              return platform ? (
                <Badge 
                  key={platformId} 
                  variant="outline"
                  className="text-xs"
                  style={{ borderColor: platform.color, color: platform.color }}
                  data-testid={`badge-platform-${platformId}`}
                >
                  {platform.name}
                </Badge>
              ) : null;
            })}
          </div>
          
          <div className="flex items-center gap-2">
            {post.createdAt && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {format(new Date(post.createdAt), 'MMM d')}
              </span>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                console.log('View post clicked:', post.id);
                onView?.();
              }}
              data-testid={`button-view-${post.id}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}