// step 1
var del1 = document.getElementById('delStep1');   // 삭제 버튼
var step1 = document.getElementById("step-1");

// step 2
var del2 = document.getElementById('delStep2');   // 삭제 버튼
var step2 = document.getElementById("step-2");

// step 3
var del3 = document.getElementById('delStep3');   // 삭제 버튼
var step3 = document.getElementById("step-3");

// step 4
var del4 = document.getElementById('delStep4');   // 삭제 버튼
var step4 = document.getElementById("step-4");

// step 5
var del5 = document.getElementById('delStep5');   // 삭제 버튼
var step5 = document.getElementById("step-5");

// step 6
var del6 = document.getElementById('delStep6');   // 삭제 버튼
var step6 = document.getElementById("step-6");

// step 7
var del7 = document.getElementById('delStep7');   // 삭제 버튼
var step7 = document.getElementById("step-7");

// step 8
var del8 = document.getElementById('delStep8');   // 삭제 버튼
var step8 = document.getElementById("step-8");

// step 9
var del9 = document.getElementById('delStep9');   // 삭제 버튼
var step9 = document.getElementById("step-9");


// 추가하기 버튼
var addStep = document.getElementById('addStep'); // 추가하기
addStep.onclick = function () {
    if(step2.style.display != 'block') {
        step2.style.display = 'block';
        document.getElementById("stepArea2").required=true;
    }
    else if(step3.style.display != 'block') {
        step3.style.display = 'block';
        document.getElementById("stepArea3").required=true;
    }
    else if(step4.style.display != 'block') {
        step4.style.display = 'block';
        document.getElementById("stepArea4").required=true;
    }
    else if(step5.style.display != 'block') {
        step5.style.display = 'block';
        document.getElementById("stepArea5").required=true;
    }
    else if(step6.style.display != 'block') {
        step6.style.display = 'block';
        document.getElementById("stepArea6").required=true;
    }
    else if(step7.style.display != 'block') {
        step7.style.display = 'block';
        document.getElementById("stepArea7").required=true;
    }
    else if(step8.style.display != 'block') {
        step8.style.display = 'block';
        document.getElementById("stepArea8").required=true;
    }
    else if(step9.style.display != 'block') {
        step9.style.display = 'block';
        document.getElementById("stepArea9").required=true;
    }
}


// step 1 삭제
del1.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 1의 내용을 삭제하시겠습니까?")){

        // textarea value 옮기기
        document.getElementById("stepArea1").value=document.getElementById("stepArea2").value;
        document.getElementById("stepArea2").value=document.getElementById("stepArea3").value;
        document.getElementById("stepArea3").value=document.getElementById("stepArea4").value;
        document.getElementById("stepArea4").value=document.getElementById("stepArea5").value;
        document.getElementById("stepArea5").value=document.getElementById("stepArea6").value;
        document.getElementById("stepArea6").value=document.getElementById("stepArea7").value;
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }
        else if (step7.style.display != 'block' && step6.style.display == 'block') { 
            document.getElementById("stepArea6").value=''; step6.style.display = 'none';
            document.getElementById("stepArea6").required=false; 
        }
        else if (step6.style.display != 'block' && step5.style.display == 'block') { 
            document.getElementById("stepArea5").value=''; step5.style.display = 'none'; 
            document.getElementById("stepArea5").required=false;
        }
        else if (step5.style.display != 'block' && step4.style.display == 'block') { 
            document.getElementById("stepArea4").value=''; step4.style.display = 'none';
            document.getElementById("stepArea4").required=false; 
        }
        else if (step4.style.display != 'block' && step3.style.display == 'block') { 
            document.getElementById("stepArea3").value=''; step3.style.display = 'none'; 
            document.getElementById("stepArea3").required=false;
        }
        else if (step3.style.display != 'block' && step2.style.display == 'block') { 
            document.getElementById("stepArea2").value=''; step2.style.display = 'none';
            document.getElementById("stepArea2").required=false;
        }
        else if (step2.style.display != 'block' && step1.style.display == 'block') { 
            document.getElementById("stepArea1").value=''; step1.style.display = 'none'; 
            document.getElementById("stepArea1").required=false;
        }

    }
}

