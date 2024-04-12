document.querySelectorAll('.complete-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const totalTeams = 7;
    const selectedTeams = checkedCheckboxes.length;

    // 7팀이 선택되었는지 확인
    if (selectedTeams < totalTeams) {
      // 7팀 미만일 경우 사용자에게 몇 팀이 남았는지 알림
      const remainingTeams = totalTeams - selectedTeams;
      alert(remainingTeams + '팀이 남았습니다.');
    } else {
      // 7팀 이상 선택되었다면, 체크된 체크박스 숨김 처리
      checkedCheckboxes.forEach(function(checkbox) {
        checkbox.closest('tr').querySelector('input[type="checkbox"]').style.display = 'none';
      });
    }
  });
});


// 수정 버튼 클릭 시 숨겨진 checkbox 나타냄 처리
document.querySelectorAll('.modify-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
      checkbox.style.display = 'block';
    });
  });
});