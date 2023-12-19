const btnUpAM = document.getElementById('popupBtnUpAM');
const modalUpAM = document.getElementById('modalWrapUpAM');
const closeBtnUpAM = document.getElementById('closeBtnUpAM');

btnUpAM.onclick = function() {
    modalUpAM.style.display = 'block';
}
closeBtnUpAM.onclick = function() {
    modalUpAM.style.display = 'none';
}


const btnUpPN = document.getElementById('popupBtnUpPN');
const modalUpPN = document.getElementById('modalWrapUpPN');
const closeBtnUpPN = document.getElementById('closeBtnUpPN');

btnUpPN.onclick = function() {
    modalUpPN.style.display = 'block';
}
closeBtnUpPN.onclick = function() {
    modalUpPN.style.display = 'none';
}


window.onclick = function(event) {
    if (event.target == modalUpPN) {
        modalUpPN.style.display = "none";
    }
    else if (event.target == modalUpAM) {
        modalUpAM.style.display = "none";
    }
}