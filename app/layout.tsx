import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'HookAgent',
  description: 'GPT-powered hook analyzer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
