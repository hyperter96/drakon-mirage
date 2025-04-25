"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { LanguageProvider } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/LanguageContext";
import type { Translations } from "../i18n/LanguageContext";
import zhTranslations from '../i18n/locales/zh.json';
import enTranslations from '../i18n/locales/en.json';

// 动态导入CookieConsent组件，避免SSR时的localStorage错误
const CookieConsent = dynamic(
  () => import("./CookieConsent"),
  { ssr: false }
);

// 动态导入CookieSettings组件
const CookieSettings = dynamic(
  () => import("./CookieSettings"),
  { ssr: false }
);

interface ClientLayoutProps {
  children: React.ReactNode;
  lang: Locale;
}

export default function ClientLayout({ children, lang }: ClientLayoutProps) {
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // 初始化时检查cookie设置
  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem('cookieConsent');
      if (savedConsent) {
        setCookieAccepted(savedConsent === 'true');
      }
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }, []);

  // 处理接受cookies
  const handleCookieAccept = useCallback(() => {
    try {
      localStorage.setItem('cookieConsent', 'true');
      setCookieAccepted(true);
      console.log("Cookies accepted");
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }, []);

  // 处理拒绝cookies
  const handleCookieDecline = useCallback(() => {
    try {
      localStorage.setItem('cookieConsent', 'false');
      setCookieAccepted(false);
      console.log("Cookies declined");
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }, []);

  // 打开cookie设置面板
  const openCookieSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  // 关闭cookie设置面板
  const closeCookieSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  return (
    <LanguageProvider initialLocale={lang}>
      {children}

      {/* cookie相关UI组件 */}
      {cookieAccepted === null && (
        <CookieConsent 
          onAccept={handleCookieAccept} 
          onDecline={handleCookieDecline}
          onSettings={openCookieSettings}
          lang={lang}
        />
      )}

      {showSettings && (
        <CookieSettings
          accepted={cookieAccepted}
          onAccept={handleCookieAccept}
          onDecline={handleCookieDecline}
          onClose={closeCookieSettings}
          lang={lang}
        />
      )}

      {/* 悬浮的小按钮，允许用户随时更改cookie设置 */}
      {cookieAccepted !== null && !showSettings && (
        <CookieSettingsButton 
          openSettings={openCookieSettings}
          lang={lang}
        />
      )}

      {/* 分析脚本 - 仅当用户接受cookies时加载 */}
      {cookieAccepted === true && (
        <>
          {/* 这里可以添加Google Analytics或其他分析脚本 */}
          <Script
            id="example-analytics"
            strategy="afterInteractive"
          >
            {`
              console.log("分析脚本已加载");
              // 在这里可以添加实际的分析脚本代码
              // 例如 Google Analytics 代码
            `}
          </Script>
        </>
      )}
    </LanguageProvider>
  );
}

// 设置按钮组件
function CookieSettingsButton({ openSettings, lang }: { openSettings: () => void; lang: Locale }) {
  // 获取翻译，使用同样的辅助函数
  const getTranslation = (locale: Locale) => {
    const translations: Record<Locale, Translations> = {
      'zh': zhTranslations,
      'en': enTranslations
    };
    
    return {
      t: (key: string) => {
        const keys = key.split('.');
        let value: Record<string, unknown> = translations[locale];
        
        for (const k of keys) {
          if (value[k] === undefined) {
            return key;
          }
          value = value[k] as Record<string, unknown>;
        }
        
        return value as unknown as string;
      }
    };
  };
  
  const { t } = getTranslation(lang);
  
  return (
    <button 
      onClick={openSettings}
      className="fixed bottom-4 right-4 bg-zinc-800/70 backdrop-blur-md text-white p-2 rounded-full text-xs shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
      aria-label={t('cookies.settings')}
    >
      🍪
    </button>
  );
} 