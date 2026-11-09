import { Layout } from '../components/Layout';
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
  useDocumentMeta('home');
  return (
    <Layout page="home">
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
