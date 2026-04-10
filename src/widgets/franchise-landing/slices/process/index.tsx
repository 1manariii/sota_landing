import { type FC } from 'react';
import styles from './styles.module.scss'
import stylesScroll from '../../Franchise.module.scss'
import { benefitIcon1, benefitIcon2, benefitIcon3, benefitIcon4, processIcon1, processIcon2, processIcon3, processIcon4 } from '../../../../shared/assets';
import type { IProps } from '../market-hero';

interface ProcessStep { title: string; description: string; icon: string; }
interface BenefitItem { title: string; description: string; icon: string; comingSoon?: boolean; }

const PROCESS_STEPS: ProcessStep[] = [
    { title: 'Производство постамата', description: 'Изготовление и настройка оборудования', icon: processIcon1 },
    { title: 'Поиск локации, согласование', description: 'Подбор оптимального места установки', icon: processIcon2 },
    { title: 'Закупка оборудования', description: 'Комплектация всем необходимым', icon: processIcon3 },
    { title: 'Настройка и подключение', description: 'Запуск и интеграция в систему', icon: processIcon4 },
];

const BENEFITS: BenefitItem[] = [
    { title: 'Ежемесячный доход', description: 'Стабильный пассивный доход от аренды', icon: benefitIcon1 },
    { title: 'Подписку на сервис', description: 'Доступ ко всем обновлениям и функциям', icon: benefitIcon2 },
    { title: 'Материальный актив', description: 'Постамат остается вашей собственностью', icon: benefitIcon3 },
    { title: 'Доступ к личному кабинету', description: 'Управление и аналитика в реальном времени', icon: benefitIcon4, comingSoon: true },
];

// Добавлен styles.animateOnScroll
const ProcessStepCard: React.FC<{ step: ProcessStep; index: number; isLoaded: boolean }> = ({ step, index, isLoaded }) => {
    return (
        <div className={`${styles.processStep} ${stylesScroll.animateOnScroll} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
            <img src={step.icon} className={styles.icon} />
            <div className={styles.processContent}>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.description}</p>
            </div>
        </div>
    );
};

// Добавлен styles.animateOnScroll
const BenefitCard: React.FC<{ benefit: BenefitItem; index: number; isLoaded: boolean; isRight?: boolean }> = ({ benefit, index, isLoaded, isRight = false }) => {
    return (
        <div className={`${styles.benefitCard} ${stylesScroll.animateOnScroll} ${isRight ? styles.right : ''} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
            <img src={benefit.icon} className={styles.icon} />
            <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                <p className={styles.benefitDesc}>{benefit.description}</p>
                {benefit.comingSoon && <span className={styles.comingSoon}>COMING SOON</span>}
            </div>
        </div>
    );
};

const Process:FC<IProps> = ({isLoaded=true}) => {
    return (
        <section className={`${styles.processSection} ${styles.glassSection}`}>
            <div className={`${styles.processContainer} container`}>

                {/* Список процесса (слева) */}
                {/* Убрали animateOnScroll с колонки */}
                <div className={styles.processColumn}>
                    <h3 className={styles.processColumnTitle}>ЧТО МЫ ДЕЛАЕМ ПОСЛЕ ВАШИХ ИНВЕСТИЦИЙ В SOTA BOX?</h3>
                    <div className={styles.processList}>
                        {PROCESS_STEPS.map((step, index) => (
                            <ProcessStepCard
                                key={step.title}
                                step={step}
                                index={index}
                                isLoaded={isLoaded}
                            />
                        ))}
                    </div>
                </div>

                {/* Постамат по центру */}
                <div className={styles.centerPostamat}>
                    <div className={styles.postamatIllustration}>
                        <div className={styles.postamatBody}>
                            <div className={styles.postamatHeader}><span>SOTA BOX</span></div>
                            <div className={styles.postamatQR}>
                                <div className={styles.qrCode} />
                                <span>СКАНИРУЙ QR-КОД</span>
                            </div>
                            <div className={styles.postamatButton}>АРЕНДОВАТЬ</div>
                        </div>
                    </div>
                </div>

                {/* Список преимуществ (справа) */}
                {/* Убрали animateOnScroll с колонки */}
                <div className={styles.benefitsColumn}>
                    <h3 className={styles.benefitsColumnTitle}>ЧТО В ИТОГЕ ПОЛУЧАЕТЕ ВЫ?</h3>
                    <div className={styles.benefitsList}>
                        {BENEFITS.map((benefit, index) => (
                            <BenefitCard
                                key={benefit.title}
                                benefit={benefit}
                                index={index}
                                isLoaded={isLoaded}
                                isRight={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Process