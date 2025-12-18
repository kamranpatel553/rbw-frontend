 const track = document.querySelector(".slider-track");
    const dots = document.querySelectorAll(".dot");
    let index = 0;

    function showSlide(i) {
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[i].classList.add("active");
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
      });
    });

    setInterval(() => {
      index = (index + 1) % dots.length;
      showSlide(index);
    }, 4000);
