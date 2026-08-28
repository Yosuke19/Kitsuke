import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ひろ着付け｜心ほどける、出張着付け",
  description: "ご自宅や会場へ伺う出張着付けと、少人数制の着付け教室。着物・浴衣・振袖・七五三に対応します。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "ひろ着付け｜出張着付け・着付け教室",
    description: "大切な一日を、いつもの場所で美しく。",
    images: ["/hiro-kitsuke-hero.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
