"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage, Locale } from '../i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 语言选项
  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];
  
  // 当前选择的语言
  const currentLang = languages.find(lang => lang.code === locale) || languages[0];
  
  // 切换语言
  const handleLanguageChange = (langCode: Locale) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  
  // 关闭下拉菜单的点击外部处理器
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-300 hover:text-gold transition-colors px-2 py-1 rounded-md hover:bg-gold/10"
        aria-label="选择语言"
        aria-expanded={isOpen}
      >
        <span className="mr-1">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-800 border border-gold/20 overflow-hidden z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as Locale)}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  locale === lang.code ? 'bg-gold/20 text-gold' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 