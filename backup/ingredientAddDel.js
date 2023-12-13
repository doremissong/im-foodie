
// ingredient 2
// var addIQ2 = document.getElementById('addIQ2');   // 추가 버튼
var delIQ2 = document.getElementById('delIQ2');   // 삭제 버튼
var IQ2 = document.getElementById("IQ2");

// ingredient 3
var delIQ3 = document.getElementById('delIQ3');   // 삭제 버튼
var IQ3 = document.getElementById("IQ3");

// ingredient 4
var delIQ4 = document.getElementById('delIQ4');   // 삭제 버튼
var IQ4 = document.getElementById("IQ4");

// ingredient 5
var delIQ5 = document.getElementById('delIQ5');   // 삭제 버튼
var IQ5 = document.getElementById("IQ5");

// ingredient 6
var delIQ6 = document.getElementById('delIQ6');   // 삭제 버튼
var IQ6 = document.getElementById("IQ6");

// ingredient 7
var delIQ7 = document.getElementById('delIQ7');   // 삭제 버튼
var IQ7 = document.getElementById("IQ7");

// ingredient 8
var delIQ8 = document.getElementById('delIQ8');   // 삭제 버튼
var IQ8 = document.getElementById("IQ8");

// ingredient 9
var delIQ9 = document.getElementById('delIQ9');   // 삭제 버튼
var IQ9 = document.getElementById("IQ9");

// ingredient 10
var delIQ10 = document.getElementById('delIQ10');   // 삭제 버튼
var IQ10 = document.getElementById("IQ10");



// 추가하기 버튼
var addBtn = document.getElementById('addBtn'); // 추가하기
addBtn.onclick = function () {
    if(IQ2.style.display != 'flex') {
        IQ2.style.display = 'flex';
    }
    else if(IQ3.style.display != 'flex') {
        IQ3.style.display = 'flex';
    }
    else if(IQ4.style.display != 'flex') {
        IQ4.style.display = 'flex';
    }
    else if(IQ5.style.display != 'flex') {
        IQ5.style.display = 'flex';
    }
    else if(IQ6.style.display != 'flex') {
        IQ6.style.display = 'flex';
    }
    else if(IQ7.style.display != 'flex') {
        IQ7.style.display = 'flex';
    }
    else if(IQ8.style.display != 'flex') {
        IQ8.style.display = 'flex';
    }
    else if(IQ9.style.display != 'flex') {
        IQ9.style.display = 'flex';
    }
    else if(IQ10.style.display != 'flex') {
        IQ10.style.display = 'flex';
    }
}


// ingredient 2 추가
// addIQ2.onclick = function () {  // 추가 버튼 클릭했을 때
//     IQ2.style.display = 'flex';
//     addIQ2.style.display = 'none';
// }


// ingredient 2 삭제
delIQ2.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I2").value=document.getElementById("I3").value;
        document.getElementById("Q2").value=document.getElementById("Q3").value;

        document.getElementById("I3").value=document.getElementById("I4").value;
        document.getElementById("Q3").value=document.getElementById("Q4").value;

        document.getElementById("I4").value=document.getElementById("I5").value;
        document.getElementById("Q4").value=document.getElementById("Q5").value;

        document.getElementById("I5").value=document.getElementById("I6").value;
        document.getElementById("Q5").value=document.getElementById("I6").value;

        if (IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }
        else if (IQ5.style.display != 'flex' && IQ4.style.display == 'flex') { document.getElementById("I4").value=''; document.getElementById("Q4").value=''; IQ4.style.display = 'none'; }
        else if (IQ4.style.display != 'flex' && IQ3.style.display == 'flex') { document.getElementById("I3").value=''; document.getElementById("Q3").value=''; IQ3.style.display = 'none'; }
        else if (IQ3.style.display != 'flex' && IQ2.style.display == 'flex') { document.getElementById("I2").value=''; document.getElementById("Q2").value=''; IQ2.style.display = 'none'; }

        // IQ2.style.display = 'none';

        // document.getElementById("I2").value='';   // 내용 비우기
        // document.getElementById("Q2").value='';

        // if (IQ3.style.display != 'flex' && IQ4.style.display != 'flex' && IQ5.style.display != 'flex' && IQ6.style.display != 'flex'){

        //     addIQ2.style.display = 'block';
        // }

    }
}


