"use client";

import { useState, useEffect } from 'react';
import type { Locale } from '../i18n/LanguageContext';
import type { Translations } from '../i18n/LanguageContext';
import zhTranslations from '../i18n/locales/zh.json';
import enTranslations from '../i18n/locales/en.json';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline?: () => void;
  onSettings?: () => void;
  lang: Locale;
}

// 创建一个根据语言获取翻译的辅助函数
function getTranslation(lang: Locale) {
  const translations: Record<Locale, Translations> = {
    'zh': zhTranslations,
    'en': enTranslations
  };
  
  return {
    t: (key: string) => {
      const keys = key.split('.');
      let value: Record<string, unknown> = translations[lang];
      
      for (const k of keys) {
        if (value[k] === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        value = value[k] as Record<string, unknown>;
      }
      
      return value as unknown as string;
    }
  };
}

export default function CookieConsent({ onAccept, onDecline, onSettings, lang }: CookieConsentProps) {
  const { t } = getTranslation(lang);
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

  const handleSettings = () => {
    if (onSettings) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        onSettings();
      }, 300);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-zinc-900/70 backdrop-blur-lg shadow-lg p-4 z-50 border-t border-gray-200 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-80' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4 max-w-2xl">
          <h4 className="text-base font-medium mb-1 text-white">{t('cookies.notification.title')}</h4>
          <p className="text-sm text-gray-300">
            {t('cookies.notification.description')}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSettings}
            className="px-4 py-2 text-sm border border-gray-500 text-gray-200 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {t('cookies.notification.settings')}
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-500 text-gray-200 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {t('cookies.notification.decline')}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('cookies.notification.accept')}
          </button>
        </div>
      </div>
    </div>
  );
} 