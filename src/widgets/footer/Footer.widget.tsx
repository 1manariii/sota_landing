import { Link } from 'react-router'; // ✅ Для маршрутов типа /about
import { handleAnchorClick } from '../../shared/utils/scrollToSection';
import { openTelegramBot } from '../../features/open-bot/openSotaBot';
import { instagram, logo, tg, vk, youtube } from '../../shared/assets';
import { Button } from '../../shared/ui/button';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ✅ Меню с поддержкой якорей и маршрутов
  const menuLinks = [
    { href: '/#instructions', label: 'Как арендовать' },
    { href: '/about', label: 'Команда' },
    { href: '/franchise', label: 'Для франчайзи' },
    { href: '/catalog', label: 'Каталог' }// ✅ Исправлено: #carousel → #map (по id секции)
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          
          {/* Бренд */}
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogoLink}>
              <img src={logo} alt="SOTA" className={styles.footerLogo} />
            </Link>
            <p className={styles.footerMission}>Технологии доступны каждому</p>
            
            <div className={styles.footerSocial}>
              <p className={styles.footerSocialTitle}>Мы в соцсетях:</p>
              <div className={styles.footerSocialIcons}>
                {/* ✅ Исправлены лишние пробелы в URL */}
                <a href="https://vk.com/sotarent" target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <img src={vk} alt="VK" />
                </a>
                <a href="https://www.youtube.com/@SOTARENT" target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <img src={youtube} alt="YouTube" />
                </a>
                <a href="https://t.me/sotarent" target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <img src={tg} alt="Telegram" />
                </a>
                <a href="https://www.instagram.com/sotarent" target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <img src={instagram} alt="Instagram" />
                </a>
              </div>
            </div>
          </div>

          {/* Меню */}
          <div className={styles.footerMenu}>
            <h4 className={styles.menuTitle}>Меню</h4>
            <ul className={styles.menuList}>
              {menuLinks.map((link) => {
                const hasHash = link.href.includes('#');
                return (
                  <li key={link.href}>
                    {hasHash ? (
                      // ✅ Якорная ссылка
                      <a
                        href={link.href}
                        className={styles.menuLink}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      // ✅ Обычный маршрут
                      <Link to={link.href} className={styles.menuLink}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              {/* <li><a href="#faq" className={styles.menuLink}>Вопросы</a></li> */}
              {/* <li><a href="/policy" className={styles.menuLink}>Политика конфиденциальности</a></li> */}
              {/* <li><a href="/terms" className={styles.menuLink}>Офферта</a></li> */}
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.footerContacts}>
            <h4 className={styles.menuTitle}>Контакты</h4>
            <p className={styles.contactText}><strong>Телефон:</strong> <a href="tel:+79143607230">+7 (921) 400 99-99</a></p>
            <p className={styles.contactText}><strong>Email:</strong> <a href="mailto:team@sotarent.ru">team@sotamail.ru</a></p>
          </div>

          {/* Реквизиты */}
          <div className={styles.footerRequisites}>
            <h4 className={styles.menuTitle}>Реквизиты</h4>
            <p className={styles.contactText}><strong>ИП:</strong> Тетерский В.С.</p>
            <p className={styles.contactText}><strong>ОГРН:</strong> 323750000008481</p>
            <p className={styles.contactText}><strong>ИНН:</strong> 753617173507</p>
            
            <Button onClick={openTelegramBot} variant="primary" className={styles.footerAppButton}>
              Перейти в приложение
            </Button>
          </div>
        </div>
        
        <div className={styles.footerCopyright}>
          © {currentYear} SOTA Rent. Все права защищены.
        </div>
      </div>
    </footer>
  );
};