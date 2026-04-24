import { type FC, useState } from 'react';
import styles from './styles.module.scss';
import img1 from '../../../../shared/assets/pie-chart-img1.png';
import img2 from '../../../../shared/assets/pie-chart-img2.png';
import img3 from '../../../../shared/assets/pie-chart-img3.png';
import img4 from '../../../../shared/assets/pie-chart-img4.png';

interface MarketStat { year: string; value: string; growth?: string; }
interface MarketSegment { label: string; percentage: string; color: string; image?: string; name?: string; description?: string; }

const MARKET_STATS: MarketStat[] = [
    { year: '2022', value: '125 МЛРД ₽' }, 
    { year: '2023', value: '160 МЛРД ₽' },
    { year: '2024', value: '200 МЛРД ₽' }, 
    { year: '2025', value: '240 МЛРД ₽' },
];

// Обновленные данные сегментов с картинками и описанием
const PIE_CHART_ITEMS = [
    {
        img: img1,
        name: 'Оборудование для мероприятий',
        precent: 10,
        desc: 'Профессиональное оборудование для концертов, выставок и корпоративных событий.'
    },
    {
        img: img2,
        name: 'Строительный инструмент, техника, туризм',
        precent: 33,
        desc: 'Широкий спектр инструментов для ремонта, бытовой техники и снаряжения для активного отдыха.'
    },
    {
        img: img3,
        name: 'Аренда транспорта',
        precent: 50,
        desc: 'Автомобили, мотоциклы, катера и другие виды транспорта для ваших поездок.'
    },
    {
        img: img4,
        name: 'Шеринг Самокатов',
        precent: 7,
        desc: 'Экологичный и быстрый способ передвижения по городу в любое время суток.'
    }
];

const MARKET_SEGMENTS: MarketSegment[] = [
    { label: 'Прокат инструментов', percentage: '50%', color: '#FF6B00', ...PIE_CHART_ITEMS[1] }, // Map index 1 to segment 0 for logic if needed, but here we map directly
    { label: 'Шеринг электроники', percentage: '33%', color: '#FF8533', ...PIE_CHART_ITEMS[2] }, // Adjust mapping based on your data structure
    { label: 'Аренда техники', percentage: '10%', color: '#FFA366', ...PIE_CHART_ITEMS[0] },
    { label: 'Другое', percentage: '7%', color: '#FFC199', ...PIE_CHART_ITEMS[3] },
];

// Временная маппинг данных, чтобы соответствовать порядку в MARKET_SEGMENTS (для примера)
// В реальном проекте лучше использовать ID или уникальный ключ
const SEGMENT_DATA_MAP: Record<string, any> = {
    'Прокат инструментов': PIE_CHART_ITEMS[1],
    'Шеринг электроники': PIE_CHART_ITEMS[2],
    'Аренда техники': PIE_CHART_ITEMS[0],
    'Другое': PIE_CHART_ITEMS[3],
};

const MarketStatCard: React.FC<{ stat: MarketStat; index: number }> = ({ stat, index }) => {
    const newIndex = index === 0 ? 0.6 : index;
    const height = 120 + (newIndex * 40);
    return (
        <div className={styles.marketStatCard} style={{ height: `${height}px` }}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statYear}>{stat.year}</div>
        </div>
    );
};

