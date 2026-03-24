import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './MapSection.module.scss';
import { BASE_URL } from '../../shared/lib/config';

// --- Типы ---
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

// Иконка маркера
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Обработчик кликов по карте
const MapClickHandler = ({ onMapClick }: { onMapClick: () => void }) => {
  useMapEvents({
    click: () => onMapClick(),
  });
  return null;
};

export const MapProducts = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  // Загрузка товаров при выборе платформы
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

  const handleMarkerClick = (id: number) => setSelectedPlatformId(id);
  const closePanel = () => {
    setSelectedPlatformId(null);
    setProducts([]);
  };

  const selectedPlatform = platforms.find(p => p.id === selectedPlatformId);

  return (
    <section className={styles.mapSection} id='map'>
      <div className={styles.mapWrapper}>
        {/* Поворотный заголовок слева (только десктоп) */}
        <h2 className={styles.sectionTitle}>
          Наши постаматы
        </h2>

        {/* Карта */}
        <div className={`${styles.mapContainer} ${selectedPlatformId ? styles.shifted : ''}`}>
          <MapContainer 
            center={[55.7558, 37.6173]}
            zoom={5} 
            scrollWheelZoom={true} 
            className={styles.leafletMap}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {platforms.map((platform) => (
              <Marker 
                key={platform.id} 
                position={[platform.coordinates.latitude, platform.coordinates.longitude]} 
                icon={icon}
                eventHandlers={{
                  click: () => handleMarkerClick(platform.id),
                }}
              >
                <Popup>{platform.name}</Popup>
              </Marker>
            ))}

            <MapClickHandler onMapClick={closePanel} />
          </MapContainer>
        </div>
      </div>

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
              {selectedPlatform.city}, {selectedPlatform.address}
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
                        src={product.image ? BASE_URL + product.image : 'https://via.placeholder.com/70x70/333/fff?text=No+Image'}
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
    </section>
  );
};