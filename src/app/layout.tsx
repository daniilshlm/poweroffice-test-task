import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PowerOffice Test Task',
  description: 'Display of company information from the Brønnøysund Register',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
