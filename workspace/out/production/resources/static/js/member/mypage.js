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

$(".main-leave").on("click", leaveOn);

let $mypageLeaveModal = $(".mypage-leaveModal");

function leaveOn() {
    // 현재 display 속성을 가져와서 "none"인지 확인
    if ($mypageLeaveModal.css("display") === "none") {
        $mypageLeaveModal.css("display", "block");
        $(".main").css("opacity", 0.20)
        $(".footer").css("opacity", 0.20)
    }
};

$(".modal-barButton").on("click", leaveOff);

function leaveOff() {
    // 현재 display 속성을 가져와서 "none"인지 확인
    if ($mypageLeaveModal.css("display") === "block") {
        $mypageLeaveModal.css("display", "none");
        $(".main").css("opacity", 1)
        $(".footer").css("opacity", 1)
    }
};



