import { SocialAccount, PLATFORMS } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Unlink, CheckCircle, AlertCircle } from "lucide-react";

interface AccountCardProps {
  account: SocialAccount;
  onSettings?: () => void;
  onDisconnect?: () => void;
}

export default function AccountCard({ account, onSettings, onDisconnect }: AccountCardProps) {
  const platform = PLATFORMS.find(p => p.id === account.platform);
  
  return (
    <Card className="hover-elevate" data-testid={`card-account-${account.platform}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: platform?.color }}
              data-testid={`avatar-platform-${account.platform}`}
            >
              {platform?.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium" data-testid={`text-platform-${account.platform}`}>
                {platform?.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-username-${account.platform}`}>
                @{account.platformUsername}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {account.isConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500" data-testid={`icon-connected-${account.platform}`} />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" data-testid={`icon-disconnected-${account.platform}`} />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <Badge 
          variant={account.isConnected ? "secondary" : "destructive"}
          data-testid={`badge-connection-${account.platform}`}
        >
          {account.isConnected ? "Connected" : "Disconnected"}
        </Badge>
        {account.connectedAt && (
          <p className="text-xs text-muted-foreground mt-2">
            Connected on {new Date(account.connectedAt).toLocaleDateString()}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => {
              console.log('Settings clicked for:', account.platform);
              onSettings?.();
            }}
            data-testid={`button-settings-${account.platform}`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log('Disconnect clicked for:', account.platform);
              onDisconnect?.();
            }}
            data-testid={`button-disconnect-${account.platform}`}
          >
            <Unlink className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}