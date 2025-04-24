"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

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
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // 初始化时检查cookie设置
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      setCookieAccepted(savedConsent === 'true');
    }
  }, []);

  // 处理接受cookies
  const handleCookieAccept = useCallback(() => {
    localStorage.setItem('cookieConsent', 'true');
    setCookieAccepted(true);
    console.log("Cookies accepted");
  }, []);

  // 处理拒绝cookies
  const handleCookieDecline = useCallback(() => {
    localStorage.setItem('cookieConsent', 'false');
    setCookieAccepted(false);
    console.log("Cookies declined");
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
    <>
      {children}

      {/* cookie相关UI组件 */}
      {cookieAccepted === null && (
        <CookieConsent 
          onAccept={handleCookieAccept} 
          onDecline={handleCookieDecline}
          onSettings={openCookieSettings}
        />
      )}

      {showSettings && (
        <CookieSettings
          accepted={cookieAccepted}
          onAccept={handleCookieAccept}
          onDecline={handleCookieDecline}
          onClose={closeCookieSettings}
        />
      )}

      {/* 悬浮的小按钮，允许用户随时更改cookie设置 */}
      {cookieAccepted !== null && !showSettings && (
        <button 
          onClick={openCookieSettings}
          className="fixed bottom-4 right-4 bg-zinc-800/70 backdrop-blur-md text-white p-2 rounded-full text-xs shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Cookie设置"
        >
          🍪
        </button>
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
    </>
  );
} 