// pages/_app.js

import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google';
import { AppProvider } from './../components/AppContext';
import Navbar from './../components/navbar';
import Footer from './../components/Footer';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  const { session, ...rest } = pageProps;

  return (
    <html lang="en">
      <AppProvider>
        <Toaster />
        <body className={inter.className}>
          <Navbar />
          <SessionProvider session={session}>
            <Component {...rest} />
          </SessionProvider>
          <Footer />
        </body>
      </AppProvider>
    </html>
  );
}
