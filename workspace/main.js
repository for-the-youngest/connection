let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.rank-ctn');
    const tables = document.querySelectorAll('table');

    function changeSlide(direction) {
        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

        // 현재 슬라이드로 이동
        slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.style.transform = 'translateX(0)';
            } else if (index === currentSlideIndex - 1 || (currentSlideIndex === 0 && index === slides.length - 1)) {
                slide.style.transform = 'translateX(-100%)';
            } else if (index === currentSlideIndex + 1 || (currentSlideIndex === slides.length - 1 && index === 0)) {
                slide.style.transform = 'translateX(100%)';
            } else {
                slide.style.transform = 'translateX(200%)';
            }
        });

        // 현재 테이블로 이동
        tables.forEach((table, index) => {
            if (index === currentSlideIndex) {
                table.classList.add('rank-show');
            } else {
                table.classList.remove('rank-show');
            }
        });
    }