import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from '../components/Footer';
import { AppProvider } from "./../components/AppContext";
import {Toaster} from 'react-hot-toast'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanZeal",
  description: "An e-commerce store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <AppProvider>
      <body className={inter.className}>
        <Toaster /><Navbar />{children}<Footer /></body></AppProvider>
    </html>
  );
}