const PieChart: React.FC<{ segments: MarketSegment[]; onSliceClick: (segment: MarketSegment) => void }> = ({ segments, onSliceClick }) => {
    const radius = 0.95; // Радиус пирога (чуть меньше 1, чтобы не касалось краев viewBox -1,-1,2,2)
    
    const getCoordinatesForPercent = (percent: number) => {
        // Преобразуем процент (0..1) в угол в радианах
        // Вычитаем 0.25 (или добавляем -90 градусов), чтобы начать с верхней точки (как у часов 12:00)
        const angle = (percent - 0.25) * 2 * Math.PI;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return [x, y];
    };

    let cumulativePercent = 0;

    return (
        <div className={styles.pieChart}>
            <svg 
                viewBox="-1.2 -1.2 2.4 2.4" // Увеличиваем viewBox немного, чтобы были отступы
                className={styles.pieSvg}
            >
                {segments.map((segment, index) => {
                    const startPercent = cumulativePercent;
                    const slicePercent = parseFloat(segment.percentage) / 100;
                    cumulativePercent += slicePercent;
                    
                    // Получаем координаты начала и конца сектора
                    const [startX, startY] = getCoordinatesForPercent(startPercent);
                    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                    
                    // Флаг large-arc определяет, какую дугу рисовать (меньше или больше 180 градусов)
                    const largeArcFlag = slicePercent > 0.5 ? 1 : 0;
                    
                    // Строим путь:
                    // M 0 0 -> Двигаемся в центр
                    // L startX startY -> Линия к началу дуги
                    // A r r ... -> Рисуем дугу до конца
                    // Z -> Замыкаем путь обратно в центр
                    const pathData = [
                        `M 0 0`,
                        `L ${startX} ${startY}`,
                        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                        `Z`
                    ].join(' ');

                    return (
                        <path 
                            key={index} 
                            d={pathData} 
                            fill={segment.color} 
                            stroke="#1a1a1a" // Темная обводка для разделения секторов
                            strokeWidth="0.02" // Тонкая обводка
                            className={`${styles.pieSlice} ${styles.interactiveSlice}`}
                            onClick={() => onSliceClick(segment)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Выбрать сектор: ${segment.label}`}
                        />
                    );
                })}
                
                {/* Центральная надпись */}
                <text 
                    x="0" 
                    y="0" 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    fill="white" 
                    fontSize="0.15" 
                    fontWeight="bold"
                    pointerEvents="none"
                    style={{ userSelect: 'none' }}
                >
                    Клик!
                </text>
            </svg>
        </div>
    );
};

const MarketHero: FC = () => {
    const [selectedSegment, setSelectedSegment] = useState<MarketSegment | null>(null);

    const handleSliceClick = (segment: MarketSegment) => {
        setSelectedSegment(segment);
    };

    const handleClose = () => {
        setSelectedSegment(null);
    };

    const activeData = selectedSegment ? SEGMENT_DATA_MAP[selectedSegment.label] || PIE_CHART_ITEMS.find(i => i.name === selectedSegment.label) : null;

    return (
        <section className={styles.marketHero}>
            <div className={`${styles.heroContent} container`}>
                <h1 className={styles.heroTitle}>
                    РЫНОК ШЕРИНГА РАСТЕТ КАЖДЫЙ ГОД<br />
                    <span className={styles.heroHighlight}>В СРЕДНЕМ НА 25%</span>
                </h1>
                
                <div className={styles.marketStats}>
                    {MARKET_STATS.map((stat, index) => (
                        <MarketStatCard key={stat.year} stat={stat} index={index} />
                    ))}
                    <div className={styles.forecastCard}>
                        <div className={styles.forecastValue}>300 МЛРД ₽</div>
                        <div className={styles.forecastLabel}>ПРОГНОЗ 2026</div>
                        <div className={styles.rocket}>🚀</div>
                    </div>
                </div>

                <div className={styles.marketChartWrapper}>
                    <div className={styles.marketChart}>
                        <PieChart segments={MARKET_SEGMENTS} onSliceClick={handleSliceClick} />
                    </div>

                    {/* Интерактивная панель информации */}
                    <div className={`${styles.infoPanel} ${selectedSegment ? styles.active : ''}`}>
                        {activeData && (
                            <>
                                <button className={styles.closeBtn} onClick={handleClose}>✕</button>
                                <div className={styles.infoImageWrapper}>
                                    <img src={activeData.img} alt={activeData.name} className={styles.infoImage} />
                                </div>
                                <div className={styles.infoContent}>
                                    <h3 className={styles.infoTitle}>{activeData.name}</h3>
                                    <p className={styles.infoDesc}>{activeData.desc}</p>
                                    <div className={styles.infoPercentage}>Доля рынка: {selectedSegment?.percentage}</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketHero;