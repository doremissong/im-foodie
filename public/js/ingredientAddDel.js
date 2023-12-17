var num = 1; // div id 설정
var i = 1; // button id 설정

// 재료 추가하기 버튼 클릭 시 발생 이벤트
function addBox (x) {

    // NewDiv 생성
    var newDiv = document.createElement('div');
    newDiv.id = 'box' + num++;                  // 생성마다 div id num 순차 증가
    newDiv.className = 'happy';                 // div class="happy"
    asdf.appendChild(newDiv);                   // class="asdf"인 div에 생성
    newDiv.style.borderBottom = '1px solid black';    
    newDiv.style.display = 'inline-block';
    newDiv.style.margin = '10px 10px 5px 15px';
    newDiv.style.padding = '0 0 7px 0';

    // NewDiv에 재료 이름 입력칸 만들기
    var newArea = document.createElement('input');  // input 요소 할당
    newArea.type = 'text'                           // type="text"로 설정
    newArea.name = 'ingredient';                    //
    newArea.id = 'I'+i;                             //
    newArea.placeholder = "ex) 양파";               //
    newArea.required = true;                        //
    newDiv.appendChild(newArea);                    // newDiv에 생성

    // NewDiv에 재료 양 입력칸 만들기
    var newArea2 = document.createElement('input');
    newArea2.type = 'text'
    newArea2.name = 'quantity';
    newArea2.id = 'Q'+i;
    newArea2.placeholder = "ex) 1개";
    newArea2.required = true;
    newDiv.appendChild(newArea2);

    // NewDiv에 삭제 버튼 만들기
    var newButton = document.createElement('input');
    newButton.type = 'button';
    newButton.value = "X";
    newDiv.appendChild(newButton);
    newButton.id = i++;                             // 생성마다 아이디 값 ++
    newButton.style.border = 'none';
    newButton.style.cursor = 'pointer';
    newButton.onclick = 

    // 삭제 버튼 클릭 시
    newButton.onclick = function () {
        if(confirm("삭제하시겠습니까?")){
            // 클릭한 버튼 본인의 부모요소(Div) 삭제하기
            const delBox = document.getElementById('box' + this.id);
            delBox.remove();
        }
    }

}



var first = 0;

function deleteFirst() {
    if(confirm('해당 재료를 삭제하시겠습니까?')){
        if (document.querySelector('.happy') == null ) {
            alert('더이상 삭제할 수 없습니다!');
        }
        else {
    
            // alert(document.getElementById('Q'+first).value);
    
            for (var cnt = 1; cnt<num; cnt++){
                var bDiv = document.getElementById('box'+cnt);
                if (bDiv !== null){
    
                    document.getElementById('I'+first).value = document.getElementById('I'+cnt).value;
                    document.getElementById('Q'+first).value = document.getElementById('Q'+cnt).value;
    
                    first = cnt;
                }
            }
        }
        
        const delBoxf = document.getElementById('box' + first);
        delBoxf.remove();
    
        first = 0;
    }
}