// ingredient 3 삭제
delIQ3.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I3").value=document.getElementById("I4").value;
        document.getElementById("Q3").value=document.getElementById("Q4").value;

        document.getElementById("I4").value=document.getElementById("I5").value;
        document.getElementById("Q4").value=document.getElementById("Q5").value;

        document.getElementById("I5").value=document.getElementById("I6").value;
        document.getElementById("Q5").value=document.getElementById("I6").value;

        if (IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }
        else if (IQ5.style.display != 'flex' && IQ4.style.display == 'flex') { document.getElementById("I4").value=''; document.getElementById("Q4").value=''; IQ4.style.display = 'none'; }
        else if (IQ4.style.display != 'flex' && IQ3.style.display == 'flex') { document.getElementById("I3").value=''; document.getElementById("Q3").value=''; IQ3.style.display = 'none'; }

        // IQ3.style.display = 'none';

        // document.getElementById("I3").value='';   // 내용 비우기
        // document.getElementById("Q3").value='';

        // if (IQ4.style.display != 'flex' && IQ5.style.display != 'flex' && IQ6.style.display != 'flex'){
        //     addIQ3.style.display = 'block';

        //     if (IQ2.style.display !='flex') {
        //         addIQ2.style.display = 'block';
        //     }
        // }

    }
}

// ingredient 4 추가
// addIQ4.onclick = function () {  // 추가 버튼 클릭했을 때
//     IQ4.style.display = 'flex';
//     addIQ4.style.display = 'none';
// }

// ingredient 4 삭제
delIQ4.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){
        IQ4.style.display = 'none';

        document.getElementById("I4").value='';   // 내용 비우기
        document.getElementById("Q4").value='';

        // // 뒤에 재료 입력란이 없을 때
        // if (IQ5.style.display != 'flex' && IQ6.style.display != 'flex'){
        //     addIQ4.style.display = 'block';

        //     // 앞에 재료 입력란이 없을 때
        //     if (IQ3.style.display !='flex') {
        //         addIQ3.style.display = 'block';

        //         if (IQ2.style.display !='flex') {
        //             addIQ2.style.display = 'block';
        //         }
        //     }
        // }

    }
}

// ingredient 5 추가
// addIQ5.onclick = function () {  // 추가 버튼 클릭했을 때
//     IQ5.style.display = 'flex';
//     addIQ5.style.display = 'none';
// }

// ingredient 5 삭제
delIQ5.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){
        IQ5.style.display = 'none';

        document.getElementById("I5").value='';   // 내용 비우기
        document.getElementById("Q5").value='';

        // // 뒤에 재료 입력란이 없을 때
        // if (IQ6.style.display != 'flex'){
        //     addIQ5.style.display = 'block';

        //     // 앞에 재료 입력란이 없을 때
        //     if (IQ4.style.display !='flex') {
        //         addIQ4.style.display = 'block';

        //         if (IQ3.style.display !='flex') {
        //             addIQ3.style.display = 'block';

        //             if (IQ2.style.display !='flex') {
        //                 addIQ2.style.display = 'block';
        //             }
        //         }
        //     }

        // }

    }
}

// ingredient 6 추가
// addIQ6.onclick = function () {  // 추가 버튼 클릭했을 때
//     IQ6.style.display = 'flex';
//     addIQ6.style.display = 'none';
// }

// ingredient 6 삭제
delIQ6.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){
        IQ6.style.display = 'none';

        document.getElementById("I6").value='';   // 내용 비우기
        document.getElementById("Q6").value='';

        // // 앞에 재료 입력란이 없을 때
        // if (IQ6.style.display != 'flex'){
        //     addIQ6.style.display = 'block';

        //     if (IQ5.style.display !='flex') {
        //         addIQ5.style.display = 'block';

        //         if (IQ4.style.display !='flex') {
        //             addIQ4.style.display = 'block';

        //             if (IQ3.style.display !='flex') {
        //                 addIQ3.style.display = 'block';

        //                 if (IQ2.style.display !='flex') {
        //                     addIQ2.style.display = 'block';
        //                 }
        //             }
        //         }
        //     }

        // }
    
    }
}

// ingredient 7 추가
addIQ7.onclick = function () {  // 추가 버튼 클릭했을 때
    IQ7.style.display = 'flex';
    addIQ7.style.display = 'none';
}

// ingredient 7 삭제
delIQ7.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){
        IQ7.style.display = 'none';

        document.getElementById("I7").value='';   // 내용 비우기
        document.getElementById("Q7").value='';

        addIQ7.style.display = 'block';

    }else{

    }
}
