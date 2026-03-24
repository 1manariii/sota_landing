// src/features/anchor-scroll/useAnchorScroll.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToSection } from '../../shared/utils/scrollToSection';

export const useAnchorScroll = (offset: number = 80) => {
  const location = useLocation();

  useEffect(() => {
    // location.hash уже содержит хэш без обработки
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      // Небольшая задержка для отрисовки контента после перехода
      const timer = setTimeout(() => {
        scrollToSection(hash, offset);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.key, offset]); // location.key меняется при каждом переходе
};