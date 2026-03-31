import { banner1, banner2, banner3, banner4 } from '../../shared/assets';
import { Button } from '../../shared/ui/button';
import styles from './HeroBanner.module.scss';

const backgroundImages = [
  banner1, // Замени расширения на свои (.png, .webp)
  banner2,
  banner3,
  banner4,
];

export const HeroBanner = () => {
  const handleBuyBox = () => {
    window.open('https://sotarental.online', '_blank');
  };

  return (
    <section className={styles.heroBanner}>
      {/* Фон со слайдером */}
      <div className={styles.backgroundSlider}>
        {backgroundImages.map((img, index) => (
          <div 
            key={index} 
            className={styles.slide}
            style={{ 
              backgroundImage: `url(${img})`,
              animationDelay: `${index * 5}s` // Задержка для циклической смены (каждые 5 сек)
            }}
          />
        ))}
        {/* Затемнение фона для читаемости текста */}
        <div className={styles.overlay}></div>
      </div>

      <div className={`${styles.contentWrapper}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            ВЛАДЕЙТЕ МЕНЬШИМ <br /> 
            <span className={styles.highlight}>ЖИВИТЕ ЛУЧШИМ</span>
          </h1>
          
          <p className={styles.subtitle}>
            Сервис аренды техники нового поколения. Все, что нужно, рядом с домом.
          </p>

          <div className={styles.buttonsGroup}>
            <Button onClick={handleBuyBox} variant="primary">
              Арендовать товар
            </Button>

            {/*<Button onClick={handleBuyBox} variant="outline">*/}
            {/*  КУПИТЬ СОТА БОКС*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </section>
  );
};