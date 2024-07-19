let isFetchAndInsertCalled = false; // 중복 호출을 방지하기 위한 플래그

function fetchAndInsert() {
    // 이미 호출된 경우 중복 호출 방지
    if (isFetchAndInsertCalled) {
        return;
    }

    // 헤더를 가져오고 삽입
    fetch("../../../templates/non-member/layout/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data;

            // 헤더가 로드된 후에 이벤트 리스너 추가
            $(".header-menu").on("click", function () {
                let $headerCommunityHiddenMenu = $(".header-communityHiddenMenu");
                // 현재 display 속성을 가져와서 "none"인지 확인
                if ($headerCommunityHiddenMenu.css("display") === "none") {
                    $headerCommunityHiddenMenu.css("display", "block");
                } else {
                    $headerCommunityHiddenMenu.css("display", "none");
                }
            });
        });

    // 푸터를 가져옴
    fetch("../../../templates/non-member/layout/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        });
    // 호출되었음을 표시
    isFetchAndInsertCalled = true;
}

// 페이지 로드 시 fetchAndInsert 함수 실행
window.onload = fetchAndInsert;
