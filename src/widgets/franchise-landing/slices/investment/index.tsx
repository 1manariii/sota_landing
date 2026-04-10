import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import useScrollReveal from '../../../../shared/hooks/useScrollReveal';

interface InvestmentMetric { label: string; value: string; sublabel?: string; highlight?: boolean; }

const INVESTMENT_METRICS: InvestmentMetric[] = [
    { label: 'Средняя окупаемость', value: '18 МЕС', highlight: true },
    { label: 'Ср. выручка в мес.', value: '> 35 000 ₽', sublabel: 'Инвестиции в быстрорастущий сервис' },
    { label: 'Инвестиции', value: '500 000 ₽' },
    { label: 'Выручка', value: 'С первого месяца', sublabel: '1' },
    { label: 'Срок изготовления', value: '45 рабочих дней' },
];

const InvestmentMetricCard: React.FC<{ metric: InvestmentMetric; index: number; isLoaded: boolean }> = ({ metric, index, isLoaded }) => {
    return (
        <div className={`${styles.investmentCard} ${metric.highlight ? styles.highlight : ''} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
            <div className={styles.investmentValue}>{metric.value}</div>
            <div className={styles.investmentLabel}>{metric.label}</div>
            {metric.sublabel && <div className={styles.investmentSublabel}>{metric.sublabel}</div>}
        </div>
    );
};

const Investment = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Инициализируем наблюдатель скролла
    useScrollReveal();

    useEffect(() => {
        setIsLoaded(true);
    }, []);
    return (
        <section className={styles.investmentSection}>
            <div className={`${styles.investmentSection} container`}>
                <h2 className={styles.sectionTitle}>ЧТО ПРЕДЛАГАЕМ ВАМ?</h2>
                <div className={styles.investmentGrid}>
                    <div className={styles.postamatVisual}>
                        <div className={styles.postamatMockup}>
                            <div className={styles.postamatScreen}><span className={styles.screenText}>СКАНИРУЙ QR</span></div>
                            <div className={styles.postamatSlots}>{[...Array(6)].map((_, i) => <div key={i} className={styles.slot} />)}</div>
                            <div className={styles.postamatLogo}>SOTA BOX</div>
                        </div>
                    </div>
                    <div className={styles.metricsContainer}>
                        <div className={styles.metricsGrid}>
                            {INVESTMENT_METRICS.map((metric, index) => (
                                <InvestmentMetricCard key={metric.label} metric={metric} index={index} isLoaded={isLoaded} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Investment;