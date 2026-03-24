// ✅ Исправленный импорт: react-router-dom вместо react-router
import { Link, useLocation } from 'react-router';
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
  
  // ✅ Включаем обработку якорей при загрузке страницы
  useAnchorScroll(80);

  const navLinks = [
    { href: '/#instructions', label: 'Как арендовать' },
    { href: '/about', label: 'О нас' },
    { href: '/#map', label: 'Товары' }
  ];

  // Проверка активной ссылки (учитываем только pathname, игнорируем хэш)
  const isActive = (path: string) => {
    const cleanPath = path.split('#')[0];
    const currentPath = location.pathname;
    return currentPath === cleanPath || (cleanPath === '/' && currentPath === '');
  };

  return (
    <header className={styles.header} id="header">
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
                    // ✅ Якорная ссылка: preventDefault + скролл
                    <a
                      href={link.href}
                      className={styles.header__link}
                      onClick={(e) => handleAnchorClick(e, link.href, close)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    // ✅ Обычная ссылка на маршрут
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