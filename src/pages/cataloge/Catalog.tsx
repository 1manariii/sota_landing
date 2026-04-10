import { useEffect, useRef, useState } from 'react'
import { Footer } from '../../widgets/footer/Footer.widget'
import { Header } from '../../widgets/header/Header.widget'
import './Catalog.scss'

const Catalog = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    // Состояние для хранения рандомных стилей сот
    const [honeycombs, setHoneycombs] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    // Генерация сот
    useEffect(() => {
        const count = 15; // Количество сот
        const newHoneycombs = Array.from({ length: count }).map((_, i) => {
            // Рандомный размер (от 80px до 140px)
            const size = Math.floor(Math.random() * 60) + 80;
            
            // Рандомная позиция (учитываем размер, чтобы не вылезли за экран)
            const top = Math.random() * (window.innerHeight - size);
            const left = Math.random() * (window.innerWidth - size);
            
            // Рандомная задержка анимации и длительность для хаоса
            const delay = Math.random() * 10; 
            const duration = Math.random() * 10 + 10; // от 10 до 20 сек
            
            return {
                id: i,
                style: {
                    width: `${size}px`,
                    height: `${size * 1.1}px`, // Соотношение сторон шестиугольника
                    top: `${top}px`,
                    left: `${left}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                }
            };
        });
        setHoneycombs(newHoneycombs);
    }, []);

    // Параллакс эффект
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!contentRef.current) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2; 
            const y = (e.clientY / innerHeight - 0.5) * 2;
            
            const moveX = x * 30; 
            const moveY = y * 30; 

            contentRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        const handleMouseLeave = () => {
             if (contentRef.current) {
                 contentRef.current.style.transform = `translate(0px, 0px)`;
             }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="catalog-page">
            {/* Контейнер сот */}
            <div className="honeycomb-container">
                {honeycombs.map((honeycomb) => (
                    <div 
                        key={honeycomb.id} 
                        className="honeycomb-cell"
                        style={honeycomb.style}
                    >
                        <div className="cell-inner"></div>
                    </div>
                ))}
            </div>

            <Header isVisibleInitial={true} />

            <div className='glass-wrapper'>
                <div ref={contentRef} className="glass-content" data-speed="0.8">
                    <h1 className="development-title">Страница в разработке</h1>
                    <p className="development-subtitle">Мы работаем над улучшением каталога. Скоро здесь появится что-то интересное.</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Catalog