// step 2 삭제
del2.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 2의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea2").value=document.getElementById("stepArea3").value;
        document.getElementById("stepArea3").value=document.getElementById("stepArea4").value;
        document.getElementById("stepArea4").value=document.getElementById("stepArea5").value;
        document.getElementById("stepArea5").value=document.getElementById("stepArea6").value;
        document.getElementById("stepArea6").value=document.getElementById("stepArea7").value;
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }
        else if (step7.style.display != 'block' && step6.style.display == 'block') { 
            document.getElementById("stepArea6").value=''; step6.style.display = 'none';
            document.getElementById("stepArea6").required=false; 
        }
        else if (step6.style.display != 'block' && step5.style.display == 'block') { 
            document.getElementById("stepArea5").value=''; step5.style.display = 'none'; 
            document.getElementById("stepArea5").required=false;
        }
        else if (step5.style.display != 'block' && step4.style.display == 'block') { 
            document.getElementById("stepArea4").value=''; step4.style.display = 'none';
            document.getElementById("stepArea4").required=false; 
        }
        else if (step4.style.display != 'block' && step3.style.display == 'block') { 
            document.getElementById("stepArea3").value=''; step3.style.display = 'none'; 
            document.getElementById("stepArea3").required=false;
        }
        else if (step3.style.display != 'block' && step2.style.display == 'block') { 
            document.getElementById("stepArea2").value=''; step2.style.display = 'none';
            document.getElementById("stepArea2").required=false;
        }

    }
}

// step 3 삭제
del3.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 3의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea3").value=document.getElementById("stepArea4").value;
        document.getElementById("stepArea4").value=document.getElementById("stepArea5").value;
        document.getElementById("stepArea5").value=document.getElementById("stepArea6").value;
        document.getElementById("stepArea6").value=document.getElementById("stepArea7").value;
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }
        else if (step7.style.display != 'block' && step6.style.display == 'block') { 
            document.getElementById("stepArea6").value=''; step6.style.display = 'none';
            document.getElementById("stepArea6").required=false; 
        }
        else if (step6.style.display != 'block' && step5.style.display == 'block') { 
            document.getElementById("stepArea5").value=''; step5.style.display = 'none'; 
            document.getElementById("stepArea5").required=false;
        }
        else if (step5.style.display != 'block' && step4.style.display == 'block') { 
            document.getElementById("stepArea4").value=''; step4.style.display = 'none';
            document.getElementById("stepArea4").required=false; 
        }
        else if (step4.style.display != 'block' && step3.style.display == 'block') { 
            document.getElementById("stepArea3").value=''; step3.style.display = 'none'; 
            document.getElementById("stepArea3").required=false;
        }

    }
}

// step 4 삭제
del4.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 4의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea4").value=document.getElementById("stepArea5").value;
        document.getElementById("stepArea5").value=document.getElementById("stepArea6").value;
        document.getElementById("stepArea6").value=document.getElementById("stepArea7").value;
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }
        else if (step7.style.display != 'block' && step6.style.display == 'block') { 
            document.getElementById("stepArea6").value=''; step6.style.display = 'none';
            document.getElementById("stepArea6").required=false; 
        }
        else if (step6.style.display != 'block' && step5.style.display == 'block') { 
            document.getElementById("stepArea5").value=''; step5.style.display = 'none'; 
            document.getElementById("stepArea5").required=false;
        }
        else if (step5.style.display != 'block' && step4.style.display == 'block') { 
            document.getElementById("stepArea4").value=''; step4.style.display = 'none';
            document.getElementById("stepArea4").required=false; 
        }

    }
}

// step 5 삭제
del5.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 5의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea5").value=document.getElementById("stepArea6").value;
        document.getElementById("stepArea6").value=document.getElementById("stepArea7").value;
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }
        else if (step7.style.display != 'block' && step6.style.display == 'block') { 
            document.getElementById("stepArea6").value=''; step6.style.display = 'none';
            document.getElementById("stepArea6").required=false; 
        }
        else if (step6.style.display != 'block' && step5.style.display == 'block') { 
            document.getElementById("stepArea5").value=''; step5.style.display = 'none'; 
            document.getElementById("stepArea5").required=false;
        }

    }
}

// step 6 삭제
del6.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 6의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea6").value=document.getElementById("stepArea7").value;
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }
        else if (step7.style.display != 'block' && step6.style.display == 'block') { 
            document.getElementById("stepArea6").value=''; step6.style.display = 'none';
            document.getElementById("stepArea6").required=false; 
        }

    }
}


// step 7 삭제
del7.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 7의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea7").value=document.getElementById("stepArea8").value;
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }
        else if (step8.style.display != 'block' && step7.style.display == 'block') { 
            document.getElementById("stepArea7").value=''; step7.style.display = 'none'; 
            document.getElementById("stepArea7").required=false;
        }

    }
}

// step 8 삭제
del8.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 8의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea8").value=document.getElementById("stepArea9").value;

        if (step9.style.display == 'block') { 
            document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
            document.getElementById("stepArea9").required=false;
        }
        else if (step9.style.display != 'block' && step8.style.display == 'block') { 
            document.getElementById("stepArea8").value=''; step8.style.display = 'none'; 
            document.getElementById("stepArea8").required=false;
        }

    }
}


// step 9 삭제
del9.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("step 9의 내용을 삭제하시겠습니까?")){
        
        document.getElementById("stepArea9").value=''; step9.style.display = 'none'; 
        document.getElementById("stepArea9").required=false;
        
    }
}