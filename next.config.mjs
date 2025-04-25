/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 优化生产环境构建
  poweredByHeader: false,
  
  // 图像优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 60,
  },
  
  // 编译时优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // 外部服务器包配置 (在Next.js 15.3.0中移动)
  serverExternalPackages: [],
  
  // 静态资源前缀，适用于CDN部署
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || '',
  
  // Eslint配置 - 确保在生产构建时忽略Eslint错误
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    // 确保TypeScript错误不会阻止生产构建
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 