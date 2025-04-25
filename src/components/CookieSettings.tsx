"use client";

import { useState, useEffect } from 'react';
import type { Locale } from '../i18n/LanguageContext';
import zhTranslations from '../i18n/locales/zh.json';
import enTranslations from '../i18n/locales/en.json';

interface CookieSettingsProps {
  accepted: boolean | null;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
  lang: Locale;
}

// 创建一个根据语言获取翻译的辅助函数
function getTranslation(lang: Locale) {
  const translations = {
    'zh': zhTranslations,
    'en': enTranslations
  };
  
  return {
    t: (key: string) => {
      const keys = key.split('.');
      let value: any = translations[lang];
      
      for (const k of keys) {
        if (value[k] === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        value = value[k];
      }
      
      return value;
    }
  };
}

export default function CookieSettings({ accepted, onAccept, onDecline, onClose, lang }: CookieSettingsProps) {
  const { t } = getTranslation(lang);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(accepted === true);
  const [preferenceEnabled, setPreferenceEnabled] = useState(accepted === true);
  const [isVisible, setIsVisible] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // 动画效果控制
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSaveSettings = () => {
    if (analyticsEnabled || preferenceEnabled) {
      onAccept();
    } else {
      onDecline();
    }
    
    // 显示保存成功的反馈
    setShowFeedback(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 800);
  };
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // 支持键盘导航的处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="p-6 relative">
          {/* 成功反馈提示 */}
          {showFeedback && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-gray-800/95 z-10 rounded-lg">
              <div className="text-center p-6 transform transition-all duration-300 scale-100">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-xl font-medium text-gray-900 dark:text-white">{t('cookies.modal.saveSuccess')}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4">
            <h3 id="cookie-settings-title" className="text-xl font-semibold text-gray-900 dark:text-white">{t('cookies.modal.title')}</h3>
            <button 
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              aria-label={t('cookies.modal.close')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
            {t('cookies.modal.description')}
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('cookies.modal.necessary.title')}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('cookies.modal.necessary.description')}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs py-1 px-2 rounded">
                  {t('cookies.modal.necessary.required')}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('cookies.modal.analytics.title')}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('cookies.modal.analytics.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label={t('cookies.modal.analytics.title')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('cookies.modal.preferences.title')}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('cookies.modal.preferences.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={preferenceEnabled}
                    onChange={(e) => setPreferenceEnabled(e.target.checked)}
                    className="sr-only peer"
                    aria-label={t('cookies.modal.preferences.title')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label={t('cookies.modal.declineAll')}
            >
              {t('cookies.modal.declineAll')}
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label={t('cookies.modal.acceptAll')}
            >
              {t('cookies.modal.acceptAll')}
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label={t('cookies.modal.saveSettings')}
            >
              {t('cookies.modal.saveSettings')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 