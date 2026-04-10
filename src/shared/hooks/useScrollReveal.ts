// shared/hooks/useScrollReveal.ts
import { useEffect } from "react";
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
        // Если iOS, просто выходим, не создавая Observer
        if (isIOS()) {
            // Опционально: можно сразу добавить класс animate-in ко всем элементам,
            // чтобы они были видны сразу без анимации появления
            const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
            elements.forEach(el => {
                el.classList.add(styles['animate-in']);
                el.classList.remove(styles['animate-out']);
            });
            return;
        }

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
                    // Опционально: перестать следить за элементом после появления, чтобы улучшить производительность
                    // observer.unobserve(entry.target); 
                } else {
                    // Если нужно, чтобы анимация сбрасывалась при уходе со страницы
                    entry.target.classList.remove(styles['animate-in']);
                    entry.target.classList.add(styles['animate-out']);
                }
            });
        }, observerOptions);

        // Небольшая задержка, чтобы DOM точно отрисовался
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
            elements.forEach((el) => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);
};

export default useScrollReveal;