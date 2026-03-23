export const initMagicCursor = () => {
  const cursor = document.getElementById('magicCursor');
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Отслеживаем наведение на интерактивные элементы
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
  
  const addActiveClass = () => document.body.classList.add('cursor-active');
  const removeActiveClass = () => document.body.classList.remove('cursor-active');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', addActiveClass);
    el.addEventListener('mouseleave', removeActiveClass);
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animate = () => {
    // Плавное следование (Lerp)
    const speed = 0.12; 
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    
    requestAnimationFrame(animate);
  };

  animate();
};