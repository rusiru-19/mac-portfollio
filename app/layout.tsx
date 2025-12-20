import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { sfPro } from './fonts';


export const metadata: Metadata = {
  title: "Rusiru's MacBook",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sfPro.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
