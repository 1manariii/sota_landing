import React from 'react';
// Импортируем модульные стили
import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string; // Добавляем возможность передать дополнительные классы снаружи
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  
  // Формируем итоговый класс:
  // 1. Базовый класс из модуля (styles.btn)
  // 2. Модификатор варианта из модуля (styles['btn--primary'] или styles['btn--outline'])
  // 3. Дополнительные классы, переданные через props (className)
  const finalClassName = `${styles.btn} ${styles[`btn--${variant}`]} ${className}`;

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};