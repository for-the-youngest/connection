$(".menu").on("click", checkMenuOn);
// $(".b-pN--b-number").on("click", checkPageNum);
// $(".bpNbnumber1").on("click", checkPageNum1);



let $communityHiddenMenu = $(".communityHiddenMenu");
// let $bpNbnumber1 = $(".bpNbnumber1");
// let #b-pN--b-number = $(".b-pN-b-number");

function checkMenuOn() {
  // 현재 display 속성을 가져와서 "none"인지 확인
  if ($communityHiddenMenu.css("display") === "none") {
    $communityHiddenMenu.css("display", "block");
  } else {
    $communityHiddenMenu.css("display", "none");
  }
};