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

// function validateName() {
//     const inputName = document.getElementById("infoEdit-userName").value;
//
//     // 이름의 길이가 2자 이상 10자 이하인지 확인
//     if (inputName.length < 2 || inputName.length > 10) {
//         document.getElementById("infoEdit-errMsgName").textContent =
//             "2자 이상 10자 이하로 입력해야 합니다";
//         document.getElementById("infoEdit-errMsgName").style.display = "block";
//         return false;
//     }
//
//     // 이름에 한글 또는 영어가 포함되어 있는지 확인
//     const regex = /^[가-힣a-zA-Z]+$/;
//     if (!regex.test(inputName)) {
//         document.getElementById("infoEdit-errMsgName").textContent =
//             "이름은 한글 또는 영어만 포함해야 합니다";
//         document.getElementById("infoEdit-errMsgName").style.display = "block";
//         return false;
//     }
//
//     document.getElementById("infoEdit-errMsgName").textContent = ""; // 오류 메시지 초기화
//     return true;
// }
//
// function validateNickName() {
//     const inputNickName = document.getElementById("infoEdit-userNickName").value;
//
//     // 2자 이상 10자 이하, 공백 없이 특수문자 '_'만 사용 가능
//
//     // 2자 이상 10자 이하인지 확인
//     if (inputNickName.length < 2 || inputNickName.length > 10) {
//         document.getElementById("infoEdit-errorMsgNkName").textContent =
//             "2자 이상 10자 이하로 입력해야 합니다";
//         document.getElementById("infoEdit-errorMsgNkName").style.display = "block";
//         return false;
//     }
//
//     // 공백 확인
//     if (inputNickName.includes(" ")) {
//         document.getElementById("infoEdit-errorMsgNkName").textContent =
//             "공백이 없어야 합니다";
//         document.getElementById("infoEdit-errorMsgNkName").style.display = "block";
//         return false;
//     }
//
//     // 특수문자 확인
//     const Regex = /^[가-힣a-zA-Z_]+$/;
//     if (!Regex.test(inputNickName)) {
//         document.getElementById("infoEdit-errorMsgNkName").textContent =
//             '공백 없이 특수문자 "_"만 사용 가능합니다';
//         document.getElementById("infoEdit-errorMsgNkName").style.display = "block";
//         return false;
//     }
//
//     document.getElementById("infoEdit-errorMsgNkName").textContent = ""; // 오류 메시지 초기화
//     return true;
// }

// 저장하기 버튼 시 알림 호출
// const buttons = document.querySelectorAll(".infoEdit-btnSave");
//
// buttons.forEach((button) => {
//     button.addEventListener("click", function () {
//         alert("수정이 완료되었습니다!");
//     });
// });

// 이름 유효성 검사
function validateName() {
    const inputName = document.getElementById("infoEdit-userName").value;
    const nameErrorMsg = document.getElementById("infoEdit-errMsgName");

    if (inputName.length < 2 || inputName.length > 10) {
        nameErrorMsg.textContent = "2자 이상 10자 이하로 입력해야 합니다";
        nameErrorMsg.style.display = "block";
        return false;
    }

    const regex = /^[가-힣a-zA-Z]+$/;
    if (!regex.test(inputName)) {
        nameErrorMsg.textContent = "이름은 한글 또는 영어만 포함해야 합니다";
        nameErrorMsg.style.display = "block";
        return false;
    }

    nameErrorMsg.textContent = "";
    nameErrorMsg.style.display = "none";
    return true;
}

// 닉네임 유효성 검사
function validateNickName() {
    const inputNickName = document.getElementById("infoEdit-userNickName").value;
    const nickNameErrorMsg = document.getElementById("infoEdit-errorMsgNkName");

    if (inputNickName.length < 2 || inputNickName.length > 10) {
        nickNameErrorMsg.textContent = "2자 이상 10자 이하로 입력해야 합니다";
        nickNameErrorMsg.style.display = "block";
        return false;
    }

    if (inputNickName.includes(" ")) {
        nickNameErrorMsg.textContent = "공백이 없어야 합니다";
        nickNameErrorMsg.style.display = "block";
        return false;
    }

    const Regex = /^[가-힣a-zA-Z_]+$/;
    if (!Regex.test(inputNickName)) {
        nickNameErrorMsg.textContent = '공백 없이 특수문자 "_"만 사용 가능합니다';
        nickNameErrorMsg.style.display = "block";
        return false;
    }

    nickNameErrorMsg.textContent = "";
    nickNameErrorMsg.style.display = "none";
    return true;
}

// 폼 제출 전 최종 유효성 검사
function validateForm(event) {
    const isNameValid = validateName();
    const isNickNameValid = validateNickName();

    if (!isNameValid || !isNickNameValid) {
        alert("입력한 정보를 확인해주세요.");
        event.preventDefault();  // 폼 제출 방지
        return false;
    }

    return true;
}

// 알림 메시지 표시
function showAlert() {
    alert("수정이 완료되었습니다!");
}

// 이벤트 리스너 등록
document.getElementById("infoEdit-userName").addEventListener("input", validateName);
document.getElementById("infoEdit-userNickName").addEventListener("input", validateNickName);

// 폼 제출 시 알림 표시
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    if (validateForm(event)) {
        showAlert();
    }
});
