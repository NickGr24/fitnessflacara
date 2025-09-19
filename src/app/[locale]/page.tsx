import HomePageClient from '@/components/HomePageClient';

export default async function LocaleHome({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  let messages: any = {};
  try {
    const messageModule = await import(`../../messages/${locale}.json`);
    messages = messageModule.default;
  } catch (error) {
    const fallback = await import(`../../messages/ro.json`);
    messages = fallback.default;
  }

  const data = messages.home || {};
  return <HomePageClient data={data} />;
}


