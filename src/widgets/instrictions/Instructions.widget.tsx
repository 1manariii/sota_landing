import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import './Instructions.module.scss';
import { openTelegramBot } from '../../features/open-bot/openSotaBot';
import { Button } from '../../shared/ui/button';

const steps = [
  { id: 1, img: '/assets/instructions-1.png', text: 'Выберите категорию\nНачните с выбора подходящей категории — ноутбуки, проекторы, колонки и другое оборудование.' },
  { id: 2, img: '/assets/instructions-2.png', text: 'Найдите нужную позицию\nВнутри категории выберите именно то устройство, которое вам необходимо.' },
  { id: 3, img: '/assets/instructions-3.png', text: 'Ознакомьтесь с информацией\nНа карточке техники доступны характеристики, условия аренды и стоимость.' },
  { id: 4, img: '/assets/instructions-4.png', text: 'Укажите адрес доставки\nЗаполните поле с адресом, чтобы техника приехала в ближайший постамат или удобное место.' },
  { id: 5, img: '/assets/instructions-5.png', text: 'Подтвердите заказ\nПосле заполнения всех обязательных данных кнопка «Арендовать» станет активной.' },
  { id: 6, img: '/assets/instructions-6.png', text: 'Управляйте заказами\nВ личном кабинете можно посмотреть личные данные и активные заказы.' },
  { id: 7, img: '/assets/instructions-7.png', text: 'История аренды\nНа этом же экране хранится вся история завершённых заказов.' },
];

export const Instructions = () => {
  return (
    <section className="instructions section" id="instructions">
      <div className="container">
        <h2 className="section-title">Как это работает</h2>

        <div className="instructions-wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: '.instructions-prev',
              nextEl: '.instructions-next',
            }}
            pagination={{ clickable: true, el: '.instructions-pagination' }}
            className="instructions-swiper"
          >
            {steps.map((step) => (
              <SwiperSlide key={step.id}>
                <div className="instruction-step">
                  <div className="instruction-step__image">
                    <img src={step.img} alt={`Шаг ${step.id}`} />
                  </div>
                  <p className="instruction-step__text">{step.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="custom-arrow instructions-prev">
            <img src="/assets/left_arrow_slider.svg" alt="Prev" />
          </button>
          <button className="custom-arrow instructions-next">
            <img src="/assets/right_arrow_slider.svg" alt="Next" />
          </button>
        </div>

        <div className="instructions__action">
          <Button onClick={openTelegramBot} variant="primary">К заказу</Button>
        </div>
        
        <div className="instructions-pagination"></div>
      </div>
    </section>
  );
};