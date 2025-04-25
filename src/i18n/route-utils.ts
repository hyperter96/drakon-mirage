import type { Locale } from './LanguageContext';
import { locales } from './utils';

interface PageProps {
  params?: {
    lang?: string;
  };
}

// 从路由props中提取有效的语言代码 - 改为异步函数
export async function getLocaleFromRouteProps(props: PageProps): Promise<Locale> {
  // 确保有props和params对象
  if (!props || !props.params) {
    return 'zh';
  }
  
  // 先解构params，然后等待it
  const params = await props.params;
  
  // 使用空值合并，安全地访问语言参数
  const langParam = params.lang ?? '';
  
  // 验证语言参数是否有效
  return (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'zh'; // 默认使用中文
} 