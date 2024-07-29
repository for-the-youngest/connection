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

    // 필드 유효성 검사
    function validateField(input, validator, errorMsg) {
        const errorElement = getOrCreateErrorElement(input.parentElement, input.name + "Error");
        if (!validator(input.value)) {
            errorElement.textContent = errorMsg;
            input.classList.add('is-invalid');
            return false;
        } else {
            errorElement.textContent = "";
            input.classList.remove('is-invalid');
            return true;
        }
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

    // 생년월일 유효성 검사 (문자열로 처리)
    function validateDate(year, month, day) {
        const dateString = `${year}-${month}-${day}`;
        const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return dateRegex.test(dateString);
    }

    // 성별 유효성 검사 (M 또는 F)
    function validateGender(value) {
        return value === 'M' || value === 'F';
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
        validateField(genderSelect, validateGender, "성별을 선택해주세요.");
    });

    const yearInput = document.querySelector('input[name="memberYear"]');
    const monthInput = document.querySelector('input[name="memberMonth"]');
    const dayInput = document.querySelector('input[name="memberDay"]');
    function validateDateInputs() {
        const dateError = getOrCreateErrorElement(yearInput.parentElement, "dateError");
        let dateIsValid = validateDate(yearInput.value, monthInput.value, dayInput.value);
        if (!dateIsValid) {
            dateError.textContent = "생년월일은 올바른 형식으로 입력해야 합니다 (YYYY-MM-DD).";
        } else {
            dateError.textContent = "";
        }
        return dateIsValid;
    }
    yearInput.addEventListener('input', validateDateInputs);
    monthInput.addEventListener('input', validateDateInputs);
    dayInput.addEventListener('input', validateDateInputs);

    // 폼 제출 시 유효성 검사 실행
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let isValid = true;

        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.name === "memberName") {
                isValid = validateField(input, validateName, "이름은 2자 이상 10자 이하로 입력해야 합니다.") && isValid;
            } else if (input.name === "memberEmail") {
                isValid = validateField(input, validateEmail, "올바른 이메일 형식이 아닙니다.") && isValid;
            } else if (input.name === "memberPassword") {
                isValid = validateField(input, validatePassword, "비밀번호는 최소 6자 이상이어야 합니다.") && isValid;
            } else if (input.name === "confirmPassword") {
                const passwordInput = form.querySelector('input[name="memberPassword"]');
                isValid = validateField(input, value => passwordInput.value === value, "비밀번호와 비밀번호 확인이 일치하지 않습니다.") && isValid;
            } else if (input.name === "memberNickname") {
                isValid = validateField(input, validateNickname, "닉네임은 2자 이상 10자 이하로 입력하며, 알파벳, 숫자, 언더스코어(_), 한글을 사용할 수 있습니다.") && isValid;
            } else if (input.name === "memberGender") {
                isValid = validateField(input, validateGender, "성별을 선택해주세요.") && isValid;
            } else if (input.name === "memberYear" || input.name === "memberMonth" || input.name === "memberDay") {
                isValid = validateDateInputs() && isValid;
            }
        });

        if (isValid) {
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new URLSearchParams(formData),
                });

                const result = await response.json();

                if (response.ok) { // 성공 응답
                    alert(result.message);
                    window.location.href = '/connection/member/login';
                } else if (response.status === 409) { // 중복된 이메일 오류
                    alert(result.message || "이미 존재하는 이메일입니다.");
                } else { // 다른 오류
                    alert("회원가입 중 오류가 발생했습니다.");
                }
            } catch (error) {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        } else {
            alert("입력된 내용에 오류가 있습니다. 확인해주세요.");
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