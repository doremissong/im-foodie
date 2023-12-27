function goLogin() {
    if (confirm('로그인 후 이용 가능합니다.\n로그인 하시겠습니까?')){
        location.href = '/login';
    }
}