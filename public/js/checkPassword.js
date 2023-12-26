function checkAccord() {
    if (document.getElementById("newPW").value == document.getElementById("checkNewPW").value) {
        document.getElementById("notAccord").style.display = 'none';
    }
    else{
        document.getElementById("notAccord").style.display = 'block';
    }
}

function checkPW() {
    if (document.getElementById("newPW").value != document.getElementById("checkNewPW").value) {
        alert("입력하신 새로운 비밀번호가 다릅니다! 다시 입력해주세요.");
        return false;
    }
    else {
        var changePwForm = document.getElementById("changePwForm");
        changePwForm.submit();
    }
}