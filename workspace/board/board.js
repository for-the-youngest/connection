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

// function checkPageNum1(){
//   if($bpNbnumber1.css("color") === "#5079E2"){
//     $bpNbnumber1.css("color", "#D9D9D9");
//   }else{
//     $bpNbnumber1.css("color", "#5079E2");
//   }
// };

$(document).ready(function() {
  $('.bpNbnumber1').click(function() {
    var currentColor = $(this).css('color');
    if (currentColor === 'rgb(80, 121, 226)') {
      $(this).css('color', '#D9D9D9');
    } else {
      $(this).css('color', '#5079E2');
    }
  });
});

$(document).ready(function() {
  $('.b-pN--b-number').click(function() {
    var currentColor = $(this).css('color');
    if (currentColor === 'rgb(80, 121, 226)') {
      $(this).css('color', '#D9D9D9');
    } else {
      $(this).css('color', '#5079E2');
    }
  });
});

$(document).ready(function(){
  $(".downscrollButton").click(function(){
    $(".sortOrder").toggle();
  });
});


