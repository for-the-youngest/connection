function password() {
    var p1 = document.getElementById("passwordre-passwordcheck").value;
    var p2 = document.getElementById("passwordre-passwordrecheck").value;

    if (p1 != p2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    } else {
        alert("비밀번호가 일치합니다.");
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
