document.addEventListener("DOMContentLoaded", () => {
    const ckTag = document.getElementById("join-id_a");
    const evtBtnTag1 = document.getElementById("join-id_b");
    const evtBtnTag2 = document.getElementById("join-id_c");
    const evtBtnTag3 = document.getElementById("join-id_d");
    const evtBtnTag4 = document.getElementById("join-id_e");

    // 모든 evtBtnTag 체크박스가 체크되었는지 확인하는 함수
    function areAllChecked() {
        return evtBtnTag1.checked && evtBtnTag2.checked && evtBtnTag3.checked && evtBtnTag4.checked;
    }

    // 어떤 evtBtnTag 체크박스를 클릭했을 때 ckTag 업데이트
    function updateCkTag() {
        ckTag.checked = areAllChecked();
    }

    // ckTag에 대한 클릭 이벤트 리스너
    ckTag.addEventListener("click", (event) => {
        const chckValue = event.currentTarget.checked;

        evtBtnTag1.checked = chckValue;
        evtBtnTag2.checked = chckValue;
        evtBtnTag3.checked = chckValue;
        evtBtnTag4.checked = chckValue;
    });

    // evtBtnTag1부터 evtBtnTag4까지의 클릭 이벤트 리스너
    evtBtnTag1.addEventListener("click", updateCkTag);
    evtBtnTag2.addEventListener("click", updateCkTag);
    evtBtnTag3.addEventListener("click", updateCkTag);
    evtBtnTag4.addEventListener("click", updateCkTag);
});
