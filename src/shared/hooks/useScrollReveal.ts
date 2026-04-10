// shared/hooks/useScrollReveal.ts
import { useEffect } from "react";
// Убедитесь, что путь ведет к файлу, где определены классы .animateOnScroll, .animate-in, .loaded и т.д.
import styles from '../widgets/franchise-landing/Franchise.module.scss'; 

const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) && 
        !(window as any).MSStream
    );
};

const useScrollReveal = () => {
    useEffect(() => {
        // Находим все элементы, которые должны анимироваться
        // Используем селектор класса из вашего SCSS модуля
        const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);

        // Если это iOS — мгновенно показываем всё и выходим
        if (isIOS()) {
            elements.forEach(el => {
                // Добавляем класс, который делает элемент видимым (в вашем коде это обычно .loaded)
                el.classList.add(styles['loaded']); 
                
                // На всякий случай убираем классы скрытия, если они есть
                el.classList.remove(styles['animate-out']);
                
                // Сбрасываем инлайновые стили, если вдруг они мешают
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'none';
            });
            return; // Прерываем выполнение, Observer не создается
        }

        // --- Стандартная логика для Desktop/Android ---
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles['loaded']); // Или styles['animate-in'], смотря что у вас в CSS
                    entry.target.classList.remove(styles['animate-out']);
                } else {
                    // Опционально: убирать класс, если хотим, чтобы анимация повторялась при скролле вверх
                    // entry.target.classList.remove(styles['loaded']);
                    // entry.target.classList.add(styles['animate-out']);
                }
            });
        }, observerOptions);

        // Небольшая задержка, чтобы DOM успел отрисоваться
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