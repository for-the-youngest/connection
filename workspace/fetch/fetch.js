// let isFetchAndInsertCalled = false; // 중복 호출을 방지하기 위한 플래그

function fetchAndInsert() {
  // 이미 호출된 경우 중복 호출 방지
  if (isFetchAndInsertCalled) {
    return;
  }

  // 헤더를 가져옴
  fetch("../header/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });

  // 푸터를 가져옴
  fetch("../login/footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

  // 호출되었음을 표시
  isFetchAndInsertCalled = true;
}

// 페이지 로드 시 fetchAndInsert 함수 실행
window.onload = fetchAndInsert;

// let isFetchAndInsertCalled = false; // 중복 호출을 방지하기 위한 플래그

// function fetchAndInsert() {
//   // 이미 호출된 경우 중복 호출 방지
//   if (isFetchAndInsertCalled) {
//     return;
//   }
//   // 호출되었음을 표시
//   isFetchAndInsertCalled = true;

//   // 헤더를 가져옴
//   //   fetch("../header/header.html")
//   //   .then((response) => response.text())
//   //   .then((data) => {
//   //     document.getElementById("header").innerHTML = data;
//   //   });

//   // 푸터를 가져옴

//   fetch("../footer/footer.html")
//     .then((response) => response.text())
//     .then((data) => {
//       document.getElementById("footer").innerHTML = data;
//     });
// }

// // 페이지 로드 시 fetchAndInsert 함수 실행
// window.onload = fetchAndInsert;

// // 이미 호출된 경우 중복 호출 방지
// if (isFetchAndInsertCalled) {
//   return;
// }
// // 호출되었음을 표시
// isFetchAndInsertCalled = true;
