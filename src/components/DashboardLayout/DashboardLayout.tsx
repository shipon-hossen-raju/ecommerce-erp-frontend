import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 relative">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-[0px_2px_25px_0px_#0000000D] z-50">
          <Header>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 mr-2 rounded-md text-primary hover:bg-slate-200 transition-colors"
            >
              <Menu size={20} />
            </button>
          </Header>
        </header>

        {/* Main content (with padding to avoid overlapping header) */}
        <main className="flex-1 overflow-y-auto bg-white p-4 md:p-6 mt-[64px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
