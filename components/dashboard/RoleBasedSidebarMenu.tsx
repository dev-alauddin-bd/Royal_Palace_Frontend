import Link from 'next/link';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

type MenuItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

interface RoleBasedMenuProps {
  items: MenuItem[];
  currentRole: string;
  pathname: string;
}

const RoleBasedSidebarMenu = ({ items, pathname }: RoleBasedMenuProps) => {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={`hover:bg-slate-700/50 rounded-none ${
                isActive ? 'bg-[#2a2d38] text-white font-semibold' : ''
              }`}
            >
              <Link
                href={item.url}
                className="flex items-center space-x-3 text-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default RoleBasedSidebarMenu;
