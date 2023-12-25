function joinClick() {
    if(confirm("신청하시겠습니까?") == true) {
        if( document.getElementById("gatherJoinArea").value==''){
            alert("인사말을 적어주세요!");
            return false;
        }
        else{
            var joinForm = document.getElementById("form-apply");
            joinForm.submit(); 
            // modalJoin.style.display = 'none';
            // modalViewJoin.style.display = 'none';
            if (document.getElementById('modalWrapJoin')) {
                modalJoin.style.display = 'none';
            }else if (document.getElementById('modalWrapViewJoin')) {
                modalViewJoin.style.display = 'none';
            }
            document.getElementById("gatherJoinArea").value='';
        }
    }
    else {
        return false;
    }
}

// 특정 id가 존재하는지 체크하는 함수
// function checkElementExist(id)  {
//     if(document.getElementById(id)) {
//       document.write(id + ' is exist' + '<br>');
//     }else {
//       document.write(id + ' is not exist' + '<br>');
//     }
//   }
  
//   // checkElementExist() 함수 호출
//   document.write('======== 결과 ======= <br>');
//   checkElementExist('modalWrapViewJoin');
//   checkElementExist('modalWrapJoin');