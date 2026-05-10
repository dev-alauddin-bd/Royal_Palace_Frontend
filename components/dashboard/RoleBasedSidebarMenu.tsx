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
              className={`rounded-none h-12 px-6 transition-all duration-300 relative group ${
                isActive 
                  ? 'bg-royal-gold/10 text-royal-gold' 
                  : 'text-foreground/60 hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <Link
                href={item.url}
                className="flex items-center space-x-4"
              >
                <item.icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-royal-gold' : ''}`} />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{item.title}</span>
                {isActive && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-royal-gold shadow-[0_0_10px_rgba(191,147,16,0.5)]" />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default RoleBasedSidebarMenu;
