import { useEffect, useState } from 'react';
import styles from './RentSteps.module.scss';

const steps = [
  { id: 1, title: 'Выбор', text: 'Выберите категорию' },
  { id: 2, title: 'Поиск', text: 'Найдите товар' },
  { id: 3, title: 'Инфо', text: 'Изучите условия' },
  { id: 4, title: 'Адрес', text: 'Укажите доставку' },
  { id: 5, title: 'Заказ', text: 'Подтвердите заказ' },
  { id: 6, title: 'Получение', text: 'Заберите товар' },
];

const TOTAL_STEPS = steps.length;

export const RentSteps = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(220); // Радиус по умолчанию (десктоп)

  // 1. Отслеживаем ширину экрана для смены радиуса
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setRadius(140); // Радиус для мобильных (подбери под свой дизайн: 120-160px)
      } else {
        setRadius(220); // Радиус для десктопа
      }
    };

    // Запускаем проверку при загрузке
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Автоматическое переключение
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL_STEPS);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.rentStepsSection} id="instructions">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Как арендовать товар?</h2>
        
        <div className={styles.hexagonContainer}>
          <div className={styles.centerRing}></div>

          {steps.map((step, index) => {
            const baseAngle = (index * 360) / TOTAL_STEPS;
            const rotationOffset = activeIndex * -60;
            const totalAngle = baseAngle + rotationOffset;
            
            const radian = (totalAngle * Math.PI) / 180;
            
            // 3. Используем динамический radius из стейта
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            const normalizedAngle = ((totalAngle % 360) + 360) % 360;
            const isActive = normalizedAngle < 30 || normalizedAngle > 330;
            
            return (
              <div
                key={step.id}
                className={`${styles.hexagonWrapper} ${isActive ? styles.active : ''}`}
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                  '--scale': isActive ? '1.2' : '0.9',
                  '--z-index': isActive ? '10' : '1',
                  '--opacity': isActive ? '1' : '0.7',
                } as React.CSSProperties}
              >
                <div className={styles.hexagon}>
                  <div className={styles.hexagonInner}>
                    <span className={styles.stepNumber}>{step.id}</span>
                    <span className={styles.stepText}>{step.title}</span>
                  </div>
                </div>
                <div className={styles.tooltip}>
                  {step.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};