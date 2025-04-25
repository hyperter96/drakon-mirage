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
  
  try {
    // 等待params对象解析完成
    const params = await Promise.resolve(props.params);
    
    // 安全地访问语言参数
    const langParam = params?.lang || '';
    
    // 验证语言参数是否有效
    return (langParam && locales.includes(langParam as Locale))
      ? langParam as Locale
      : 'zh'; // 默认使用中文
  } catch (error) {
    console.error('Error resolving language parameter:', error);
    return 'zh'; // 出错时使用默认语言
  }
} 