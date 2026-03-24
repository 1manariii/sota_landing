import { useState } from 'react';
import styles from './FranchiseReviews.module.scss';
import { photo1 } from '../../shared/assets';

// Импортируй свои картинки здесь
// import photo1 from '../../shared/assets/review-1.png';
// import photo2 from '../../shared/assets/review-2.png';
// import photo3 from '../../shared/assets/review-3.png';

const REVIEWS = [
  {
    id: 1,
    type: 'box', // 'box' или 'cell'
    color: '#FF6B00', // Оранжевый для БОКСА
    image: photo1, // Замени на photo1
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
    color: '#FF9E00', // Светло-оранжевый для ЯЧЕЙКИ
    image: photo1, // Замени на photo2
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
    color: '#E65C00', // Темно-оранжевый
    image: photo1, // Замени на photo3
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
  // Состояние для отслеживания активной карточки (опционально, можно использовать только CSS hover)
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>ИСТОРИИ УСПЕХА ФРАНЧАЙЗИ</h2>

        <div className={styles.cardsGrid}>
          {REVIEWS.map((item) => (
            <div
              key={item.id}
              className={`${styles.cardContainer} ${activeId === item.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              style={{ '--card-color': item.color } as React.CSSProperties}
            >
              <div className={styles.cardInner}>

                {/* ЛИЦЕВАЯ СТОРОНА (ОТЗЫВ) */}
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

                {/* ОБРАТНАЯ СТОРОНА (ФРАНШИЗА) */}
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
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
                  {/* Декоративный элемент фона */}
                  <div className={styles.backPattern}></div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};