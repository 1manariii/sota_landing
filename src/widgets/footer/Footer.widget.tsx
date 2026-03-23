import { openTelegramBot } from '../../features/open-bot/openSotaBot';
import { instagram, logo, tg, vk, youtube } from '../../shared/assets';
import { Button } from '../../shared/ui/button';
import styles from './Footer.module.scss';

// Если логотип лежит в src/shared/assets, раскомментируй импорт и используй {styles.footerLogo}
// import footerLogoSrc from '../../shared/assets/footer_logo.svg'; 
// Если логотип в public, оставь строковый путь "/assets/..."

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          
          {/* Бренд */}
          <div className={styles.footerBrand}>
            {/* Используй import, если картинка в src, или строку, если в public */}
            <img src={logo} alt="SOTA" className={styles.footerLogo} />
            <p className={styles.footerMission}>Технологии доступны каждому</p>
            
            <div className={styles.footerSocial}>
              <p className={styles.footerSocialTitle}>Мы в соцсетях:</p>
              <div className={styles.footerSocialIcons}>
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
              <li><a href="#instructions" className={styles.menuLink}>Как арендовать</a></li>
              <li><a href="#about" className={styles.menuLink}>О нас</a></li>
              <li><a href="#carousel" className={styles.menuLink}>Товары</a></li>
              <li><a href="#faq" className={styles.menuLink}>Вопросы</a></li>
              <li><a href="/polity.html" className={styles.menuLink}>Политика конфиденциальности</a></li>
              <li><a href="/terms.html" className={styles.menuLink}>Офферта</a></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.footerContacts}>
            <h4 className={styles.menuTitle}>Контакты</h4>
            <p className={styles.contactText}><strong>Телефон:</strong> +7(914) 360-72-30</p>
            <p className={styles.contactText}><strong>Email:</strong> team@sotarent.ru</p>
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