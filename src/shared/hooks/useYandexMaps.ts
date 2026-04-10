// shared/hooks/useYandexMaps.ts
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ymaps3?: any;
  }
}

const API_KEY = import.meta.env.VITE_YANDEX_MAPS_API_KEY || 'ВАШ_API_КЛЮЧ';
let loadPromise: Promise<void> | null = null;

const loadScript = (): Promise<void> => {
  if (window.ymaps3 && window.ymaps3.YMap) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Ждем появления объекта ymaps3
      let attempts = 0;
      const interval = setInterval(() => {
        if (window.ymaps3 && window.ymaps3.YMap) {
          clearInterval(interval);
          resolve();
        } else {
          attempts++;
          if (attempts > 50) { // 5 секунд тайм-аут
            clearInterval(interval);
            reject(new Error('Yandex Maps API initialization timeout'));
          }
        }
      }, 100);
    };

    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load Yandex Maps script'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

export const useYandexMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Если уже загружено ранее в этой сессии
    if (window.ymaps3 && window.ymaps3.YMap) {
      setIsLoaded(true);
      return;
    }

    let cancelled = false;

    loadScript()
      .then(() => {
        if (!cancelled) setIsLoaded(true);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { 
    ymaps3: isLoaded ? window.ymaps3 : null, 
    isLoaded, 
    error 
  };
};

export default useYandexMaps;