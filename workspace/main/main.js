// //슬라이드 이미지 감싸고 있는 부모요소
let $bannerBox = $(".main-rank-div");
// //슬라이드 이미지
let $bannerImgs = $(".main-backgroundImg");

//슬라이드 이미지 너비
let bannerWidth = 1263;
//슬라이드 이미지 인덱스 번호
let currentIdx = 0;
//총 슬라이드 이미지 수
let slideCnt = 3;

console.log(`slideCnt : ${slideCnt}`);

$(".main-nextBtn-slide").on("click", moveNext);
function moveNext() {
  console.log(`슬라이드 다음 클릭`);
  currentIdx++;
  console.log(`currentIdx : ${currentIdx}`);

  $bannerBox.css("left", -(currentIdx * bannerWidth));
  $bannerBox.css("transition", "0.5s ease");
  checkEnd();
}

$(".main-prevBtn-slide").on("click", function () {
  console.log(`슬라이드 이전 클릭`);
  currentIdx--;
  console.log(`currentIdx : ${currentIdx}`);

  $bannerBox.css("left", -(currentIdx * bannerWidth));
  $bannerBox.css("transition", "0.5s ease");
  checkEnd();
});

checkEnd();

//처음 이미지와 마지막 이미지는 화살표 감추기
function checkEnd() {
  if (currentIdx <= 0) {
    $(".main-prevBtn-slide").css("display", "none");
  } else {
    $(".main-prevBtn-slide").css("display", "block");
  }

  if (currentIdx >= slideCnt - 1) {
    $(".main-nextBtn-slide").css("display", "none");
  } else {
    $(".main-nextBtn-slide").css("display", "block");
  }
}
