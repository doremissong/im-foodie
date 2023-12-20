function joinClick() {
    if(confirm("신청하시겠습니까?") == true) {
        if( document.getElementById("gatherJoinArea").value==''){
            alert("인사말을 적어주세요!");
            return false;
        }
        else{
            var joinForm = document.getElementById("form-apply");
            joinForm.submit(); 
            modalJoin.style.display = 'none';
            modalViewJoin.style.display = 'none';
            document.getElementById("gatherJoinArea").value='';
        }
    }
    else {
        return false;
    }
}