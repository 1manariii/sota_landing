// shared/hooks/useScrollReveal.ts
import { useEffect } from "react";
import styles from '../../widgets/franchise-landing/Franchise.module.scss';

const useScrollReveal = () => {
    useEffect(() => {
        // Проверка: Мобильное устройство?
        // 1. По ширине окна (стандартная breakpoint точка для планшетов/мобилок)
        // 2. По User Agent (для надежности iOS/Android)
        const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);

        if (isMobile) {
            // === ЛОГИКА ДЛЯ МОБИЛЬНЫХ ===
            // На мобильных отключаем анимацию появления через CSS media query,
            // поэтому здесь просто не создаем Observer
            // Элементы будут видимы сразу благодаря CSS правилам
            return; 
        }

        // === ЛОГИКА ДЛЯ ДЕСКТОПА ===
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
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

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

export default useScrollReveal;