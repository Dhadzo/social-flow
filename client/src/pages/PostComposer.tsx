import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Clock, Send, Save } from "lucide-react";
import { useLocation } from "wouter";
import MediaPreview from "@/components/MediaPreview";
import PlatformSelector from "@/components/PlatformSelector";
import { useToast } from "@/hooks/use-toast";

export default function PostComposer() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    console.log('Upload file dialog would open');
    // TODO: Implement file upload
  };

  const handlePublishNow = () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Select platforms",
        description: "Please select at least one platform to publish to.",
        variant: "destructive",
      });
      return;
    }

    console.log('Publishing now:', {
      content,
      platforms: selectedPlatforms,
      files,
    });
    
    toast({
      title: "Post published!",
      description: `Your post has been published to ${selectedPlatforms.join(', ')}.`,
    });
    
    // Simulate post creation and redirect
    setTimeout(() => {
      setLocation('/dashboard');
    }, 1500);
  };

  const handleSchedulePost = () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Select platforms",
        description: "Please select at least one platform to publish to.",
        variant: "destructive",
      });
      return;
    }
    
    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Schedule required",
        description: "Please set a date and time for your scheduled post.",
        variant: "destructive",
      });
      return;
    }

    console.log('Scheduling post:', {
      content,
      platforms: selectedPlatforms,
      files,
      scheduledDateTime: `${scheduledDate} ${scheduledTime}`,
    });
    
    toast({
      title: "Post scheduled!",
      description: `Your post has been scheduled for ${new Date(`${scheduledDate} ${scheduledTime}`).toLocaleString()}.`,
    });
    
    // Simulate post creation and redirect
    setTimeout(() => {
      setLocation('/dashboard');
    }, 1500);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', {
      content,
      platforms: selectedPlatforms,
      files,
    });
    
    toast({
      title: "Draft saved!",
      description: "Your post has been saved as a draft.",
    });
  };

  const characterCount = content.length;
  const maxCharacters = 280; // Twitter limit as reference

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-compose">
            Create New Post
          </h1>
          <p className="text-muted-foreground">
            Compose and schedule your social media content
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Composer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Post Content
                  <Badge variant={characterCount > maxCharacters ? "destructive" : "secondary"}>
                    {characterCount}/{maxCharacters}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Write your post content. Keep it engaging and concise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-32 resize-none"
                  data-testid="textarea-content"
                />
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>
                  Add images or videos to your post (max 4 files)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaPreview
                  files={files}
                  onRemove={handleRemoveFile}
                  onUpload={handleUpload}
                />
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Schedule Post
                </CardTitle>
                <CardDescription>
                  Choose when to publish your post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="schedule-mode"
                    checked={isScheduled}
                    onCheckedChange={setIsScheduled}
                    data-testid="switch-schedule"
                  />
                  <Label htmlFor="schedule-mode">
                    Schedule for later
                  </Label>
                </div>
                
                {isScheduled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        data-testid="input-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        data-testid="input-time"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <PlatformSelector
              selectedPlatforms={selectedPlatforms}
              onSelectionChange={setSelectedPlatforms}
            />

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isScheduled ? (
                  <Button 
                    className="w-full" 
                    onClick={handleSchedulePost}
                    data-testid="button-schedule"
                  >
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Schedule Post
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handlePublishNow}
                    data-testid="button-publish"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSaveDraft}
                  data-testid="button-save-draft"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setLocation('/dashboard')}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}