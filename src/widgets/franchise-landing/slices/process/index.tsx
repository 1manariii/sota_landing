import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import useScrollReveal from '../../../../shared/hooks/useScrollReveal';

interface ProcessStep { title: string; description: string; icon: string; }
interface BenefitItem { title: string; description: string; icon: string; comingSoon?: boolean; }

const PROCESS_STEPS: ProcessStep[] = [
    { title: 'Производство постамата', description: 'Изготовление и настройка оборудования', icon: '🏭' },
    { title: 'Поиск локации, согласование', description: 'Подбор оптимального места установки', icon: '🔍' },
    { title: 'Закупка оборудования', description: 'Комплектация всем необходимым', icon: '🛒' },
    { title: 'Настройка и подключение', description: 'Запуск и интеграция в систему', icon: '⚙️' },
];
const BENEFITS: BenefitItem[] = [
    { title: 'Ежемесячный доход', description: 'Стабильный пассивный доход от аренды', icon: '💰' },
    { title: 'Подписку на сервис', description: 'Доступ ко всем обновлениям и функциям', icon: '📲' },
    { title: 'Материальный актив', description: 'Постамат остается вашей собственностью', icon: '📋' },
    { title: 'Доступ к личному кабинету', description: 'Управление и аналитика в реальном времени', icon: '🔐', comingSoon: true },
];



const ProcessStepCard: React.FC<{ step: ProcessStep; index: number; isLoaded: boolean }> = ({ step, index, isLoaded }) => {
    return (
        <div className={`${styles.processStep} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
            <span className={styles.processIcon}>{step.icon}</span>
            <div className={styles.processContent}>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.description}</p>
            </div>
        </div>
    );
};

const BenefitCard: React.FC<{ benefit: BenefitItem; index: number; isLoaded: boolean; isRight?: boolean }> = ({ benefit, index, isLoaded, isRight = false }) => {
    return (
        <div className={`${styles.benefitCard} ${isRight ? styles.right : ''} ${isLoaded ? styles.loaded : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
            <span className={styles.benefitIcon}>{benefit.icon}</span>
            <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                <p className={styles.benefitDesc}>{benefit.description}</p>
                {benefit.comingSoon && <span className={styles.comingSoon}>COMING SOON</span>}
            </div>
        </div>
    );
};

const Process = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Инициализируем наблюдатель скролла
    useScrollReveal();

    useEffect(() => {
        setIsLoaded(true);
    }, []);
    return (
        <section className={`${styles.processSection} ${styles.glassSection}`}>
            <div className={`${styles.processContainer} container`}>

                {/* Список процесса (слева) */}
                <div className={`${styles.processColumn} ${styles.animateOnScroll}`}>
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
                <div className={`${styles.benefitsColumn} ${styles.animateOnScroll}`}>
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
