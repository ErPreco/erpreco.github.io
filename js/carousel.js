function setupCarousel(carousel) {
  if (carousel.dataset.ready) return;
  carousel.dataset.ready = '1';

  const INTERVAL = 5000;

  const dotsBox = carousel.querySelector('.dots');
  const slidesBox = carousel.querySelector('.slides');
  const slides = slidesBox.querySelectorAll('img');
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Image ' + (i + 1));
    dot.addEventListener('click', () => { goTo(i); restartTimer(); });
    dotsBox.appendChild(dot);
  });
  const dots = dotsBox.querySelectorAll('.dot');

  function goTo(i, smooth = true) {
    current = i;
    slidesBox.style.transition = smooth ? '' : 'none';
    slidesBox.style.transform = `translateX(${-i * 100}%)`;
    dots.forEach((d, n) => d.classList.toggle('active', n === i));
  }

  function next() { goTo((current + 1) % slides.length); }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  goTo(0, false);
  restartTimer();
}

document.querySelectorAll('.carousel').forEach(setupCarousel);
