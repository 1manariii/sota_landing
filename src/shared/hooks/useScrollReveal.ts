import { useEffect } from "react";
import styles from '../../widgets/franchise-landing/Franchise.module.scss'

const useScrollReveal = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px', // Срабатывает, когда элемент в центре экрана
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

        const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

export default useScrollReveal