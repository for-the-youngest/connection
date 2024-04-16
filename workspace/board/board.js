$(".header-menu").on("click", checkMenuOn);

let $headerCommunityHiddenMenu = $(".header-communityHiddenMenu");

function checkMenuOn() {
  // 현재 display 속성을 가져와서 "none"인지 확인
  if ($headerCommunityHiddenMenu.css("display") === "none") {
    $headerCommunityHiddenMenu.css("display", "block");
  } else {
    $headerCommunityHiddenMenu.css("display", "none");
  }
}

// $(document).ready(function() {
//   $('.main-pageNumberNum1').click(function() {
//     var currentColor = $(this).css('color');
//     if (currentColor === 'rgb(80, 121, 226)') {
//       $(this).css('color', '#a5a5a5');
//     } else {
//       $(this).css('color', '#5079E2');
//     }
//   });
// });

// $(document).ready(function() {
//   $('.main-pageNumberNum').click(function() {
//     var currentColor = $(this).css('color');
//     if (currentColor === 'rgb(80, 121, 226)') {
//       $(this).css('color', '#a5a5a5');
//     } else {
//       $(this).css('color', '#5079E2');
//     }
//   });
// });

// $(document).ready(function(){
//   $(".main-downscrollButton").click(function(){
//     $(".main-sortOrder").toggle();
//   });
// });
