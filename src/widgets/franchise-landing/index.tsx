import styles from './Franchise.module.scss';
import { Header } from '../../widgets/header/Header.widget';
import { Footer } from '../../widgets/footer/Footer.widget';
import MarketHero from './slices/market-hero';
import Features from './slices/features';
import Investment from './slices/investment';
import Process from './slices/process';
import Contact from './slices/contact';
// import useScrollReveal from '../../shared/hooks/useScrollReveal';

// === Вспомогательный компонент: Фоновые соты ===
const HoneycombBackground: React.FC<{ type: 'light' | 'dark' }> = ({ type }) => {
    const honeycombs = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.floor(Math.random() * 60) + 50,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 10,
        opacity: Math.random() * 0.4 + 0.1,
    }));

    const bgOpacity = type === 'dark' ? 'rgba(255, 107, 0, 0.08)' : 'rgba(255, 107, 0, 0.05)';
    const borderOpacity = type === 'dark' ? '0.3' : '0.2';
    const glowColor = type === 'dark' ? '255, 107, 0' : '255, 133, 51';

    return (
        <div className={styles.honeycombLayer}>
            {honeycombs.map((honeycomb) => (
                <div
                    key={honeycomb.id}
                    className={styles.honeycombCell}
                    style={{
                        width: `${honeycomb.size}px`,
                        height: `${honeycomb.size * 1.1}px`,
                        top: `${honeycomb.top}%`,
                        left: `${honeycomb.left}%`,
                        animationDelay: `${honeycomb.delay}s`,
                        animationDuration: `${honeycomb.duration}s`,
                        opacity: honeycomb.opacity,
                        background: bgOpacity,
                        borderColor: `rgba(${glowColor}, ${borderOpacity})`,
                        transform: `translateY(calc(var(--parallax-y, 0px) * ${type === 'dark' ? 1.5 : 0.8})) scale(1)`,
                    }}
                >
                    <div className={styles.cellInner}></div>
                </div>
            ))}
        </div>
    );
};

export const FranchiseLanding = () => {
    return (
        <div className='franchise-page'>
            <HoneycombBackground type="dark" />
            <Header />
            <MarketHero isLoaded={true} />
            <Features isLoaded={true} />
            <Investment isLoaded={true} />
            <Process isLoaded={true} />
            <Contact isLoaded={true} />
            <Footer />
        </div>
    );
};