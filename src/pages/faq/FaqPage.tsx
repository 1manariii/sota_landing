import FaqLanding from "../../widgets/faq-landing/FaqLanding.widget"
import { Footer } from "../../widgets/footer/Footer.widget"
import { Header } from "../../widgets/header/Header.widget"
import ScrollToTopButton from "../../widgets/scroll-to-top-button/ScrollToTopButton.widget"
import TechSupportButton from "../../widgets/tech-support-button/TechSupportButton.widget"


const FaqPage = () => {
    return (
        <div className="home-page">
            <Header />
            <main>
                <FaqLanding />
            </main>
            <TechSupportButton />
            <ScrollToTopButton />
            <Footer />
        </div>
    )
}

export default FaqPage;
