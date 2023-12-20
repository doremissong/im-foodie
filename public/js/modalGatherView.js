// 신청 모달
// const btnJoin = document.getElementById('popupBtnJoin');
const modalViewJoin = document.getElementById('modalWrapViewJoin');
const closeBtnViewJoin = document.getElementById('closeBtnViewJoin');

// 신청 버튼 클릭 시 모달 팝업 열림
function gatherViewJoinClick() {
    modalViewJoin.style.display = 'block';
}

// x버튼 클릭 시 창 닫힘
closeBtnViewJoin.onclick = function() {
    modalViewJoin.style.display = 'none';
    document.getElementById("gatherJoinArea").value = '';
}


// 바깥영역 클릭 시 창 닫힘
window.onclick = function(event) {
    if (event.target == modalViewJoin) {
        modalViewJoin.style.display = "none";
        document.getElementById("gatherJoinArea").value = '';
    }
    else if (event.target == modalFooter) {
        modalFooter.style.display = "none";
    }
}