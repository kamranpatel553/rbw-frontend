document.addEventListener('DOMContentLoaded', function() {
      const sliders = document.querySelectorAll('.slider-container');

      sliders.forEach(slider => {
        const beforeImg = slider.querySelector('.before-image');
        const afterImg = slider.querySelector('.after-image');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;

        // Initialize handle at center
        handle.style.left = '50%';

        // Mouse events
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        // Touch events
        handle.addEventListener('touchstart', startDragTouch);
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDrag);

        function startDrag(e) {
          e.preventDefault();
          isDragging = true;
        }

        function startDragTouch(e) {
          e.preventDefault();
          isDragging = true;
        }

        function drag(e) {
          if (!isDragging) return;

          const rect = slider.getBoundingClientRect();
          let x = e.clientX - rect.left;

          // Clamp between 0 and 100%
          x = Math.max(0, Math.min(x, rect.width));
          const percent = (x / rect.width) * 100;

          // Update handle position
          handle.style.left = `${percent}%`;

          // Update image widths
          beforeImg.style.width = `${percent}%`;
          afterImg.style.width = `${100 - percent}%`;
        }

        function dragTouch(e) {
          if (!isDragging) return;

          const rect = slider.getBoundingClientRect();
          let x = e.touches[0].clientX - rect.left;

          // Clamp between 0 and 100%
          x = Math.max(0, Math.min(x, rect.width));
          const percent = (x / rect.width) * 100;

          handle.style.left = `${percent}%`;
          beforeImg.style.width = `${percent}%`;
          afterImg.style.width = `${100 - percent}%`;
        }

        function stopDrag() {
          isDragging = false;
        }
      });
    });