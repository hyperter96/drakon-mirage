import type { Locale } from './LanguageContext';
import { locales } from './utils';

interface PageProps {
  params?: {
    lang?: string;
  };
}

// 从路由props中提取有效的语言代码
export async function getLocaleFromRouteProps(props: PageProps): Promise<Locale> {
  // 确保有props和params对象
  if (!props || !props.params) {
    return 'zh';
  }
  
  // 直接使用params，不需要await，因为它不是Promise
  const { lang: langParam = '' } = props.params;
  
  // 验证语言参数是否有效
  return (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'zh'; // 默认使用中文
} 