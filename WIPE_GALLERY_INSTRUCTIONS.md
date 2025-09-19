# Wipe/Mask Reveal Gallery - Инструкция использования

## 📋 Описание
Реализован эффект **маски-шторки** для галереи изображений, где маска съезжает/расступается, открывая изображение под ней. Эффект повторяется при каждом входе элемента во вьюпорт (как вниз, так и вверх).

## 🎯 Ключевые особенности
- **Масочный вайп** вместо простого fade-in/slide
- **4 направления**: left, right, up, down
- **Stagger эффект** с задержкой 100ms между элементами
- **Повторное срабатывание** при скролле в обе стороны
- **Лёгкая микроанимация** изображения (scale + translateY)
- **Поддержка prefers-reduced-motion**
- **GPU-оптимизированные** анимации

## 📁 Структура файлов

### 1. CSS стили: `/src/components/wipe-reveal.css`
```css
/* Основные переменные */
:root {
  --reveal-duration: 720ms;
  --reveal-stagger: 100ms;
  --reveal-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --reveal-mask-color: #0a0a0a;
}

/* Структура элементов */
.reveal                 // Контейнер с overflow: hidden
.reveal img            // Изображение с лёгкой анимацией
.reveal__mask          // Абсолютная маска поверх изображения
```

### 2. JS модуль: `/src/lib/wipeReveal.ts`
- **WipeRevealManager**: Основной класс управления анимациями
- **IntersectionObserver** с поддержкой stagger
- **initWipeReveal()**: Функция быстрой инициализации

### 3. React компонент: `/src/components/WipeGallery.tsx`
- **WipeGallery**: Основная галерея
- **RevealImage**: Отдельная карточка с маской
- **9 демо-изображений** с разными направлениями вайпа

## 🚀 Использование

### Базовая HTML структура
```html
<figure class="reveal" data-wipe="left">
  <img src="/images/photo.jpg" alt="Description" loading="lazy" />
  <span class="reveal__mask"></span>
</figure>
```

### Варианты направлений `data-wipe`
- **`left`**: Маска съезжает слева направо
- **`right`**: Маска съезжает справа налево  
- **`up`**: Маска съезжает сверху вниз
- **`down`**: Маска съезжает снизу вверх

### JavaScript инициализация
```javascript
import { initWipeReveal } from '@/lib/wipeReveal';

// Автоматическое наблюдение за всеми .reveal элементами
const manager = initWipeReveal(document, {
  threshold: 0.25,
  rootMargin: '0px 0px -12% 0px',
  staggerDelay: 100,
  useClipPath: false // false = transform, true = clip-path
});
```

## ⚙️ Настройки анимации

### Основные параметры
- **Длительность**: 720ms
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`
- **Stagger задержка**: 100ms между элементами
- **Порог видимости**: 25% элемента во вьюпорте

### Анимация изображения
```css
/* Начальное состояние */
transform: scale(1.02) translateY(6px);

/* Конечное состояние */
transform: scale(1) translateY(0);
```

## 🖼️ Управление изображениями

### Добавление новых изображений
1. **Путь**: Поместить в `/public/images/` или `/public/gallery/`
2. **Формат**: PNG, JPG, WebP (оптимизированные для веб)
3. **Размер**: Рекомендуется < 500KB для быстрой загрузки

### Обновление массива данных
В `/src/components/WipeGallery.tsx` обновить массив `galleryImages`:

```typescript
const galleryImages = [
  {
    src: '/images/your-new-photo.jpg',
    alt: 'Описание для accessibility',
    title: 'Заголовок карточки',
    category: 'Категория',
    wipeDirection: 'left' // left|right|up|down
  },
  // ... другие изображения
];
```

## 🎨 Кастомизация

### Изменение цвета маски
```css
:root {
  --reveal-mask-color: #your-color; /* По умолчанию #0a0a0a */
}
```

### Настройка тайминга
```css
:root {
  --reveal-duration: 800ms;    /* Увеличить длительность */
  --reveal-stagger: 120ms;     /* Больше задержка между элементами */
}
```

### Альтернативная техника (clip-path)
```javascript
initWipeReveal(container, {
  useClipPath: true // Использовать clip-path вместо transform
});
```

## ♿ Доступность

### Поддержка Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .reveal__mask {
    transform: scaleX(0) scaleY(0) !important; /* Маска скрыта */
  }
  .reveal img {
    transform: scale(1) translateY(0) !important; /* Изображение статично */
  }
}
```

### Прогрессивное улучшение
- **Без JS**: Изображения видны без анимации
- **Старые браузеры**: Fallback на opacity transitions
- **Screen readers**: Proper alt text и aria-labels

## 🔧 Техническая реализация

### Принцип работы маски
1. **Transform-based** (по умолчанию):
   ```css
   transform-origin: left; /* Точка трансформации */
   transform: scaleX(1);   /* Начальное - полностью видна */
   → transform: scaleX(0); /* Конечное - скрыта */
   ```

2. **Clip-path based** (альтернативный):
   ```css
   clip-path: inset(0 0 0 0);   /* Начальное - полностью видна */
   → clip-path: inset(0 100% 0 0); /* Конечное - обрезана */
   ```

### IntersectionObserver настройки
```javascript
{
  threshold: 0.25,              // 25% элемента должно быть видно
  rootMargin: '0px 0px -12% 0px' // Триггер чуть раньше нижнего края
}
```

### Stagger алгоритм
1. Группировка элементов по родительскому контейнеру
2. Сортировка по DOM-порядку
3. Применение задержки: `index * staggerDelay`

## 🎯 Тестирование

### Проверочный список
- ✅ Маски двигаются в правильном направлении
- ✅ Stagger работает плавно (100ms задержка)
- ✅ Анимации повторяются при скролле вверх/вниз
- ✅ Изображения загружаются лениво
- ✅ CLS ≈ 0 (нет скачков макета)
- ✅ Поддержка reduced motion
- ✅ Responsive на всех устройствах

### Отладка
```javascript
// Включить логирование в консоль
const manager = initWipeReveal(container, { 
  debug: true // если добавить эту опцию
});
```

## 🌍 Браузерная поддержка
- **Современные браузеры**: Полная поддержка
- **IE11+**: Fallback через opacity transitions
- **Mobile**: Оптимизировано для touch устройств

## 📱 Адаптивность
- **Mobile (< 768px)**: 1 колонка
- **Tablet (768-1024px)**: 2 колонки  
- **Desktop (> 1024px)**: 3 колонки

Эффект работает одинаково плавно на всех брейкпоинтах!

---

**🎭 Результат**: Премиум галерея с эффектными масками-шторками, которые создают завораживающий эффект reveal при каждом скролле!