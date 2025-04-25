"use client";

import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n/LanguageContext';

export default function NavigationBar() {
  const { t } = useTranslation();
  
  return (
    <nav className="w-full px-8 py-4 backdrop-blur-md bg-black/50 border-b border-gold/30 z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image 
            src="/logo.svg"
            alt={t('site.title')}
            width={40}
            height={40}
          />
          <span className="text-gold text-xl font-bold">{t('site.title').split(' - ')[0]}</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#" className="text-gray-300 hover:text-gold transition-colors px-2 py-1">{t('nav.home')}</a>
          <a href="#" className="text-gray-300 hover:text-gold transition-colors px-2 py-1">{t('nav.gameIntro')}</a>
          <a href="#" className="text-gray-300 hover:text-gold transition-colors px-2 py-1">{t('nav.treasureGuide')}</a>
          <a href="#" className="text-gray-300 hover:text-gold transition-colors px-2 py-1">{t('nav.treasureGallery')}</a>
          <a href="#" className="text-gray-300 hover:text-gold transition-colors px-2 py-1">{t('nav.community')}</a>
          <div className="border-l border-gray-700 h-6 mx-2"></div>
          <LanguageSwitcher />
        </div>
        
        <button className="bg-gold/80 hover:bg-gold text-black px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105">
          {t('buttons.download')}
        </button>
      </div>
    </nav>
  );
} 