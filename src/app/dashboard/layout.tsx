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
      <div className="sticky top-0 z-10 w-full">
        <UserNavbar />
      </div>

      <div className="flex flex-1 h-full">
        {/* Sticky Sidebar */}
        <div className="sticky top-0 z-10 h-full">
          <SettingsSidebar />
        </div>

        {/* Main content with smoother scrolling */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            scrollBehavior: "smooth", // Smooth scrolling behavior
            willChange: "transform", // Hinting to browser for optimized rendering
          }}
        >
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
