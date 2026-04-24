import { useEffect, useState } from 'react';
import styles from './TechSupportButton.module.scss';
import img from '../../shared/assets/new_logo.svg';

const TechSupportButton = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Используем requestAnimationFrame для оптимизации производительности
            window.requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onClick = () => {
        window.open('https://t.me/tech_support_rent', '_blank');
    };

    // Вычисляем смещение. 
    // Например, кнопка будет "уезжать" вверх медленнее, чем скроллится страница,
    // создавая эффект параллакса, или просто двигаться вместе со страницей, но с ограничением.
    // В данном примере: кнопка фиксирована, но мы добавим ей небольшую трансформацию
    // чтобы она "реагировала" на скролл (например, чуть подпрыгивала или сдвигалась).
    
    // Если вы хотите, чтобы она просто скроллилась вместе со страницей (не была fixed),
    // то нужно изменить position на absolute. Но обычно такие кнопки делают fixed.
    
    // Вариант: Кнопка всегда видна (fixed), но при скролле вниз она может немного 
    // менять прозрачность или размер, либо сдвигаться по диагонали.
    
    // Давайте сделаем так: при скролле вниз кнопка немного сдвигается вверх и вправо,
    // чтобы не мешать контенту, если он есть внизу слева.
    const moveX = Math.min(scrollY * 0.05, 20); // Сдвиг вправо максимум на 20px
    const moveY = Math.min(scrollY * 0.05, 20); // Сдвиг вверх максимум на 20px

    return (
        <button 
            className={styles.btn} 
            onClick={onClick}
            style={{
                transform: `translate(${moveX}px, -${moveY}px)`
            }}
        >
            <div className={styles.pulseRing}></div>
            <img src={img} alt="Tech Support" />
        </button>
    );
};

export default TechSupportButton;