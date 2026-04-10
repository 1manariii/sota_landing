import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './MapSection.module.scss';
import { BASE_URL } from '../../shared/lib/config';
import useYandexMaps from '../../shared/hooks/useYandexMaps';

// --- Типы для Яндекс Карт (упрощенные для примера) ---
type VectorCustomization = any; 

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

// === ФУНКЦИЯ СОЗДАНИЯ ТЕМЫ SOTA ===
// === ФУНКЦИЯ СОЗДАНИЯ ТЕМЫ SOTA (Orange/Black/Gray/White) ===
const createSotaCustomization = (): VectorCustomization[] => {
  // Цветовая палитра SOTA
  const colors = {
    // --- ФОН И СУША ---
    background: '#121212',      // Почти черный фон (Deep Black)
    land: '#1e1e1e',            // Темно-серый для суши (Dark Gray)
    
    // --- ВОДА ---
    water: '#ffaf79',           // Очень темный серый, почти черный
    waterOutline: '#7e5c46',    // Чуть светлее для границ воды

    // --- ДОРОГИ ---
    roadMajor: '#3a3a3a',       // Серый для основных дорог
    roadMinor: '#2a2a2a',       // Темнее для второстепенных
    roadOutline: '#000000',     // Черная обводка для четкости
    roadLabel: '#ffffff',       // Белый текст названий улиц

    // --- ЗДАНИЯ ---
    building: '#262626',        // Темно-серые здания
    buildingOutline: '#383838', // Светлая обводка зданий
    buildingRoof: '#1a1a1a',    // Крыши чуть темнее

    // --- ПАРКИ И ЗЕЛЕНЬ (Теперь серые, чтобы не выбиваться из темы) ---
    park: '#1f1f1f',            // Парки как часть городского ландшафта (темно-серые)
    vegetation: '#1a1a1a',      // Растительность темная

    // --- ГРАНИЦЫ ---
    border: '#444444',          // Серые границы районов/стран
    borderAdmin: '#555555',

    // --- ТЕКСТ ---
    textPrimary: '#ffffff',     // Белый основной текст (города, районы)
    textSecondary: '#aaaaaa',   // Светло-серый второстепенный текст
    textOutline: '#000000',     // Черная обводка текста для читаемости
    
    // --- АКЦЕНТЫ (SOTA ORANGE) ---
    poiIcon: '#FF6B00',         // Ярко-оранжевые иконки POI
    poiLabel: '#FF8533',        // Оранжевый текст POI
    metro: '#FF6B00',           // Метро оранжевое
  };

  const rules: VectorCustomization[] = [
    // 🌍 СУША И ФОН
    {
      tags: { any: ['land'] },
      elements: 'geometry.fill',
      stylers: { color: colors.land, opacity: 1 },
    },

    // 💧 ВОДА
    {
      tags: { any: ['water'] },
      elements: 'geometry.fill',
      stylers: { color: colors.water, opacity: 1 },
    },
    {
      tags: { any: ['water'] },
      elements: 'geometry.outline',
      stylers: { color: colors.waterOutline, opacity: 0.5 },
    },

    // 🌳 ПАРКИ (Сделаны нейтрально-серыми)
    {
      tags: { any: ['park', 'vegetation', 'national_park', 'garden'] },
      elements: 'geometry.fill',
      stylers: { color: colors.park, opacity: 1 },
    },

    // 🏢 ЗДАНИЯ
    {
      tags: { any: ['building'] },
      elements: 'geometry.fill',
      stylers: { color: colors.building, opacity: 1 },
    },
    {
      tags: { any: ['building'] },
      elements: 'geometry.outline',
      stylers: { color: colors.buildingOutline, opacity: 1 },
    },

    // 🛣️ ДОРОГИ
    // Второстепенные дороги
    {
      tags: { any: ['road_1', 'road_2', 'road_3'] },
      elements: 'geometry.fill',
      stylers: { color: colors.roadMinor, opacity: 1 },
    },
    // Основные дороги и магистрали
    {
      tags: { any: ['road_4', 'road_5', 'road_6', 'road_7', 'highway'] },
      elements: 'geometry.fill',
      stylers: { color: colors.roadMajor, opacity: 1 },
    },
    // Обводка всех дорог
    {
      tags: { any: ['road', 'road_1', 'road_2', 'road_3', 'road_4', 'road_5', 'road_6', 'road_7', 'highway'] },
      elements: 'geometry.outline',
      stylers: { color: colors.roadOutline, opacity: 1 },
    },

    // 🚇 МЕТРО (Оранжевое)
    {
      tags: { any: ['metro_station'] },
      elements: 'geometry.fill',
      stylers: { color: colors.metro, opacity: 1 },
    },

    // 📍 POI (Интересные места) - ОРАНЖЕВЫЙ АКЦЕНТ
    {
      tags: { any: ['poi'] },
      elements: 'label.icon',
      stylers: { color: colors.poiIcon, opacity: 1 },
    },
    {
      tags: { any: ['poi'] },
      elements: 'label.text.fill',
      stylers: { color: colors.poiLabel, opacity: 1, weight: 500 },
    },

    // 🏷️ АДМИНИСТРАТИВНЫЕ ГРАНИЦЫ
    {
      tags: { any: ['admin'] },
      elements: 'geometry.outline',
      stylers: { color: colors.border, opacity: 0.4 },
    },

    // 📝 ТЕКСТЫ
    
    // Населенные пункты (Белые)
    {
      tags: { any: ['locality'] },
      elements: 'label.text.fill',
      stylers: { color: colors.textPrimary, weight: 700, opacity: 1 },
    },
    {
      tags: { any: ['locality'] },
      elements: 'label.text.outline',
      stylers: { color: colors.textOutline, opacity: 1 }, // Черная обводка для контраста
    },
    
    // Улицы (Светло-серые)
    {
      tags: { any: ['address', 'street'] },
      elements: 'label.text.fill',
      stylers: { color: colors.textSecondary, opacity: 0.9, weight: 400 },
    },
    {
      tags: { any: ['address', 'street'] },
      elements: 'label.text.outline',
      stylers: { color: colors.background, opacity: 1 }, // Обводка цветом фона
    },

    // Административные названия (Области, страны)
    // {
    //   tags: { any: ['admin'] },
    //   elements: 'label.text.fill',
    //   stylers: { color: '#888888', weight: 500, opacity: 0.8 },
    // },

    // Фон под иконками POI (чтобы читались на темном)
    {
      tags: { any: ['poi'] },
      elements: 'label.icon',
      stylers: { 
        // Можно добавить легкую тень или фон, если иконки сливаются
        // В API 3.0 это часто делается через SVG маркеры, но здесь стилизуем нативные
      },
    },
  ];

  return rules;
};

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
        },
        mode: 'vector', // Важно для кастомизации
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
  }, [isLoaded, ymaps3, sotaCustomization]);

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