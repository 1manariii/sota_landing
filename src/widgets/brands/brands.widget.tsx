import './Brands.module.scss';

const brands = [
  '/assets/brand-1.png',
  '/assets/brand-2.png',
  '/assets/brand-3.png',
  '/assets/brand-4.png',
  '/assets/brand-5.png',
];

export const Brands = () => {
  return (
    <section className="brands section" id="brands">
      <div className="container">
        <h2 className="section-title">Бренды</h2>
        <div className="brands-list">
          {brands.map((src, index) => (
            <div key={index} className="brands-item">
              <img src={src} alt={`Brand ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};