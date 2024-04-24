// 페이징 처리
// 'posts'와 'pagination' id를 가진 html 태그를 컨테이너 변수에 저장한다
const postsContainer = document.getElementById('posts');
const paginationContainer = document.getElementById('pagination');

// 현재 페이지 번호와 페이지 당 사진 수, 전체 사진 수의 값을 지정한다
let currentPage = 1;
const postsPerPage = 4;
const totalPosts = 40;

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
        const type = document.createElement('p');
        type.classList.add('main-freeWritingDetailType');
        type.textContent = '게시물 유형 / 종목';
        const title = document.createElement('p');
        title.classList.add('main-freeWritingDetailTitle');
        title.textContent = `게시물 제목 ${i+1}`;
        const content = document.createElement('p');
        content.classList.add('main-freeWritingDetailName');
        content.textContent = `😀게시물 작성자 ${i+1}`;
        const like = document.createElement('p');
        like.classList.add('main-freeWritingDetailLike');
        like.textContent = '좋아요';
        const view = document.createElement('p');
        view.classList.add('main-freeWritingDetailView');
        view.textContent = '조회수';
        // 제목과 내용을 게시글 div에 추가
        postDiv.appendChild(type);
        postDiv.appendChild(title);
        postDiv.appendChild(content);
        postDiv.appendChild(like);
        postDiv.appendChild(view);
        postsContainer.appendChild(postDiv);
    }
}

// 페이지네이션 버튼을 표시하는 함수
function displayPaginationButtons(){
    // 페이지네이션 컨테이너의 내용을 비우기
    paginationContainer.innerHTML = '';
    // paginationContainer.style.backgroundColor = "#e9f6ff";
    // 전체 페이지 수를 계산
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    // 전체 페이지 수만큼 반복하면서 페이지 버튼을 생성하고 컨테이너에 추가
    for(let i = 1; i <= totalPages; i++){
        const button = document.createElement('button');
        button.classList.add('main-freeWritingDetailButton');
        button.textContent = i;
        button.style.cursor = "pointer";
        // button.style.backgroundColor = "#e9f6ff";
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