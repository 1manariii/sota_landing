import { useEffect, useState } from 'react';
import { franchiseImg1, franchiseImg2, franchiseImg3 } from '../../../../shared/assets';
import styles from './styles.module.scss'
// Импортируем глобальные стили, где лежат классы анимации
import stylesScroll from '../../Franchise.module.scss' 
import useScrollReveal from '../../../../shared/hooks/useScrollReveal';

interface FeatureColumn { title: string; icon: string; items: string[]; img: string }

const FEATURE_COLUMNS: FeatureColumn[] = [
    { title: 'ЦИФРОВИЗАЦИЯ', icon: '📱', items: ['Собственное приложение', 'Прокатное ПО', 'Сайт', 'Верификация пользователя', 'Эквайринг'], img: franchiseImg1 },
    { title: 'ИНФРАСТРУКТУРА', icon: '📦', items: ['Постаматы', 'Пункты проката', 'Сервисные центры'], img: franchiseImg2 },
    { title: 'УНИФИКАЦИЯ', icon: '🔄', items: ['Приведение всех объектов инфраструктуры к единому формату', 'Стандартизация процессов', 'Единая экосистема'], img: franchiseImg3 },
];

const FeatureColumnCard: React.FC<{ column: FeatureColumn; index: number; isLoaded: boolean }> = ({ column, index, isLoaded }) => {
    return (
        // Добавлен stylesScroll.animateOnScroll для работы со скроллом
        <div className={`${styles.featureColumn} ${stylesScroll.animateOnScroll} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 150}ms` }}>
            <div className={styles.featureHeader}>
                <img className={styles.featureImg} src={column.img} alt={column.title} />
                <h3 className={styles.featureTitle}>{column.title}</h3>
            </div>
            <ul className={styles.featureList}>
                {column.items.map((item, idx) => (
                    <li key={idx} className={styles.featureItem}>
                        <span className={styles.featureBullet}>•</span>{item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Features = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Инициализируем наблюдатель скролла
    useScrollReveal();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className={`${styles.featuresSection} ${styles.glassSection}`}>
            <div className={`${styles.featuresContent} container`}>
                <h2 className={styles.sectionTitle}>ЧТО МЫ ДЕЛАЕМ ДЛЯ ПОКРЫТИЯ И УВЕЛИЧЕНИЯ ЭТОГО ПОКАЗАТЕЛЯ?</h2>
                
                <div className={styles.featuresGrid}>
                    {FEATURE_COLUMNS.map((column, index) => (
                        <FeatureColumnCard 
                            key={column.title} 
                            column={column} 
                            index={index} 
                            isLoaded={isLoaded} 
                        />
                    ))}
                </div>

                {/* Блок с долей рынка тоже можно анимировать, если нужно */}
                <div className={`${styles.marketShare} ${stylesScroll.animateOnScroll}`}>
                    <div className={styles.shareLabel}>33%</div>
                    <div className={styles.shareText}>наш целевой сегмент рынка</div>
                </div>
            </div>
        </section>
    )
}

export default Features