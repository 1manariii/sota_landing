// shared/hooks/useScrollReveal.ts
import { useEffect } from "react";
// Путь должен вести к файлу стилей КОМПОНЕНТА Process, так как именно там теперь лежат классы
import styles from '../../widgets/franchise-landing/Franchise.module.scss'; 

const useScrollReveal = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Используем styles['animate-in'] из локального модуля
                    entry.target.classList.add(styles['animate-in']);
                    entry.target.classList.remove(styles['animate-out']);
                } else {
                    entry.target.classList.remove(styles['animate-in']);
                    entry.target.classList.add(styles['animate-out']);
                }
            });
        }, observerOptions);

        const timer = setTimeout(() => {
            // Ищем элементы по классу из локального модуля
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