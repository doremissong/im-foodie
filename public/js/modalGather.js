// 자세히 모달
// const btnDetails = document.getElementById('popupBtnDetails');
const modalDetails = document.getElementById('modalWrapDetails');
const closeBtnDetails = document.getElementById('closeBtnDetails');

const divDTitle = document.getElementById("details-title");
const divDRegion = document.getElementById("details-region");
const divDRestaurant = document.getElementById("details-restaurant");
const divDNumbers = document.getElementById("details-numbers");
// 수 나누기 되는 거 아닌지 체크
const divDDeadline = document.getElementById("details-deadline");
const divDIntro = document.getElementById("details-intro");
const divDImg = document.getElementById("details-img");

// 자세히 버튼 클릭 시 모달 팝업 열림
function viewDetailsClick(g_name, g_region, g_place, g_numbers, g_deadline, g_intro, g_img) {
    modalDetails.style.display = 'block';
    console.log(g_name, g_region, g_place, g_numbers, g_deadline, g_intro);
    divDTitle.innerText = g_name;
    divDRegion.innerText = g_region;
    divDRestaurant.innerText = g_place;
    divDNumbers.innerText = g_numbers;
    divDDeadline.innerText = g_deadline;
    divDIntro.innerText = g_intro;
    // 
}
// const divDTitle = document.getElementById("details-title");
// const divDRegion = document.getElementById("details-region");
// const divDRestaurant = document.getElementById("details-restaurant");
// const divDNumbers = document.getElementById("details-numbers");
// // 수 나누기 되는 거 아닌지 체크
// const divDDeadline = document.getElementById("details-deadline");
// const divDIntro = document.getElementById("details-intro");
// const divDImg = document.getElementById("details-img");

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


// form 태그 클릭 시 모달 창 닫힘 필요!!!!

// 바깥영역 클릭 시 창 닫힘
window.onclick = function(event) {
    if (event.target == modalDetails) {
        modalDetails.style.display = "none";
    }
    else if (event.target == modalJoin) {
        modalJoin.style.display = "none";
        document.getElementById("gatherJoinArea").value = '';
    }
    else if (event.target == modalFooter) {
        modalFooter.style.display = "none";
    }
}