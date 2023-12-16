var stepNum = 1; // div id 설정
var stepI = 1; // button id 설정

function addStepBox (z) {

    // newStepDiv 생성
    var newStepDiv = document.createElement('div');
    newStepDiv.id = 'stepBox' + stepNum++;
    newStepDiv.className = 'smile';
    qwer.appendChild(newStepDiv);
    newStepDiv.style.border = '1px solid black';

    // newStepDiv에 단계 입력칸 만들기
    var newTextArea = document.createElement('textarea');
    newTextArea.name = 'step';
    newTextArea.id = 'S'+ stepI;
    newTextArea.placeholder = newTextArea.id;
    newTextArea.required = true;
    newStepDiv.appendChild(newTextArea);

    // newStepDiv에 삭제 버튼 만들기
    var newStepBtn = document.createElement('input');
    newStepBtn.type = 'button';
    newStepBtn.value = "X";
    newStepDiv.appendChild(newStepBtn);
    newStepBtn.id = stepI++;

    newStepDiv.appendChild(document.createElement('p'));

    // 추가한 텍스트아리아 삭제
    newStepBtn.onclick = function () {
        if(confirm("단계를 삭제하시겠습니까?")){
            // 클릭한 버튼 본인의 부모요소(Div) 삭제하기
            const delStepBox = document.getElementById('stepBox' + this.id);
            delStepBox.remove();
        }
    }
}

var firstStep = 0;

function deleteFirstStep() {
    if(confirm('해당 단계를 삭제하시겠습니까?')){
        if (document.querySelector('.smile') == null ) {
            alert('더이상 삭제할 수 없어여');
        }
        else {
            for (var count = 1; count<stepNum; count++){
                var sDiv = document.getElementById('stepBox'+count);
                if (sDiv !== null){
    
                    document.getElementById('S'+firstStep).value = document.getElementById('S'+count).value;

                    firstStep = count;
                }
            }
        }
        
        const delFirstStepBox = document.getElementById('stepBox' + firstStep);
        delFirstStepBox.remove();
    
        firstStep = 0;
    }
}
