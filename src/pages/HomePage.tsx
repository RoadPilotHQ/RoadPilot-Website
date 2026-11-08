import { Layout } from '../components/Layout';
import { useI18n } from '../i18n';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Community } from '../sections/Community';
import { DownloadSection } from '../sections/DownloadSection';
import { Faq } from '../sections/Faq';
import { Features } from '../sections/Features';
import { Games } from '../sections/Games';
import { Hero } from '../sections/Hero';
import { Principles } from '../sections/Principles';
import { Roadmap } from '../sections/Roadmap';

export function HomePage() {
  const { t } = useI18n();
  useDocumentMeta(t.meta.homeTitle, t.meta.homeDescription);
  return (
    <Layout isHome>
      <Hero />
      <Principles />
      <Features />
      <Games />
      <Roadmap />
      <DownloadSection />
      <Faq />
      <Community />
    </Layout>
  );
}
