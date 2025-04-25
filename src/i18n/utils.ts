import type { Locale } from './LanguageContext';

// 支持的语言列表
export const locales: Locale[] = ['zh', 'en'];

// 切换语言和重定向的路径生成函数
export function redirectedPathName(locale: Locale, pathName: string = '/') {
  if (!pathName) return `/${locale}`;
  
  const segments = pathName.split('/');
  segments[1] = locale;
  
  return segments.join('/');
} 