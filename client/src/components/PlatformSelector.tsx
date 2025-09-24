import { PLATFORMS } from "@shared/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectionChange: (platforms: string[]) => void;
  disabled?: boolean;
}

export default function PlatformSelector({ 
  selectedPlatforms, 
  onSelectionChange, 
  disabled = false 
}: PlatformSelectorProps) {
  const handlePlatformToggle = (platformId: string, checked: boolean) => {
    console.log('Platform toggle:', platformId, checked);
    if (checked) {
      onSelectionChange([...selectedPlatforms, platformId]);
    } else {
      onSelectionChange(selectedPlatforms.filter(id => id !== platformId));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Select Platforms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {PLATFORMS.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <div 
              key={platform.id} 
              className="flex items-center space-x-3"
              data-testid={`platform-option-${platform.id}`}
            >
              <Checkbox
                id={platform.id}
                checked={isSelected}
                onCheckedChange={(checked) => 
                  handlePlatformToggle(platform.id, checked as boolean)
                }
                disabled={disabled}
                data-testid={`checkbox-${platform.id}`}
              />
              <Label 
                htmlFor={platform.id} 
                className="flex items-center gap-3 cursor-pointer"
              >
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.name.slice(0, 1)}
                </div>
                <span className="font-medium">{platform.name}</span>
              </Label>
            </div>
          );
        })}
        
        {selectedPlatforms.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Select at least one platform to publish your post
          </p>
        )}
        
        {selectedPlatforms.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Publishing to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
}