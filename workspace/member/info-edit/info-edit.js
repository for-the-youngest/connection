// 출생년도

$(document).ready(function () {
  let today = new Date();
  let year = today.getFullYear();

  //년도 selectbox 만들기
  for (i = 1900; i <= year; i++) {
    $(".infoEdit-birthYear").append(
      '<option value="' + i + '">' + i + "년" + "</option>"
    );
  }

  //월 selectbox 만들기
  for (i = 1; i <= 12; i++) {
    $(".infoEdit-birthMonth").append(
      '<option value="' + i + '">' + i + "월" + "</option>"
    );
  }

  //일 selectbox 만들기
  for (i = 1; i <= 31; i++) {
    $(".infoEdit-birthDay").append(
      '<option value="' + i + '">' + i + "일" + "</option>"
    );
  }
});

// 성별 라디오 버튼

// 라디오 버튼 요소 가져오기
const radios = document.querySelectorAll('input[type="radio"]');

// 라디오 버튼에 이벤트 리스너 추가
radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    // 현재 라디오 버튼이 체크되어 있는지 확인
    const isChecked = radio.checked;

    // 모든 라디오 버튼의 체크 상태 초기화
    radios.forEach((otherRadio) => {
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

// 이름, 닉네임 유효성 검사

function validateName() {
  const inputName = document.getElementById("infoEdit-userName").value;

  // 이름의 길이가 2자 이상 10자 이하인지 확인
  if (inputName.length < 2 || inputName.length > 10) {
    document.getElementById("infoEdit-errMsgName").textContent =
      "2자 이상 10자 이하로 입력해야 합니다";
    document.getElementById("infoEdit-errMsgName").style.display = "block";
    return false;
  }

  // 이름에 한글 또는 영어가 포함되어 있는지 확인
  const regex = /^[가-힣a-zA-Z]+$/;
  if (!regex.test(inputName)) {
    document.getElementById("infoEdit-errMsgName").textContent =
      "이름은 한글 또는 영어만 포함해야 합니다";
    document.getElementById("infoEdit-errMsgName").style.display = "block";
    return false;
  }

  document.getElementById("infoEdit-errMsgName").textContent = ""; // 오류 메시지 초기화
  return true;
}

function validateNickName() {
  const inputNickName = document.getElementById("infoEdit-userNickName").value;

  // 2자 이상 10자 이하, 공백 없이 특수문자 '_'만 사용 가능

  // 2자 이상 10자 이하인지 확인
  if (inputNickName.length < 2 || inputNickName.length > 10) {
    document.getElementById("infoEdit-errorMsgNkName").textContent =
      "2자 이상 10자 이하로 입력해야 합니다";
    document.getElementById("infoEdit-errorMsgNkName").style.display = "block";
    return false;
  }

  // 공백 확인
  if (inputNickName.includes(" ")) {
    document.getElementById("infoEdit-errorMsgNkName").textContent =
      "공백이 없어야 합니다";
    document.getElementById("infoEdit-errorMsgNkName").style.display = "block";
    return false;
  }

  // 특수문자 확인
  const Regex = /^[가-힣a-zA-Z_]+$/;
  if (!Regex.test(inputNickName)) {
    document.getElementById("infoEdit-errorMsgNkName").textContent =
      '공백 없이 특수문자 "_"만 사용 가능합니다';
    document.getElementById("infoEdit-errorMsgNkName").style.display = "block";
    return false;
  }

  document.getElementById("infoEdit-errorMsgNkName").textContent = ""; // 오류 메시지 초기화
  return true;
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
