import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './landing.css';
import { Header } from '../components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Türk Hava Yolları',
  description: 'Türk Hava Yolları',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(children);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header theme='dark' />
        {children}
      </body>
    </html>
  );
}
