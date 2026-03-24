import { useState, useEffect } from 'react';
import styles from './About.module.scss';
import { Header } from '../../widgets/header/Header.widget';
import { Footer } from '../../widgets/footer/Footer.widget';
import { photo1 } from '../../shared/assets';

// === Типы данных ===
interface Employee {
    id: number;
    name: string;
    role: string;
    photo: string;
    bio: string;
    skills: string[];
    social?: { telegram?: string; vk?: string; email?: string };
}

interface CompanyStats {
    label: string;
    value: string;
    icon?: string;
}

// === Данные ===
const COMPANY_STATS: CompanyStats[] = [
    { label: 'Лет на рынке', value: '5+', icon: '🚀' },
    { label: 'Постаматов', value: '500+', icon: '📦' },
    { label: 'Партнёров', value: '1200+', icon: '🤝' },
    { label: 'Городов', value: '45', icon: '🌍' },
];

const EMPLOYEES: Employee[] = [
    {
        id: 1,
        name: 'Анна Петрова',
        role: 'Генеральный директор',
        photo: photo1,
        bio: 'Основатель компании. 10+ лет в логистике и ритейле. Верит, что технологии должны делать жизнь проще.',
        skills: ['Стратегия', 'Лидерство', 'Логистика', 'Инновации'],
        social: { telegram: '@anna_sota', email: 'anna@sota.ru' }
    },
    {
        id: 2,
        name: 'Максим Соколов',
        role: 'Технический директор',
        photo: photo1,
        bio: 'Архитектор нашей платформы. Пишет код, который работает. Любит чистый код и чёрный кофе.',
        skills: ['React', 'Node.js', 'DevOps', 'AI/ML'],
        social: { telegram: '@max_dev', vk: 'max Sokolov' }
    },
    {
        id: 3,
        name: 'Елена Волкова',
        role: 'Руководитель отдела партнёрств',
        photo: photo1,
        bio: 'Находит идеальных партнёров для нашей сети. Умеет слушать и договариваться.',
        skills: ['Переговоры', 'CRM', 'Аналитика', 'Коммуникация'],
        social: { email: 'elena@sota.ru' }
    },
    {
        id: 4,
        name: 'Дмитрий Козлов',
        role: 'Ведущий дизайнер',
        photo: photo1,
        bio: 'Создаёт интерфейсы, в которые влюбляются. Считает, что красота должна быть функциональной.',
        skills: ['UI/UX', 'Figma', 'Motion', 'Брендинг'],
        social: { telegram: '@dim_design' }
    },
    {
        id: 5,
        name: 'Ольга Новикова',
        role: 'Менеджер по качеству',
        photo: photo1,
        bio: 'Следит, чтобы каждый постамат работал как часы. Перфекционист с большим сердцем.',
        skills: ['QA', 'Процессы', 'Поддержка', 'Обучение'],
        social: { email: 'olga@sota.ru' }
    },
    {
        id: 6,
        name: 'Иван Морозов',
        role: 'Разработчик backend',
        photo: photo1,
        bio: 'Делает так, чтобы сервера не падали, а данные летали. Тихий герой нашей инфраструктуры.',
        skills: ['Python', 'PostgreSQL', 'Redis', 'Docker'],
        social: { telegram: '@ivan_py' }
    },
];

// В компоненте HexagonCard
const HexagonCard: React.FC<{
    employee: Employee;
    onClick: () => void;
    delay?: number;
}> = ({ employee, onClick, delay = 0 }) => {
    return (
        <button
            className={styles.hexCard}
            onClick={onClick}
            style={{ animationDelay: `${delay}ms` }}
            aria-label={`Подробнее о ${employee.name}`}
        >
            {/* Шестиугольник с фото */}
            <div className={styles.hexInner}>
                <div className={styles.hexPhoto}>
                    <img src={employee.photo} alt={employee.name} loading="lazy" />
                    <div className={styles.hexOverlay}>
                        <span className={styles.hexRole}>Клик!</span>
                    </div>
                </div>
            </div>
            
            {/* ✅ Текст снаружи — без обрезки */}
            <div className={styles.hexName}>{employee.name}</div>
            <div className={styles.hexRoleOuter}>{employee.role}</div>
            
            {/* Декоративная рамка-свечение */}
            <div className={styles.hexGlow} />
        </button>
    );
};

