// shared/hooks/useScrollReveal.ts
import { useEffect } from "react";
// Убедитесь, что путь правильный к вашему SCSS модулю
import styles from '../../widgets/franchise-landing/Franchise.module.scss'; 

const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !(window as any).MSStream
  );
};

const useScrollReveal = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
        
        // Если iOS — сразу показываем всё без анимации и наблюдателей
        if (isIOS()) {
            elements.forEach(el => {
                el.classList.add(styles['animate-in']);
                el.classList.remove(styles['animate-out']);
                // Принудительно сбрасываем стили трансформации, если они были заданы инлайново или через другие классы
                (el as HTMLElement).style.transform = 'none';
                (el as HTMLElement).style.opacity = '1';
            });
            return;
        }

        // Логика для Desktop/Android
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles['animate-in']);
                    entry.target.classList.remove(styles['animate-out']);
                } else {
                    entry.target.classList.remove(styles['animate-in']);
                    entry.target.classList.add(styles['animate-out']);
                }
            });
        }, observerOptions);

        // Небольшая задержка для стабильности DOM
        const timer = setTimeout(() => {
            elements.forEach((el) => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);
};

export default useScrollReveal;