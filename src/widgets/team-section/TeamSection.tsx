import { useState } from 'react';
import styles from './TeamSection.module.scss';
import { photo1, photo4, photo3, photo2 } from '../../shared/assets';

const TEAM_DATA = [
    {
        id: 1,
        name: 'ВЛАДИСЛАВ',
        role: 'ГЕНЕРАЛЬНЫЙ ДИРЕКТОР & СООСНОВАТЕЛЬ',
        bio: 'БОЛЕЕ 8 ЛЕТ В IT. ПОСЛЕДНИЕ 5 ЛЕТИ ЗАНИМАЕТСЯ РАЗВИТИЕМ, УЛУЧШЕНИЕМ И ПРОДВИЖЕНИЕМ ИТ-ПРОДУКТОВ.',
        photo: photo1,
    },
    {
        id: 2,
        name: 'ВАДИМ',
        role: 'ОПЕРАЦИОННЫЙ ДИРЕКТОР & СООСНОВАТЕЛЬ',
        bio: 'ВАДИМ АМБАСАДОР ШЕРИНГ СЕРВИСОВ И УМНОГО ПОТРЕБЛЕНИЯ. АКТИВНО ИЗУЧАЕТ БИЗНЕС АНАЛИТИКУ И АВТОМАТИЗАЦИЮ.',
        photo: photo2,
    },
    {
        id: 3,
        name: 'АЙРАТ',
        role: 'ДИРЕКТОР ПО РАЗВИТИЮ & СООСНОВАТЕЛЬ',
        bio: '11 ЛЕТ РАБОТАЕТ В IT из которых более 8 лет на руководящей должности.',
        photo: photo3,
    },
    {
        id: 4,
        name: 'МУШЕГ',
        role: 'ТЕХНИЧЕСКИЙ ДИРЕКТОР',
        bio: 'возглавляет работу по созданию инновационных, технологичных решений, формирующих будущее ШЕРИНГ сервиса.',
        photo: photo4,
    },
];

export const TeamSection = () => {
    // 🔹 По умолчанию ничего не выбрано (сетка на всю ширину)
    const [activeId, setActiveId] = useState<number | null>(null);
    // Если хотите, чтобы первый был активен И сетка на всю ширину — см. вариант Б ниже 👇

    const activeMember = TEAM_DATA.find(m => m.id === activeId);

    // 🔹 Клик: если кликнули на активного — сбрасываем, иначе выбираем
    const handleHexClick = (id: number) => {
        setActiveId( id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>КОМАНДА СОТА БОКС</h2>

                <p className={styles.instruction}>
                    <span className={styles.instructionIcon}>👆</span>
                    Нажмите на соту, чтобы узнать о члене команды
                </p>

                <div className={`${styles.layout} ${activeId ? styles.layout_withPanel : ''}`}>
                    {/* ЛЕВАЯ ЧАСТЬ: СЕТКА С СОТАМИ */}
                    <div className={`${styles.hexGrid} ${activeId ? styles.hexGrid_shifted : styles.hexGrid_full}`}>
                        {TEAM_DATA.map((member) => {
                            const isActive = activeId === member.id;

                            return (
                                <button
                                    key={member.id}
                                    type="button"
                                    className={`${styles.hexWrapper} ${isActive ? styles.active : ''}`}
                                    onClick={() => handleHexClick(member.id)}
                                    aria-pressed={isActive}
                                    aria-label={`Показать информацию о ${member.name}`}
                                >
                                    <div className={styles.hexagon}>
                                        <div className={styles.hexInner}>
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                className={styles.memberPhoto}
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className={styles.activeIndicator} />
                                    </div>
                                    <span className={styles.memberNameShort}>{member.name.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ПРАВАЯ ЧАСТЬ: ИНФОРМАЦИОННАЯ КАРТОЧКА */}
                    <div
                        className={`${styles.infoPanel} ${activeMember ? styles.visible : ''}`}
                        aria-live="polite"
                    >
                        {activeMember ? (
                            <div className={styles.infoContent} key={activeMember.id}>
                                <h3 className={styles.infoName}>{activeMember.name}</h3>
                                <p className={styles.infoRole}>{activeMember.role}</p>
                                <div className={styles.infoBio}>{activeMember.bio}</div>
                                <div className={styles.infoDecor}></div>
                            </div>
                        ) : (
                            <div className={styles.placeholderText}>
                                <p>
                                    <span className={styles.placeholderIcon}>✨</span><br />
                                    Выберите сотрудника,<br />
                                    чтобы прочитать подробнее
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};