// === Модальное окно сотрудника ===
const EmployeeModal: React.FC<{
    employee: Employee | null;
    onClose: () => void;
}> = ({ employee, onClose }) => {
    // Закрытие по Escape
    useEffect(() => {
        if (!employee) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden'; // Блок скролла

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [employee, onClose]);

    if (!employee) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()} // Чтобы клик внутри не закрывал модалку
            >
                <button className={styles.modalClose} onClick={onClose} aria-label="Закрыть">
                    ✕
                </button>

                <div className={styles.modalGrid}>
                    {/* Фото + имя */}
                    <div className={styles.modalPhotoSection}>
                        <div className={styles.modalPhotoWrapper}>
                            <img src={employee.photo} alt={employee.name} />
                            {/* Шестиугольная рамка вокруг фото */}
                            <div className={styles.modalPhotoHex} />
                        </div>
                        <h3 className={styles.modalName}>{employee.name}</h3>
                        <p className={styles.modalRole}>{employee.role}</p>

                        {/* Соцсети */}
                        {employee.social && (
                            <div className={styles.modalSocial}>
                                {employee.social.telegram && (
                                    <a href={`https://t.me/${employee.social.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                        📱 Telegram
                                    </a>
                                )}
                                {employee.social.vk && (
                                    <a href={`https://vk.com/${employee.social.vk}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                        💬 VK
                                    </a>
                                )}
                                {employee.social.email && (
                                    <a href={`mailto:${employee.social.email}`} className={styles.socialLink}>
                                        ✉️ Email
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Био + навыки */}
                    <div className={styles.modalInfoSection}>
                        <h4 className={styles.modalSectionTitle}>О себе</h4>
                        <p className={styles.modalBio}>{employee.bio}</p>

                        <h4 className={styles.modalSectionTitle}>Навыки</h4>
                        <div className={styles.skillsList}>
                            {employee.skills.map((skill, idx) => (
                                <span key={idx} className={styles.skillTag} style={{ animationDelay: `${idx * 50}ms` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <button className={styles.modalCTA} onClick={onClose}>
                            Вернуться к команде
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// === Основной компонент страницы ===
export const About = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Триггер анимации появления после монтирования
        setIsLoaded(true);
    }, []);

    return (
        <div className='about-page'>
            <Header />
            <section className={styles.aboutSection}>
                {/* === HERO: О компании === */}
                <div className={styles.aboutHero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>О КОМПАНИИ</h1>
                        <p className={styles.heroSubtitle}>
                            Мы создаём умные решения для логистики последнего метра.
                            Наша миссия — сделать получение посылок таким же простым, как чашка кофе.
                        </p>

                        {/* Статистика */}
                        <div className={styles.statsGrid}>
                            {COMPANY_STATS.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={styles.statCard}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <span className={styles.statIcon}>{stat.icon}</span>
                                    <span className={styles.statValue}>{stat.value}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Декоративный фон */}
                    <div className={styles.heroPattern} />
                </div>

                {/* === КОМАНДА: шестиугольники === */}
                <div className={styles.teamSection}>
                    <h2 className={styles.sectionTitle}>НАША КОМАНДА</h2>
                    <p className={styles.sectionDesc}>
                        Люди, которые делают СОТА возможной. Кликните на любого, чтобы узнать подробнее.
                    </p>

                    <div className={styles.hexGrid}>
                        {EMPLOYEES.map((employee, idx) => (
                            <HexagonCard
                                key={employee.id}
                                employee={employee}
                                onClick={() => setSelectedEmployee(employee)}
                                delay={idx * 100} // Staggered animation
                            />
                        ))}
                    </div>
                </div>

                {/* === МОДАЛЬНОЕ ОКНО === */}
                <EmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />

                {/* === ФОНОВЫЕ АНИМАЦИИ === */}
                <div className={`${styles.floatingHex} ${styles.hex1}`} />
                <div className={`${styles.floatingHex} ${styles.hex2}`} />
                <div className={`${styles.floatingHex} ${styles.hex3}`} />
            </section>
            <Footer />
        </div>
    );
};