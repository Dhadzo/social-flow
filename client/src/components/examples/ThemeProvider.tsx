import { ThemeProvider, useTheme } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function ThemeDemo() {
  const { theme } = useTheme();
  
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Current theme: {theme}</h3>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-card border rounded-lg">
          <h4 className="font-medium">Card Example</h4>
          <p className="text-sm text-muted-foreground mt-2">
            This demonstrates how the theme changes affect different components.
          </p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium">Muted Background</h4>
          <p className="text-sm text-muted-foreground mt-2">
            Notice how colors adapt automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  );
}