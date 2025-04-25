import { cookies } from 'next/headers';
import type { Locale } from './LanguageContext';
import { locales } from './utils';

// 获取当前语言 (仅在服务器组件中使用)
export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale');
  
  if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale;
  }
  
  return 'zh'; // 默认语言
} 