import { useEffect } from "react";

interface UseScrollRevealOptions {
    selector?: string;
    rootMargin?: string;
    threshold?: number;
}

const useScrollReveal = ({ 
    selector = '.animateOnScroll', 
    rootMargin = '-10% 0px -10% 0px', 
    threshold = 0.1 
}: UseScrollRevealOptions = {}) => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin,
            threshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.classList.remove('animate-out');
                } else {
                    entry.target.classList.remove('animate-in');
                    entry.target.classList.add('animate-out');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [selector, rootMargin, threshold]);
};

export default useScrollReveal