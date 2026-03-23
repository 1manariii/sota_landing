
import { Button } from '../../shared/ui/button';
import './AboutBlock.module.scss';

export const AboutSection = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">SOTA — современный сервис аренды техники</h2>
        
        <div className="about-grid">
          {/* Блок 1 */}
          <div className="about-item about-item--reverse">
            <div className="about-item__text">
              <p>
                Мы — команда IT-специалистов, которая создала сервис SOTA, чтобы сделать аренду техники и товаров максимально простой и доступной. 
                Пользователи не хотят тратить десятки тысяч на вещи, которые будут пылиться дома. 
                Так появилась SOTA — платформа аренды, где всё работает быстро и удобно: выбрали товар в чат-боте, забрали рядом с домом — и пользуетесь.
              </p>
              <Button variant="outline">Стать партнером SOTA</Button>
            </div>
            <div className="about-item__image">
              <img src="/assets/about-1.png" alt="Команда SOTA" />
            </div>
          </div>

          {/* Блок 2 */}
          <div className="about-item">
            <div className="about-item__image">
              <img src="/assets/about-2.png" alt="Экология" />
            </div>
            <div className="about-item__text">
              <h3>Экономия и забота об экологии</h3>
              <p>
                Название SOTA мы выбрали не случайно. Для нас это ассоциация с ячейкой хранения — структурой, где всё организовано, доступно и под рукой. 
                Захотел — арендовал. Просто, прозрачно и удобно. Мы верим, что современные технологии должны быть доступны каждому без лишних барьеров.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};