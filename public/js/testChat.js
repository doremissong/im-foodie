
$(document).ready(() => {

    var socket = io(/*{withCredentials: true}*/);    //클라이언트에서 소켓.io 초기화. // var socket = io('/chat'); // namespace 
    // var roomId = window.location.pathname.split('/')[2];;
    
    // roomId 값 저장받아
    room_id=$("#chat-gathering-id").val;
    console.log(room_id);
    roomId=1;
    socket.emit('join room', roomId, (roomId)=>{
        console.log(`roomId from server: ${roomId}`);
    });

    $(window).bind('unload', ()=>{
        // roomId = window.location.pathname.split('/')[2];
        socket.emit('leave room', roomId);
        return '나갈거야?';
    });

    socket.onAny((event)=>{
        console.log(`소켓 이벤트 : ${event}`);
    });

    socket.on('undefined user', ()=>{
        socket.disconnect(roomId);
    });

    $('.roomId').on('click', (e)=>{ //addEventListenr로
        console.log(e.target.value);
        socket['roomId']=e.target.value;
        window.name=e.target.value;
        roomId = e.target.value;
        socket.emit('join room', roomId, (roomId)=>{
            console.log(`roomId from server: ${roomId}`);
        });
        alert(`${roomId} room is clicked`);
    })
    
    // welcome은 채팅방 첫 입장 시에만.
    socket.on('welcome', (memId)=>{
        console.log(memId, " comes in room no.", roomId," first time. - welcome client");
        displayMessage({ mem_id:"imfoodie", content: memId+" comes in :)" });
    });

    $("#chatForm").submit((e) => {             // 폼 전달할 때, 이벤트 뿌리기
        e.preventDefault();
        $(window).unbind('unload');
        let text = $("#chat-input").val();
        let mem_id = $("#chat-mem-id").val();
        console.log(`socket.'roomid': ${socket[roomId]}`);
        // console.log(`text: ${text}\nmem_id: ${mem_id}`);s'
        // let gathering_id = $("#chat-gathering-id").val();   // res.render 할 때 하는 게 나을까. 아님 url에서 긁을까?
        socket.emit('message', {
            content: text,
            mem_id: mem_id,
            roomId: socket[roomId]
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
        if (message.mem_id === 'imfoodie') {
            $("#chat").append(
                $("<li>").html(`${message.content}`));
        }
        else {
            $("#chat").append(
                $("<li>").html(`
            <strong class="message ${getCurrentUserClass(message.mem_id)}">
            ${message.mem_id}
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