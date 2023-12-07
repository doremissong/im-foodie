// var zoom = function(demo) { //함수 호출 -> 인자값으로 아이디를 받는다.
//     demo.style.color = 'red';
//     demo.style.fontSize = '34pt';
// };

window.onload = function () {

    // step 01 -> step 02 추가
    var add01 = document.getElementById('addStep01');   // 추가 버튼
    var del01 = document.getElementById('delStep01');   // 삭제 버튼
    var step01 = document.getElementById("step-02");

    add01.onclick = function () {  // 추가 버튼 클릭했을 때
        step01.style.display = 'block';
    }

    del01.onclick = function () {  // 삭제 버튼 클릭했을 때
        step01.style.display = 'none';
        step02.style.display = 'none';
        document.getElementById("stepArea02").value='';   // textarea 내용 비우기
        document.getElementById("stepArea03").value=''; 
    }


    // step 02 -> step 03 추가
    var add02 = document.getElementById('addStep02');   // 추가 버튼
    var del02 = document.getElementById('delStep02');   // 삭제 버튼
    var step02 = document.getElementById("step-03");

    add02.onclick = function () {  // 추가 버튼 클릭했을 때
        step02.style.display = 'block';
    }

    del02.onclick = function () {  // 삭제 버튼 클릭했을 때
        step02.style.display = 'none';
        document.getElementById("stepArea03").value='';   // textarea 내용 비우기
    }

}
