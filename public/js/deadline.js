function getDateAfter7() {
    let today = new Date();

    // 7일을 더한 날짜 계산
    let nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    // YYYY-MM-DD 형식으로 변환
    let year = nextWeek.getFullYear();
    let month = String(nextWeek.getMonth() + 1).padStart(2, '0');
    let day = String(nextWeek.getDate()).padStart(2, '0');

    // YYYY-MM-DD 형식으로 반환
    return `${year}-${month}-${day}`;
}

// 기본값 설정
var dateForm = document.getElementById('7daysfromnow');
dateForm.value = getDateAfter7();
dateForm.setAttribute("min", new Date().toISOString().split("T")[0]);
// dateForm.setAttribute("max", );

