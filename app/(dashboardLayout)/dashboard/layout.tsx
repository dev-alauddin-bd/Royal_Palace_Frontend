import { DashboardHeader } from '@/components/dashboard/dashboardHeader';
import { AppSidebar } from '@/components/dashboard/dashboardSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import PrivateRoute from '@/privateRoute/privateRoute';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <SidebarProvider>
        <div className="flex min-h-screen w-full ">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <DashboardHeader />
            <main className="flex-1 p-6 ">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </PrivateRoute>
  );
};

export default layout;
