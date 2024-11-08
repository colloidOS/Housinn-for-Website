import { Suspense } from "react";

import UserNavbar from "./components/layout/navbar";
import SettingsSidebar from "./components/layout/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="flex flex-col h-screen">
      {/* Sticky Navbar */}
      <div className="fixed top-0 z-10 w-full bg-white">
        <UserNavbar />
      </div>

      <div className="flex flex-1">
        {/* Sidebar: Sticky and positioned below the navbar */}
        <div className="sticky top-20 z-10 h-[calc(100vh-5rem)] bg-gray-100">
          {" "}
          {/* Adjust top based on navbar height */}
          <SettingsSidebar />
        </div>

        {/* Main content area that is scrollable */}
        <div className="flex-1 overflow-y-auto mt-16">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
