fetch("header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-placeholder").innerHTML = data;
  });

fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

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



