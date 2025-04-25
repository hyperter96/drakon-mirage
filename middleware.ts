import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 支持的语言列表
const locales = ['zh', 'en'];

// 获取请求的语言
function getLocale(request: NextRequest) {
  // 从URL路径获取语言参数
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  // 如果URL中没有语言参数，检查cookie
  try {
    const localeCookie = request.cookies.get('locale');
    if (localeCookie?.value && locales.includes(localeCookie.value)) {
      return localeCookie.value;
    }
  } catch (e) {
    console.error('Error accessing cookies:', e);
  }

  // 如果没有cookie，检查Accept-Language头
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.some(l => lang.startsWith(l) || lang.startsWith(l.split('-')[0])));
    
    if (preferredLocale) {
      // 找到匹配的语言代码
      for (const locale of locales) {
        if (preferredLocale.startsWith(locale) || preferredLocale.startsWith(locale.split('-')[0])) {
          return locale;
        }
      }
    }
  }

  // 默认使用中文
  return 'zh';
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 对静态资源和API路由略过处理
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api/') ||
    pathname.includes('.') // 静态文件如 .svg, .jpg 等
  ) {
    return NextResponse.next();
  }

  // 获取当前请求的语言
  const locale = getLocale(request);
  
  // 检查URL是否已经包含语言参数
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 如果URL没有语言参数，重定向到带有语言参数的URL
  const newUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`, 
    request.url
  );
  
  // 保留原始URL的查询参数
  newUrl.search = request.nextUrl.search;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // 匹配所有路径，但排除 /_next 和 /api 路由
    '/((?!_next|api).*)',
  ],
}; 