// src/shared/utils/scrollToSection.ts

/**
 * Плавный скролл к якорю
 */
export const scrollToSection = (id: string, offset: number = 80): void => {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Обработчик клика по ссылке с якорем
 * Поддерживает форматы: #hash, /#hash, /page#hash
 */
export const handleAnchorClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
): void => {
  e.preventDefault();
  
  // Извлекаем хэш из ссылки (поддерживает /#hash, #hash, /page#hash)
  const hashMatch = href.match(/#(.+)$/);
  if (!hashMatch) {
    onNavigate?.();
    return;
  }
  
  const hash = hashMatch[1];
  const basePath = href.split('#')[0];
  
  // Если путь отличается от текущего — переходим на нужную страницу
  if (basePath && basePath !== window.location.pathname) {
    window.location.href = href;
    return;
  }
  
  // Скроллим к секции с небольшой задержкой для гарантированной отрисовки
  setTimeout(() => {
    scrollToSection(hash);
  }, 50);
  
  onNavigate?.();
};