import Header from '../../components/Header';
import SmoothScroll from '../../components/smooth-scroll';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params; // Ensure Next.js 15 dynamic params contract
  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
    </SmoothScroll>
  );
}


