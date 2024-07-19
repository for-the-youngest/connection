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

// 게시글 메뉴 버튼 눌렀을때 목록 나오게하기
document.getElementById('leaguePost-showListButton').addEventListener('click', function() {
    var list = document.getElementById('leaguePost-list');
    if (list.style.display === 'none') {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
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

let $btnComment = document.querySelector('.leaguePost-commentSubmit');

$btnComment?.addEventListener("click", function () {
    let content = document.querySelector('#replyContent').value;

    if(!content){
        alert("댓글을 입력해주세요.");
        return;
    }

    console.log(content);

    let commentInfo = {
        freeboardNumber : freeboardNumber,
        content : content
    };

    console.log("content:" + commentInfo.content );
    console.log(commentInfo.freeboardNumber);

    postModule.registerComment(commentInfo, ()=> {
        document.querySelector('#replyContent').value = '';
        page = 1;
        postModule.getCommentList2(freeboardNumber, page, function (data) {
            hasNext = data.hasNext;
            console.log("hasNext:"+ hasNext);
            console.log(data.contentList);

            displayComment(data.contentList);
        });

    });
});

postModule.getCommentList2(freeboardNumber, page, function (data) {
    // data.contentList = undefined;
    hasNext = data.hasNext;
    console.log("hasNext222:"+ hasNext);
    console.log(data);
    displayComment(data.contentList);
});



window.addEventListener('scroll', function (){

    if(!hasNext) return;

    let {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) { //스크롤이 페이지 끝에 도달했는지 확인
        console.log("바닥!!!!!")

        page++; //페이지 번호 증가

        postModule.getCommentList2(freeboardNumber, page, function (data){ //다음 페이지의 댓글 목록을 가져옴
            hasNext = data.hasNext;
            console.log("hasNext33:"+ hasNext);

            appendComment(data.contentList); //댓글 목록을 화면에 추가
        });
    }
});

let proMemNum = document.querySelector('#memberNumber').value;
// console.log("proMemNum:", proMemNum);


function displayComment(commentList){
    let $commentWrap = document.querySelector('.leaguePost-commentCtn'); //댓글 목록을 감싸는 요소

    let tags = ''; //HTML 태그를 저장할 변수 초기화

    console.log(commentList);
    commentList.forEach(e => { //댓글 목록을 순회하며 각 댓글을 html로 생성
        tags += `
              <div class="comments-list-own" data-id = "${e.freeboardNumber}">
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
                        <li>${e.memberNumber == memberNumber ? '<div>삭제하기</div>' : ''}</li>
                    </ul>
                </div>

                <div class="leaguePost-commentContentCtn">
                    <p class="leaguePost-commentContent">${e.replyContent}</p>
                </div>
              </div>`;

    });

    $commentWrap.innerHTML = tags; //생성된 HTML을 삽입하여 댓글 목록을 화면에 표시
}


function appendComment(commentList) {
    let $commentWrap = document.querySelector('.leaguePost-commentCtn');

    let tags = '';
    let session = window.sessionStorage.memberNumber;

    commentList.forEach(e => {
        // console.log(reply)

        tags += `
              <div class="comments-list-own" data-id = "${e.freeboardNumber}">
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
                        <li>${e.memberNumber == memberNumber ? '<div>삭제하기</div>' : ''}</li>
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
        /* 삭제 버튼이 클릭되었는지 확인하고, 해당 요소를 처리 */
        // $target.closest('.delete-btn').classList.add('none');
        let replyNumber = $target.closest('.comments-list-own').dataset.id; // 댓글 ID 가져오기


        if(confirm("삭제하시겠습니까?")){
            postModule.remove(replyNumber, () => {
                // 댓글 삭제 함수 호출
                page = 1; // 페이지를 초기화
                postModule.getCommentList2(freeboardNumber, page, function (data) {
                    // 댓글 목록을 다시 가져옴
                    hasNext = data.hasNext;
                    // 다음 페이지 여부를 갱신
                    displayComment(data.contentList); // displayComment 함수를 사용하여 댓글 목록을 화면에 표시
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
