import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fuminori Iwaki | Backend Engineer",
  description:
    "バックエンドエンジニア 岩木史紀のポートフォリオサイト。Java/Spring Bootを主軸に約10年の開発経験。",
  openGraph: {
    title: "Fuminori Iwaki | Backend Engineer",
    description:
      "バックエンドエンジニア 岩木史紀のポートフォリオサイト。",
    url: "https://iwakichi72.github.io",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
