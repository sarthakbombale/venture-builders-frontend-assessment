import * as React from 'react';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Venture Builders Assessment',
  description: 'Frontend Technical Assessment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}