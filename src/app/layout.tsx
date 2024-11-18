/*

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Projeto da disciplina: Banco de Dados 2",
  description: "Banco de dados para coleta de dados de sensores: telemetria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen flex items-center justify-center bg-teal-800`}
      >
        {children}
      </body>
    </html>
  );
}

*/

// app/layout.js
import './globals.css';  // Estilos globais, se necessário
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={inter.className}>
        {children} {/* Aqui é onde o conteúdo da página será renderizado */}
      </body>
    </html>
  );
}
