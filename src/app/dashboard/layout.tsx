import { Suspense } from "react";

import UserNavbar from "./components/layout/navbar";
import SettingsSidebar from "./components/layout/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col relative">
      <div className="sticky top-0 z-10 w-full">
        <UserNavbar />
      </div>
      <div className="relative w-full flex h-full max-lg:overflow-hidden ">
        <SettingsSidebar />
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
