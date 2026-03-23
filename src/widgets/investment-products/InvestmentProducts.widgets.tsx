import { useState } from 'react';
import styles from './InvestmentProducts.module.scss';
import { invest1, invest2, invest3 } from '../../shared/assets';

// Изображения
const IMG_CELL = invest1; 
const IMG_BOX = invest2;
const IMG_POINT = invest3;

type ProductId = 'cell' | 'box' | 'point' | null;

interface ProductDetails {
  id: ProductId;
  title: string;
  mainText: string;
  subText: string;
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  zones?: string[]; // Новое поле для зон размещения
}

const productsData: Record<string, ProductDetails> = {
  cell: {
    id: 'cell',
    title: 'СОТА ЯЧЕЙКА',
    mainText: 'Приобретите ячейку в постомате СОТА БОКС и получайте ежемесячный денежный доход и пожизненную подписку на аренду товаров в СОТА БОКС.',
    subText: 'Идеально для тестирования модели проката. Если вы сомневаетесь в покупке целого постамата, покупка ячейки в СОТА БОКС — это прекрасная возможность протестировать работу сервиса.',
    features: [
      'Доходность от 20% годовых',
      'Пожизненная подписка на аренду товаров в СОТА БОКС',
      'Сертификат на владение ячейкой как материальным активом',
      'Личный кабинет франчайзи СОТА БОКС'
    ],
    // Для ячейки зоны те же, что у БОКСА, так как она находится внутри него
    zones: [
      'СУПЕРМАРКЕТЫ',
      'ПВЗ МАРКЕТПЛЕЙСОВ',
      'КОВОРКИНГИ И ОФИСЫ',
      'КАФЕ',
      'ОБЩЕСТВЕННЫЕ ПРОСТРАНСТВА',
      'СТУДЕНЧЕСКИЕ ОБЩЕЖИТИЯ',
      'ОТЕЛИ И ГОСТИНИЦЫ',
      'ТОРГОВЫЕ ЦЕНТРЫ',
      'ЖИЛЫЕ КОМПЛЕКСЫ'
    ]
  },
  box: {
    id: 'box',
    title: 'СОТА БОКС',
    mainText: 'Приобретая постомат в СОТА БОКС вы получаете ежемесячный доход до 50 тыс руб.',
    subText: 'Полноценный пункт выдачи заказов без людей. Размещение до 150 ячеек.',
    stats: [
      { label: 'Доходность', value: '35% годовых' },
      { label: 'Окупаемость', value: '18 мес.' },
      { label: 'Роялти', value: '0 руб.' },
      { label: 'Паушальный взнос', value: '0 руб.' }
    ],
    zones: [
      'СУПЕРМАРКЕТЫ',
      'ПВЗ МАРКЕТПЛЕЙСОВ',
      'КОВОРКИНГИ И ОФИСЫ',
      'КАФЕ',
      'ОБЩЕСТВЕННЫЕ ПРОСТРАНСТВА',
      'СТУДЕНЧЕСКИЕ ОБЩЕЖИТИЯ',
      'ОТЕЛИ И ГОСТИНИЦЫ',
      'ТОРГОВЫЕ ЦЕНТРЫ',
      'ЖИЛЫЕ КОМПЛЕКСЫ'
    ]
  },
  point: {
    id: 'point',
    title: 'СОТА ПОИНТ',
    mainText: 'Откройте автоматизированный пункт проката без сотрудника.',
    subText: 'Полноценный пункт выдачи заказов без людей. Размещение до 150 ячеек.',
    stats: [
      { label: 'Доходность', value: '35% годовых' },
      { label: 'Окупаемость', value: '18 мес.' },
      { label: 'Роялти', value: '0 руб.' },
      { label: 'Паушальный взнос', value: '0 руб.' }
    ],
    zones: [
      'ЖИЛЫЕ КОМПЛЕКСЫ',
      'ГОРНОЛЫЖНЫЕ КУРОРТЫ',
      'КОТЕДЖНЫЕ ПОСЕЛКИ'
    ]
  }
};

export const InvestmentProducts = () => {
  const [activeId, setActiveId] = useState<ProductId>(null);

  const activeData = activeId ? productsData[activeId] : null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>ВЫБЕРИТЕ ПРОДУКТ ИНВЕСТИЦИЙ</h2>
        
        <div className={styles.cardsGrid}>
          {/* Карточка 1: Ячейка */}
          <div 
            className={`${styles.card} ${activeId === 'cell' ? styles.active : ''}`}
            onClick={() => setActiveId('cell')}
          >
            <div className={styles.cardImage}>
              <img src={IMG_CELL} alt="Сота Ячейка" />
            </div>
            <h3 className={styles.cardTitle}>СОТА ЯЧЕЙКА</h3>
            <p className={styles.cardShortDesc}>
              Доходность - 30% годовых<br/>Окупаемость - 6 мес.
            </p>
          </div>

          {/* Карточка 2: Бокс */}
          <div 
            className={`${styles.card} ${activeId === 'box' ? styles.active : ''}`}
            onClick={() => setActiveId('box')}
          >
            <div className={styles.cardImage}>
              <img src={IMG_BOX} alt="Сота Бокс" />
            </div>
            <h3 className={styles.cardTitle}>СОТА БОКС</h3>
            <p className={styles.cardShortDesc}>
              Доходность - 35% годовых<br/>Окупаемость - 12 мес.
            </p>
          </div>

          {/* Карточка 3: Поинт */}
          <div 
            className={`${styles.card} ${activeId === 'point' ? styles.active : ''}`}
            onClick={() => setActiveId('point')}
          >
            <div className={styles.cardImage}>
              <img src={IMG_POINT} alt="Сота Поинт" />
            </div>
            <h3 className={styles.cardTitle}>СОТА ПОИНТ</h3>
            <p className={styles.cardShortDesc}>
              Доходность - 35% годовых<br/>Окупаемость - 18 мес.
            </p>
          </div>
        </div>
      </div>

      {/* Модальное окно (Bottom Sheet) */}
      {activeData && (
        <div className={styles.modalOverlay} onClick={() => setActiveId(null)}>
          <div 
            className={`${styles.modalContent} ${styles.open}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => setActiveId(null)}>
              <span>&times;</span>
            </button>
            
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitle}>{activeData.title}</h2>
              
              <p className={styles.modalMainText}>{activeData.mainText}</p>
              <p className={styles.modalSubText}>{activeData.subText}</p>

              {/* Блок преимуществ (если есть) */}
              {activeData.features && (
                <ul className={styles.featuresList}>
                  {activeData.features.map((feat, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span> {feat}
                    </li>
                  ))}
                </ul>
              )}

              {/* Блок статистики (если есть) */}
              {activeData.stats && (
                <div className={styles.statsGrid}>
                  {activeData.stats.map((stat, idx) => (
                    <div key={idx} className={styles.statItem}>
                      <span className={styles.statLabel}>{stat.label}:</span>
                      <span className={styles.statValue}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* НОВЫЙ БЛОК: Зоны размещения */}
              {activeData.zones && (
                <div className={styles.zonesSection}>
                  <h3 className={styles.zonesTitle}>ЗОНЫ РАЗМЕЩЕНИЯ</h3>
                  <div className={styles.zonesGrid}>
                    {activeData.zones.map((zone, idx) => (
                      <div key={idx} className={styles.zoneTag}>
                        <span className={styles.zoneIcon}>📍</span>
                        {zone}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};