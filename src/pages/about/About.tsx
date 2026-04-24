// src/pages/About/About.tsx
import { useState, useEffect } from 'react';
import styles from './About.module.scss';
import { Header } from '../../widgets/header/Header.widget';
import { Footer } from '../../widgets/footer/Footer.widget';
import { photo1, photo2, photo4, photo3 } from '../../shared/assets';
import TechSupportButton from '../../widgets/tech-support-button/TechSupportButton.widget';
import ScrollToTopButton from '../../widgets/scroll-to-top-button/ScrollToTopButton.widget';

// === Типы данных ===
interface Employee {
    id: number;
    name: string;
    role: string;
    subRole?: string;
    photo: string;
    bio: string;
    responsibilities?: string[];
    social?: { telegram?: string; vk?: string; email?: string };
}

// interface CompanyStats {
//     label: string;
//     value: string;
//     icon?: string;
// }

// === Данные: статистика компании ===
// const COMPANY_STATS: CompanyStats[] = [
//     { label: 'Лет на рынке', value: '5+', icon: '🚀' },
//     { label: 'Постаматов', value: '500+', icon: '📦' },
//     { label: 'Партнёров', value: '1200+', icon: '🤝' },
//     { label: 'Городов', value: '45', icon: '🌍' },
// ];

// === Данные: команда (4 человека) ===
const EMPLOYEES: Employee[] = [
    {
        id: 1,
        name: 'Владислав',
        role: 'Генеральный директор & Сооснователь',
        photo: photo1,
        bio: 'Более 8 лет в IT. Последние 5 лет занимается развитием, улучшением и продвижением IT-продуктов. За последние 2 года удалось создать устойчивую модель бизнеса 3х IT-продуктов с суммарным объемом выручки более 500 млн руб/год.',
        responsibilities: [
            'В рамках развития продукта прокат совместно с командой пришёл к идее создания сервиса СОТА БОКС'
        ],
        social: { telegram: '@vladiavelly', email: 'teterskiy.vs@sotamail.ru' }
    },
    {
        id: 2,
        name: 'Вадим',
        role: 'Операционный директор & Сооснователь',
        photo: photo2,
        bio: 'Амбассадор шеринг-сервисов и умного потребления. Активно изучает бизнес-аналитику и автоматизацию.',
        responsibilities: [
            'Контроль состояния и доступности товаров',
            'Обеспечение клиентского сервиса и бесперебойности процессов',
            'Повышение операционной эффективности и масштабирование'
        ],
        social: { telegram: '@vmkr96', email: "makarov.va@sotamail.ru" }
    },
    {
        id: 3,
        name: 'Айрат',
        role: 'Директор по развитию & Сооснователь',
        photo: photo3,
        bio: '11 лет работает в IT, из которых более 8 лет на руководящей должности.',
        responsibilities: [
            'Развитие партнёрской сети (франшиза)',
            'Расширение географии и точек присутствия',
            'Поиск и запуск новых направлений роста'
        ],
        social: { email: 'enikeev.am@sotamail.ru', telegram: '@enikeevvAM' }
    },
    {
        id: 4,
        name: 'Мушег',
        role: 'Технический директор',
        photo: photo4,
        bio: 'Возглавляет работу по созданию инновационных, технологичных решений, формирующих будущее шеринг-сервиса. Обладает глубокими знаниями в области разработки IT-продуктов и практическим подходом к исследованиям и разработкам.',
        responsibilities: [
            'Архитектура платформы',
            'R&D и инновации',
            'Техническая стратегия'
        ],
        social: { telegram: '@frostar', email: 'avanesov.ma@sotamail.ru' }
    },
];

