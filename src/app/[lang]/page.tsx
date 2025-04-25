import HomePage from "../../components/HomePage";
import { getLocaleFromRouteProps } from "../../i18n/route-utils";

export default async function Home(props: {
  params: { lang: string };
}) {
  // 使用集中工具函数获取有效的语言代码，并且等待结果
  const lang = await getLocaleFromRouteProps(props);
  
  return <HomePage lang={lang} />;
} 