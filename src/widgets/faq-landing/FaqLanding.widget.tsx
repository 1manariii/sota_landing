import React, { useState, useEffect } from 'react';
import styles from './FaqLanding.module.scss';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

// Данные по умолчанию (Fallback), если API вернет пустоту или ошибку
const DEFAULT_FAQ_DATA: FaqItem[] = [
    {
        id: 1,
        question: "Какие документы подходят для верификации?",
        answer: "Для верификации подходит только паспорт гражданина РФ, достигшего 18 летнего возраста, с фотографией 1й страницы паспорта и страницы с регистрацией на территории РФ. Помимо этого, необходимо также будет сделать селфи с паспортом в руках для подтверждения внесенных ранее документов и пользователя."
    },
    {
        id: 2,
        question: "Нужно ли вносить залог за аренду товара?",
        answer: "Нет, залог не нужен."
    },
    {
        id: 3,
        question: "Где посмотреть договор аренды и другие документы организации?",
        answer: "Договор аренды (оферта), согласие на обработку персональных данных, политика конфиденциальности, а также лицензионное соглашение представлены в разделе сайта «Контакты», а также в ЛК пользователя в веб-приложении."
    },
    {
        id: 4,
        question: "Как оплатить аренду?",
        answer: "После выбора товара и периода аренды через веб-приложение, вы переходите к оплате через платформу CloudPayments. На данном этапе вы можете привязать карту к аккаунту, а также оплатить заказ через СБП."
    },
    {
        id: 5,
        question: "Как получить помощь?",
        answer: "Вы можете написать свой вопрос в тех. поддержку в веб-приложении в интерфейсном меню (самая крайняя иконка слева). Либо написать в Телеграм: @tech_support_rent"
    }
];

const FaqLanding: React.FC = () => {
    const [faqList, setFaqList] = useState<FaqItem[]>([]);
    const [openId, setOpenId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const response = await fetch('https://sotarental.online/api/utils/faq');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Проверяем, является ли ответ массивом и не пуст ли он
                if (Array.isArray(data) && data.length > 0) {
                    // Приводим данные к нужному формату, если структура API отличается
                    // Предполагаем, что API возвращает объекты с полями, похожими на наши, 
                    // или маппим их. Здесь простой пример маппинга, если ключи отличаются.
                    const formattedData = data.map((item: any, index: number) => ({
                        id: item.id || index + 1,
                        question: item.question || item.title || '',
                        answer: item.answer || item.description || ''
                    }));
                    setFaqList(formattedData);
                } else {
                    // Если массив пустой или не массив -> используем дефолтные данные
                    console.warn('API returned empty or invalid data, using defaults.');
                    setFaqList(DEFAULT_FAQ_DATA);
                }
            } catch (error) {
                console.error('Failed to fetch FAQ:', error);
                // При ошибке также используем дефолтные данные
                setFaqList(DEFAULT_FAQ_DATA);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFaq();
    }, []);

    const toggleAccordion = (id: number) => {
        setOpenId(prevId => (prevId === id ? null : id));
    };

    if (isLoading) {
        return (
            <section className={styles.faqSection}>
                <div className={styles.container}>
                    <div className={styles.loader}>Загрузка вопросов...</div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>Часто задаваемые вопросы</h2>
                <p className={styles.subtitle}>
                    Не нашли ответ? Свяжитесь с нашей <span className={styles.highlight} onClick={()=>{
                        window.open('https://t.me/tech_support_rent')
                    }}>поддержкой</span>.
                </p>

                <div className={styles.faqList}>
                    {faqList.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div 
                                key={item.id} 
                                className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}
                            >
                                <button 
                                    className={styles.questionBtn}
                                    onClick={() => toggleAccordion(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{item.question}</span>
                                    <span className={styles.icon}>
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                
                                <div 
                                    className={styles.answerWrapper}
                                    style={{ 
                                        maxHeight: isOpen ? '500px' : '0',
                                        opacity: isOpen ? 1 : 0
                                    }}
                                >
                                    <p className={styles.answerText}>{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqLanding;