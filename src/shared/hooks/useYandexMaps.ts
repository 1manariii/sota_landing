import { useState, useEffect } from 'react';

// Типизация для Yandex Maps API 3.0
// Можно расширить по мере необходимости, добавляя интерфейсы из документации Яндекса
declare global {
  interface Window {
    ymaps3?: any;
  }
}

interface UseYandexMapsResult {
  ymaps3: typeof window.ymaps3 | null;
  isLoaded: boolean;
  error: Error | null;
}

// Конфигурация загрузки
const API_KEY = import.meta.env.VITE_YANDEX_MAPS_API_KEY || 'ВАШ_API_КЛЮЧ'; // Замените на ваш ключ или возьмите из env

let loadPromise: Promise<typeof window.ymaps3> | null = null;

/**
 * Функция для загрузки скрипта Яндекс Карт
 * Реализует паттерн Singleton, чтобы не грузить скрипт дважды
 */
const loadYandexMapsScript = (): Promise<typeof window.ymaps3> => {
  if (window.ymaps3) {
    return Promise.resolve(window.ymaps3);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is undefined'));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Ждем немного, так как ymaps3 может инициализироваться асинхронно после загрузки скрипта
      let attempts = 0;
      const maxAttempts = 50; // 5 секунд ожидания
      
      const checkAvailability = setInterval(() => {
        if (window.ymaps3) {
          clearInterval(checkAvailability);
          resolve(window.ymaps3);
        } else {
          attempts++;
          if (attempts > maxAttempts) {
            clearInterval(checkAvailability);
            reject(new Error('Yandex Maps API failed to initialize within timeout'));
          }
        }
      }, 100);
    };

    script.onerror = () => {
      loadPromise = null; // Сбрасываем промис при ошибке, чтобы можно было попробовать снова
      reject(new Error('Failed to load Yandex Maps script'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

/**
 * Хук для подключения Яндекс Карт API 3.0
 */
export const useYandexMaps = (): UseYandexMapsResult => {
  const [ymaps3, setYmaps3] = useState<typeof window.ymaps3 | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Проверка на SSR
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const init = async () => {
      try {
        const api = await loadYandexMapsScript();
        if (!cancelled) {
          setYmaps3(api);
          setIsLoaded(true);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Yandex Maps Load Error:', err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoaded(false);
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ymaps3, isLoaded, error };
};

export default useYandexMaps;