// === Карточка-шестиугольник ===
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

            {/* Текст снаружи — без обрезки */}
            <div className={styles.hexName}>{employee.name}</div>
            <div className={styles.hexRoleOuter}>{employee.role.split('&')[0].trim()}</div>

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
    useEffect(() => {
        if (!employee) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [employee, onClose]);

    if (!employee) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose} aria-label="Закрыть">
                    ✕
                </button>

                <div className={styles.modalGrid}>
                    {/* Фото + имя */}
                    <div className={styles.modalPhotoSection}>
                        <div className={styles.modalPhotoWrapper}>
                            <img src={employee.photo} alt={employee.name} />
                            <div className={styles.modalPhotoHex} />
                        </div>
                        <h3 className={styles.modalName}>{employee.name}</h3>
                        <p className={styles.modalRole}>{employee.role}</p>

                        {/* Соцсети */}
                        {employee.social && (
                            <div className={styles.modalSocial}>
                                {employee.social.telegram && (
                                    <a
                                        href={`https://t.me/${employee.social.telegram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        📱 Telegram
                                    </a>
                                )}
                                {employee.social.vk && (
                                    <a
                                        href={`https://vk.com/${employee.social.vk}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
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

                    {/* Био + обязанности */}
                    <div className={styles.modalInfoSection}>
                        <h4 className={styles.modalSectionTitle}>О себе</h4>
                        <p className={styles.modalBio}>{employee.bio}</p>

                        {employee.responsibilities && employee.responsibilities.length > 0 && (
                            <>
                                {/* <h4 className={styles.modalSectionTitle}>В СОТА БОКС отвечает за</h4> */}
                                <ul className={styles.responsibilitiesList}>
                                    {employee.responsibilities.map((resp, idx) => (
                                        <li key={idx} className={styles.responsibilityItem}>
                                            <span className={styles.bullet}>•</span>
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

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

    return (
        <div className='about-page'>
            <Header />

            <section className={styles.aboutSection}>
                {/* === HERO: Миссия компании === */}
                <div className={styles.aboutHero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>О КОМПАНИИ</h1>

                        <div className={styles.missionText}>
                            <p>
                                <strong>Наша команда уверена,</strong> что будущее рынка проката — за цифровизацией привычного сервиса аренды вещей.
                                Наша цель — создать единую, унифицированную платформу аренды товаров, которая объединит предпринимателей и пользователей в одной удобной экосистеме.
                            </p>
                            <p>
                                Для предпринимателей это возможность масштабировать полезный сервис и сделать аренду доступной большему числу людей.
                                Для пользователей — простой и современный способ получить все необходимое для комфортной жизни без лишних затрат и в духе разумного потребления.
                            </p>
                            <p>
                                Аренда товаров через постаматы/ПВЗ и мобильное приложение — это не просто удобный сервис, а инструмент трансформации потребительской модели.
                                <strong> Мы верим,</strong> что именно объединение технологий, бизнеса и новой культуры потребления станет ключом к будущему индустрии проката.
                            </p>
                        </div>

                        {/* Статистика */}
                        {/* <div className={styles.statsGrid}>
                            {COMPANY_STATS.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.statCard} ${isLoaded ? styles.loaded : ''}`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <span className={styles.statIcon}>{stat.icon}</span>
                                    <span className={styles.statValue}>{stat.value}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Декоративный фон */}
                    <div className={styles.heroPattern} />
                </div>

                {/* === КОМАНДА: шестиугольники === */}
                <div className={styles.teamSection}>
                    <h2 className={styles.sectionTitle}>НАША КОМАНДА</h2>
                    <p className={styles.sectionDesc}>
                        Люди, которые делают SOTA возможной. Кликните на любого, чтобы узнать подробнее.
                    </p>

                    <div className={styles.hexGrid}>
                        {EMPLOYEES.map((employee, idx) => (
                            <HexagonCard
                                key={employee.id}
                                employee={employee}
                                onClick={() => setSelectedEmployee(employee)}
                                delay={idx * 120}
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
            <TechSupportButton />
            <ScrollToTopButton />
            <Footer />
        </div>
    );
};