import { Suspense } from "react";

import UserNavbar from "./components/layout/navbar";
import SettingsSidebar from "./components/layout/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <UserNavbar />
      <div className="relative w-full flex  max-lg:overflow-hidden ">
        <SettingsSidebar />
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
