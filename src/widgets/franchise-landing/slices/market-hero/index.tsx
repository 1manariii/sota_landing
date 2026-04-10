import { type FC } from 'react';
import styles from './styles.module.scss'

interface MarketStat { year: string; value: string; growth?: string; }
interface MarketSegment { label: string; percentage: string; color: string; }

const MARKET_STATS: MarketStat[] = [
    { year: '2022', value: '125 МЛРД ₽' }, { year: '2023', value: '160 МЛРД ₽' },
    { year: '2024', value: '200 МЛРД ₽' }, { year: '2025', value: '240 МЛРД ₽' },
];

const MARKET_SEGMENTS: MarketSegment[] = [
    { label: 'Прокат инструментов', percentage: '50%', color: '#FF6B00' },
    { label: 'Шеринг электроники', percentage: '33%', color: '#FF8533' },
    { label: 'Аренда техники', percentage: '10%', color: '#FFA366' },
    { label: 'Другое', percentage: '7%', color: '#FFC199' },
];

const MarketStatCard: React.FC<{ stat: MarketStat; index: number; isLoaded: boolean }> = ({ stat, index, isLoaded }) => {
    const height = 120 + (index * 40);
    return (
        <div className={`${styles.marketStatCard} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 100}ms`, height: `${height}px` }}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statYear}>{stat.year}</div>
        </div>
    );
};

const PieChart: React.FC<{ segments: MarketSegment[] }> = ({ segments }) => {
    let cumulativePercent = 0;
    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };
    return (
        <div className={styles.pieChart}>
            <svg viewBox="-1 -1 2 2" className={styles.pieSvg}>
                {segments.map((segment, index) => {
                    const startPercent = cumulativePercent;
                    const slicePercent = parseFloat(segment.percentage) / 100;
                    cumulativePercent += slicePercent;
                    const [startX, startY] = getCoordinatesForPercent(startPercent);
                    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                    const largeArcFlag = slicePercent > 0.5 ? 1 : 0;
                    const pathData = [`M 0 0`, `L ${startX} ${startY}`, `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, `Z`].join(' ');
                    return <path key={index} d={pathData} fill={segment.color} className={styles.pieSlice} />;
                })}
            </svg>
            <div className={styles.pieLegend}>
                {segments.map((segment, index) => (
                    <div key={index} className={styles.pieLegendItem}>
                        <span className={styles.pieLegendDot} style={{ backgroundColor: segment.color }} />
                        <span className={styles.pieLegendText}>{segment.label}: {segment.percentage}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export interface IProps {
    isLoaded: boolean;
}

const MarketHero: FC<IProps> = ({ isLoaded = true }) => {
    return (
        <section className={styles.marketHero}>
            <div className={`${styles.heroContent} container`}>
                <h1 className={styles.heroTitle}>
                    РЫНОК ШЕРИНГА РАСТЕТ КАЖДЫЙ ГОД<br />
                    <span className={styles.heroHighlight}>В СРЕДНЕМ НА 25%</span>
                </h1>
                <div className={styles.marketStats}>
                    {MARKET_STATS.map((stat, index) => (
                        <MarketStatCard key={stat.year} stat={stat} index={index} isLoaded={isLoaded} />
                    ))}
                    <div className={`${styles.forecastCard} ${isLoaded ? styles.loaded : ''}`}>
                        <div className={styles.forecastValue}>300 МЛРД ₽</div>
                        <div className={styles.forecastLabel}>ПРОГНОЗ 2026</div>
                        <div className={styles.rocket}>🚀</div>
                    </div>
                </div>
                <div className={styles.marketChart}>
                    <PieChart segments={MARKET_SEGMENTS} />
                </div>
            </div>
        </section>
    )
}

export default MarketHero