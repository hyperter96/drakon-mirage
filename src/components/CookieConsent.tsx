"use client";

import { useState, useEffect } from 'react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline?: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 检查是否是首次访问（通过localStorage）
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // 添加短暂延迟，使动画在页面加载后开始
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 500);
    }
  }, []);

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'true');
      setIsVisible(false);
      onAccept();
    }, 300); // 等待退出动画完成
  };

  const handleDecline = () => {
    setIsAnimating(false);
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'false');
      setIsVisible(false);
      onDecline?.();
    }, 300); // 等待退出动画完成
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-zinc-800/70 backdrop-blur-lg shadow-lg p-4 z-50 border-t border-gray-200 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4 max-w-3xl">
          <h4 className="text-base font-medium mb-1">🍪 Cookie 使用提示</h4>
          <p className="text-sm text-gray-500">
            我们使用cookie来提升您的浏览体验，分析网站流量并个性化内容。
            继续浏览表示您同意我们的cookie政策。
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            拒绝
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            接受全部
          </button>
        </div>
      </div>
    </div>
  );
} 