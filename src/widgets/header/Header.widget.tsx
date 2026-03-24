import { useMobileMenu } from '../../features/mobile-menu/useMobileMenu';
import { openTelegramBot } from '../../features/open-bot/openSotaBot';
import { logo } from '../../shared/assets';
import { Button } from '../../shared/ui/button';

// ✅ Импортируем как объект styles
import styles from './Header.module.scss';

export const Header = () => {
  const { isOpen, toggle, close } = useMobileMenu();

  const navLinks = [
    { href: '#instructions', label: 'Как арендовать' },
    { href: '#about', label: 'О нас' },
    { href: '#carousel', label: 'Товары' },
    { href: '#faq', label: 'Вопросы' },
  ];

  return (
    <header className={styles.header} id="header">
      <div className={`${styles.header__container} container`}>
        {/* Логотип */}
        <a href="#" className={styles.header__logo}>
          <img src={logo} alt="SOTA Logo" />
        </a>

        {/* Навигация: объединяем модульный класс и условный класс */}
        <nav className={`${styles.header__nav} ${isOpen ? styles['header__nav--open'] : ''}`}>
          <ul className={styles.header__list}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.header__item}>
                <a 
                  href={link.href} 
                  className={styles.header__link} 
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className={styles.header__item}>
              <Button onClick={openTelegramBot}>Арендовать товар</Button>
            </li>
          </ul>
        </nav>

        {/* Бургер меню */}
        <button className={styles.header__burger} onClick={toggle}>
          <span className={styles['header__burger-line']}></span>
          <span className={styles['header__burger-line']}></span>
          <span className={styles['header__burger-line']}></span>
        </button>
      </div>

      {/* Полноэкранное меню (рисуется только если isOpen === true) */}
      {isOpen && (
        <div className={styles['header__fullscreen-menu']} onClick={close}>
          <ul className={styles['header__fullscreen-list']}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles['header__fullscreen-item']}>
                <a href={link.href} className={styles['header__fullscreen-link']}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className={styles['header__fullscreen-item']}>
              <Button onClick={openTelegramBot}>Арендовать товар</Button>
            </li>
          </ul>
          {/* Картинка из public */}
          <img src={logo} alt="SOTA" className={styles['menu-logo']} />
        </div>
      )}
    </header>
  );
};