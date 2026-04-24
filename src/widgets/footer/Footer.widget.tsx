import { Link } from 'react-router'; // Убедитесь, что импорт из react-router-dom
import { handleAnchorClick } from '../../shared/utils/scrollToSection';
import { openBot } from '../../features/open-bot/openSotaBot';
import { instagram, logo, tg, vk, youtube } from '../../shared/assets';
import { Button } from '../../shared/ui/button';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const menuLinks = [
    { href: '/#instructions', label: 'Как арендовать' },
    { href: '/about', label: 'Команда' },
    { href: '/franchise', label: 'Для франчайзи' },
    { href: '/catalog', label: 'Каталог' }
  ];

  // Ссылки на документы
  const docLinks = [
    { id: 'consent', label: 'Согласие на обработку персональных данных' },
    { id: 'license', label: 'Лицензионное соглашение' },
    { id: 'privacy', label: 'Политика конфиденциальности' },
    { id: 'offer', label: 'Публичная оферта' },
  ];

  return (
    <footer className={styles.footer} id='footer'>
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
                      <a
                        href={link.href}
                        className={styles.menuLink}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className={styles.menuLink}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Документы (Новый блок) */}
          <div className={styles.footerMenu}>
            <h4 className={styles.menuTitle}>Документы</h4>
            <ul className={styles.menuList}>
              {docLinks.map((doc) => (
                <li key={doc.id}>
                  <Link to={`/pdf/${doc.id}`} className={styles.menuLink}>
                    {doc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.footerContacts}>
            <h4 className={styles.menuTitle}>Контакты</h4>
            <p className={styles.contactText}><strong>Телефон:</strong> <a href="tel:+79214009999">+7 (921) 400 99-99</a></p>
            <p className={styles.contactText}><strong>Email:</strong> <a href="mailto:team@sotamail.ru">team@sotamail.ru</a></p>
          </div>

          {/* Реквизиты */}
          <div className={styles.footerRequisites}>
            <h4 className={styles.menuTitle}>Реквизиты</h4>
            <p className={styles.contactText}><strong>НАИМЕНОВАНИЕ:</strong> ООО "Сота Бокс"</p>
            <p className={styles.contactText}><strong>ЮРИДИЧЕСКИЙ АДРЕС: </strong> 190000, Российская Федерация, город Санкт-Петербург, набережная Реки Фонтанки, дом 40/68, литера А, помещение 21-Н</p>
            <p className={styles.contactText}><strong>ОГРН:</strong> 1267800027010</p>
            <p className={styles.contactText}><strong>ИНН:</strong> 7840125093</p>
            <p className={styles.contactText}><strong>КПП:</strong> 784001001</p>
            
            <Button onClick={openBot} variant="primary" className={styles.footerAppButton}>
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