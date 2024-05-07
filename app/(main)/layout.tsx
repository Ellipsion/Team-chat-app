import NavigationSidebar from "@/components/custom/navigation/navigation-sidebar";
import { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col h-full w-20 fixed inset-y-0 z-30">
        <NavigationSidebar />
      </div>
      <main className="md:pl-20 h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
