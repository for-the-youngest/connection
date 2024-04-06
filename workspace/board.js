$(".menu").on("click", checkMenuOn);

let $communityHiddenMenu = $(".communityHiddenMenu");

function checkMenuOn() {
  // 현재 display 속성을 가져와서 "none"인지 확인
  if ($communityHiddenMenu.css("display") === "none") {
    $communityHiddenMenu.css("display", "block");
  } else {
    $communityHiddenMenu.css("display", "none");
  }
};


