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
import { metadata } from "./metadata";
import axios from "axios";

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

  useEffect(() => {
    // Start NProgress on request
    const requestInterceptor = axios.interceptors.request.use((config) => {
      NProgress.start();
      return config;
    });

    // Stop NProgress on response
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        NProgress.done();
        return response;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <html lang="en" className="w-full">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${sans.className} w-full`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" expand={false} richColors />
      </body>
    </html>
  );
}
