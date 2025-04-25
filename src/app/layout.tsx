import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "龙影幻境 - 沉浸式冒险世界",
  description: "探索龙影幻境，一个充满魔法与冒险的沉浸式世界",
  icons: {
    icon: [
      { url: '/dragon-symbol.svg' },
    ],
    apple: [
      { url: '/dragon-symbol.svg' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
