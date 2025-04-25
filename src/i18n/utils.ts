import type { Locale } from './LanguageContext';

// 支持的语言列表
export const locales: Locale[] = ['zh', 'en'];

// 切换语言和重定向的路径生成函数 - 返回符合Next.js 15.3.0的路由格式
export function redirectedPathName(locale: Locale, pathName: string = '/'): string {
  if (!pathName) return `/${locale}`;
  
  const segments = pathName.split('/');
  segments[1] = locale;
  
  return segments.join('/') as string;
} 