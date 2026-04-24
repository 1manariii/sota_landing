import { Link, useLocation } from 'react-router';
import { useEffect, useState, type FC } from 'react';
import { useMobileMenu } from '../../features/mobile-menu/useMobileMenu';
import { useAnchorScroll } from '../../features/anchor-scroll/useAnchorScroll';
import { openBot } from '../../features/open-bot/openSotaBot';
import { handleAnchorClick } from '../../shared/utils/scrollToSection';
import { logo } from '../../shared/assets';
import { Button } from '../../shared/ui/button';
import styles from './Header.module.scss';

interface IProps {
  isVisibleInitial?: boolean;
}

export const Header: FC<IProps> = ({ isVisibleInitial = false }) => {
  const { isOpen, toggle, close } = useMobileMenu();
  const location = useLocation();

  // 🔹 Инициализируем состояние переданным значением
  const [isVisible, setIsVisible] = useState(isVisibleInitial);

  useAnchorScroll(80);

  // ✅ ЛОГИКА ПРОКРУТКИ ВВЕРХ ПРИ ПЕРЕХОДЕ НА НОВУЮ СТРАНИЦУ
  useEffect(() => {
    // Проверяем, не является ли текущий путь якорной ссылкой (содержит #)
    // Если нет — скроллим вверх
    if (!location.pathname.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.state]); // Перезапуск при смене пути или состояния навигации

  // 🔹 Отслеживаем скролл
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (isVisibleInitial) {
            setIsVisible(true);
          } else {
            if (currentScrollY > 50 || isOpen) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, isVisibleInitial]);

  const navLinks = [
    { href: '/#instructions', label: 'Как арендовать' },
    { href: '/#map', label: 'Карта' },
    { href: '/about', label: 'Команда' },
    { href: '/franchise', label: 'Франчайзи' },
    
    { href: '/catalog', label: 'Каталог' },
    { href: '#footer', label: 'Контакты' },
    { href: '/faq', label: 'F.A.Q' },
  ];

  const isActive = (path: string) => {
    const cleanPath = path.split('#')[0];
    const currentPath = location.pathname;
    return currentPath === cleanPath || (cleanPath === '/' && currentPath === '');
  };

  return (
    <header
      className={`${styles.header} ${isVisible ? styles['header--visible'] : styles['header--hidden']}`}
      id="header"
    >
      <div className={`${styles.header__container} container`}>
        {/* Логотип */}
        <Link to="/" className={styles.header__logo} onClick={close}>
          <img src={logo} alt="SOTA Logo" />
        </Link>

        {/* Навигация */}
        <nav className={`${styles.header__nav} ${isOpen ? styles['header__nav--open'] : ''}`}>
          <ul className={styles.header__list}>
            {navLinks.map((link) => {
              const isAnchor = link.href.includes('#');

              return (
                <li
                  key={link.href}
                  className={`${styles.header__item} ${isActive(link.href) ? styles['header__item--active'] : ''}`}
                >
                  {isAnchor ? (
                    <a
                      href={link.href}
                      className={styles.header__link}
                      onClick={(e) => handleAnchorClick(e, link.href, close)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={styles.header__link}
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Button onClick={openBot}>Арендовать товар</Button>
        </nav>

        {/* Бургер меню */}
        <button className={styles.header__burger} onClick={toggle} aria-label="Меню">
          <span className={styles['header__burger-line']}></span>
          <span className={styles['header__burger-line']}></span>
          <span className={styles['header__burger-line']}></span>
        </button>
      </div>

      {/* Полноэкранное мобильное меню */}
      {isOpen && (
        <div className={styles['header__fullscreen-menu']} onClick={close}>
          <ul className={styles['header__fullscreen-list']}>
            {navLinks.map((link) => {
              const isAnchor = link.href.includes('#');

              return (
                <li key={link.href} className={styles['header__fullscreen-item']}>
                  {isAnchor ? (
                    <a
                      href={link.href}
                      className={styles['header__fullscreen-link']}
                      onClick={(e) => handleAnchorClick(e, link.href, close)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={styles['header__fullscreen-link']}
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
            <li className={styles['header__fullscreen-item']}>
              <Button onClick={openBot}>Арендовать товар</Button>
            </li>
          </ul>
          <img src={logo} alt="SOTA" className={styles['menu-logo']} />
        </div>
      )}
    </header>
  );
};