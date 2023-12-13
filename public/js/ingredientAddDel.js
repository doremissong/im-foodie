// ingredient 1
var delIQ1 = document.getElementById('delIQ1');   // 삭제 버튼
var IQ1 = document.getElementById("IQ1");

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

// ingredient 11
var delIQ11 = document.getElementById('delIQ11');   // 삭제 버튼
var IQ11 = document.getElementById("IQ11");

// ingredient 12
var delIQ12 = document.getElementById('delIQ12');   // 삭제 버튼
var IQ12 = document.getElementById("IQ12");

// ingredient 13
var delIQ13 = document.getElementById('delIQ13');   // 삭제 버튼
var IQ13 = document.getElementById("IQ13");

// ingredient 14
var delIQ14 = document.getElementById('delIQ14');   // 삭제 버튼
var IQ14 = document.getElementById("IQ14");

// ingredient 15
var delIQ15 = document.getElementById('delIQ15');   // 삭제 버튼
var IQ15 = document.getElementById("IQ15");

// ingredient 16
var delIQ16 = document.getElementById('delIQ16');   // 삭제 버튼
var IQ16 = document.getElementById("IQ16");

// ingredient 17
var delIQ17 = document.getElementById('delIQ17');   // 삭제 버튼
var IQ17 = document.getElementById("IQ17");

// ingredient 18
var delIQ18 = document.getElementById('delIQ18');   // 삭제 버튼
var IQ18 = document.getElementById("IQ18");

// ingredient 19
var delIQ19 = document.getElementById('delIQ19');   // 삭제 버튼
var IQ19 = document.getElementById("IQ19");

// ingredient 20
var delIQ20 = document.getElementById('delIQ20');   // 삭제 버튼
var IQ20 = document.getElementById("IQ20");

// ingredient 21
var delIQ21 = document.getElementById('delIQ21');   // 삭제 버튼
var IQ21 = document.getElementById("IQ21");

// ingredient 22
var delIQ22 = document.getElementById('delIQ22');   // 삭제 버튼
var IQ22 = document.getElementById("IQ22");

// ingredient 23
var delIQ23 = document.getElementById('delIQ23');   // 삭제 버튼
var IQ23 = document.getElementById("IQ23");

// ingredient 24
var delIQ24 = document.getElementById('delIQ24');   // 삭제 버튼
var IQ24 = document.getElementById("IQ24");



// 추가하기 버튼
var addIQ = document.getElementById('addIQ'); // 추가하기
addIQ.onclick = function () {
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
    else if(IQ11.style.display != 'flex') {
        IQ11.style.display = 'flex';
    }
    else if(IQ12.style.display != 'flex') {
        IQ12.style.display = 'flex';
    }
    else if(IQ13.style.display != 'flex') {
        IQ13.style.display = 'flex';
    }
    else if(IQ14.style.display != 'flex') {
        IQ14.style.display = 'flex';
    }
    else if(IQ15.style.display != 'flex') {
        IQ15.style.display = 'flex';
    }
    else if(IQ16.style.display != 'flex') {
        IQ16.style.display = 'flex';
    }
    else if(IQ17.style.display != 'flex') {
        IQ17.style.display = 'flex';
    }
    else if(IQ18.style.display != 'flex') {
        IQ18.style.display = 'flex';
    }
    else if(IQ19.style.display != 'flex') {
        IQ19.style.display = 'flex';
    }
    else if(IQ20.style.display != 'flex') {
        IQ20.style.display = 'flex';
    }
    else if(IQ21.style.display != 'flex') {
        IQ21.style.display = 'flex';
    }
    else if(IQ22.style.display != 'flex') {
        IQ22.style.display = 'flex';
    }
    else if(IQ23.style.display != 'flex') {
        IQ23.style.display = 'flex';
    }
    else if(IQ24.style.display != 'flex') {
        IQ24.style.display = 'flex';
    }
}

