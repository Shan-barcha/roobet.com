function setupCarousel(targetId) {
    const gap = 16;
    const carousel = document.getElementById(targetId);
    const content = carousel.querySelector(".content");
    const next = document.querySelector(`[data-target="${targetId}"].next`);
    const prev = document.querySelector(`[data-target="${targetId}"].prev`);
  
    let width = carousel.offsetWidth;
  
    next.addEventListener("click", () => {
      carousel.scrollBy(width + gap, 0);
      updateButtonDisplay();
    });
  
    prev.addEventListener("click", () => {
      carousel.scrollBy(-(width + gap), 0);
      updateButtonDisplay();
    });
  
    window.addEventListener("resize", () => (width = carousel.offsetWidth));
  
    // function updateButtonDisplay() {
    //   prev.disabled = carousel.scrollLeft === 0;
    //   next.disabled =
    //     carousel.scrollWidth - width - gap <= carousel.scrollLeft + width;
    // }
    
    // // Initial button display
    // updateButtonDisplay();
  }
  
  // Setup carousels
  setupCarousel("carousel1");
  setupCarousel("carousel2");
  setupCarousel("carousel3");
  setupCarousel("carousel4");
  setupCarousel("carousel5");
  setupCarousel("carousel6");


  // Add more if needed
  