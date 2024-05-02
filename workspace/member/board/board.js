$(document).ready(function() {
    $('.main-pageNumberNum1').click(function() {
        var currentColor = $(this).css('color');
        if (currentColor === 'rgb(80, 121, 226)') {
            $(this).css('color', '#a5a5a5');
        } else {
            $(this).css('color', '#5079E2');
        }
        });
    });

$(document).ready(function() {
$('.main-pageNumberNum').click(function() {
    var currentColor = $(this).css('color');
    if (currentColor === 'rgb(80, 121, 226)') {
    $(this).css('color', '#a5a5a5');
    } else {
    $(this).css('color', '#5079E2');
    }
});
});

$(document).ready(function(){
$(".main-downscrollButton").click(function(){
    $(".main-sortOrder").toggle();
});
});

// 페이징 처리
// 'posts'와 'pagination' id를 가진 html 태그를 컨테이너 변수에 저장한다
const postsContainer = document.getElementById('posts');
const paginationContainer = document.getElementById('pagination');

// 현재 페이지 번호와 페이지 당 사진 수, 전체 사진 수의 값을 지정한다
let currentPage = 1;
const postsPerPage = 10;
const totalPosts = 100;

// 특정 페이지의 게시물들을 보여주는 함수
function displayPosts(page){
    // 게시물 컨테이너의 내용을 비우기
    postsContainer.innerHTML = '';
    // 표시할 게시물의 시작 인덱스와 끝 인덱스를 계산
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    // 시작 인덱스부터 끝 인덱스까지 반복하면서 게시물 요소를 생성하고 컨테이너에 추가
    for(let i = startIndex; i < endIndex; i++){
        if(i >= totalPosts){
            break;
        }
        const postDiv = document.createElement('div');
        postDiv.classList.add('main-freeWritingDetail');
        // 게시글 제목과 내용을 생성
        const box = document.createElement('div');
        box.classList.add('main-freeWritingDetailBox')
        const type = document.createElement('div');
        type.classList.add('main-freeWritingDetailType');
        type.textContent = '게시물 유형 / 종목';
        const title = document.createElement('div');
        title.classList.add('main-freeWritingDetailTitle');
        const text = document.createElement('div');
        text.classList.add('main-freeWritingDetailText');
        text.textContent = `게시물 제목 ${i+1}`;
        const content = document.createElement('div');
        content.classList.add('main-freeWritingDetailName');
        const nickname = document.createElement('div');
        nickname.classList.add('main-freeWritingDetailNickname');
        nickname.textContent = `😀게시물 작성자 ${i+1}`;
        const count = document.createElement('div');
        count.classList.add('main-freeWritingDetailLike');
        const like = document.createElement('span');
        like.classList.add('main-freeWritingDetailLike');
        like.textContent = '하트';
        const view = document.createElement('span');
        view.classList.add('main-freeWritingDetailView');
        view.textContent = '조회';
        // 제목과 내용을 게시글 div에 추가
        postDiv.appendChild(box);
        box.appendChild(type);
        box.appendChild(title);
        title.appendChild(text);
        box.appendChild(content);
        content.appendChild(nickname);
        content.appendChild(count);
        count.appendChild(like);
        count.appendChild(view);
        postsContainer.appendChild(postDiv);
    }
}

// 페이지네이션 버튼을 표시하는 함수
function displayPaginationButtons(){
    // 페이지네이션 컨테이너의 내용을 비우기
    paginationContainer.innerHTML = '';
    // 전체 페이지 수를 계산
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    // 전체 페이지 수만큼 반복하면서 페이지 버튼을 생성하고 컨테이너에 추가
    for(let i = 1; i <= totalPages; i++){
        const button = document.createElement('button');
        button.classList.add('main-freeWritingDetailButton');
        button.textContent = i;
        // 각 버튼에 클릭 이벤트 리스너를 추가 
        // 클릭 시 해당 페이지의 게시물을 표시하고 버튼을 업데이트
        button.addEventListener('click', () => {
            currentPage = i; 
            displayPosts(currentPage);
            updateButton();
        });
        paginationContainer.appendChild(button);
    }
    // 현재 페이지에 해당하는 버튼을 활성화
    updateButton();
}

// 현재 페이지에 해당하는 버튼을 'active' 클래스로 표시하는 함수
function updateButton(){
    const buttons = paginationContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if(parseInt(button.textContent) === currentPage){
            button.classList.add('active');
        }
    });
}

// 초기 페이지 로드 시 첫 페이지의 사진과 페이지네이션 버튼을 표시
displayPosts(currentPage);
displayPaginationButtons();


// 이전 페이지로 이동하는 버튼을 생성하고 추가하는 함수
function addPreviousButton() {
    // 버튼 요소 생성
    const prevButton = document.createElement('button'); 
    prevButton.classList.add('pagination-button');
    prevButton.textContent = '<';

    // 이전 페이지가 있을 경우에만 작동하도록 설정
    prevButton.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage -= 1;
            displayPosts(currentPage);
            updateButton();
        }
    });
    paginationContainer.insertBefore(prevButton, paginationContainer.firstChild);
}

// 다음 페이지로 이동하는 버튼을 생성하고 추가하는 함수
function addNextButton() {
    // 버튼 요소 생성
    const nextButton = document.createElement('button'); 
    nextButton.classList.add('pagination-button');
    nextButton.textContent = '>';
    

    // 다음 페이지가 있을 경우에만 작동하도록 설정
    nextButton.addEventListener('click', () => {
        // 전체 페이지 수 계산
        const totalPages = Math.ceil(totalPosts / postsPerPage); 
        if(currentPage < totalPages) {
            currentPage += 1;
            displayPosts(currentPage);
            updateButton();
        }
    });
    // 생성된 '다음' 버튼을 페이지네이션 컨테이너의 마지막 자식으로 추가
    paginationContainer.appendChild(nextButton); 
}

// 페이지네이션 버튼을 표시하는 함수를 수정하여 이전/다음 버튼을 추가
function displayPaginationButtons(){
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    addPreviousButton();
    for(let i = 1; i <= totalPages; i++){
        const button = document.createElement('button');
        button.classList.add('main-freeWritingDetailButton');
        button.textContent = i;
        // 각 버튼에 클릭 이벤트 리스너를 추가 
        // 클릭 시 해당 페이지의 게시물을 표시하고 버튼을 업데이트
        button.addEventListener('click', () => {
            currentPage = i; 
            displayPosts(currentPage);
            updateButton();
        });
        paginationContainer.appendChild(button);
    }
    // 다음 버튼 추가
    addNextButton(); 
    // 페이지네이션 버튼 업데이트
    updateButton(); 
}

// 초기 페이지 로드 시 첫 페이지의 게시물과 페이지네이션 버튼을 표시
displayPosts(currentPage);
displayPaginationButtons();