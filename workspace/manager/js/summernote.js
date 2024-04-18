$(document).ready(function () {
    $('#summernote').summernote({
        placeholder: '내용을 작성하세요',
        height: 400
    });

    // 등록 버튼 클릭 이벤트
    $('#submitBtn').click(function(e){
        e.preventDefault(); // 폼의 기본 제출 이벤트 방지

        var sport = $('.sport_ct').val(); // 종목 값
        var title = $('.title').val(); // 제목 값
        var content = $('#summernote').summernote('code'); // 내용 값

        // 이 데이터를 서버에 전송하는 AJAX 요청
        $.ajax({
            url: '/path/to/your/server/endpoint', // 서버 엔드포인트 URL
            type: 'POST',
            data: {
                'sport_ct': sport,
                'title': title,
                'content': content
            },
            success: function(response){
                // 성공적으로 데이터를 전송한 후, 사용자를 admin_board.html로 리디렉션
                window.location.href = '../html/admin_board.html';
            },
            error: function(){
                // 오류 처리
                alert('데이터 전송에 실패했습니다.');
            }
        });
    });
});
