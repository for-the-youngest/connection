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