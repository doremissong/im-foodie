function signUpClick() {
    var signUpForm = document.getElementById("signUpForm");
    var signUpId = document.getElementById("mem_id");
    var signUpPw = document.getElementById("upPw");
    var signUpName = document.getElementById("upName");
    var signUpEmail = document.getElementById("upEmail");
    var signUpTel = document.getElementById("upTel");
    var signUpCity = document.getElementById("city1")
    // var signUpDistrict = document.getElementById("district1");
    // var signUpNeighbor = document.getElementById("neighborhood1");
    var signUpBirth = document.getElementById("birthdate");
    var signUpAM = $('input[name=tos_flag]:checked').val();
    var signUpPN = $('input[name=pip_flag]:checked').val();
    var signUpEI = $('input[name=notification_flag]:checked').val();
    const isChecked = document.getElementById("isChecked").value;

    if(confirm("가입하시겠습니까?") == true ) {
        if (signUpId.length == 0 || signUpId.value == '') {
            alert("아이디를 입력해주세요!");
            signUpId.focus();
            return false;
        }
        // else if (document.getElementById("isChecked").value != 1) {
        // else if (isChecked != 1) {
        //     alert("아이디의 중복체크를 확인해주세요!");
        //     return false;
        // }
        else if (signUpPw.length == 0 || signUpPw.value == '') {
            alert("비밀번호 입력해주세요!");
            signUpPw.focus();
            return false;
        }
        else if (signUpName.length == 0 || signUpName.value == '') {
            alert("이름을 입력해주세요!");
            signUpName.focus();
            return false;
        }
        else if (signUpEmail.length == 0 || signUpEmail.value == '') {
            alert("이메일을 입력해주세요!");
            signUpEmail.focus();
            return false;
        }
        else if (signUpTel.length == 0 || signUpTel.value == '') {
            alert("연락처를 입력해주세요!");
            signUpTel.focus();
            return false;
        }
        else if (signUpCity.length == 0 || signUpCity.value == '') {
            alert("주소를 확인해주세요!");
            // signUpNeighbor.focus();
            return false;
        }
        else if (signUpBirth.length == 0 || signUpBirth.value == '') {
            alert("생년월일을 입력해주세요!");
            signUpBirth.focus();
            return false;
        }
        else if (signUpAM != 1) {
            alert("이용약관에 동의하셔야 가입하실 수 있습니다!");
            return false;
        }
        else if (signUpPN != 1) {
            alert("개인정보 처리방침에 동의하셔야 가입하실 수 있습니다!");
            return false;
        }
        else if (signUpEI != 1 && signUpEI != 0 ) {
            alert("이메일 수신 여부에 대해 동의/비동의 해주세요!");
            return false;
        }

    }
    else {
        return false;
    }
}