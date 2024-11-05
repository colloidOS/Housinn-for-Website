// src/app/layout.tsx

import React from 'react';
import { AuthProvider } from '@/context/AuthContext'; // Adjust the path as necessary
import { Open_Sans } from 'next/font/google';
import "./globals.css";
import { Toaster} from 'sonner'
const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Housinn",
  description: "Nigeria’s innovated property marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className='w-full'>
      <body className={`${sans.className} w-full`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" expand={false} richColors/>

      </body>
    </html>
  );
}
