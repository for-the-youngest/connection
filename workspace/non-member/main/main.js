// //슬라이드 이미지 감싸고 있는 부모요소
let $bannerBox = $(".main-rank-div");
// //슬라이드 이미지
let $bannerImgs = $(".main-backgroundImg");

//슬라이드 이미지 너비
<<<<<<< HEAD
let bannerWidth = 1263;
=======
let bannerWidth = 2328;
>>>>>>> mBw
//슬라이드 이미지 인덱스 번호
let currentIdx = 0;
//총 슬라이드 이미지 수
let slideCnt = 3;

console.log(`slideCnt : ${slideCnt}`);

$(".main-nextBtn-slide").on("click", moveNext);
function moveNext() {
<<<<<<< HEAD
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
=======
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
>>>>>>> mBw
});

checkEnd();

//처음 이미지와 마지막 이미지는 화살표 감추기
function checkEnd() {
<<<<<<< HEAD
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

$(".header-menu").on("click", checkMenuOn);

let $headerCommunityHiddenMenu = $(".header-communityHiddenMenu");

function checkMenuOn() {
  // 현재 display 속성을 가져와서 "none"인지 확인
    if ($headerCommunityHiddenMenu.css("display") === "none") {
    $headerCommunityHiddenMenu.css("display", "block");
    } else {
    $headerCommunityHiddenMenu.css("display", "none");
    }
};




=======
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
>>>>>>> mBw
