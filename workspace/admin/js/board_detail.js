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