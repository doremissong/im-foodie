
var count = 1; // input text 의 name 에 사용할 카운터를 설정합니다
var num = 1; // div id 설정
var i = 1; // button id 설정

function addBox (x) {

    // NewDiv 생성
    var newDiv = document.createElement('div');
    newDiv.id = 'box' + num++;
    asdf.appendChild(newDiv);
    newDiv.style.border = '1px solid black';
    newDiv.appendChild(document.createElement('p'));

    // 요소 확인용
    var newP = document.createElement('p');
    newP.innerHTML = "만들엉";
    newP.id = 'checkP';
    newDiv.appendChild(newP);

    // NewDiv에 재료 이름 입력칸 만들기
    var newArea = document.createElement('input');
    newArea.type = 'text'
    newArea.name = 'ingredient';
    newArea.placeholder = newDiv.id;
    newArea.required = true;
    newDiv.appendChild(newArea);

    // NewDiv에 재료 양 입력칸 만들기
    var newArea2 = document.createElement('input');
    newArea2.type = 'text'
    newArea2.name = 'quantity';
    newArea2.placeholder = newDiv.id;
    newArea2.required = true;
    newDiv.appendChild(newArea2);

    // NewDiv에 삭제 버튼 만들기
    var newButton = document.createElement('input');
    newButton.type = 'button';
    newButton.value = "x";
    newDiv.appendChild(newButton);
    newButton.id = i++;

    newDiv.appendChild(document.createElement('p'));

    // 수정필요!!!
    newButton.onclick = function () {
        if(confirm("삭제하시겠습니까?")){
            // 클릭한 버튼 본인의 부모요소(Div) 삭제하기
            const delBox = document.getElementById('box' + this.id);
            delBox.remove();
        }
    }

}

var send = document.getElementById("send");
send.addEventListener("click", function () {
    var form = document.getElementById("form");
    // var id = document.getElementById("id");
    // var pw = document.getElementById("pw");

    if (document.querySelector('#checkP') !== null) {
        alert("있당");
    }
    else {
        alert("없당");
        return false;
    }

    // if (pw.value.trim() == "" || id.value.trim() == "") {
    //     alert("id와 비번 잘 적어라");
    //     return false;
    // }

    form.action = "http://www.naver.com";
    form.mothod = "GET";
    form.submit();

});