// ingredient 1 삭제
delIQ1.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I1").value=document.getElementById("I2").value;
        document.getElementById("Q1").value=document.getElementById("Q2").value;

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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }
        else if (IQ8.style.display != 'flex' && IQ7.style.display == 'flex') { document.getElementById("I7").value=''; document.getElementById("Q7").value=''; IQ7.style.display = 'none'; }
        else if (IQ7.style.display != 'flex' && IQ6.style.display == 'flex') { document.getElementById("I6").value=''; document.getElementById("Q6").value=''; IQ6.style.display = 'none'; }
        else if (IQ6.style.display != 'flex' && IQ5.style.display == 'flex') { document.getElementById("I5").value=''; document.getElementById("Q5").value=''; IQ5.style.display = 'none'; }
        else if (IQ5.style.display != 'flex' && IQ4.style.display == 'flex') { document.getElementById("I4").value=''; document.getElementById("Q4").value=''; IQ4.style.display = 'none'; }
        else if (IQ4.style.display != 'flex' && IQ3.style.display == 'flex') { document.getElementById("I3").value=''; document.getElementById("Q3").value=''; IQ3.style.display = 'none'; }
        else if (IQ3.style.display != 'flex' && IQ2.style.display == 'flex') { document.getElementById("I2").value=''; document.getElementById("Q2").value=''; IQ2.style.display = 'none'; }
        else if (IQ2.style.display != 'flex' && IQ1.style.display == 'flex') { document.getElementById("I1").value=''; document.getElementById("Q1").value=''; IQ1.style.display = 'none'; }

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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;
    
        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
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

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        else if (IQ9.style.display != 'flex' && IQ8.style.display == 'flex') { document.getElementById("I8").value=''; document.getElementById("Q8").value=''; IQ8.style.display = 'none'; }

    }
}

// ingredient 9 삭제
delIQ9.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I9").value=document.getElementById("I10").value;
        document.getElementById("Q9").value=document.getElementById("Q10").value;

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        else if (IQ10.style.display != 'flex' && IQ9.style.display == 'flex') { document.getElementById("I9").value=''; document.getElementById("Q9").value=''; IQ9.style.display = 'none'; }
        
    }
}

// ingredient 10 삭제
delIQ10.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I10").value=document.getElementById("I11").value;
        document.getElementById("Q10").value=document.getElementById("Q11").value;

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        else if (IQ11.style.display != 'flex' && IQ10.style.display == 'flex') { document.getElementById("I10").value=''; document.getElementById("Q10").value=''; IQ10.style.display = 'none'; }
        
    }
}

// ingredient 11 삭제
delIQ11.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I11").value=document.getElementById("I12").value;
        document.getElementById("Q11").value=document.getElementById("Q12").value;

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        else if (IQ12.style.display != 'flex' && IQ11.style.display == 'flex') { document.getElementById("I11").value=''; document.getElementById("Q11").value=''; IQ11.style.display = 'none'; }
        
    }
}

// ingredient 12 삭제
delIQ12.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I12").value=document.getElementById("I13").value;
        document.getElementById("Q12").value=document.getElementById("Q13").value;

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        else if (IQ13.style.display != 'flex' && IQ12.style.display == 'flex') { document.getElementById("I12").value=''; document.getElementById("Q12").value=''; IQ12.style.display = 'none'; }
        
    }
}

// ingredient 13 삭제
delIQ13.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I13").value=document.getElementById("I14").value;
        document.getElementById("Q13").value=document.getElementById("Q14").value;

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        else if (IQ14.style.display != 'flex' && IQ13.style.display == 'flex') { document.getElementById("I13").value=''; document.getElementById("Q13").value=''; IQ13.style.display = 'none'; }
        
    }
}

// ingredient 14 삭제
delIQ14.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I14").value=document.getElementById("I15").value;
        document.getElementById("Q14").value=document.getElementById("Q15").value;

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        else if (IQ15.style.display != 'flex' && IQ14.style.display == 'flex') { document.getElementById("I14").value=''; document.getElementById("Q14").value=''; IQ14.style.display = 'none'; }
        
    }
}

