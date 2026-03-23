import { useEffect } from 'react';
import { initMagicCursor } from '../../lib/initCursor';
import './curcor.scss'; // Путь к стилям выше

export const CursorFilter = () => {
  useEffect(() => {
    initMagicCursor();
  }, []);

  return <div id="magicCursor" className="magic-cursor" />;
};