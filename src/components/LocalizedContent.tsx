"use client";

import { useTranslation } from '../i18n/LanguageContext';

export default function LocalizedContent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('site.title')}</h1>
      <p>{t('site.description')}</p>
      
      <nav>
        <ul>
          <li><a href="#">{t('nav.home')}</a></li>
          <li><a href="#">{t('nav.gameIntro')}</a></li>
          <li><a href="#">{t('nav.treasureGuide')}</a></li>
          <li><a href="#">{t('nav.treasureGallery')}</a></li>
          <li><a href="#">{t('nav.community')}</a></li>
        </ul>
      </nav>
      
      <button>{t('buttons.download')}</button>
      <button>{t('buttons.startAdventure')}</button>
      <button>{t('buttons.watchTrailer')}</button>
      
      <div>
        <h2>{t('features.arTreasure.title')}</h2>
        <p>{t('features.arTreasure.description')}</p>
      </div>
      
      <footer>
        <p>{t('footer.copyright')}</p>
        <ul>
          <li><a href="#">{t('footer.about')}</a></li>
          <li><a href="#">{t('footer.privacy')}</a></li>
          <li><a href="#">{t('footer.terms')}</a></li>
          <li><a href="#">{t('footer.contact')}</a></li>
        </ul>
      </footer>
    </div>
  );
} 