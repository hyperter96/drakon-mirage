"use client";

import Image from 'next/image';
import NavigationBar from './NavigationBar';
import { useTranslation } from '../i18n/LanguageContext';
import type { Locale } from '../i18n/LanguageContext';

export default function HomePage({ lang }: { lang: Locale }) {
  const { t } = useTranslation();
  
  // 使用lang参数进行本地化定制
  const localizedBackground = lang === 'zh' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-900 to-gray-950';
  
  return (
    <main className={`min-h-screen flex flex-col ${localizedBackground} text-foreground relative overflow-hidden`}>
      {/* 龙影背景元素 */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Image
          src="/dragon-bg.svg" 
          alt="Dragon Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* 浮动的宝藏元素 */}
      <div className="absolute top-1/4 right-10 animate-float hidden lg:block">
        <Image
          src="/treasure.svg" 
          alt="Floating Treasure"
          width={120}
          height={120}
        />
      </div>
      
      <div className="absolute bottom-1/4 left-10 animate-pulse hidden lg:block">
        <Image
          src="/dragon-symbol.svg" 
          alt="Dragon Symbol"
          width={150}
          height={150}
        />
      </div>

      {/* 导航栏 */}
      <NavigationBar />

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col items-center z-10 px-6">
        <div className="mt-16 md:mt-28 text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold via-amber-300 to-gold animate-shimmer">
            {t('site.title').split(' - ')[0]}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-amber-400 hover:bg-amber-400 text-black px-8 py-3 rounded-full font-medium text-lg transition-all hover:scale-105">
              {t('buttons.startAdventure')}
            </button>
            <button className="border border-gold/50 text-gold hover:bg-gold/10 px-8 py-3 rounded-full font-medium text-lg transition-all hover:scale-105">
              {t('buttons.watchTrailer')}
            </button>
          </div>
        </div>

        {/* 特色卡片 */}
        <div className="w-full max-w-6xl mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2 group">
            <div className="bg-black/50 p-3 rounded-lg inline-block mb-4">
              <Image
                src="/ar-icon.svg" 
                alt="AR Feature"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gold mb-3 group-hover:text-amber-300">
              {t('features.arTreasure.title')}
            </h2>
            <p className="text-gray-300">
              {t('features.arTreasure.description')}
            </p>
          </div>
          
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2 group">
            <div className="bg-black/50 p-3 rounded-lg inline-block mb-4">
              <Image
                src="/map-icon.svg" 
                alt="Map Feature"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gold mb-3 group-hover:text-amber-300">
              {t('features.dragonRealm.title')}
            </h2>
            <p className="text-gray-300">
              {t('features.dragonRealm.description')}
            </p>
          </div>
          
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2 group">
            <div className="bg-black/50 p-3 rounded-lg inline-block mb-4">
              <Image
                src="/community-icon.svg" 
                alt="Community Feature"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gold mb-3 group-hover:text-amber-300">
              {t('features.treasureLeague.title')}
            </h2>
            <p className="text-gray-300">
              {t('features.treasureLeague.description')}
            </p>
          </div>
        </div>
        
        {/* 下载区域 */}
        <div className="w-full max-w-4xl my-20 bg-gradient-to-r from-black/70 via-gray-900/70 to-black/70 backdrop-blur-md rounded-2xl p-8 border border-gold/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gold mb-2">{t('download.title')}</h2>
            <p className="text-gray-300 mb-6">{t('download.subtitle')}</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center bg-black border border-gold/50 px-6 py-3 rounded-xl hover:bg-gold/10 transition-all hover:scale-105">
                <Image
                  src="/apple-icon.svg" 
                  alt="App Store"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>App Store</span>
              </button>
              
              <button className="flex items-center justify-center bg-black border border-gold/50 px-6 py-3 rounded-xl hover:bg-gold/10 transition-all hover:scale-105">
                <Image
                  src="/google-play-icon.svg" 
                  alt="Google Play"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 页脚 */}
      <footer className="w-full bg-black/80 backdrop-blur-md border-t border-gold/20 py-6 px-8 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image 
              src="/logo.svg" 
              alt="龙影幻境"
              width={30}
              height={30}
            />
            <span className="text-gold text-sm">{t('footer.copyright')}</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gold text-sm">{t('footer.about')}</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm">{t('footer.privacy')}</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm">{t('footer.terms')}</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm">{t('footer.contact')}</a>
          </div>
        </div>
      </footer>
      
      {/* 添加一些动画粒子效果 */}
      <div className="particle-container absolute inset-0 z-0"></div>
    </main>
  );
} 