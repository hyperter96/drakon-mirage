"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// 动态导入CookieConsent组件，避免SSR时的localStorage错误
const CookieConsent = dynamic(
  () => import("./CookieConsent"),
  { ssr: false }
);

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  // 使用前缀下划线表示有意未使用的状态变量
  const [_cookieAccepted, setCookieAccepted] = useState(false);

  const handleCookieAccept = () => {
    setCookieAccepted(true);
    console.log("Cookies accepted");
  };

  const handleCookieDecline = () => {
    console.log("Cookies declined");
  };

  return (
    <>
      {children}
      <CookieConsent 
        onAccept={handleCookieAccept} 
        onDecline={handleCookieDecline} 
      />
    </>
  );
} 