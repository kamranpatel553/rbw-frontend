  const grid = document.getElementById('clientsGrid');
    const dotsContainer = document.getElementById('dots');
    const cards = document.querySelectorAll('.client-card');
    const perSlide = 4;
    let currentIndex = 0;
    const totalSlides = Math.ceil(cards.length / perSlide);

    function createDots() {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function moveToSlide(index) {
      currentIndex = index;
      const offset = index * 100;
      grid.style.transform = `translateX(-${offset}%)`;
      document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }

    createDots();
