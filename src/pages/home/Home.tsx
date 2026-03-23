
import { AboutSection } from '../../widgets/about-block/AboutBlock.widget';
import { CatalogCarousel } from '../../widgets/catalog-carousel/CatalogCarousel.widget';
import { FaqSection } from '../../widgets/faq-section/FaqSection.widget';
import { Footer } from '../../widgets/footer/Footer.widget';
import { FranchiseReviews } from '../../widgets/franchise-reviews/FranchiseReviews';
import { Header } from '../../widgets/header/Header.widget';
import { HeroBanner } from '../../widgets/hero-banner/HeroBanner.widget';
import { Instructions } from '../../widgets/instrictions/Instructions.widget';
import { InvestmentProducts } from '../../widgets/investment-products/InvestmentProducts.widgets';
import { MapProducts } from '../../widgets/map-section/MapSection.widget';
import { RentSteps } from '../../widgets/rent-steps/RentSteps';
import { TeamSection } from '../../widgets/team-section/TeamSection';
import './Home.module.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <HeroBanner />
        <RentSteps />
        {/* <AboutSection /> */}
        <MapProducts />
        <InvestmentProducts />
        <FranchiseReviews />
        {/* <FaqSection /> */}
        <TeamSection />
        {/* Декоративные элементы (соты) */}
        <img src="/assets/sota-1.png" className="decor sota-1" alt="" />
        <img src="/assets/sota-2.png" className="decor sota-2" alt="" />
        <img src="/assets/sota-3.png" className="decor sota-3" alt="" />
      </main>
      <Footer />
    </div>
  );
};