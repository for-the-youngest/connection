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


// 출생년도

$(document).ready(function () {
  let today = new Date();
  let year = today.getFullYear();

  //년도 selectbox 만들기
  for (i = 1900; i <= year; i++) {
    $('.infoEdit-birthYear').append('<option value="' + i + '">' + i + "년" + '</option>');
  }

  //월 selectbox 만들기
  for (i = 1; i <= 12; i++) {
    $('.infoEdit-birthMonth').append('<option value="' + i + '">' + i + "월" + '</option>');
  }


  //일 selectbox 만들기
  for (i = 1; i <= 31; i++) {
    $('.infoEdit-birthDay').append('<option value="' + i + '">' + i + "일" + '</option>');
  }

});

// 성별 라디오 버튼

// 라디오 버튼 요소 가져오기
const radios = document.querySelectorAll('input[type="radio"]');

// 라디오 버튼에 이벤트 리스너 추가
radios.forEach(radio => {
  radio.addEventListener('click', () => {
    // 현재 라디오 버튼이 체크되어 있는지 확인
    const isChecked = radio.checked;

    // 모든 라디오 버튼의 체크 상태 초기화
    radios.forEach(otherRadio => {
        if (otherRadio !== radio) {
            otherRadio.checked = false;
        }
    });

    // 체크된 경우에만 체크 상태 유지
    if (isChecked) {
        radio.checked = true;
    }

  });
});

//이름, 닉네임 유효성 검사

function checkName(){
  var name = document.getElementById("infoEdit-userName").value;
  var nameErrorDiv = document.getElementById("infoEdit-errMsgName");
}

