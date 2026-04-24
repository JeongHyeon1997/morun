import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MO:RUN',
  description: '러닝 크루 커뮤니티',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans text-text-primary bg-white antialiased">{children}</body>
    </html>
  );
}
