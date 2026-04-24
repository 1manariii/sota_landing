import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.scss';

// Иконка стрелки вверх (можно заменить на img или SVG из ваших ассетов)
const ArrowUpIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Проверяем, насколько пользователь прокрутил страницу вниз
            // window.innerHeight - высота окна браузера
            // document.documentElement.scrollTop - текущая прокрутка
            // document.documentElement.scrollHeight - полная высота документа
            
            // Показываем кнопку, если пользователь прокрутил более 80% страницы
            // или если до конца страницы осталось меньше 300 пикселей
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (documentHeight > windowHeight && (scrollPosition + windowHeight >= documentHeight - 300)) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    };

    if (!isVisible) return null;

    return (
        <button 
            className={styles.scrollToTopBtn} 
            onClick={scrollToTop}
            aria-label="Вернуться наверх"
        >
            <ArrowUpIcon />
        </button>
    );
};

export default ScrollToTopButton;