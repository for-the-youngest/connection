import * as postModule from "./reply.js";
let page = 1;
let hasNext = true;

// 삭제 버튼 처리
let $removeBtn = document.querySelector(".remove");

$removeBtn?.addEventListener("click", function () {
    let freeboardNumber = this.dataset.id;
    if (confirm("정말 삭제 하시겠습니까?")) {
        location.href = `/connection/board/remove?freeboardNumber=${freeboardNumber}`;
    }
});

// 좋아요 버튼 구현
var btn = document.getElementById("like")

btn.addEventListener('click',function(){
    btn.classList.toggle('active')
})

// 페이지가 로드되었을 때 실행
document.addEventListener('DOMContentLoaded', () => {
    // 'leaguePost-showListButton' 요소를 선택합니다.
    const showListButton = document.getElementById('leaguePost-showListButton');

    // 요소가 존재하는지 확인합니다.
    if (showListButton) {
        // 버튼이 존재할 때만 이벤트 리스너를 추가합니다.
        showListButton.addEventListener('click', () => {
            // 'leaguePost-list' 요소를 선택합니다.
            const list = document.getElementById('leaguePost-list');

            // 'leaguePost-list' 요소가 존재할 때만 동작합니다.
            if (list) {
                // 요소의 표시 상태를 토글합니다.
                if (list.style.display === 'none' || list.style.display === '') {
                    list.style.display = 'block';
                } else {
                    list.style.display = 'none';
                }
            } else {
                console.error('Element with ID "leaguePost-list" not found.');
            }
        });
    } else {
        console.error('Element with ID "leaguePost-showListButton" not found.');
    }
});

//상세 페이지에서 이미지 띄우기
let freeboardNumber = document.querySelector('#freeboardNumber').value;
displayImgAjax(); //이미지 표시 함수 호출
//Ajax : Asynchronous JavaScript and XML
// JS와 XML을 활용하여 비동기 통신으로 데이터를 교환하는 기법
// Ajax라는 기술을 활용하는 방법은 여러가지가 있지만 우리는 fetchAPI를 사용한다.
function displayImgAjax() {
    // fetch()함수는 js에 내장된 함수이므로 바로 사용하면된다.
    /*
    fetch('api주소', {설정객체})
        .then(함수)       // api에서 보낸 응답을 then으로 받는다.
        .then(함수);      // 위의 then에서 반환하는 값을 여기서 받는다.

     */
    // fetch(`/v1/boards/${boardId}/files`, {method : 'GET'})
    //     .then(res => res.json()) // 응답을 받아서 데이터를 변환하고 다음 then으로 넘겨준다.
    //     .then(data => console.log(data))  // 위에서 넘겨준 데이터를 올바르게 처리한다.


    fetch(`/v1/boards/${freeboardNumber}/files`, {method: 'GET'})
        //서버에 GET요청을 보내 파일 목록을 가져옴
        .then(res => res.json())//응답을 JSON으로 변환
        .then(list => { //변환된 데이터를 list 변수에 저장
            let tags = ''; //HTML 태그를 저장할 변수 초기화

            console.log(list);
            for (let i = 0; i < list.length; i++) {
                let fileName = list[i].fileExt + '/' + list[i].fileServer + '_' + list[i].fileUser;
                //파일 경로 조합

                tags += ` <img src="/v1/files?fileName=${fileName}" data-id="${list[i].fileNumber}" data-name="${fileName}"/> `;
            }

            let $postImgs = document.querySelector('.post-images'); //이미지가 삽입될 요소

            $postImgs.innerHTML = tags; //생성된 html 태그를 삽입
        });
}

// ================================================================================================================

// 댓글 작성 및 처리
let $btnComment = document.querySelector('.leaguePost-commentSubmit');

$btnComment?.addEventListener("click", function () {
    let content = document.querySelector('#replyContent').value;

    if (!content) {
        alert("댓글을 입력해주세요.");
        return;
    }

    let commentInfo = {
        freeboardNumber: freeboardNumber,
        content: content
    };

    postModule.registerComment(commentInfo, () => {
        document.querySelector('#replyContent').value = '';
        page = 1;
        postModule.getCommentList2(freeboardNumber, page, function (data) {
            hasNext = data.hasNext;
            displayComment(data.contentList);
        });
    });
});

postModule.getCommentList2(freeboardNumber, page, function (data) {
    hasNext = data.hasNext;
    displayComment(data.contentList);
});

window.addEventListener('scroll', function () {
    if (!hasNext) return;

    let { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        page++;
        postModule.getCommentList2(freeboardNumber, page, function (data) {
            hasNext = data.hasNext;
            appendComment(data.contentList);
        });
    }
});

let memberNumber = document.querySelector('#memberNumber').value;

function displayComment(commentList) {
    let $commentWrap = document.querySelector('.leaguePost-commentCtn');
    let tags = '';

    commentList.forEach(e => {
        tags += `
            <div class="comments-list-own" data-id="${e.replyNumber}">
                <div class="leaguePost-replyCtn">
                    <div class="leaguePost-commentProfile">
                        <p class="leaguePost-commentProfileImg">🌌</p>
                    </div>
                    <div class="leaguePost-commentUserNickname">
                        <p class="leaguePost-commentUserNicknameText">${e.memberName}</p>
                        <p class="leaguePost-commentdate">${postModule.timeForToday(e.replyDate)}</p>
                    </div>
                </div>
                <div class="leaguePost-commentContentCtn">
                    <p class="leaguePost-commentContent">${e.replyContent}</p>
                    <div class="leaguePost-commentMenu">
                        <ul id="leaguePost-commentHidden">
                            <li>${e.memberNumber == memberNumber ? '<div class="comments-menuButton">삭제하기</div>' : ''}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
    });

    $commentWrap.innerHTML = tags;
}

function appendComment(commentList) {
    let $commentWrap = document.querySelector('.leaguePost-commentCtn');
    let tags = '';

    commentList.forEach(e => {
        tags += `
            <div class="comments-list-own" data-id="${e.replyNumber}">
                <div class="leaguePost-replyCtn">
                    <div class="leaguePost-commentProfile">
                        <p class="leaguePost-commentProfileImg">🌌</p>
                    </div>
                    <div class="leaguePost-commentUserNickname">
                        <p class="leaguePost-commentUserNicknameText">${e.memberName}</p>
                        <p class="leaguePost-commentdate">${postModule.timeForToday(e.replyDate)}</p>
                    </div>
                </div>
                <div class="leaguePost-commentMenu">
                    <ul id="leaguePost-commentHidden">
                        <li>${e.memberNumber == memberNumber ? '<div class="comments-menuButton">삭제하기</div>' : ''}</li>
                    </ul>
                </div>
                <div class="leaguePost-commentContentCtn">
                    <p class="leaguePost-commentContent">${e.replyContent}</p>
                </div>
            </div>`;
    });

    $commentWrap.insertAdjacentHTML("beforeend", tags);
}

let $commentWrap = document.querySelector('.leaguePost-commentCtn');

$commentWrap.addEventListener('click', function (e) {
    let $target = e.target;
    if ($target.classList.contains('comments-menuButton')) {
        let replyNumber = $target.closest('.comments-list-own').dataset.id;

        if (confirm("삭제하시겠습니까?")) {
            postModule.remove(replyNumber, () => {
                page = 1;
                postModule.getCommentList2(freeboardNumber, page, function (data) {
                    hasNext = data.hasNext;
                    displayComment(data.contentList);
                });
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var replyInput = document.getElementById('replyContent');
    var submitButton = document.getElementById('text');

    replyInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });
});
