window.onload = function () {

    // step 2
    var add2 = document.getElementById('addStep2');   // 추가 버튼
    var del2 = document.getElementById('delStep2');   // 삭제 버튼
    var step2 = document.getElementById("step-2");

    // step 3
    var add3 = document.getElementById('addStep3');   // 추가 버튼
    var del3 = document.getElementById('delStep3');   // 삭제 버튼
    var step3 = document.getElementById("step-3");

    // step 4
    var add4 = document.getElementById('addStep4');   // 추가 버튼
    var del4 = document.getElementById('delStep4');   // 삭제 버튼
    var step4 = document.getElementById("step-4");

    // step 5
    var add5 = document.getElementById('addStep5');   // 추가 버튼
    var del5 = document.getElementById('delStep5');   // 삭제 버튼
    var step5 = document.getElementById("step-5");

    // step 6
    var add6 = document.getElementById('addStep6');   // 추가 버튼
    var del6 = document.getElementById('delStep6');   // 삭제 버튼
    var step6 = document.getElementById("step-6");

    // step 7
    var add7 = document.getElementById('addStep7');   // 추가 버튼
    var del7 = document.getElementById('delStep7');   // 삭제 버튼
    var step7 = document.getElementById("step-7");

    // step 8
    var add8 = document.getElementById('addStep8');   // 추가 버튼
    var del8 = document.getElementById('delStep8');   // 삭제 버튼
    var step8 = document.getElementById("step-8");

    // step 9
    var add9 = document.getElementById('addStep9');   // 추가 버튼
    var del9 = document.getElementById('delStep9');   // 삭제 버튼
    var step9 = document.getElementById("step-9");



    // step 2 추가
    add2.onclick = function () {  // 추가 버튼 클릭했을 때
        step2.style.display = 'flex';
        add2.style.display = 'none';
    }

    // step 2 삭제
    del2.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step2.style.display == 'flex'){
            if(confirm("step 2 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step2.style.display = 'none';
                step3.style.display = 'none';
                step4.style.display = 'none';
                step5.style.display = 'none';
                step6.style.display = 'none';
                step7.style.display = 'none';
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea2").value='';   // textarea 내용 비우기
                document.getElementById("stepArea3").value=''; 
                document.getElementById("stepArea4").value=''; 
                document.getElementById("stepArea5").value=''; 
                document.getElementById("stepArea6").value=''; 
                document.getElementById("stepArea7").value=''; 
                document.getElementById("stepArea8").value='';
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add2.style.display = 'block';
                add3.style.display = 'block';
                add4.style.display = 'block';
                add5.style.display = 'block';
                add6.style.display = 'block';
                add7.style.display = 'block';
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 3 추가
    add3.onclick = function () {  // 추가 버튼 클릭했을 때
        step3.style.display = 'flex';
        add3.style.display = 'none';
    }

    // step 3 삭제
    del3.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step3.style.display == 'flex'){
            if(confirm("step 3 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step3.style.display = 'none';
                step4.style.display = 'none';
                step5.style.display = 'none';
                step6.style.display = 'none';
                step7.style.display = 'none';
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea3").value='';   // textarea 내용 비우기
                document.getElementById("stepArea4").value=''; 
                document.getElementById("stepArea5").value=''; 
                document.getElementById("stepArea6").value=''; 
                document.getElementById("stepArea7").value=''; 
                document.getElementById("stepArea8").value='';
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add3.style.display = 'block';
                add4.style.display = 'block';
                add5.style.display = 'block';
                add6.style.display = 'block';
                add7.style.display = 'block';
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 4 추가
    add4.onclick = function () {  // 추가 버튼 클릭했을 때
        step4.style.display = 'flex';
        add4.style.display = 'none';
    }

    // step 4 삭제
    del4.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step4.style.display == 'flex'){
            if(confirm("step 4 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step4.style.display = 'none';
                step5.style.display = 'none';
                step6.style.display = 'none';
                step7.style.display = 'none';
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea4").value='';   // textarea 내용 비우기
                document.getElementById("stepArea5").value=''; 
                document.getElementById("stepArea6").value=''; 
                document.getElementById("stepArea7").value=''; 
                document.getElementById("stepArea8").value='';
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add4.style.display = 'block';
                add5.style.display = 'block';
                add6.style.display = 'block';
                add7.style.display = 'block';
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 5 추가
    add5.onclick = function () {  // 추가 버튼 클릭했을 때
        step5.style.display = 'flex';
        add5.style.display = 'none';
    }

    // step 5 삭제
    del5.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step5.style.display == 'flex'){
            if(confirm("step 5 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step5.style.display = 'none';
                step6.style.display = 'none';
                step7.style.display = 'none';
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea5").value='';   // textarea 내용 비우기
                document.getElementById("stepArea6").value=''; 
                document.getElementById("stepArea7").value=''; 
                document.getElementById("stepArea8").value='';
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add5.style.display = 'block';
                add6.style.display = 'block';
                add7.style.display = 'block';
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 6 추가
    add6.onclick = function () {  // 추가 버튼 클릭했을 때
        step6.style.display = 'flex';
        add6.style.display = 'none';
    }

    // step 6 삭제
    del6.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step6.style.display == 'flex'){
            if(confirm("step 6 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step6.style.display = 'none';
                step7.style.display = 'none';
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea6").value='';   // textarea 내용 비우기
                document.getElementById("stepArea7").value=''; 
                document.getElementById("stepArea8").value='';
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add6.style.display = 'block';
                add7.style.display = 'block';
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 7 추가
    add7.onclick = function () {  // 추가 버튼 클릭했을 때
        step7.style.display = 'flex';
        add7.style.display = 'none';
    }

    // step 7 삭제
    del7.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step7.style.display == 'flex'){
            if(confirm("step 7 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step7.style.display = 'none';
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea7").value='';   // textarea 내용 비우기
                document.getElementById("stepArea8").value='';
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add7.style.display = 'block';
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 8 추가
    add8.onclick = function () {  // 추가 버튼 클릭했을 때
        step8.style.display = 'flex';
        add8.style.display = 'none';
    }

    // step 8 삭제
    del8.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step8.style.display == 'flex'){
            if(confirm("step 8 포함 이후 모든 step의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step8.style.display = 'none';
                step9.style.display = 'none';
                document.getElementById("stepArea8").value='';   // textarea 내용 비우기
                document.getElementById("stepArea9").value='';  
                // alert("삭제되었습니다.");
                add8.style.display = 'block';
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }


    // step 9 추가
    add9.onclick = function () {  // 추가 버튼 클릭했을 때
        step9.style.display = 'flex';
        add9.style.display = 'none';
    }

    del9.onclick = function () {  // 삭제 버튼 클릭했을 때
        if(step9.style.display == 'flex'){
            if(confirm("step 9의 내용이 삭제됩니다. 삭제하시겠습니까?")){
                step9.style.display = 'none';
                document.getElementById("stepArea9").value='';   // textarea 내용 비우기
                // alert("삭제되었습니다.");
                add9.style.display = 'block';
            }else{

            }
        }
        else {
            alert('삭제할 단계가 없습니다.');
        }
    }
}
