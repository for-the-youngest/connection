let currentIndex = 0;
    const totalImages = 3; // 총 이미지 수
    const totalTables = 3; // 총 테이블 수

    function changeImage(direction) {
        currentIndex = (currentIndex + direction + totalImages) % totalImages;

        // 이미지를 순환하도록 클래스 조작
        const images = document.querySelectorAll('.rank-img');
        images.forEach((image, index) => {
          if (index === currentIndex) {
              image.classList.add('active');
          } else {
              image.classList.remove('active');
          }
      });

      // 테이블도 순환하도록 클래스 조작
      const tables = document.querySelectorAll('table');
      tables.forEach((table, index) => {
          if (index === currentIndex) {
              table.classList.add('rank-show');
          } else {
              table.classList.remove('rank-show');
          }
      });
  }
    
