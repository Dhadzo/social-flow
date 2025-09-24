import { AppSidebar } from '../AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <div className="h-64">
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-full w-full">
          <AppSidebar />
          <div className="flex-1 p-4 bg-muted">
            <p className="text-muted-foreground">Main content area</p>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}