const btnFooter = document.getElementById('popupBtnFooter');
const modalFooter = document.getElementById('modalWrapFooter');
const closeBtnFooter = document.getElementById('closeBtnFooter');

btnFooter.onclick = function() {
  modalFooter.style.display = 'block';
}
closeBtnFooter.onclick = function() {
  modalFooter.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modalFooter) {
    modalFooter.style.display = "none";
  }
}