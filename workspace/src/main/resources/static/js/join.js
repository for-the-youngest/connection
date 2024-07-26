document.addEventListener("DOMContentLoaded", () => {
    // 오류 메시지 요소 생성 함수
    function getOrCreateErrorElement(parentElement, id) {
        let errorElement = document.getElementById(id);
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = id;
            errorElement.style.color = "red";
            parentElement.appendChild(errorElement);
        }
        return errorElement;
    }

    // 이름 유효성 검사
    function validateName(value) {
        return value.trim().length >= 2 && value.trim().length <= 10;
    }

    // 이메일 유효성 검사
    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    // 비밀번호 유효성 검사
    function validatePassword(value) {
        return value.length >= 6;
    }

    // 닉네임 유효성 검사
    function validateNickname(value) {
        const nicknameRegex = /^[\w가-힣]{2,10}$/;
        return nicknameRegex.test(value);
    }

    // 생년월일 유효성 검사
    function validateDate(year, month, day) {
        return year.length === 4 && !isNaN(year) &&
            month.length === 2 && !isNaN(month) &&
            day.length === 2 && !isNaN(day);
    }

    // 폼의 각 필드에 대한 유효성 검사 수행
    function validateField(input, validator, errorMsg) {
        const errorElement = getOrCreateErrorElement(input.parentElement, input.name + "Error");
        if (!validator(input.value)) {
            errorElement.textContent = errorMsg;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }

    function validateForm() {
        let isValid = true;

        // 이름 유효성 검사
        const nameInput = document.querySelector('input[name="memberName"]');
        isValid = validateField(nameInput, validateName, "이름은 2자 이상 10자 이하로 입력해야 합니다.") && isValid;

        // 이메일 유효성 검사
        const emailInput = document.querySelector('input[name="memberEmail"]');
        isValid = validateField(emailInput, validateEmail, "올바른 이메일 형식이 아닙니다.") && isValid;

        // 비밀번호 유효성 검사
        const passwordInput = document.querySelector('input[name="memberPassword"]');
        const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
        const passwordError = getOrCreateErrorElement(passwordInput.parentElement, "passwordError");
        let passwordIsValid = true;
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = "비밀번호는 최소 6자 이상이어야 합니다.";
            passwordIsValid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
            passwordIsValid = false;
        } else {
            passwordError.textContent = "";
        }
        isValid = passwordIsValid && isValid;

        // 닉네임 유효성 검사
        const nicknameInput = document.querySelector('input[name="memberNickname"]');
        isValid = validateField(nicknameInput, validateNickname, "닉네임은 2자 이상 10자 이하로 입력하며, 알파벳, 숫자, 언더스코어(_), 한글을 사용할 수 있습니다.") && isValid;

        // 성별 선택 유효성 검사
        const genderSelect = document.querySelector('select[name="memberGender"]');
        const genderError = getOrCreateErrorElement(genderSelect.parentElement, "genderError");
        if (genderSelect.value === "0") {
            genderError.textContent = "성별을 선택해주세요.";
            isValid = false;
        } else {
            genderError.textContent = "";
        }

        // 생년월일 유효성 검사
        const yearInput = document.querySelector('input[name="memberYear"]');
        const monthInput = document.querySelector('input[name="memberMonth"]');
        const dayInput = document.querySelector('input[name="memberDay"]');
        const dateError = getOrCreateErrorElement(yearInput.parentElement, "dateError");
        if (!validateDate(yearInput.value, monthInput.value, dayInput.value)) {
            dateError.textContent = "생년월일은 올바른 형식으로 입력해야 합니다 (YYYY-MM-DD).";
            isValid = false;
        } else {
            dateError.textContent = "";
        }

        // 전체 동의 체크박스 유효성 검사
        const allAgreeCheckbox = document.getElementById("join-id_a");
        const requiredChecks = document.querySelectorAll('input[name="checkBox"]');
        const agreeError = getOrCreateErrorElement(allAgreeCheckbox.parentElement, "agreeError");
        if (!allAgreeCheckbox.checked) {
            agreeError.textContent = "모든 필수 동의 사항을 체크해야 합니다.";
            isValid = false;
        } else if (requiredChecks.length > 0 && !Array.from(requiredChecks).every(checkbox => checkbox.checked)) {
            agreeError.textContent = "모든 필수 체크박스를 체크해야 합니다.";
            isValid = false;
        } else {
            agreeError.textContent = "";
        }

        return isValid;
    }

    // 필드별 이벤트 리스너 등록
    function registerFieldValidation(input, validator, errorMsg) {
        input.addEventListener('input', () => validateField(input, validator, errorMsg));
    }

    registerFieldValidation(document.querySelector('input[name="memberName"]'), validateName, "이름은 2자 이상 10자 이하로 입력해야 합니다.");
    registerFieldValidation(document.querySelector('input[name="memberEmail"]'), validateEmail, "올바른 이메일 형식이 아닙니다.");
    registerFieldValidation(document.querySelector('input[name="memberNickname"]'), validateNickname, "닉네임은 2자 이상 10자 이하로 입력하며, 알파벳, 숫자, 언더스코어(_), 한글을 사용할 수 있습니다.");
    registerFieldValidation(document.querySelector('input[name="memberPassword"]'), validatePassword, "비밀번호는 최소 6자 이상이어야 합니다.");
    document.querySelector('input[name="confirmPassword"]').addEventListener('input', () => {
        const passwordInput = document.querySelector('input[name="memberPassword"]');
        validateField(document.querySelector('input[name="confirmPassword"]'), value => passwordInput.value === value, "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    });

    document.querySelector('select[name="memberGender"]').addEventListener('change', () => {
        const genderSelect = document.querySelector('select[name="memberGender"]');
        const genderError = getOrCreateErrorElement(genderSelect.parentElement, "genderError");
        if (genderSelect.value === "0") {
            genderError.textContent = "성별을 선택해주세요.";
        } else {
            genderError.textContent = "";
        }
    });

    const yearInput = document.querySelector('input[name="memberYear"]');
    const monthInput = document.querySelector('input[name="memberMonth"]');
    const dayInput = document.querySelector('input[name="memberDay"]');
    function validateDate() {
        const dateError = getOrCreateErrorElement(yearInput.parentElement, "dateError");
        let dateIsValid = validateDate(yearInput.value, monthInput.value, dayInput.value);
        if (!dateIsValid) {
            dateError.textContent = "생년월일은 올바른 형식으로 입력해야 합니다 (YYYY-MM-DD).";
        } else {
            dateError.textContent = "";
        }
        return dateIsValid;
    }
    yearInput.addEventListener('input', validateDate);
    monthInput.addEventListener('input', validateDate);
    dayInput.addEventListener('input', validateDate);

    // 폼 제출 시 유효성 검사 실행
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        if (!validateForm()) {
            event.preventDefault(); // 유효성 검사 실패 시 폼 제출 방지
            alert("입력된 내용에 오류가 있습니다. 확인해주세요.");
        } else {
            alert("가입이 완료되었습니다!");
        }
    });

    // 기존 체크박스 코드 유지
    const ckTag = document.getElementById("join-id_a");
    const evtBtnTag1 = document.getElementById("join-id_b");
    const evtBtnTag2 = document.getElementById("join-id_c");
    const evtBtnTag3 = document.getElementById("join-id_d");
    const evtBtnTag4 = document.getElementById("join-id_e");

    function areAllChecked() {
        return evtBtnTag1.checked && evtBtnTag2.checked && evtBtnTag3.checked && evtBtnTag4.checked;
    }

    function updateCkTag() {
        ckTag.checked = areAllChecked();
    }

    ckTag.addEventListener("click", (event) => {
        const chckValue = event.currentTarget.checked;
        evtBtnTag1.checked = chckValue;
        evtBtnTag2.checked = chckValue;
        evtBtnTag3.checked = chckValue;
        evtBtnTag4.checked = chckValue;
    });

    evtBtnTag1.addEventListener("click", updateCkTag);
    evtBtnTag2.addEventListener("click", updateCkTag);
    evtBtnTag3.addEventListener("click", updateCkTag);
    evtBtnTag4.addEventListener("click", updateCkTag);
});