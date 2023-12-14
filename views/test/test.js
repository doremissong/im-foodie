window.onload = function () {

    // step 01 -> step 02 추가
    var add02 = document.getElementById('addStep02');   // 추가 버튼
    var del02 = document.getElementById('delStep02');   // 삭제 버튼
    var step02 = document.getElementById("step-02");

    add02.onclick = function () {  // 추가 버튼 클릭했을 때
        step02.style.display = 'flex';
    }

    del02.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step02.style.display == 'flex'){
            if(confirm("step 02 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step02.style.display = 'none';
                document.getElementById("stepArea02").value='';   // textarea 내용 비우기
                // alert("삭제되었습니다.");
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }

}