// ingredient 15 삭제
delIQ15.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I15").value=document.getElementById("I16").value;
        document.getElementById("Q15").value=document.getElementById("Q16").value;

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        else if (IQ16.style.display != 'flex' && IQ15.style.display == 'flex') { document.getElementById("I15").value=''; document.getElementById("Q15").value=''; IQ15.style.display = 'none'; }
        
    }
}

// ingredient 16 삭제
delIQ16.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I16").value=document.getElementById("I17").value;
        document.getElementById("Q16").value=document.getElementById("Q17").value;

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        else if (IQ17.style.display != 'flex' && IQ16.style.display == 'flex') { document.getElementById("I16").value=''; document.getElementById("Q16").value=''; IQ16.style.display = 'none'; }
        
    }
}

// ingredient 17 삭제
delIQ17.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I17").value=document.getElementById("I18").value;
        document.getElementById("Q17").value=document.getElementById("Q18").value;

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        else if (IQ18.style.display != 'flex' && IQ17.style.display == 'flex') { document.getElementById("I17").value=''; document.getElementById("Q17").value=''; IQ17.style.display = 'none'; }
        
    }
}

// ingredient 18 삭제
delIQ18.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I18").value=document.getElementById("I19").value;
        document.getElementById("Q18").value=document.getElementById("Q19").value;

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        else if (IQ19.style.display != 'flex' && IQ18.style.display == 'flex') { document.getElementById("I18").value=''; document.getElementById("Q18").value=''; IQ18.style.display = 'none'; }
        
    }
}

// ingredient 19 삭제
delIQ19.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I19").value=document.getElementById("I20").value;
        document.getElementById("Q19").value=document.getElementById("Q20").value;

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        else if (IQ20.style.display != 'flex' && IQ19.style.display == 'flex') { document.getElementById("I19").value=''; document.getElementById("Q19").value=''; IQ19.style.display = 'none'; }
        
    }
}

// ingredient 20 삭제
delIQ20.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I20").value=document.getElementById("I21").value;
        document.getElementById("Q20").value=document.getElementById("Q21").value;

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        else if (IQ21.style.display != 'flex' && IQ20.style.display == 'flex') { document.getElementById("I20").value=''; document.getElementById("Q20").value=''; IQ20.style.display = 'none'; }
        
    }
}

// ingredient 21 삭제
delIQ21.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I21").value=document.getElementById("I22").value;
        document.getElementById("Q21").value=document.getElementById("Q22").value;

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        else if (IQ22.style.display != 'flex' && IQ21.style.display == 'flex') { document.getElementById("I21").value=''; document.getElementById("Q21").value=''; IQ21.style.display = 'none'; }
        
    }
}

// ingredient 22 삭제
delIQ22.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I22").value=document.getElementById("I23").value;
        document.getElementById("Q22").value=document.getElementById("Q23").value;

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        else if (IQ23.style.display != 'flex' && IQ22.style.display == 'flex') { document.getElementById("I22").value=''; document.getElementById("Q22").value=''; IQ22.style.display = 'none'; }
        
    }
}

// ingredient 23 삭제
delIQ23.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I23").value=document.getElementById("I24").value;
        document.getElementById("Q23").value=document.getElementById("Q24").value;

        if (IQ24.style.display == 'flex') { document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none'; }
        else if (IQ24.style.display != 'flex' && IQ23.style.display == 'flex') { document.getElementById("I23").value=''; document.getElementById("Q23").value=''; IQ23.style.display = 'none'; }
        
    }
}

// ingredient 24 삭제
delIQ24.onclick = function () {  // 삭제 버튼 클릭했을 때
    if(confirm("재료를 삭제하시겠습니까?")){

        document.getElementById("I24").value=''; document.getElementById("Q24").value=''; IQ24.style.display = 'none';

    }

}
