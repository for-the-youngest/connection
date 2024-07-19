//로그아웃
let $asidelogout = $("#mypage-asidelogout");
let asidelogout_value = false;
$asidelogout.on('click',()=>{
    asidelogout_value = confirm("로그아웃하시겠습니까?")
    if(asidelogout_value){
        location.href = `/connection/member/logout`;
    }
});

//탈퇴하기
let $asidesecession = $("#mypage-asidesecession");
let asidesecession_value = false;
$asidesecession.on('click',()=>{
    asidesecession_value = confirm("탈퇴하시겠습니까?")
    if(asidesecession_value){
        location.href = `/connection/member/leave`;
    }
});

// $(".main-leave").on("click", leaveOn);
//
// let $mypageLeaveModal = $(".mypage-leaveModal");
//
// function leaveOn() {
//     // 현재 display 속성을 가져와서 "none"인지 확인
//     if ($mypageLeaveModal.css("display") === "none") {
//         $mypageLeaveModal.css("display", "block");
//         $(".main").css("opacity", 0.20)
//         $(".footer").css("opacity", 0.20)
//     }
// };
//
// $(".modal-barButton").on("click", leaveOff);
//
// function leaveOff() {
//     // 현재 display 속성을 가져와서 "none"인지 확인
//     if ($mypageLeaveModal.css("display") === "block") {
//         $mypageLeaveModal.css("display", "none");
//         $(".main").css("opacity", 1)
//         $(".footer").css("opacity", 1)
//     }
// };



