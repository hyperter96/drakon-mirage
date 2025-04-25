import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ClientLayout from "../../components/ClientLayout";
import { locales } from "../../i18n/utils";
import { getLocaleFromRouteProps } from "../../i18n/route-utils";
import zhTranslations from "../../i18n/locales/zh.json";
import enTranslations from "../../i18n/locales/en.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 定义翻译对象，用于生成标题和描述
const translations = {
  zh: {
    title: zhTranslations.site.title,
    description: zhTranslations.site.description,
  },
  en: {
    title: enTranslations.site.title,
    description: enTranslations.site.description,
  }
};

// 动态生成元数据，根据路径参数选择语言
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  // 使用getLocaleFromRouteProps函数获取有效的语言代码
  const lang = await getLocaleFromRouteProps({ params });
  
  return {
    title: translations[lang as keyof typeof translations].title,
    description: translations[lang as keyof typeof translations].description,
    icons: {
      icon: [
        { url: '/logo_32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/logo_108x108.png', type: 'image/png', sizes: '108x108' },
        { url: '/dragon-symbol.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/logo_108x108.png', type: 'image/png', sizes: '108x108' },
      ],
      shortcut: [
        { url: '/logo_32x32.png', sizes: '32x32' },
      ],
    },
  };
}

// 生成静态参数以避免构建时的警告
export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // 使用集中工具函数获取有效的语言代码，并且等待结果
  const lang = await getLocaleFromRouteProps(props);

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/logo_32x32.png" sizes="32x32" />
        <link rel="icon" href="/logo_108x108.png" sizes="108x108" />
        <link rel="icon" href="/dragon-symbol.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo_108x108.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout lang={lang}>
          {props.children}
        </ClientLayout>
      </body>
    </html>
  );
} 