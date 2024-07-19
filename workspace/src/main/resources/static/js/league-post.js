
// 게시글 메뉴 버튼 눌렀을때 목록 나오게하기
document.getElementById('leaguePost-showListButton').addEventListener('click', function() {
    var list = document.getElementById('leaguePost-list');
    if (list.style.display === 'none') {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
});
