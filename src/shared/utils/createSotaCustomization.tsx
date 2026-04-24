const createSotaCustomization = () => {
  // Палитра строго Ч/Б по ТЗ
  const colors = {
    // Вода: от #4E4E4E до #3D3D3D
    waterBase: '#4E4E4E', 
    waterBorder: '#3D3D3D',
    
    // Суша: от #171717 до #101010
    landBase: '#171717',
    landBorder: '#101010',

    // Дороги (используем базовый тег 'road')
    roadColor: '#2A2A2A', 
    
    // Здания
    buildingColor: '#252525',
    
    // Парки
    parkColor: '#1C1C1C',

    // Границы
    borderCountry: '#666666',
    borderRegion: '#444444',

    // Текст
    textFill: '#FFFFFF',
    textOutline: '#101010',
  };

  const rules = [
    // ==========================================
    // 1. БАЗОВЫЕ СЛОИ (Земля и Вода)
    // ==========================================

    // Земля (Суша) - используем тег 'land'
    {
      tags: { any: ['land'] },
      elements: 'geometry.fill',
      stylers: { color: colors.landBase, opacity: 1 },
    },
    // Граница суши (опционально)
    {
      tags: { any: ['land'] },
      elements: 'geometry.outline',
      stylers: { color: colors.landBorder, width: 0.5, opacity: 1 },
    },

    // Вода - используем тег 'water'
    {
      tags: { any: ['water'] },
      elements: 'geometry.fill',
      stylers: { color: colors.waterBase, opacity: 1 },
    },
    // Граница воды
    {
      tags: { any: ['water'] },
      elements: 'geometry.outline',
      stylers: { color: colors.waterBorder, width: 1, opacity: 1 },
    },

    // ==========================================
    // 2. ДОРОГИ (Базовый тег 'road')
    // ==========================================
    // В API 3.0 все дороги обычно попадают под тег 'road'. 
    // Если нужно разделить, можно использовать 'road_highway', но чаще всего достаточно одного правила.
    
    // Основная дорога
    {
      tags: { any: ['road'] },
      elements: 'geometry.fill', // Для линий используется fill с шириной
      stylers: { color: colors.roadColor, width: 2, opacity: 1 },
    },
    // Подпись дорог
    {
      tags: { any: ['road'] },
      elements: 'label.text.fill',
      stylers: { color: colors.textFill, size: 10, weight: 600, opacity: 1 },
    },

    // Железные дороги (тег 'railway')
    {
      tags: { any: ['railway'] },
      elements: 'geometry.fill',
      stylers: { color: '#333333', width: 1, dash: [4, 2], opacity: 1 },
    },

    // ==========================================
    // 3. ЗДАНИЯ И ОБЪЕКТЫ
    // ==========================================

    // Здания (тег 'building')
    {
      tags: { any: ['building'] },
      elements: 'geometry.fill',
      stylers: { color: colors.buildingColor, opacity: 1 },
    },
    {
      tags: { any: ['building'] },
      elements: 'geometry.outline',
      stylers: { color: colors.landBorder, width: 0.5, opacity: 1 },
    },

    // Парки (тег 'park')
    {
      tags: { any: ['park'] },
      elements: 'geometry.fill',
      stylers: { color: colors.parkColor, opacity: 1 },
    },

    // POI (Точки интереса) - включаем отображение
    {
      tags: { any: ['poi'] },
      elements: 'label.text.fill',
      stylers: { color: '#CCCCCC', size: 10, opacity: 1 },
    },
    // Маркеры POI (если нужны точки)
    {
      tags: { any: ['poi'] },
      elements: 'geometry.fill',
      stylers: { color: '#888888', radius: 3, opacity: 1 },
    },

    // ==========================================
    // 4. АДМИНИСТРАТИВНЫЕ ГРАНИЦЫ
    // ==========================================

    // Границы стран (тег 'admin' + фильтр country)
    {
      tags: { any: ['admin'], all: ['country'] },
      elements: 'geometry.outline',
      stylers: { color: colors.borderCountry, width: 2, opacity: 1 },
    },
    // Названия стран
    {
      tags: { any: ['admin'], all: ['country'] },
      elements: 'label.text.fill',
      stylers: { color: colors.textFill, weight: 700, size: 16, opacity: 1 },
    },
    {
      tags: { any: ['admin'], all: ['country'] },
      elements: 'label.text.outline',
      stylers: { color: colors.landBorder, width: 4, opacity: 1 },
    },

    // Границы регионов
    {
      tags: { any: ['admin'], all: ['region'] },
      elements: 'geometry.outline',
      stylers: { color: colors.borderRegion, width: 1.5, opacity: 1 },
    },
    {
      tags: { any: ['admin'], all: ['region'] },
      elements: 'label.text.fill',
      stylers: { color: '#AAAAAA', weight: 600, size: 14, opacity: 1 },
    },

    // ==========================================
    // 5. ГОРОДА И НАСЕЛЕННЫЕ ПУНКТЫ
    // ==========================================

    // Города (locality)
    {
      tags: { any: ['locality'] },
      elements: 'label.text.fill',
      stylers: { color: colors.textFill, weight: 500, size: 12, opacity: 1 },
    },
    {
      tags: { any: ['locality'] },
      elements: 'label.text.outline',
      stylers: { color: colors.landBorder, width: 2, opacity: 1 },
    },

    // Районы (district)
    {
      tags: { any: ['district'] },
      elements: 'label.text.fill',
      stylers: { color: '#BBBBBB', weight: 400, size: 10, opacity: 1 },
    },

    // Адреса и улицы
    {
      tags: { any: ['address'] },
      elements: 'label.text.fill',
      stylers: { color: '#777777', size: 9, opacity: 1 },
    },
  ];

  return rules;
};

export default createSotaCustomization