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

      {/* Main layout container: Sidebar and content */}
      <div className="flex flex-1 h-full">
        {/* Sidebar: Sticky but starting below the navbar */}
        <div className="sticky top-[4rem] z-10 h-full">
          <SettingsSidebar />
        </div>

        {/* Main content with scrolling */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            scrollBehavior: "smooth",
            willChange: "transform",
          }}
        >
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
