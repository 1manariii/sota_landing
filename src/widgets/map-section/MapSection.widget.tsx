import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './MapSection.module.scss';
import { BASE_URL } from '../../shared/lib/config';
import useYandexMaps from '../../shared/hooks/useYandexMaps';
import createSotaCustomization from '../../shared/utils/createSotaCustomization';

// --- Типы данных приложения ---
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
}

interface Platform {
  id: number;
  name: string;
  description: string | null;
  city: string;
  address: string;
  hidden: boolean;
  code: number | null;
  coordinates: Coordinates;
}

export const MapProducts = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { ymaps3, isLoaded } = useYandexMaps();

  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Создаем объект кастомизации один раз при монтировании
  const sotaCustomization = useMemo(() => createSotaCustomization(), []);

  // Загрузка платформ
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/platform`);
        if (!response.ok) throw new Error('Failed to fetch platforms');
        const data: Platform[] = await response.json();
        setPlatforms(data.filter(p => !p.hidden));
      } catch (error) {
        console.log(error)
        console.error('Error loading platforms:', error);
      }
    };
    fetchPlatforms();
  }, []);

  // Загрузка товаров
  useEffect(() => {
    if (!selectedPlatformId) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(`${BASE_URL}/api/platform/${selectedPlatformId}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [selectedPlatformId]);

  // Инициализация карты
  useEffect(() => {
    if (!isLoaded || !ymaps3 || !mapContainerRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

      const map = new YMap(mapContainerRef.current!, {
        location: {
          center: [37.6173, 55.7558],
          zoom: 5,
        }
      });

      // Добавляем слой схемы с кастомизацией SOTA
      map.addChild(new YMapDefaultSchemeLayer({ customization: sotaCustomization }));

      // Добавляем слой объектов (дороги, здания и т.д.)
      map.addChild(new YMapDefaultFeaturesLayer());

      mapInstanceRef.current = map;

      // Клик по карте закрывает панель
      map.addEventListener('click', () => {
        setSelectedPlatformId(null);
        setProducts([]);
      });
    };

    initMap();
  }, [isLoaded, ymaps3]);

  // Обновление маркеров
  useEffect(() => {
    if (!mapInstanceRef.current || !ymaps3) return;

    const { YMapMarker } = ymaps3;

    // Очистка старых маркеров
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeChild(marker);
    });
    markersRef.current = [];

    // Создание новых
    platforms.forEach((platform) => {
      const markerElement = document.createElement('div');
      markerElement.className = styles.customMarker;
      markerElement.innerHTML = `<div class="${styles.markerPin}"></div>`;

      markerElement.onclick = (e) => {
        e.stopPropagation();
        handleMarkerClick(platform.id);
      };

      const marker = new YMapMarker(
        {
          coordinates: [platform.coordinates.longitude, platform.coordinates.latitude],
          draggable: false,
        },
        markerElement
      );

      mapInstanceRef.current.addChild(marker);
      markersRef.current.push(marker);
    });

  }, [platforms, ymaps3]);

  const handleMarkerClick = (id: number) => setSelectedPlatformId(id);
  const closePanel = () => {
    setSelectedPlatformId(null);
    setProducts([]);
  };

  const selectedPlatform = platforms.find(p => p.id === selectedPlatformId);

  // Функция для открытия страницы товара
  const handleRentClick = (productId: number) => {
    window.open(`https://sotarental.online/product/${productId}`, '_blank');
  };

  return (
    <section className={styles.mapSection} id='map'>
      <div className={styles.container}>

        {/* Вертикальный заголовок слева */}
        <h2 className={styles.sectionTitle}>
          Наши постаматы
        </h2>

        {/* Правая часть: Карта + Панель */}
        <div className={styles.contentWrapper}>

          {/* Сама карта */}
          <div
            ref={mapContainerRef}
            className={styles.yandexMap}
          />

          {/* Выдвижная панель */}
          <div className={`${styles.productsPanel} ${selectedPlatformId ? styles.open : ''}`}>
            <button className={styles.closeBtn} onClick={closePanel} aria-label="Закрыть панель">
              &times;
            </button>

            {selectedPlatformId && selectedPlatform && (
              <div className={styles.panelContent}>
                <h2 className={styles.panelTitle}>Товары в этом постамате:</h2>
                <h3 className={styles.postomatName}>{selectedPlatform.name}</h3>
                <p className={styles.postomatAddress}>
                  📍 {selectedPlatform.city}, {selectedPlatform.address}
                </p>
                {selectedPlatform.description && (
                  <p className={styles.postomatDesc}>{selectedPlatform.description}</p>
                )}

                <div className={styles.productsList}>
                  {loadingProducts ? (
                    <p className={styles.loadingMessage}>Загрузка товаров...</p>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <div key={product.id} className={styles.productCard}>
                        <div className={styles.productImageWrapper}>
                          <img
                            src={product.image ? `${BASE_URL}${product.image}` : 'https://via.placeholder.com/70x70/333/fff?text=No+Image'}
                            alt={product.name}
                            className={styles.productImage}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/70x70/333/fff?text=No+Image';
                            }}
                          />
                        </div>
                        <div className={styles.productInfo}>
                          <h3 className={styles.productName}>{product.name}</h3>
                          <p className={styles.productDesc}>{product.description}</p>
                          <button 
                            className={styles.rentButton}
                            onClick={() => handleRentClick(product.id)}
                          >
                            Арендовать
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.emptyMessage}>В этом постамате сейчас нет свободных товаров.</p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};