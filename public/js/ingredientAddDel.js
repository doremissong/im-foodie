
// ingredient 2
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
        document.getElementById("Q5").value=document.getElementById("Q6").value;

        document.getElementById("I6").value=document.getElementById("I7").value;
        document.getElementById("Q6").value=document.getElementById("Q7").value;

        document.getElementById("I7").value=document.getElementById("I8").value;
        document.getElementById("Q7").value=document.getElementById("Q8").value;

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }
        else if (IQ7.style.display != 'flex' && IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }
        else if (IQ5.style.display != 'flex' && IQ4.style.display == 'flex') { document.getElementById("I4").value=''; document.getElementById("Q4").value=''; IQ4.style.display = 'none'; }
        else if (IQ4.style.display != 'flex' && IQ3.style.display == 'flex') { document.getElementById("I3").value=''; document.getElementById("Q3").value=''; IQ3.style.display = 'none'; }
        else if (IQ3.style.display != 'flex' && IQ2.style.display == 'flex') { document.getElementById("I2").value=''; document.getElementById("Q2").value=''; IQ2.style.display = 'none'; }

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
        document.getElementById("Q5").value=document.getElementById("Q6").value;

        document.getElementById("I6").value=document.getElementById("I7").value;
        document.getElementById("Q6").value=document.getElementById("Q7").value;

        document.getElementById("I7").value=document.getElementById("I8").value;
        document.getElementById("Q7").value=document.getElementById("Q8").value;

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }
        else if (IQ7.style.display != 'flex' && IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }
        else if (IQ5.style.display != 'flex' && IQ4.style.display == 'flex') { document.getElementById("I4").value=''; document.getElementById("Q4").value=''; IQ4.style.display = 'none'; }
        else if (IQ4.style.display != 'flex' && IQ3.style.display == 'flex') { document.getElementById("I3").value=''; document.getElementById("Q3").value=''; IQ3.style.display = 'none'; }
    
    }
}

// ingredient 4 삭제
delIQ4.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I4").value=document.getElementById("I5").value;
        document.getElementById("Q4").value=document.getElementById("Q5").value;

        document.getElementById("I5").value=document.getElementById("I6").value;
        document.getElementById("Q5").value=document.getElementById("Q6").value;

        document.getElementById("I6").value=document.getElementById("I7").value;
        document.getElementById("Q6").value=document.getElementById("Q7").value;

        document.getElementById("I7").value=document.getElementById("I8").value;
        document.getElementById("Q7").value=document.getElementById("Q8").value;

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }
        else if (IQ7.style.display != 'flex' && IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }
        else if (IQ5.style.display != 'flex' && IQ4.style.display == 'flex') { document.getElementById("I4").value=''; document.getElementById("Q4").value=''; IQ4.style.display = 'none'; }

    }
}

// ingredient 5 삭제
delIQ5.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I5").value=document.getElementById("I6").value;
        document.getElementById("Q5").value=document.getElementById("Q6").value;

        document.getElementById("I6").value=document.getElementById("I7").value;
        document.getElementById("Q6").value=document.getElementById("Q7").value;

        document.getElementById("I7").value=document.getElementById("I8").value;
        document.getElementById("Q7").value=document.getElementById("Q8").value;

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }
        else if (IQ7.style.display != 'flex' && IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }

    }
}

// ingredient 6 삭제
delIQ6.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I6").value=document.getElementById("I7").value;
        document.getElementById("Q6").value=document.getElementById("Q7").value;

        document.getElementById("I7").value=document.getElementById("I8").value;
        document.getElementById("Q7").value=document.getElementById("Q8").value;

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;
    
        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }
        else if (IQ7.style.display != 'flex' && IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }

    }
}

// ingredient 7 삭제
delIQ7.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I7").value=document.getElementById("I8").value;
        document.getElementById("Q7").value=document.getElementById("Q8").value;

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }

    }
}

// ingredient 8 삭제
delIQ8.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I8").value=document.getElementById("I9").value;
        document.getElementById("Q8").value=document.getElementById("Q9").value;

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        
    }
}

// ingredient 7 삭제
delIQ9.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        if (IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        
    }
}

// ingredient 10 삭제
delIQ10.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none';
        
    }
}

