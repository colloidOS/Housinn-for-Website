"use client";

import React, { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import { useRouter } from "next/navigation";

const sans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  // Add NProgress for route changes
  useEffect(() => {
    NProgress.configure({
      minimum: 0.2,
      easing: "ease", // Animation easing
      speed: 500,
      showSpinner: false,
    });

    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Listen for route changes (App Router doesn't have router.events)
    const originalPush = router.push;
    router.push = async (...args) => {
      handleStart();
      await originalPush(...args);
      handleComplete();
    };

    return () => {
      router.push = originalPush; // Cleanup to restore default push behavior
    };
  }, [router]);

  return (
    <html lang="en" className="w-full">
      <body className={`${sans.className} w-full`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" expand={false} richColors />
      </body>
    </html>
  );
}
