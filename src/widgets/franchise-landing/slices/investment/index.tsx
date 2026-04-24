import { type FC } from 'react';
import styles from './styles.module.scss';
import imgBox from '../../../../shared/assets/sota-box.png';

interface MetricItem {
    label: string;
    value: string;
    sublabel?: string;
    icon?: React.ReactNode;
}

const INVESTMENT_METRICS: MetricItem[] = [
    { 
        label: 'Средняя окупаемость', 
        value: '18 МЕСЯЦЕВ', 
        sublabel: 'Средний срок возврата инвестиций',
        icon: <span className={styles.iconCheck}>✓</span>
    },
    { 
        label: 'Ср. выручка в мес.', 
        value: '> 35 000 ₽', 
        sublabel: 'Стабильный денежный поток'
    },
    { 
        label: 'Инвестиции', 
        value: '500 000 ₽', 
        sublabel: 'Старт бизнеса под ключ'
    },
    { 
        label: 'Выручка', 
        value: 'С 1-го месяца', 
        sublabel: 'Начинайте зарабатывать сразу'
    },
    { 
        label: 'Срок изготовления', 
        value: '45 дней', 
        sublabel: 'Быстрая установка постамата'
    },
];

const MetricCard: React.FC<{ item: MetricItem; index: number }> = ({ item, index }) => {
    return (
        <div className={`${styles.metricCard} ${index === 0 ? styles.highlight : ''}`}>
            {item.icon && <div className={styles.cardIcon}>{item.icon}</div>}
            <div className={styles.metricValue}>{item.value}</div>
            <div className={styles.metricLabel}>{item.label}</div>
            {item.sublabel && <div className={styles.metricSublabel}>{item.sublabel}</div>}
        </div>
    );
};

const Investment: FC = () => {
    return (
        <section className={styles.investmentSection}>
            <div className={`${styles.investmentContent} container`}>
                <h2 className={styles.sectionTitle}>ЧТО ПРЕДЛАГАЕМ ВАМ?</h2>
                
                <div className={styles.investmentGrid}>
                    {/* Левая часть: Визуализация постамата */}
                    <div className={styles.postamatVisualWrapper}>
                        <div className={styles.postamatVisual}>
                            <img src={imgBox} alt="SOTA Box" className={styles.boxImage} />
                            <div className={styles.visualBadge}>
                                <span className={styles.badgeText}>Умный шеринг у дома</span>
                            </div>
                        </div>
                    </div>

                    {/* Правая часть: Статистика и график */}
                    <div className={styles.metricsContainer}>
                        <div className={styles.mainHighlight}>
                            <div className={styles.highlightCard}>
                                <div className={styles.highlightValue}>18</div>
                                <div className={styles.highlightLabel}>месяцев</div>
                                <div className={styles.highlightSublabel}>средняя окупаемость</div>
                            </div>
                            <div className={styles.graphPlaceholder}>
                                {/* Здесь можно добавить SVG график или просто стильную линию */}
                                <div className={styles.graphLine}></div>
                            </div>
                        </div>

                        <div className={styles.secondaryMetricsGrid}>
                            {INVESTMENT_METRICS.slice(1).map((item, index) => (
                                <MetricCard key={item.label} item={item} index={index + 1} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Investment;