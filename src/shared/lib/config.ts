const isDev = true;

// Логика выбора домена
export const BASE_URL = isDev 
  ? 'https://sotarental.online' 
  : 'https://sotarental.ru';

// Для отладки в консоли
console.log(`🚀 App running in mode: ${isDev ? 'DEV (online)' : 'PROD (ru)'}`);