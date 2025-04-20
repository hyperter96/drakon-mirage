import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-foreground relative overflow-hidden">
      {/* 龙影背景元素 */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/dragon-bg.svg" // 使用我们创建的SVG
          alt="Dragon Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* 浮动的宝藏元素 */}
      <div className="absolute top-1/4 right-10 animate-float hidden lg:block">
        <Image
          src="/treasure.svg" // 使用我们创建的SVG
          alt="Floating Treasure"
          width={120}
          height={120}
        />
      </div>
      
      <div className="absolute bottom-1/4 left-10 animate-pulse hidden lg:block">
        <Image
          src="/dragon-symbol.svg" // 使用我们创建的SVG
          alt="Dragon Symbol"
          width={150}
          height={150}
        />
      </div>

      {/* 导航栏 */}
      <nav className="w-full px-8 py-4 backdrop-blur-md bg-black/50 border-b border-gold/30 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image 
              src="/logo.svg" // 使用我们创建的SVG
              alt="龙影幻境"
              width={40}
              height={40}
            />
            <span className="text-gold text-xl font-bold">龙影幻境</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">首页</a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">游戏介绍</a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">寻宝攻略</a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">宝藏图鉴</a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">社区</a>
          </div>
          
          <button className="bg-gold/80 hover:bg-gold text-black px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105">
            立即下载
          </button>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col items-center z-10 px-6">
        <div className="mt-16 md:mt-28 text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold via-amber-300 to-gold animate-shimmer">
            龙影幻境
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            扫描现实，解锁神秘，寻找失落的龙族宝藏
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-amber-400 hover:bg-amber-400 text-black px-8 py-3 rounded-full font-medium text-lg transition-all hover:scale-105">
              开始冒险
            </button>
            <button className="border border-gold/50 text-gold hover:bg-gold/10 px-8 py-3 rounded-full font-medium text-lg transition-all">
              观看预告片
            </button>
          </div>
        </div>

        {/* 特色卡片 */}
        <div className="w-full max-w-6xl mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2 group">
            <div className="bg-black/50 p-3 rounded-lg inline-block mb-4">
              <Image
                src="/ar-icon.svg" // 使用我们创建的SVG
                alt="AR Feature"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gold mb-3 group-hover:text-amber-300">
              AR寻宝体验
            </h2>
            <p className="text-gray-300">
              通过增强现实技术，在真实世界中寻找虚拟宝藏，解开古老谜题。
            </p>
          </div>
          
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2 group">
            <div className="bg-black/50 p-3 rounded-lg inline-block mb-4">
              <Image
                src="/map-icon.svg" // 使用我们创建的SVG
                alt="Map Feature"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gold mb-3 group-hover:text-amber-300">
              龙族秘境
            </h2>
            <p className="text-gray-300">
              探索充满东方神秘色彩的龙族领地，发现隐藏在城市各处的龙影踪迹。
            </p>
          </div>
          
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2 group">
            <div className="bg-black/50 p-3 rounded-lg inline-block mb-4">
              <Image
                src="/community-icon.svg" // 使用我们创建的SVG
                alt="Community Feature"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gold mb-3 group-hover:text-amber-300">
              寻宝者联盟
            </h2>
            <p className="text-gray-300">
              加入全球寻宝者社区，组队挑战，分享发现，共同揭开龙族文明的秘密。
            </p>
          </div>
        </div>
        
        {/* 下载区域 */}
        <div className="w-full max-w-4xl my-20 bg-gradient-to-r from-black/70 via-gray-900/70 to-black/70 backdrop-blur-md rounded-2xl p-8 border border-gold/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gold mb-2">立即加入冒险</h2>
            <p className="text-gray-300 mb-6">下载应用，开启你的寻宝之旅</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center bg-black border border-gold/50 px-6 py-3 rounded-xl hover:bg-gold/10 transition-all">
                <Image
                  src="/apple-icon.svg" // 使用我们创建的SVG
                  alt="App Store"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>App Store</span>
              </button>
              
              <button className="flex items-center justify-center bg-black border border-gold/50 px-6 py-3 rounded-xl hover:bg-gold/10 transition-all">
                <Image
                  src="/google-play-icon.svg" // 使用我们创建的SVG
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
              src="/logo.svg" // 使用我们创建的SVG
              alt="龙影幻境"
              width={30}
              height={30}
            />
            <span className="text-gold text-sm">© 2023 龙影幻境 版权所有</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gold text-sm">关于我们</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm">隐私政策</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm">用户协议</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm">联系我们</a>
          </div>
        </div>
      </footer>
      
      {/* 添加一些动画粒子效果 */}
      <div className="particle-container absolute inset-0 z-0"></div>
    </main>
  );
}

// 需要在全局CSS中添加以下动画类
// .animate-float {
//   animation: float 6s ease-in-out infinite;
// }
// .animate-shimmer {
//   animation: shimmer 3s linear infinite;
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-20px); }
// }
// @keyframes shimmer {
//   0% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
