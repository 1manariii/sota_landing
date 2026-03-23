import { useState } from 'react';
import styles from './TeamSection.module.scss';

const TEAM_DATA = [
  {
    id: 1,
    name: 'Алексей Иванов',
    role: 'CEO & Основатель',
    bio: 'Более 10 лет в IT и ритейле. Идея создать SOTA пришла после личного опыта сложной аренды техники.',
    photo: 'https://via.placeholder.com/400x400/333/fff?text=Alexey', // Замени на import photo1
  },
  {
    id: 2,
    name: 'Мария Петрова',
    role: 'Операционный директор',
    bio: 'Отвечает за логистику и сеть постаматов. Знает каждый адрес установки лично.',
    photo: 'https://via.placeholder.com/400x400/333/fff?text=Maria', // Замени на import photo2
  },
  {
    id: 3,
    name: 'Дмитрий Соколов',
    role: 'Технический директор',
    bio: 'Разработал архитектуру бота и систему умных замков. Делает так, чтобы всё работало как часы.',
    photo: 'https://via.placeholder.com/400x400/333/fff?text=Dmitry', // Замени на import photo3
  },
  {
    id: 4,
    name: 'Елена Смирнова',
    role: 'Маркетолог',
    bio: 'Продвигает идею шеринг-экономики. Знает, как рассказать людям о преимуществах аренды.',
    photo: 'https://via.placeholder.com/400x400/333/fff?text=Elena', // Замени на import photo4
  },
];

export const TeamSection = () => {
  // Храним ID активного сотрудника. По умолчанию null (ничего не выбрано) или можно поставить 1
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeMember = TEAM_DATA.find(m => m.id === activeId);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>КОМАНДА SOTA</h2>
        
        <div className={styles.layout}>
          {/* ЛЕВАЯ ЧАСТЬ: СЕТКА С СОТАМИ */}
          <div className={styles.hexGrid}>
            {TEAM_DATA.map((member) => (
              <div
                key={member.id}
                className={`${styles.hexWrapper} ${activeId === member.id ? styles.active : ''}`}
                onMouseEnter={() => setActiveId(member.id)}
                onMouseLeave={() => setActiveId(null)} // Можно убрать, если хочешь, чтобы карточка оставалась при уходе мыши
              >
                <div className={styles.hexagon}>
                  <div className={styles.hexInner}>
                    <img src={member.photo} alt={member.name} className={styles.memberPhoto} />
                  </div>
                </div>
                <span className={styles.memberNameShort}>{member.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* ПРАВАЯ ЧАСТЬ: ИНФОРМАЦИОННАЯ КАРТОЧКА */}
          <div className={`${styles.infoPanel} ${activeMember ? styles.visible : ''}`}>
            {activeMember ? (
              <div className={styles.infoContent} key={activeMember.id}> {/* Key нужен для анимации смены контента */}
                <h3 className={styles.infoName}>{activeMember.name}</h3>
                <p className={styles.infoRole}>{activeMember.role}</p>
                <div className={styles.infoBio}>{activeMember.bio}</div>
                
                <div className={styles.infoDecor}></div>
              </div>
            ) : (
              <div className={styles.placeholderText}>
                <p>Наведите на сотрудника,<br/>чтобы узнать подробнее</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};