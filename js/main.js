document.addEventListener("DOMContentLoaded", function () {
  let mainSwiper, previewSwiper;

  const mainSwiperEl = document.querySelector(".topic-sec.game-page-sec");
  const previewSwiperEl = document.querySelector(".game-page-slider-preview");

  if (mainSwiperEl && previewSwiperEl) {
    // === Preview Swiper ===
    previewSwiper = new Swiper(previewSwiperEl, {
      loop: false,
      slidesPerView: 10,
      spaceBetween: 10,
      centeredSlides: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      freeMode: false,
      centeredSlides: false,
    });

    // === Main Swiper ===
    mainSwiper = new Swiper(mainSwiperEl, {
      slidesPerView: 1,
      loop: false,
      speed: 600,
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      on: {
        slideChange() {
          const idx = this.realIndex;
          syncPreviewActive(idx);
          this.update();
        },
        transitionEnd() {
          const previousSlide = this.slides[this.previousIndex];
          if (!previousSlide) return;
          
          const videoContainer = previousSlide.querySelector('.video-container');
          if (videoContainer) {
            previousSlide.removeChild(videoContainer);
            const playButton = previousSlide.querySelector('.play-button');
            if(playButton) {
              playButton.style.display = '';
            }
          }
          this.update();
        },
      },
      breakpoints: {
        0: {
          navigation: {
            nextEl: ".gamepage-demo-button-next",
            prevEl: ".gamepage-demo-button-prev",
          },
        },
        698: {
          navigation: false,
        }
      }
    });

    mainSwiper.el.addEventListener('click', function(event) {
      const playButton = event.target.closest('.play-button');
      if (playButton) {
          const slide = playButton.closest('.video-slide');
          if (slide && !slide.querySelector('iframe')) {
              const videoId = slide.dataset.videoId;
              if (videoId) {
                  const image = slide.querySelector('img');
                  if (image) {
                    slide.dataset.originalSrc = image.getAttribute('src');
                    slide.dataset.originalAlt = image.getAttribute('alt');
                  }
                  
                  stopAutoplay();

                  const iframeContainer = document.createElement('div');
                  iframeContainer.classList.add('video-container');

                  const iframe = document.createElement('iframe');
                  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&si=qqYoIzq8BBTntgrZ`;
                  iframe.title = "YouTube video player";
                  iframe.frameBorder = "0";
                  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                  iframe.referrerPolicy = "strict-origin-when-cross-origin";
                  iframe.allowFullscreen = true;

                  iframeContainer.appendChild(iframe);
                  slide.insertBefore(iframeContainer, image);
                  playButton.style.display = 'none';
              }
          }
      }
    });

    previewSwiper.on("click", (swiper) => {
      const clickedIndex = swiper.clickedIndex;
      if (typeof clickedIndex !== "undefined") {
        mainSwiper.slideToLoop(clickedIndex);
        stopAutoplay();
        syncPreviewActive(clickedIndex);
      }
    });

    function syncPreviewActive(index) {
      previewSwiper.slides.forEach((slide, i) => {
        slide.classList.toggle("active", i % previewSwiper.slides.length === index);
      });
      previewSwiper.slideToLoop(index);
    }

    function stopAutoplay() {
      if (mainSwiper.autoplay.running) {
        mainSwiper.autoplay.stop();
      }
    }

    [mainSwiper.el, previewSwiper.el].forEach((el) => {
      el.addEventListener("mousedown", stopAutoplay);
      el.addEventListener("touchstart", stopAutoplay);
    });

    syncPreviewActive(0);
  }

  // About Gallery 
  const aboutGalleryEl = document.querySelector(".about-gallery");
  if (aboutGalleryEl) {
    let aboutGallery = new Swiper(aboutGalleryEl, {
        effect: "flip",
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
    });
  }

  // Game Soft Slider 
  const gameDemoSliderEls = document.querySelectorAll(".gamesoft-demo-slider");
  if (gameDemoSliderEls.length > 0) {
    gameDemoSliderEls.forEach(slider => {
      new Swiper(slider, {
          spaceBetween: 30,
          autoplay: {
              delay: 2500,
              disableOnInteraction: true,
          },
      });
    });
  }

  // Game Info Pronty Effect
  const turb = document.getElementById("turbulence-pronty");
  if (turb) {
    gsap.to(turb, {
        attr: { baseFrequency: "0.015 0.025" },
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
  }

});
