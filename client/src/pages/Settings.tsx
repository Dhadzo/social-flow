import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Palette, Plus } from "lucide-react";
import AccountCard from "@/components/AccountCard";
import { useTheme } from "@/components/ThemeProvider";
import { SocialAccount, PLATFORMS } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// TODO: remove mock functionality
const mockAccounts: SocialAccount[] = [
  {
    id: '1',
    userId: 'user1',
    platform: 'twitter',
    platformUsername: 'johndoe',
    isConnected: true,
    accessToken: 'token1',
    refreshToken: 'refresh1',
    connectedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    platform: 'linkedin',
    platformUsername: 'john-doe',
    isConnected: true,
    accessToken: 'token2',
    refreshToken: 'refresh2',
    connectedAt: new Date(Date.now() - 172800000).toISOString(),
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

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Social media enthusiast and content creator',
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    postReminders: true,
    engagementAlerts: false,
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleConnectAccount = (platform: string) => {
    console.log('Connecting to:', platform);
    toast({
      title: "Connecting account",
      description: `Redirecting to ${platform} for authentication...`,
    });
    // TODO: Implement OAuth flow
  };

  const handleDisconnectAccount = (account: SocialAccount) => {
    console.log('Disconnecting:', account.platform);
    toast({
      title: "Account disconnected",
      description: `Your ${account.platform} account has been disconnected.`,
      variant: "destructive",
    });
  };

  const connectedAccounts = mockAccounts.filter(acc => acc.isConnected);
  const availablePlatforms = PLATFORMS.filter(platform => 
    !mockAccounts.some(acc => acc.platform === platform.id && acc.isConnected)
  );

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-settings">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and connected platforms
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2" data-testid="tab-profile">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2" data-testid="tab-accounts">
              <Shield className="h-4 w-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2" data-testid="tab-notifications">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2" data-testid="tab-appearance">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" data-testid="button-change-avatar">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    data-testid="input-bio"
                  />
                </div>
                
                <Button onClick={handleSaveProfile} data-testid="button-save-profile">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connected Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your social media platform connections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {connectedAccounts.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {connectedAccounts.map((account) => (
                      <AccountCard 
                        key={account.id} 
                        account={account}
                        onDisconnect={() => handleDisconnectAccount(account)}
                      />
                    ))}
                  </div>
                )}
                
                {availablePlatforms.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-4">Available Platforms</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {availablePlatforms.map((platform) => (
                          <Card key={platform.id} className="hover-elevate cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-semibold"
                                    style={{ backgroundColor: platform.color }}
                                  >
                                    {platform.name.slice(0, 1)}
                                  </div>
                                  <span className="font-medium">{platform.name}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleConnectAccount(platform.id)}
                                  data-testid={`button-connect-${platform.id}`}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Connect
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about your social media activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your posts and account activity
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailNotifications: checked})
                      }
                      data-testid="switch-email-notifications"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get browser notifications for important updates
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, pushNotifications: checked})
                      }
                      data-testid="switch-push-notifications"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="post-reminders">Post Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Remind you about scheduled posts before they go live
                      </p>
                    </div>
                    <Switch
                      id="post-reminders"
                      checked={notifications.postReminders}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, postReminders: checked})
                      }
                      data-testid="switch-post-reminders"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="engagement-alerts">Engagement Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your posts receive significant engagement
                      </p>
                    </div>
                    <Switch
                      id="engagement-alerts"
                      checked={notifications.engagementAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, engagementAlerts: checked})
                      }
                      data-testid="switch-engagement-alerts"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                    data-testid="switch-dark-mode"
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Theme Preview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-card border rounded-lg">
                      <h4 className="font-medium">Card Example</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        This is how cards look in your current theme.
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium">Muted Background</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        This shows muted background styling.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}