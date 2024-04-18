$(".menu").on("click", checkMenuOn);

let $communityHiddenMenu = $(".communityHiddenMenu");

function checkMenuOn() {
  if ($communityHiddenMenu.css("display") === "none") {
    $communityHiddenMenu.css("display", "block");
  } else {
    $communityHiddenMenu.css("display", "none");
  }
};


