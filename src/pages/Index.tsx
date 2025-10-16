import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Catalog from '@/components/Catalog';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Catalog />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;