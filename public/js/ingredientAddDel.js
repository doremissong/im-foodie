var num = 1; // div id 설정
var i = 1; // button id 설정

function addBox (x) {

    // NewDiv 생성
    var newDiv = document.createElement('div');
    newDiv.id = 'box' + num++;
    newDiv.className = 'happy';
    asdf.appendChild(newDiv);
    newDiv.style.border = '1px solid black';

    // NewDiv에 재료 이름 입력칸 만들기
    var newArea = document.createElement('input');
    newArea.type = 'text'
    newArea.name = 'ingredient';
    newArea.id = 'I'+i;
    newArea.placeholder = newArea.id;
    newArea.required = true;
    newDiv.appendChild(newArea);

    // NewDiv에 재료 양 입력칸 만들기
    var newArea2 = document.createElement('input');
    newArea2.type = 'text'
    newArea2.name = 'quantity';
    newArea2.id = 'Q'+i;
    newArea2.placeholder = newArea2.id;
    newArea2.required = true;
    newDiv.appendChild(newArea2);

    // NewDiv에 삭제 버튼 만들기
    var newButton = document.createElement('input');
    newButton.type = 'button';
    newButton.value = "X";
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