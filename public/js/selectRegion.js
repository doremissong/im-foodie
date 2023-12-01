$(function(){
    areaSelectMaker("#city1", "#district1", "#neighborhood1");
    areaSelectMaker("#city2", "#district2", "#neighborhood2");
});

var areaSelectMaker = function(a1, a2, a3){
    if(a1 == null || a2 == null || a3 == null){
        console.warn("Unkwon Area Tag");
        return;
    }

    var area = {
        "서울시" :{
            "강남구" : [ "역삼동", "개포동", "청담동", "삼성동", "대치동", "신사동", "논현동", "압구정동","세곡동", "자곡동", "율현동", 
                    "일원동", "수서동", "도곡동", "논현1동", "논현2동", "삼성1동", "삼성2동", "대치1동", "대치2동", "대치4동",
                    "역삼1동", "역삼2동", "도곡1동", "도곡2동", "개포1동", "개포2동", "개포3동", "개포4동", "일원본동", "일원2동"],
            "강동구" : [ "명일동", "고덕동", "상일동", "길동", "둔촌동", "암사동", "성내동", "천호동", "강일동", "상일1동", "상일2동",
                    "명일1동", "명일2동", "고덕1동", "고덕2동", "암사1동", "암사2동", "암사3동", "천호1동", "천호2동", "천호3동",
                    "성내1동", "성내2동", "성내3동", "둔촌1동", "둔촌2동" ],
            "강북구" : [ "미아동", "번동", "수유동", "우이동", "삼양동", "송중동", "송천동", "삼각산동", "번1동", "번2동", "번3동", "수유1동",
                    "수유2동", "수유3동", "인수동" ],
            "강서구" : [ "염창동", "등촌동", "화곡동", "가양동", "마곡동", "내발산동", "외발산동", "공항동", "방화동", "개화동", "과해동", "오곡 동", "오쇠동", "등촌1동", "등촌2동", "등촌3동", "화곡1동", "화곡2동", "화곡3동", "화곡4동", "화곡본동", "화곡6동", "화곡8동", "가양1동", "가양2동", "가양3동", "발산1동", "우장산동", "방화1동", "방화2동", "방화3동" ],
            "관악구" : [ "봉천동", "신림동", "남현동", "보라매", "동청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "중앙동", "인헌 동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "삼성동", "미성동", "난곡동" ],
            "광진구" : [ "중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동", "중곡1동", "중곡2동", "중곡3동", "중곡4동", "자양1동", "자양2동", "자양3동", "자양4동", "구의1동", "구의2동", "구의3동" ],
            "구로구" : [ "신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "궁동", "온수동", "천왕동", "항동", "구로1동", "구로2동", "구로3동", "구로4동", "구로5동", "고척1동", "고척2동", "개봉1동", "개봉2동", "개봉3동", "오류1동", "오류2동", "수궁동" ],
            "금천구" : [ "가산동", "독산동", "시흥동", "독산1동", "독산2동", "독산3동", "독산4동", "시흥1동", "시흥2동", "시흥3동", "시흥4동", " 시흥5동" ],
            "노원구" : [ "월계동", "공릉동", "하계동", "상계동", "중계동", "월계1동", "월계2동", "월계3동", "공릉1동", "공릉2동", "하계1동", "하 계2동", "중계본동", "중계1동", "중계4동", "중계2.3동", "상계1동", "상계2동", "상계3.4동", "상계5동", "상계6.7동", "상계8동", "상계9동", "상계10동" ],
            "도봉구" : [ "쌍문동", "방학동", "창동", "도봉동", "창1동", "창2동", "창3동", "창4동", "창5동", "도봉1동", "도봉2동", "쌍문1동", "쌍 문2동", "쌍문3동", "쌍문4동", "방학1동", "방학2동", "방학3동" ],
            "동대문구" : [ "신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동", "용신동", "전농1동", "전농2동", "답십리1동", "답십리2동", "장안1동", "장안2동", "휘경1동", "휘경2동", "이문1동", "이문2동" ],
            "동작구" : [ "노량진동", "상도동", "상도1동", "본동", "흑석동", "동작동", "사당동", "대방동", "신대방동", "노량진1동", "노량진2동", "상도2동", "상도3동", "상도4동", "사당1동", "사당2동", "사당3동", "사당4동", "사당5동", "신대방1동", "신대방2동"  ],
            "마포구" : [ "아현동", "공덕동", "신공덕동", "도화동", "용강동", "토정동", "마포동", "대흥동", "염리동", "노고산동", "신수동", "현석 동", "구수동", "창전동", "상수동", "하중동", "신정동", "당인동", "서교동", "동교동", "합정동", "망원동", "연남동", "성산동", "중동", "상암동", "서강동", "망원1동", "망원2동", "성산1동", "성산2동" ],
            "서대문구" : [ "충정로2가", "충정로3가", "합동", "미근동", "냉천동", "천연동", "옥천동", "영천동", "현저동", "북아현동", "홍제동", "대 현동", "대신동", "신촌동", "봉원동", "창천동", "연희동", "홍은동", "북가좌동", "남가좌동", "충현동", "홍제1동", "홍제3동", "홍제2동", "홍은1동", "홍은2동", "남가좌1동", "남가좌2동", "북가좌1동", "북가좌2동" ],
            "서초구" : [ "방배동", "양재동", "우면동", "원지동", "잠원동", "반포동", "서초동", "내곡동", "염곡동", "신원동", "서초1동", "서초2동", "서초3동", "서초4동", "반포본동", "반포1동", "반포2동", "반포3동", "반포4동", "방배본동", "방배1동", "방배2동", "방배3동", "방배4동", "양재1동", "양재2동" ],
            "성동구" : [ "상왕십리동", "하왕십리동", "홍익동", "도선동", "마장동", "사근동", "행당동", "응봉동", "금호동1가", "금호동2가", "금호 동3가", "금호동4가", "옥수동", "성수동1가", "성수동2가", "송정동", "용답동", "왕십리2동", "왕십리도선동", "행당1동", "행당2동", "금호1가동", "금호2.3가동", "금호4가동", "성수1가1동", "성수1가2동", "성수2가1동", "성수2가3동" ],
            "성북구" : [ "성북동", "성북동1가", "돈암동", "동소문동1가", "동소문동2가", "동소문동3가", "동소문동4가", "동소문동5가", "동소문동6가", "동소문동7가", "삼선동1가", "삼선동2가", "삼선동3가", "삼선동4가", "삼선동5가", "동선동1가", "동선동2가", "동선동3가", "동선동4가", "동선동5가", "안암동1가", "안암동2가", "안암동3가", "안암동4가", "안암동5가", "보문동4가", "보문동5가", "보문동6가", "보문동7가", "보문동1가", "보문동2가", "보문동3가", "정릉동", "길음동", "종암동", "하월곡동", "상월곡동", " 장위동", "석관동", "삼선동", "동선동", "돈암1동", "돈암2동", "안암동", "보문동", "정릉1동", "정릉2동", "정릉3동", "정릉4동", "길음1동", "길음2동", "월곡1동", "월곡2동", "장위1동", "장위2동", "장위3동" ],
            "송파구" : [ "잠실동", "신천동", "풍납동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "방이동", "오금동", "거여동", "마천동", "풍납1동", "풍납2동", "거여1동", "거여2동", "마천1동", "마천2동", "방이1동", "방이2동", "오륜동", "송파1동", "송파2동", "가락본동", "가락1동", "가락2동", "문정1동", "문정2동", "위례동", "잠실본동", "잠실2동", "잠실3동", "잠실4동", "잠실6동", "잠실7동" ],
            "양천구" : [ "신정동", "목동", "신월동", "목1동", "목2동", "목3동", "목4동", "목5동", "신월1동", "신월2동", "신월3동", "신월4동", "신월5동", "신월6동", "신월7동", "신정1동", "신정2동", "신정3동", "신정4동", "신정6동", "신정7동" ],
            "영등포구" : [ "영등포동", "영등포동1가", "영등포동2가", "영등포동3가", "영등포동4가", "영등포동5가", "영등포동6가", "영등포동7가", "영등포동8가", "여의도동", "당산동1가", "당산동2가", "당산동3가", "당산동4가", "당산동5가", "당산동6가", "당산동", "도림동", "문래동1가", "문래동2가", "문래동3가", "문래동4가", "문래동5가", "문래동6가", "양평동1가", "양평동2가", "양평동3가", "양평동4가", "양평동5가", "양평동6가", "양화동", "신길동", "대림동", "양평동", "영등포본동", "여의동", "당산1동", "당산2 동", "문래동", "양평1동", "양평2동", "신길1동", "신길3동", "신길4동", "신길5동", "신길6동", "신길7동", "대림1동", "대림2동", "대림3동" ],
            "용산구" : [ "후암동", "용산동2가", "용산동4가", "갈월동", "남영동", "용산동1가", "동자동", "서계동", "청파동1가", "청파동2가", "청파동3가", "원효로1가", "원효로2가", "신창동", "산천동", "청암동", "원효로3가", "원효로4가", "효창동", "도원동", "용문동", "문배동", "신계동", "한강로1가", "한강로2가", "용산동3가", "용산동5가", "한강로3가", "이촌동", "이태원동", "한남동", "동빙고동", "서빙고동", "주성동", "용산동6가", "보광동", "용산2가", "동청파동", "원효로1동", "원효로2동", "한강로동", "이촌1동", "이촌2동", "이태원1동", "이태원2동" ],
            "은평구" : [ "수색동", "녹번동", "불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "진관동", "불광1동", "불광2동", "갈현1동", "갈현2동", "응암1동", "응암2동", "응암3동", "신사1동", "신사2동" ],
            "종로구" : [ "청운동", "신교동", "궁정동", "효자동", "창성동", "통의동", "적선동", "통인동", "누상동", "누하동", "옥인동", "체부동", "필운동", "내자동", "사직동", "도렴동", "당주동", "내수동", "세종로", "신문로1가", "신문로2가", "청진동", "서린동", "수 송동", "중학동", "종로1가", "공평동", "관훈동", "견지동", "와룡동", "권농동", "운니동", "익선동", "경운동", "관철동", " 인사동", "낙원동", "종로2가", "팔판동", "삼청동", "안국동", "소격동", "화동", "사간동", "송현동", "가회동", "재동", "계 동", "원서동", "훈정동", "묘동", "봉익동", "돈의동", "장사동", "관수동", "종로3가", "인의동", "예지동", "원남동", "연지 동", "종로4가", "효제동", "종로5가", "종로6가", "이화동", "연건동", "충신동", "동숭동", "혜화동", "명륜1가", "명륜2가", "명륜4가", "명륜3가", "창신동", "숭인동", "교남동", "평동", "송월동", "홍파동", "교북동", "행촌동", "구기동", "평창동", "부암동", "홍지동", "신영동", "무악동", "청운효자동", "종로1.2.3.4가동", "종로5.6가동", "창신1동", "창신2동", "창신3동", "숭인1동", "숭인2동" ],
            "중구" : [ "무교동", "다동", "태평로1가", "을지로1가", "을지로2가", "남대문로1가", "삼각동", "수하동", "장교동", "수표동", "소공동", "남창동", "북창동", "태평로2가", "남대문로2가", "남대문로3가", "남대문로4가", "남대문로5가", "봉래동1가", "봉래동2가", "회현동1가", "회현동2가", "회현동3가", "충무로1가", "충무로2가", "명동1가", "명동2가", "남산동1가", "남산동2가", "남산 동3가", "저동1가", "충무로4가", "충무로5가", "인현동2가", "예관동", "묵정동", "필동1가", "필동2가", "필동3가", "남학동", "주자동", "예장동", "장충동1가", "장충동2가", "광희동1가", "광희동2가", "쌍림동", "을지로6가", "을지로7가", "을지로4가", "을지로5가", "주교동", "방산동", "오장동", "을지로3가", "입정동", "산림동", "충무로3가", "초동", "인현동1가", "저동2가", "신당동", "흥인동", "무학동", "황학동", "서소문동", "정동", "순화동", "의주로1가", "충정로1가", "중림동", "의주로2가", "만리동1가", "만리동2가", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "다산동", "약수동", "청구동", "신 당5동", "동화동" ],
            "중랑구" : [ "면목동", "상봉동", "중화동", "묵동", "망우동", "신내동", "면목2동", "면목4동", "면목5동", "면목본동", "면목7동", "면목3.8동", "상봉1동", "상봉2동", "중화1동", "중화2동", "묵1동", "묵2동", "망우본동", "망우3동", "신내1동", "신내2동" ]
        },
        "부산시" : {
            "강서구" : [  ],
            "금정구" : [  ], 
            "남구" : [  ], 
            "동구" : [  ], 
            "동래구" : [  ], 
            "부산진구" : [  ], 
            "북구" : [  ], 
            "사상구" : [  ], 
            "사하구" : [  ], 
            "서구" : [  ], 
            "수영구" : [  ], 
            "연제구" : [  ], 
            "영도구" : [  ], 
            "중구" : [  ], 
            "해운대구" : [  ], 
            "기장군" : [  ]
        },
        "대구시" : {
            "남구" : [  ], 
            "달서구" : [  ], 
            "동구" : [  ], 
            "북구" : [  ], 
            "서구" : [  ], 
            "수성구" : [  ], 
            "중구" : [  ], 
            "달성군" : [  ]
        },
        "인천시" : {
            "계양구" : [  ], 
            "미추홀구" : [  ], 
            "남동구" : [  ], 
            "동구" : [  ], 
            "부평구" : [  ],
            "서구" : [  ], 
            "연수구" : [  ],
            "중구" : [  ], 
            "강화군" : [  ],
            "옹진군" : [  ]
        },
        "광주시": {
            "광산구" : [  ], 
            "남구" : [  ], 
            "동구" : [  ], 
            "북구" : [  ], 
            "서구" : [  ]
        },
        "대전시": {
            "대덕구" : [  ], 
            "동구" : [  ], 
            "서구" : [  ], 
            "유성구" : [  ], 
            "중구" : [  ]
        },
        "울산시": {
            "남구" : [  ], 
            "동구" : [  ], 
            "북구" : [  ], 
            "중구" : [  ], 
            "울주군" : [  ]
        },
        "세종시": {
            "세종시" : [  ]
        },
        "경기도": {
            "수원시" : [  ],
            "성남시" : [  ], 
            "의정부시" : [  ], 
            "안양시" : [  ], 
            "부천시" : [  ], 
            "광명시" : [  ], 
            "평택시" : [  ], 
            "동두천시" : [  ], 
            "안산시" : [  ], 
            "고양시" : [  ], 
            "과천시" : [  ], 
            "구리시" : [  ], 
            "남양주시" : [  ], 
            "오산시" : [  ], 
            "시흥시" : [  ], 
            "군포시" : [  ], 
            "의왕시" : [  ], 
            "하남시" : [  ], 
            "용인시" : [  ], 
            "파주시" : [  ], 
            "이천시" : [  ], 
            "안성시" : [  ], 
            "김포시" : [  ], 
            "화성시" : [  ], 
            "광주시" : [  ], 
            "양주시" : [  ], 
            "포천시" : [  ], 
            "여주시" : [  ], 
            "연천군" : [  ], 
            "가평군" : [  ], 
            "양평군" : [  ]
        },
        "충청북도" :{
            "청주시" : [  ], 
            "충주시" : [  ], 
            "제천시" : [  ], 
            "보은군" : [  ], 
            "옥천군" : [  ], 
            "영동군" : [  ], 
            "증평군" : [  ], 
            "진천군" : [  ], 
            "괴산군" : [  ], 
            "음성군" : [  ], 
            "단양군" : [  ]
        },
        "충청남도" : {
            "천안시" : [  ], 
            "공주시" : [  ], 
            "보령시" : [  ], 
            "아산시" : [  ], 
            "서산시" : [  ], 
            "논산시" : [  ], 
            "계룡시" : [  ], 
            "당진시" : [  ], 
            "금산군" : [  ], 
            "부여군" : [  ], 
            "서천군" : [  ], 
            "청양군" : [  ], 
            "홍성군" : [  ],
            "예산군" : [  ], 
            "태안군" : [  ]
        },
        "전라북도" : {
            "전주시" : [  ], 
            "군산시" : [  ], 
            "익산시" : [  ], 
            "정읍시" : [  ], 
            "남원시" : [  ], 
            "김제시" : [  ], 
            "완주군" : [  ], 
            "진안군" : [  ], 
            "무주군" : [  ], 
            "장수군" : [  ], 
            "임실군" : [  ], 
            "순창군" : [  ], 
            "고창군" : [  ], 
            "부안군" : [  ]
        },
        "전라남도" : {
            "목포시" : [  ], 
            "여수시" : [  ], 
            "순천시" : [  ], 
            "나주시" : [  ], 
            "광양시" : [  ], 
            "담양군" : [  ], 
            "곡성군" : [  ], 
            "구례군" : [  ], 
            "고흥군" : [  ], 
            "보성군" : [  ], 
            "화순군" : [  ], 
            "장흥군" : [  ], 
            "강진군" : [  ], 
            "해남군" : [  ], 
            "영암군" : [  ], 
            "무안군" : [  ], 
            "함평군" : [  ], 
            "영광군" : [  ], 
            "장성군" : [  ], 
            "완도군" : [  ], 
            "진도군" : [  ], 
            "신안군" : [  ]
        },
        "경상북도" : {
            "포항시" : [  ], 
            "경주시" : [  ], 
            "김천시" : [  ], 
            "안동시" : [  ], 
            "구미시" : [  ], 
            "영주시" : [  ], 
            "영천시" : [  ], 
            "상주시" : [  ], 
            "문경시" : [  ], 
            "경산시" : [  ], 
            "군위군" : [  ], 
            "의성군" : [  ], 
            "청송군" : [  ], 
            "영양군" : [  ], 
            "영덕군" : [  ], 
            "청도군" : [  ], 
            "고령군" : [  ], 
            "성주군" : [  ], 
            "칠곡군" : [  ], 
            "예천군" : [  ], 
            "봉화군" : [  ], 
            "울진군" : [  ], 
            "울릉군" : [  ]
        },
        "경상남도" : {
            "창원시" : [  ], 
            "진주시" : [  ], 
            "통영시" : [  ], 
            "사천시" : [  ], 
            "김해시" : [  ], 
            "밀양시" : [  ], 
            "거제시" : [  ], 
            "양산시" : [  ], 
            "의령군" : [  ], 
            "함안군" : [  ], 
            "창녕군" : [  ], 
            "고성군" : [  ], 
            "남해군" : [  ], 
            "하동군" : [  ], 
            "산청군" : [  ], 
            "함양군" : [  ], 
            "거창군" : [  ], 
            "합천군" : [  ]
        },
        "강원도" : {
            "춘천시" : [  ], 
            "원주시" : [  ], 
            "강릉시" : [  ], 
            "동해시" : [  ], 
            "태백시" : [  ], 
            "속초시" : [  ], 
            "삼척시" : [  ], 
            "홍천군" : [  ], 
            "횡성군" : [  ], 
            "영월군" : [  ], 
            "평창군" : [  ], 
            "정선군" : [  ], 
            "철원군" : [  ], 
            "화천군" : [  ], 
            "양구군" : [  ], 
            "인제군" : [  ], 
            "고성군" : [  ], 
            "양양군" : [  ]		
        },
        "제주도" : {
            "서귀포시" : [  ], 
            "제주시" : [  ]		
        }
    };

    //초기화
    init(true, true);

    //권역 기본 생성
    var areaKeys1 = Object.keys(area);
    areaKeys1.forEach(function(City){
        $(a1).append("<option value="+City+">"+City+"</option>");
    });

    //변경 이벤트
    $(document).on("change", a1, function(){
        init(false, true);
        var City = $(this).val();
        var keys = Object.keys(area[City]);
        keys.forEach(function(District){
            $(a2).append("<option value="+District+">"+District+"</option>");    
        });
    }).on("change", a2, function(){
        init();
        var City = $(a1).val();
        var District = $(this).val();
        var keys = Object.keys(area[City][District]);
        keys.forEach(function(Neighborhood){
            $(a3).append("<option value="+area[City][District][Neighborhood]+">"+area[City][District][Neighborhood]+"</option>");    
        });
    });

    function init(first, second){
        first ? $(a1).empty().append("<option value=''>시/도</option>") : "";
        second ? $(a2).empty().append("<option value=''>군/구</option>") : "";
        $(a3).empty().append("<option value=''>읍/면/동</option>");
    }
}


// // 시/도 -> 군/구
// function categoryChange(e) {

//     const state = document.getElementById("state");

//     const gangwon = ["강릉시","고성군","동해시","삼척시","속초시","원주시","춘천시","태백시","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"];
//     const gyeonggi = ["고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"];
//     const gyeongsangnam = ["거제시", "김해시", "마산시", "밀양시", "사천시", "양산시", "진주시", "진해시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"];
//     const gyeongsangbuk = ["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"];
//     const gwangju = ["광산구", "남구", "동구", "북구", "서구"];
//     const daegu = ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"];
//     const daejeon = ["대덕구", "동구", "서구", "유성구", "중구"];
//     const busan = ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"];
//     const seoul = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
//     const ulsan = ["남구","동구","북구","중구","울주군"];
//     const incheon = ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"];
//     const jeonnam = ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
//     const jeonbuk = ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"];
//     const jeju = ["서귀포시","제주시","남제주군","북제주군"];
//     const chungnam = ["천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"];
//     const chungbuk = ["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"];

//     if (e.value == "general01") {
//         add = gangwon;
//     } else if (e.value == "general02") {
//         add = gyeonggi;
//     } else if (e.value == "general03") {
//         add = gyeongsangnam;
//     } else if (e.value == "general04") {
//         add = gyeongsangbuk;
//     } else if (e.value == "general05") {
//         add = gwangju;
//     } else if (e.value == "general06") {
//         add = daegu;
//     } else if (e.value == "general07") {
//         add = daejeon;
//     } else if (e.value == "general08") {
//         add = busan;
//     } else if (e.value == "general09") {
//         add = seoul;
//     } else if (e.value == "general10") {
//         add = ulsan;
//     } else if (e.value == "general11") {
//         add = incheon;
//     } else if (e.value == "general12") {
//         add = jeonnam;
//     } else if (e.value == "general13") {
//         add = jeonbuk;
//     } else if (e.value == "general14") {
//         add = jeju;
//     } else if (e.value == "general15") {
//         add = chungnam;
//     } else if (e.value == "general16") {
//         add = chungbuk;
//     }

//     state.options.length = 1;
//     // 군/구 갯수;

//     for (property in add) {
//         let opt = document.createElement("option");
//         opt.value = add[property];
//         opt.innerHTML = add[property];
//         state.appendChild(opt);
//     }

// }