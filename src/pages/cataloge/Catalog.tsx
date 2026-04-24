import { useEffect, useRef, useState } from 'react'
import { Footer } from '../../widgets/footer/Footer.widget'
import { Header } from '../../widgets/header/Header.widget'
import './Catalog.scss'
import TechSupportButton from '../../widgets/tech-support-button/TechSupportButton.widget'
import ScrollToTopButton from '../../widgets/scroll-to-top-button/ScrollToTopButton.widget'

// Типы данных
interface Category {
    id: number;
    name: string;
    // Добавьте другие поля, если они есть в API, например image
}

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
    // Другие поля товара
}

const Catalog = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    // Состояния
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    // Состояние для хранения рандомных стилей сот (фон)
    const [honeycombs, setHoneycombs] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    // 1. Генерация сот (фон)
    useEffect(() => {
        const count = 15;
        const newHoneycombs = Array.from({ length: count }).map((_, i) => {
            const size = Math.floor(Math.random() * 60) + 80;
            const top = Math.random() * (window.innerHeight - size);
            const left = Math.random() * (window.innerWidth - size);
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;

            return {
                id: i,
                style: {
                    width: `${size}px`,
                    height: `${size * 1.1}px`,
                    top: `${top}px`,
                    left: `${left}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                }
            };
        });
        setHoneycombs(newHoneycombs);
    }, []);

    // 2. Параллакс эффект
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!contentRef.current) return;
            // Отключаем параллакс на мобильных для производительности
            if (window.innerWidth < 768) return;

            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;

            const moveX = x * 20; // Чуть уменьшил амплитуду
            const moveY = y * 20;

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

    // 3. Загрузка категорий
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://sotarental.online/api/category');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // 4. Загрузка товаров при выборе категории
    useEffect(() => {
        if (!selectedCategoryId) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            try {
                const response = await fetch(`https://sotarental.online/api/category/${selectedCategoryId}/products`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [selectedCategoryId]);

    const handleCategoryClick = (id: number) => {
        setSelectedCategoryId(prev => (prev === id ? null : id)); // Toggle или просто выбор
    };

    return (
        <div className="catalog-page">
            {/* Фон с сотами */}
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
                <div ref={contentRef} className="glass-content">

                    {/* Секция выбора категорий */}
                    <div className="catalog-header">
                        <h1 className="page-title">Каталог аренды</h1>

                        <div className="categories-list">
                            {categories.length > 0 ? (
                                categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`category-btn ${selectedCategoryId === cat.id ? 'active' : ''}`}
                                        onClick={() => handleCategoryClick(cat.id)}
                                    >
                                        {cat.name}
                                    </button>
                                ))
                            ) : (
                                <span className="loading-text">Загрузка категорий...</span>
                            )}
                        </div>
                    </div>

                    {/* Секция отображения контента */}
                    <div className="catalog-body">
                        {!selectedCategoryId ? (
                            <div className="empty-state">
                                <p>Выберите категорию, чтобы увидеть доступные товары</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {isLoadingProducts ? (
                                    <div className="loader">Загрузка товаров...</div>
                                ) : products.length > 0 ? (
                                    products.map(product => (
                                        <div key={product.id} className="product-card">
                                            {product.image && (
                                                <div className="product-image-wrapper">
                                                    <img src={'https://sotarental.online/' + product.image} alt={product.name} />
                                                </div>
                                            )}
                                            <div className="product-info">
                                                <h3>{product.name}</h3>
                                                <p className="product-price">{product.price} ₽</p>
                                                {product.description && (
                                                    <p className="product-desc">{product.description}</p>
                                                )}
                                                <button className="rent-btn" onClick={() => {
                                                    window.open(`https://sotarental.online/product/${product.id}`)
                                                }}>Арендовать</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>В этой категории пока нет товаров</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <TechSupportButton />
            <ScrollToTopButton />
            <Footer />
        </div>
    )
}

export default Catalog

{/* <div className='glass-wrapper'>
                <div ref={contentRef} className="glass-content" data-speed="0.8">
                    <h1 className="development-title">Страница в разработке</h1>
                    <p className="development-subtitle">Мы работаем над улучшением каталога. Скоро здесь появится что-то интересное.</p>
                </div>
            </div> */}