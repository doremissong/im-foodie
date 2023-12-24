function signUpClick() {
    var signUpForm = document.getElementById("signUpForm");
    var signUpId = document.getElementById("mem_id");
    var signUpPw = document.getElementById("upPw");
    var signUpName = document.getElementById("upName");
    var signUpEmail = document.getElementById("upEmail");
    var signUpTel = document.getElementById("upTel");
    // var signUpCity = document.getElementById("city1")
    // var signUpDistrict = document.getElementById("district1");
    var signUpNeighbor = document.getElementById("neighborhood1");
    var signUpBirth = document.getElementById("birthdate");
    var signUpAM = $('input[name=tos_flag]:checked').val();
    var signUpPN = $('input[name=pip_flag]:checked').val();
    var signUpEI = $('input[name=notification_flag]:checked').val();

    if(confirm("가입하시겠습니까?") == true ) {
        if (signUpId.length == 0 || signUpId.value == '') {
            alert("아이디 입력");
            signUpId.focus();
            return false;
        }
        else if (document.getElementById("isChecked").value != 1) {
            alert("아이디 중복체크 해주세요!");
            return false;
        }
        else if (signUpPw.length == 0 || signUpPw.value == '') {
            alert("비밀번호 입력");
            signUpPw.focus();
            return false;
        }
        else if (signUpName.length == 0 || signUpName.value == '') {
            alert("이름 입력");
            signUpName.focus();
            return false;
        }
        else if (signUpEmail.length == 0 || signUpEmail.value == '') {
            alert("이메일 입력");
            signUpEmail.focus();
            return false;
        }
        else if (signUpTel.length == 0 || signUpTel.value == '') {
            alert("연락처 입력");
            signUpTel.focus();
            return false;
        }
        else if (signUpNeighbor.length == 0 || signUpNeighbor.value == '') {
            alert("주소 확인");
            // signUpNeighbor.focus();
            return false;
        }
        else if (signUpBirth.length == 0 || signUpBirth.value == '') {
            alert("생년월일 입력");
            signUpBirth.focus();
            return false;
        }
        else if (signUpAM != 1) {
            alert("이용약관 동의하기");
            return false;
        }
        else if (signUpPN != 1) {
            alert("개인정보 처리방침 동의하기");
            return false;
        }
        else if (signUpEI != 1 && signUpEI != 0 ) {
            alert("이메일 수신 확인");
            return false;
        }

    }
    else {
        return false;
    }
}