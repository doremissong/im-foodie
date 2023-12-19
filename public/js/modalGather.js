// 자세히 모달
// const btnDetails = document.getElementById('popupBtnDetails');
const modalDetails = document.getElementById('modalWrapDetails');
const closeBtnDetails = document.getElementById('closeBtnDetails');

// 자세히 버튼 클릭 시 모달 팝업 열림
function viewDetailsClick() {
    modalDetails.style.display = 'block';
}

// x버튼 클릭 시 창 닫힘
closeBtnDetails.onclick = function() {
    modalDetails.style.display = 'none';
}


// 신청 모달
// const btnJoin = document.getElementById('popupBtnJoin');
const modalJoin = document.getElementById('modalWrapJoin');
const closeBtnJoin = document.getElementById('closeBtnJoin');
const applyForm = document.getElementById('form-apply');
const divGatherTitle = document.getElementById('gather-title');

// 신청 버튼 클릭 시 모달 팝업 열림
function viewJoinClick(g_id, g_name) {
    // console.log('original-', g_id[0], '_gId-', _gatherId);
    modalJoin.style.display = 'block';
    divGatherTitle.innerText = g_name;
    applyForm.action = `/gather/apply?no=${g_id}`;

}

// x버튼 클릭 시 창 닫힘
closeBtnJoin.onclick = function() {
    modalJoin.style.display = 'none';
    document.getElementById("gatherJoinArea").value = '';
}


// 바깥영역 클릭 시 창 닫힘
window.onclick = function(event) {
    if (event.target == modalDetails) {
        modalDetails.style.display = "none";
    }
    else if (event.target == modalJoin) {
        modalJoin.style.display = "none";
        document.getElementById("gatherJoinArea").value = '';
    }
}