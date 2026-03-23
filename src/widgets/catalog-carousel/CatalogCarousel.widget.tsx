import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { sotaApi } from '../../shared/api/sotaApi';
import { getCategoryImageUrl, type Category } from '../../shared/types/api';
import { CategoryCard } from '../../entities/category/CategoryCard';
import styles from './CatalogCarousel.module.scss';

export const CatalogCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sotaApi.getCategories()
      .then((data) => {
        // Фильтруем скрытые категории
        const visible = data.filter(cat => !cat.hidden);
        setCategories(visible);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.loader}>Загрузка категорий...</div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.empty}>Категории не найдены</div>
      </section>
    );
  }

  return (
    <section className={`${styles.carousel} ${styles.section}`} id="carousel">
      <h2 className={styles['section-title']}>КАТЕГОРИИ ТОВАРОВ</h2>
      
      <div className={styles['carousel-wrapper']}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{ 
            prevEl: `.${styles['custom-prev']}`, 
            nextEl: `.${styles['custom-next']}` 
          }}
          className={styles['category-swiper']}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <CategoryCard 
                image={getCategoryImageUrl(cat.image)}
                title={cat.name} 
                isBold={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомные стрелки */}
        <button className={`${styles['custom-arrow']} ${styles['custom-prev']}`}>
          <img src="/assets/left_arrow_slider.svg" alt="Prev" />
        </button>
        <button className={`${styles['custom-arrow']} ${styles['custom-next']}`}>
          <img src="/assets/right_arrow_slider.svg" alt="Next" />
        </button>
      </div>
    </section>
  );
};