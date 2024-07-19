function deletePage() {
    // 삭제 요청을 서버로 보내는 코드
    fetch('/delete-page', {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('페이지가 삭제되었습니다.');
            } else {
                alert('페이지 삭제에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function updatePage() {
    // 수정 페이지로 이동하는 코드
    window.location.href = '/update-page';//임시로 지정함
}
window.onload = function() {
    // 서버로부터 데이터를 가져와서 클라이언트에게 제공하는 코드
    fetch('/get-stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById("likeCountNumber").textContent = data.likeCount; // 좋아요 수 설정
            document.getElementById("viewCountNumber").textContent = data.viewCount; // 조회수 설정
        })
        .catch(error => {
            console.error('Error:', error);
        });
};
// 임시 댓글 데이터, 실제 데이터로 대체해야 합니다.
let comments = [
    { id: 1, nickname: "사용자1", date: "2024-04-07", avatar: "path_to_avatar1.jpg", text: "이건 첫 번째 댓글입니다" },
    { id: 2, nickname: "사용자2", date: "2024-04-07", avatar: "path_to_avatar2.jpg", text: "이건 두 번째 댓글입니다" },
    { id: 3, nickname: "사용자3", date: "2024-04-07", avatar: "path_to_avatar3.jpg", text: "이건 세 번째 댓글입니다" }
];

function renderComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // 리스트 초기화
    comments.forEach(comment => {
        commentsList.innerHTML += `
            <div class="comment-item">
            <input type="radio" name="comment" value="${comment.id}">
                <img class="comment-avatar" src="${comment.avatar}" alt="${comment.nickname}">
                <div class="comment-details">
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-info">${comment.nickname}, ${comment.date}</div>
                </div>
            </div>
        `;
    });
}

function filterComments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredComments = comments.filter(comment => comment.text.toLowerCase().includes(searchTerm));
    comments = filteredComments; // 필터링된 댓글로 업데이트
    renderComments(); // 댓글 다시 렌더링
}

function deleteComment() {
    const selectedCommentId = document.querySelector('input[name="comment"]:checked')?.value;
    if (selectedCommentId) {
        comments = comments.filter(comment => comment.id.toString() !== selectedCommentId);
        renderComments(); // 댓글 다시 렌더링
    } else {
        alert('삭제할 댓글을 선택하세요.');
    }
}

// 페이지 로드 시 댓글 렌더링
window.onload = renderComments;
