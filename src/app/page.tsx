export const dynamic = 'force-static';

import HomePageClient from '@/components/HomePageClient';

export default async function RootPage() {
  const messages = (await import('../messages/ro.json')).default as any;
  const data = messages.home || {};
  return <HomePageClient data={data} />;
}