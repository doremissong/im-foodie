
$(document).ready(() => {

    var socket = io(/*{withCredentials: true}*/);    //클라이언트에서 소켓.io 초기화. // var socket = io('/chat'); // namespace 
    // var roomId = window.location.pathname.split('/')[2];;
    
    // roomId 값 저장받아
    const room_id=$("#chat-gathering-id").val();
    console.log('testChat:야야야야', room_id);
    roomId=100;
    socket.emit('join room', room_id, (roomId)=>{
        console.log(`roomId from server: ${roomId}`);
    });

    $(window).bind('unload', ()=>{
        // roomId = window.location.pathname.split('/')[2];
        socket.emit('leave room', room_id);
        return '나갈거야?';
    });

    socket.onAny((event)=>{
        console.log(`소켓 이벤트 : ${event}`);
    });

    socket.on('undefined user', ()=>{
        socket.disconnect(room_id);
    });

    const sessionID = { 
        memId: $("#chat-mem-id").val(),
        room_id: $("#chat-gathering-id").val()
    }
    socket.emit('setSessionId', sessionID);

    //자체를 지워야하지 않을까?
    $('.roomId').on('click', (e)=>{ //addEventListenr로
        console.log(e.target.value);
        socket['roomId']=e.target.value;    //지워
        window.name=e.target.value;
        roomId = e.target.value;            //지워
        socket.emit('join room', room_id, (roomId)=>{
            console.log(`roomId from server: ${roomId}`);
        });
        alert(`${room_id} room is clicked`);
    })
    
    // welcome은 채팅방 첫 입장 시에만.
    socket.on('welcome', (memId)=>{
        console.log(memId, " comes in room no.", room_id," first time. - welcome client");
        displayMessage({ memId:"imfoodie", content: memId+" comes in :)" });
    });

    $("#chatForm").submit((e) => {             // 폼 전달할 때, 이벤트 뿌리기
        e.preventDefault();
        $(window).unbind('unload');
        let text = $("#chat-input").val();  // 건네짐
        let mem_id = $("#chat-mem-id").val();       //건네짐
        let room_id=$("#chat-gathering-id").val();
        console.log(`testChat파일 - 서버에서 건네받은.'roomid': ${room_id}`);
        console.log(`testChat파일 - socket.'roomid': ${socket[roomId]}`);
        // console.log(`text: ${text}\nmem_id: ${mem_id}`);s'
        // let gathering_id = $("#chat-gathering-id").val();   // res.render 할 때 하는 게 나을까. 아님 url에서 긁을까?
        socket.emit('message', {
            content: text,
            mem_id: mem_id,
            roomId: room_id,
            // roomId: socket[roomId]
        });
        $("#chat-input").val("");
        return false; //야는 왜 있는 것인가...
    });

    
    socket.on('show message', (message) => {
        console.log('client-show message- ',message);
        // if(!message.content) return false;  // 메시지 없으면 전송 x. 근데 이미 디비에 저장했어..
        displayMessage(message);    // 이벤트 수신, 채팅박스에 반영
        for (let i=0; i<2; i++){    // 메시지 수신 시, 깜빡임
            $(".chat-icon").fadeOut(200).fadeIn(200);
        }
    });

    socket.on('load messages', (data)=>{
        data.forEach(message=>{
            displayMessage(message);
        });
    });

    // ✅ 나가기 버튼이나 뒤로 가기, 등등으로 화면 벗어나면 나갔다고 표시하기 + 현재 채팅 인원 수 표시?
    socket.on('update headcount', (count)=>{
        displayHeadCount(count);
        console.log('client side count: ', count);
    })

    socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
    });

    // 메시지 출력
    let displayMessage = (message) => {
        // message.mem_id였는데 memId로 수정함. 이후에 오류 있나 확인
        if (message.memId === 'imfoodie') {
            $("#chat").append(
                $("<li>").html(`${message.content}`));
        }
        else {
            $("#chat").append(
                $("<li>").html(`
            <strong class="message ${getCurrentUserClass(message.memId)}">
            ${message.memId}
            </strong>: ${message.content}
            `));    // 채팅박스에 서버로부터 받은 메시지 출력
        }
    };// mesage current-user면 색 다른색

    let getCurrentUserClass = (id) =>{
        let mem_id = $("#chat-mem-id").val();
        return mem_id===id ? "current-user":"";
    }

    let displayHeadCount = (count) =>{
        $("#count").empty();
        $("#count").append(count);
    }

});




// 가입(gathering_member에 등록) 후, 채팅방 입장 버튼 누르면  emit 보냄
// server는, on으로 받고, connection