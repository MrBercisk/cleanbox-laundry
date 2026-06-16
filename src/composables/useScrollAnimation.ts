// composables/useScrollAnimation.ts
import { onMounted, onUnmounted } from 'vue';

/**
 * Composable to register scroll-triggered animation observers.
 * Use in combination with the `data-aos` attribute on elements.
 */
export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Unobserve after animation triggers (play once)
            observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach((el) => {
      observer?.observe(el);
    });
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}