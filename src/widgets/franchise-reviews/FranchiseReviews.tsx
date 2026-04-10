import { useState, useEffect, useRef } from 'react';
import styles from './FranchiseReviews.module.scss';
import { photo1 } from '../../shared/assets';

// ... (REVIEWS массив без изменений)
const REVIEWS = [
  {
    id: 1,
    type: 'box', 
    color: '#FF6B00', 
    image: photo1, 
    author: 'Александр М.',
    city: 'Москва',
    reviewText: 'Установил СОТА БОКС в ТЦ рядом с домом. Окупился за 14 месяцев! Пассивный доход реально работает, обслуживаю раз в неделю.',
    franchiseTitle: 'СОТА БОКС',
    franchiseDesc: 'Готовый бизнес под ключ',
    stats: [
      { label: 'Доход', value: 'до 50 000 ₽/мес' },
      { label: 'Ячеек', value: '150 шт' }
    ]
  },
  {
    id: 2,
    type: 'cell',
    color: '#FF9E00', 
    image: photo1, 
    author: 'Елена С.',
    city: 'Санкт-Петербург',
    reviewText: 'Не была готова покупать целый постамат. Купила 5 ячеек в чужом боксе. Отличный старт для тестирования ниши!',
    franchiseTitle: 'СОТА ЯЧЕЙКА',
    franchiseDesc: 'Инвестиция от 50 000 ₽',
    stats: [
      { label: 'Доход', value: 'от 20% годовых' },
      { label: 'Взнос', value: '0 руб.' }
    ]
  },
  {
    id: 3,
    type: 'box',
    color: '#E65C00', 
    image: photo1, 
    author: 'Дмитрий К.',
    city: 'Казань',
    reviewText: 'Разместил в коворкинге. Студенты и фрилансеры постоянно берут технику в аренду. Лучшее вложение этого года.',
    franchiseTitle: 'СОТА БОКС',
    franchiseDesc: 'Автономный пункт выдачи',
    stats: [
      { label: 'Окупаемость', value: '12-18 мес' },
      { label: 'Роялти', value: '0%' }
    ]
  }
];

export const FranchiseReviews = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Отслеживаем скролл относительно секции
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Вычисляем смещение скролла относительно начала секции
        // Если секция видна, scrollY будет близок к 0, если прокрутили вниз - растет
        const relativeScroll = window.scrollY + window.innerHeight / 2 - rect.top;
        setScrollY(relativeScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>ИСТОРИИ УСПЕХА ФРАНЧАЙЗИ</h2>

        <div className={styles.cardsGrid}>
          {REVIEWS.map((item) => {
            // Генерируем уникальные соты для каждой карточки на основе ID
            // Это гарантирует, что они разные, но стабильные при перерисовке
            const honeycombs = Array.from({ length: 12 }).map((_, i) => ({
              id: `${item.id}-${i}`,
              size: Math.floor(Math.random() * 80) + 60, // Размер от 60 до 140px
              top: Math.random() * 80 + 10, // 10% - 90%
              left: Math.random() * 80 + 10,
              delay: Math.random() * 5,
              duration: Math.random() * 10 + 10,
              opacity: Math.random() * 0.5 + 0.2,
            }));

            // Параллакс коэффициент: чем больше скролл, тем сильнее движение
            const parallaxOffset = scrollY * 0.05; 

            return (
              <div
                key={item.id}
                className={`${styles.cardContainer} ${activeId === item.id ? styles.active : ''}`}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                style={{ 
                  '--card-color': item.color,
                  '--parallax-y': `${parallaxOffset}px`, // Передаем смещение в CSS
                } as React.CSSProperties}
              >
                {/* ФОНОВЫЕ СОТЫ (ДВИЖУТСЯ ПРИ СКРОЛЛЕ И АНИМАЦИИ) */}
                <div className={styles.honeycombBackground}>
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
                        // Применяем параллакс через transform
                        transform: `translateY(${parallaxOffset * (honeycomb.id.includes('box') ? 1.5 : 0.8)}px) scale(1)`,
                      }}
                    >
                      <div className={styles.cellInner}></div>
                    </div>
                  ))}
                </div>

                <div className={styles.cardInner}>
                  {/* ЛИЦЕВАЯ СТОРОНА */}
                  <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={item.author} />
                      <div className={styles.gradientOverlay}></div>
                    </div>
                    <div className={styles.reviewContent}>
                      <div className={styles.quoteIcon}>❝</div>
                      <p className={styles.reviewText}>{item.reviewText}</p>
                      <div className={styles.authorInfo}>
                        <strong>{item.author}</strong>
                        <span>{item.city}</span>
                      </div>
                      <div className={styles.hoverHint}>Наведите, чтобы узнать детали</div>
                    </div>
                  </div>

                  {/* ОБРАТНАЯ СТОРОНА (СТЕКЛО + СОТЫ) */}
                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    {/* Сохраняем фон с сотами на задней стороне, но делаем его прозрачнее */}
                    <div className={styles.backHoneycombLayer}>
                       {honeycombs.map((honeycomb) => (
                        <div
                          key={`back-${honeycomb.id}`}
                          className={styles.honeycombCell}
                          style={{
                            width: `${honeycomb.size}px`,
                            height: `${honeycomb.size * 1.1}px`,
                            top: `${honeycomb.top}%`,
                            left: `${honeycomb.left}%`,
                            animationDelay: `${honeycomb.delay}s`,
                            animationDuration: `${honeycomb.duration}s`,
                            opacity: honeycomb.opacity * 0.3, // Более прозрачные сзади
                            transform: `translateY(${parallaxOffset * 0.5}px) scale(1)`,
                          }}
                        >
                          <div className={styles.cellInner}></div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.backContent}>
                      <h3 className={styles.franchiseTitle}>{item.franchiseTitle}</h3>
                      <p className={styles.franchiseDesc}>{item.franchiseDesc}</p>

                      <div className={styles.statsList}>
                        {item.stats.map((stat, idx) => (
                          <div key={idx} className={styles.statRow}>
                            <span className={styles.statLabel}>{stat.label}:</span>
                            <span className={styles.statValue}>{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      <button className={styles.actionBtn} onClick={() => {
                        window.open('https://docs.google.com/forms/d/1V-kvVo2-4-B11L6t__o51U3nsYyrQbJ2-fhsdfmjw4A/edit')
                      }}>Стать партнером</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};