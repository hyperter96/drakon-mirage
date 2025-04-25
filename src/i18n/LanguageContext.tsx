"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import zhTranslations from './locales/zh.json';
import enTranslations from './locales/en.json';
import { redirectedPathName, locales } from './utils';

// 定义支持的语言
export type Locale = 'zh' | 'en';

// 翻译文件类型
export type Translations = typeof zhTranslations;

// 语言上下文类型
type LanguageContextType = {
  locale: Locale;
  translations: Translations;
  changeLanguage: (locale: Locale) => void;
};

// 默认值
const defaultLocale: Locale = 'zh';
const translations: Record<Locale, Translations> = {
  'zh': zhTranslations,
  'en': enTranslations
};

// 创建上下文
const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  translations: translations[defaultLocale],
  changeLanguage: () => {},
});

// 提供者组件
export function LanguageProvider({ 
  children, 
  initialLocale = defaultLocale 
}: { 
  children: ReactNode;
  initialLocale?: Locale; 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // 初始化时从本地存储加载设置的语言
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && locales.includes(savedLocale)) {
        if (savedLocale !== initialLocale) {
          // 如果保存的语言与URL中的语言不同，更新URL
          router.push(redirectedPathName(savedLocale, pathname));
        }
        setLocale(savedLocale);
      } else {
        // 如果没有保存的语言，则使用初始语言
        localStorage.setItem('locale', initialLocale);
      }
    } catch (e) {
      // 处理 localStorage 在 SSR 中不可用的情况
      console.warn('localStorage not available:', e);
    }
  }, [initialLocale, pathname, router]);

  // 根据当前语言设置文档的 lang 属性
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // 切换语言
  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    setLocale(newLocale);
    try {
      localStorage.setItem('locale', newLocale);
      
      // 设置cookie以便服务器端也能识别
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      // 重定向到新语言的URL
      router.push(redirectedPathName(newLocale, pathname));
    } catch (e) {
      console.warn('Error setting language:', e);
    }
  };

  const value = {
    locale,
    translations: translations[locale],
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言上下文的Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// 获取翻译的函数
export function useTranslation() {
  const { translations } = useLanguage();
  
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    return value;
  };
  
  return { t };
} 