window.onload = function () {

    // step 01 -> step 02 추가
    var add02 = document.getElementById('addStep02');   // 추가 버튼
    var del02 = document.getElementById('delStep02');   // 삭제 버튼
    var step02 = document.getElementById("step-02");

    add02.onclick = function () {  // 추가 버튼 클릭했을 때
        step02.style.display = 'flex';
        add02.style.display = 'none';
    }

    del02.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step02.style.display == 'flex'){
            if(confirm("step 02 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step02.style.display = 'none';
                step03.style.display = 'none';
                step04.style.display = 'none';
                step05.style.display = 'none';
                step06.style.display = 'none';
                step07.style.display = 'none';
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea02").value='';   // textarea 내용 비우기
                document.getElementById("stepArea03").value=''; 
                document.getElementById("stepArea04").value=''; 
                document.getElementById("stepArea05").value=''; 
                document.getElementById("stepArea06").value=''; 
                document.getElementById("stepArea07").value=''; 
                document.getElementById("stepArea08").value='';
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add02.style.display = 'block';
                add03.style.display = 'block';
                add04.style.display = 'block';
                add05.style.display = 'block';
                add06.style.display = 'block';
                add07.style.display = 'block';
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 02 -> step 03 추가
    var add03 = document.getElementById('addStep03');   // 추가 버튼
    var del03 = document.getElementById('delStep03');   // 삭제 버튼
    var step03 = document.getElementById("step-03");

    add03.onclick = function () {  // 추가 버튼 클릭했을 때
        step03.style.display = 'flex';
        add03.style.display = 'none';
    }

    del03.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step03.style.display == 'flex'){
            if(confirm("step 03 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step03.style.display = 'none';
                step04.style.display = 'none';
                step05.style.display = 'none';
                step06.style.display = 'none';
                step07.style.display = 'none';
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea03").value='';   // textarea 내용 비우기
                document.getElementById("stepArea04").value=''; 
                document.getElementById("stepArea05").value=''; 
                document.getElementById("stepArea06").value=''; 
                document.getElementById("stepArea07").value=''; 
                document.getElementById("stepArea08").value='';
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add03.style.display = 'block';
                add04.style.display = 'block';
                add05.style.display = 'block';
                add06.style.display = 'block';
                add07.style.display = 'block';
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 03 -> step 04 추가
    var add04 = document.getElementById('addStep04');   // 추가 버튼
    var del04 = document.getElementById('delStep04');   // 삭제 버튼
    var step04 = document.getElementById("step-04");

    add04.onclick = function () {  // 추가 버튼 클릭했을 때
        step04.style.display = 'flex';
        add04.style.display = 'none';
    }

    del04.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step04.style.display == 'flex'){
            if(confirm("step 04 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step04.style.display = 'none';
                step05.style.display = 'none';
                step06.style.display = 'none';
                step07.style.display = 'none';
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea04").value='';   // textarea 내용 비우기
                document.getElementById("stepArea05").value=''; 
                document.getElementById("stepArea06").value=''; 
                document.getElementById("stepArea07").value=''; 
                document.getElementById("stepArea08").value='';
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add04.style.display = 'block';
                add05.style.display = 'block';
                add06.style.display = 'block';
                add07.style.display = 'block';
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 04 -> step 05 추가
    var add05 = document.getElementById('addStep05');   // 추가 버튼
    var del05 = document.getElementById('delStep05');   // 삭제 버튼
    var step05 = document.getElementById("step-05");

    add05.onclick = function () {  // 추가 버튼 클릭했을 때
        step05.style.display = 'flex';
        add05.style.display = 'none';
    }

    del05.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step05.style.display == 'flex'){
            if(confirm("step 05 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step05.style.display = 'none';
                step06.style.display = 'none';
                step07.style.display = 'none';
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea05").value='';   // textarea 내용 비우기
                document.getElementById("stepArea06").value=''; 
                document.getElementById("stepArea07").value=''; 
                document.getElementById("stepArea08").value='';
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add05.style.display = 'block';
                add06.style.display = 'block';
                add07.style.display = 'block';
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 05 -> step 06 추가
    var add06 = document.getElementById('addStep06');   // 추가 버튼
    var del06 = document.getElementById('delStep06');   // 삭제 버튼
    var step06 = document.getElementById("step-06");

    add06.onclick = function () {  // 추가 버튼 클릭했을 때
        step06.style.display = 'flex';
        add06.style.display = 'none';
    }

    del06.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step06.style.display == 'flex'){
            if(confirm("step 06 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step06.style.display = 'none';
                step07.style.display = 'none';
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea06").value='';   // textarea 내용 비우기
                document.getElementById("stepArea07").value=''; 
                document.getElementById("stepArea08").value='';
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add06.style.display = 'block';
                add07.style.display = 'block';
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 06 -> step 07 추가
    var add07 = document.getElementById('addStep07');   // 추가 버튼
    var del07 = document.getElementById('delStep07');   // 삭제 버튼
    var step07 = document.getElementById("step-07");

    add07.onclick = function () {  // 추가 버튼 클릭했을 때
        step07.style.display = 'flex';
        add07.style.display = 'none';
    }

    del07.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step07.style.display == 'flex'){
            if(confirm("step 07 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step07.style.display = 'none';
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea07").value='';   // textarea 내용 비우기
                document.getElementById("stepArea08").value='';
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add07.style.display = 'block';
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 07 -> step 08 추가
    var add08 = document.getElementById('addStep08');   // 추가 버튼
    var del08 = document.getElementById('delStep08');   // 삭제 버튼
    var step08 = document.getElementById("step-08");

    add08.onclick = function () {  // 추가 버튼 클릭했을 때
        step08.style.display = 'flex';
        add08.style.display = 'none';
    }

    del08.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step08.style.display == 'flex'){
            if(confirm("step 08 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step08.style.display = 'none';
                step09.style.display = 'none';
                document.getElementById("stepArea08").value='';   // textarea 내용 비우기
                document.getElementById("stepArea09").value='';  
                // alert("삭제되었습니다.");
                add08.style.display = 'block';
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 08 -> step 09 추가
    var add09 = document.getElementById('addStep09');   // 추가 버튼
    var del09 = document.getElementById('delStep09');   // 삭제 버튼
    var step09 = document.getElementById("step-09");

    add09.onclick = function () {  // 추가 버튼 클릭했을 때
        step09.style.display = 'flex';
        add09.style.display = 'none';
    }

    del09.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step09.style.display == 'flex'){
            if(confirm("step 09의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step09.style.display = 'none';
                document.getElementById("stepArea09").value='';   // textarea 내용 비우기
                // alert("삭제되었습니다.");
                add09.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }
}
