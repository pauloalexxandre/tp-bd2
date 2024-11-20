  import type { Metadata } from "next";
  import {  Open_Sans, Roboto } from 'next/font/google'
  import "./globals.css";
import { AuthProvider } from "./context/AuthContext";


  const geistSans = Open_Sans({
    subsets: ['latin'],
    variable: "--font-geist-sans",
    weight: [ "400","500","600","700","800"],
  });
  const geistMono = Roboto({
    subsets: ['latin'],
    variable: "--font-geist-mono",
    weight: [ "400","500","700","900"],
  });

  export const metadata: Metadata = {
    title: "Trabalho BD2",
    description: "Mapeamento de sensores em São Paulo",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="pt-BR">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen`}
        >
           <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );
  }
