// ✅ Исправленный импорт
import { Link, useLocation } from 'react-router'; // 🔹 Было 'react-router'
import { useEffect, useState } from 'react'; // 🔹 Добавили useState, useEffect
import { useMobileMenu } from '../../features/mobile-menu/useMobileMenu';
import { useAnchorScroll } from '../../features/anchor-scroll/useAnchorScroll';
import { openTelegramBot } from '../../features/open-bot/openSotaBot';
import { handleAnchorClick } from '../../shared/utils/scrollToSection';
import { logo } from '../../shared/assets';
import { Button } from '../../shared/ui/button';
import styles from './Header.module.scss';

export const Header = () => {
  const { isOpen, toggle, close } = useMobileMenu();
  const location = useLocation();

  // 🔹 Состояние для видимости хедера
  const [isVisible, setIsVisible] = useState(false);

  useAnchorScroll(80);

  // 🔹 Отслеживаем скролл
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // 🔹 Показываем хедер если:
          // 1. Прокрутили больше 50px вниз, ИЛИ
          // 2. Меню открыто (чтобы можно было закрыть)
          if (currentScrollY > 50 || isOpen) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 🔹 Проверка при монтировании (если страница загружена со скроллом)
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]); // 🔹 Зависимость от isOpen для корректной работы

  const navLinks = [
    { href: '/#instructions', label: 'Как арендовать' },
    { href: '/about', label: 'О нас' },
    { href: 'https://docs.google.com/forms/d/1V-kvVo2-4-B11L6t__o51U3nsYyrQbJ2-fhsdfmjw4A/viewform?edit_requested=true', label: 'Франчайзи' }
  ];

  const isActive = (path: string) => {
    const cleanPath = path.split('#')[0];
    const currentPath = location.pathname;
    return currentPath === cleanPath || (cleanPath === '/' && currentPath === '');
  };

  return (
      // 🔹 Добавляем классы для анимации
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
              <li className={styles.header__item}>
                <Button onClick={openTelegramBot}>Арендовать товар</Button>
              </li>
            </ul>
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
                  <Button onClick={openTelegramBot}>Арендовать товар</Button>
                </li>
              </ul>
              <img src={logo} alt="SOTA" className={styles['menu-logo']} />
            </div>
        )}
      </header>
  );
};