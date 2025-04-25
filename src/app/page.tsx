import { redirect } from 'next/navigation';
import { getCurrentLocale } from '../i18n/server-utils';

export default async function Home() {
  const locale = await getCurrentLocale();
  redirect(`/${locale}`);
}
