import { useEffect, useState } from 'react';
import { sotaApi } from '../../shared/api/sotaApi';
import type { FaqItem } from '../../shared/types/api';
import './FaqSection.module.scss';

export const FaqSection = () => {
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sotaApi.getFaq()
      .then(setFaqList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <div className="loader" style={{textAlign: 'center', padding: 40}}>Загрузка вопросов...</div>;

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <h2 className="section-title">Ответы на вопросы</h2>
        <div className="faq-list">
          {faqList.map((item, index) => (
            <div key={item.id} className={`faq-item ${activeIndex === index ? 'faq-item--active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{item.question}</span>
                <span className="faq-toggle">{activeIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};