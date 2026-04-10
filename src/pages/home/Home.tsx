
import { Footer } from '../../widgets/footer/Footer.widget';
import { Header } from '../../widgets/header/Header.widget';
import { HeroBanner } from '../../widgets/hero-banner/HeroBanner.widget';
import { MapProducts } from '../../widgets/map-section/MapSection.widget';
import { RentSteps } from '../../widgets/rent-steps/RentSteps';
import { TeamSection } from '../../widgets/team-section/TeamSection';
import './Home.module.scss';

// import { FranchiseReviews } from '../../widgets/franchise-reviews/FranchiseReviews';
// import { InvestmentProducts } from '../../widgets/investment-products/InvestmentProducts.widgets';

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <HeroBanner />
        <RentSteps />
        {/* <AboutSection /> */}
        <MapProducts />
        {/*<InvestmentProducts />*/}
        {/*<FranchiseReviews />*/}
        {/* <FaqSection /> */}
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};