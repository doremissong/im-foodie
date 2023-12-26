function checkPW() {
    if (document.getElementById("newPW").value != document.getElementById("checkNewPW").value) {
        alert("aa");
        return false;
    }
    else {
        var changePwForm = document.getElementById("changePwForm");
        changePwForm.submit();
    }
}