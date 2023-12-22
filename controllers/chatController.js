// 채팅에 이미지 보내는 경우는 어떻게 하죵??
"use strict"
/// <script src="https://cdn.socket.io/3.1.3/socket.io.min.js" integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh" crossorigin="anonymous"></script>
const {db, sequelize} = require("../models/index");
const { Op, Sequelize } = require('sequelize');
const cookie = require('cookie');
// const enterRow = { // DB 테이블로 할거야.
//                 mem_id: 'imfoodie', //imfoodie가 보내면 보내는 사람 표시 x.
//                 // gathering_id: 1,        // 💚입장 버튼 누르면 클라이언트에서 gathering_id 전송해주기.
//                 content: `.`
//             };
const NOT_ENTERED = 0,
    CONNECTED = 1,
    DISCONNECTED = 2;

// 연결된 클라이언트 데이터 저장할 객체
const connectedClients ={};
// var memI
var roomId=0;
module.exports = io => {
    // var chat = io.of('/chat'); // chat.socket? =io.of('/chat')
    
    // server-side
    // chat?io?.use((socket, next) => {
    //     const err = new Error("not authorized");
    //     err.data = { content: "Please retry later" }; // additional details
    //     next(err);
    // });
    

    io.on('connection', (socket)=>{
        // console.log('server side socket.roomId: ', socket.roomId);
        console.log('chat connection');
        //먼저 req 존재하는지 undefined아닌지 체크하고 
        const req = socket.handshake.session.passport;  //❓지워?   
        const memId = req.user///;                         // ❓ 지워?
        // var roomId;                                     // ❓지워.
        // const url = socket.handshake.url; // /socket.io/?EIO=4&transport=polling&t=OdYhZ9b

        socket.onAny((event)=>{
            console.log(`소켓 이벤트 : ${event}`, 'user: ', memId);
            console.log(connectedClients);
            // console.log(memId);
        })

        socket.on('setSessionId', (sessionId, socket)=>{
            console.log('소켓아이디', socket.id);
            // 연결된 클라이언트 데이터를 세션  id와 연결
            connectedClients[sessionId.memId] = {
                memId_s: sessionId.memId,
                roomId_s: sessionId.room_id,
                socket_id: socket.id
            }
            roomId = sessionId.room_id;
            console.log(`세션 ID ${sessionId.memId}로 연결된 클라이언트가 설정되었습니다.`);
        })
        // participant(접속한 유저 확인 가능)에 유저 추가하기. 첫 입장이라면 안내 문구 표시. Or, chat 테이블에서 메시지 가져와 출력

        //.⚠️⚠️ 트라이문
        socket.on('join room', async (roomId, done) => {    //r거기서 room_id
            console.log(roomId,'이게 아님?');
            socket['roomId']=roomId;
            // roomId = roomId; // 필요없나.
            socket.join(roomId);
            console.log(socket.rooms, '소켓룸s');
            console.log(`조인룸하기 ${roomId} 소켓 아이디: ${socket.id}`);
            const count = await getCurrentHeadCount(io, roomId); // 채팅방 인원수 표시.
            const isParticipant = await db.participant.findOne({
                // attributes: ['isConnected', 'createdAt'],
                where: {mem_id: memId, gathering_id: roomId}
            })
            done(roomId);
            // 주석 삭제
            if(isParticipant.isConnected == NOT_ENTERED){
                // 처음 입장, welcome 이벤트 emit하고, isConnected:1로 해.
                io.to(socket.roomId).emit('welcome', memId);
                // io.to(roomId).emit('welcome', memId);
                await isParticipant.update({
                    isConnected: CONNECTED
                })
                // imfoodie 계정 만들기
                await db.chat.create({
                    gathering_id: roomId,
                    mem_id: memId,
                    content: memId+'님이 입장하셨습니다 :)',
                },
                // {transaction:t}
                )
                await db.chat.create(messageAttributes, { transaction: t });

            } else if(isParticipant.isConnected == CONNECTED) {
                //true면, load message 호출. isConnected:2로 설정.?? 왜 2로 설정?
                const data = await db.chat.findAll({
                    //❓ 입장 이후 글만 읽어올 수 있어야함. 어떻게 하지? 안내문구 등록한 거 찾아서 그 이후 것만? createAt이 그 이후인 것만?
                    // attributes: [],
                    where: {
                        gathering_id: roomId,
                        createdAt: {[Op.gt]: isParticipant.createdAt},
                    },
                    order: [['createdAt', 'DESC']],
                    limit:  10,
                    raw: true,
                    // offset: ,
                })
                sendMessageToUser(memId, data, socket);
                console.log(data, 'and ', roomId, socket.roomId);
                // io.to(sessionId).emit('load messages', data);
            }
            // await updateParticipantState(memId, roomId, CONNECTED);
        })

        socket.on('message', async (data) => {
            // ❓그러면 모임 id를 url로 받는데, 그걸로 하면 여기서 바로 들어가지 않나??????????
            //.💚`content가 null이나 내용 없으면 이벤트emit도 하지말고 디비 저장도 x
            let messageAttributes = {
                // data에는 시간, 보내는 사람, 그룹 아이디, 있어야함.
                gathering_id: data.roomId,
                mem_id: data.mem_id,
                content: data.content,
            };

            try {
                await sequelize.transaction(async t => {
                    await db.chat.create(messageAttributes, { transaction: t });
                })
            } catch (err) {
                console.log(`error: ${err.message}`);
            }
            io.to(socket.roomId).emit('show message', messageAttributes);
            console.log('before check message on: ',messageAttributes, " ", data.roomId);
        });

        socket.on('leave room', async (roomId)=>{
            console.log('roomId from client-leave room-', roomId);  //되는데?
            socket.leave(roomId);
            const count = await getCurrentHeadCount(io, roomId);
            // DB participant 테이블에 DISCONNECTED로 수정
            // await updateParticipantState(memId, roomId, DISCONNECTED);
            console.log('server-leave room', count);
        })

        // 왜 연결이 끊기는데 들어왔다고 환영인사를 하는걸까?????
        socket.on('disconnect', async (roomId) => {
            console.log('disconnect - ',socket.rooms, roomId);
            console.log("user disconnected");     //사용자가 연결 끊는 것 확인
            //chat -GPT  
            const sessionId = socket.handshake.sessionId;
            if (connectedClients[sessionId]) {
                delete connectedClients[sessionId];
                console.log(`세션 ID ${sessionId}로 연결된 클라이언트가 연결을 끊었습니다.`);
            }  
        });
    })

        // join room이랑 disconnect할 때마다 이 함수를 호출하는거야
    const getCurrentHeadCount = async (io, roomId)=>{
        const listOfClients = await io.in(roomId).fetchSockets();   
        io.to(roomId).emit('update headcount', listOfClients.length);
        return listOfClients.length;
        // console.log(roomId,' 특정 룸 내 모든 클라이언트', listOfClients.length);     
    };

    const getGatheringHeadCount = async (roomId) => {
        //아님 gathering을 리턴할까
        totalCount = await db.gathering.findOne({
            attribute:['currentHeadCount'],
            where: {gathering_id: roomId}
        });
        return totalCount;
    }

    const updateParticipantState = async (memId, roomId, state) =>{
        try{
            await sequelize.transaction(async t => {
                await db.participant.update({ isConnected: state },
                    { where: { mem_id: memId, gathering_id: roomId } });
            });
        } catch (err) {
            console.log(`Error changing participant state: ${err}`);
        }
    }

    const findSocketByUserId = (socket) => {
        console.log('hi1');
        return socket.id;//connectedClients[userId]//.socket_id;
    }

    const sendMessageToUser = (userId, data, socket) => {
        console.log('hi2');
        const targetSocketId = findSocketByUserId(socket);
        if (targetSocketId){
            io.to(targetSocketId).emit('load messages', data);
        } else{
            console.log(`사용자(${userId})의 소켓을 찾을 수 없습니다.`);
        }
    }
    // const createChat = async (data) => {
    //     try{
    //         await sequelize.transaction(async t=>{
    //             db.chat.create({
    //                 gathering_id: data.roomId?,
    //                 mem_id: data.CONNECTED

    //             })
    //         })
    //     } catch (err) {
    //         console.log(`error creating chat: ${err}`);
    //     }
    // }
     // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.
    // io.on("connection", (socket) => {
    //     console.log('main socket connection');
    //     console.log(socket.handshake);
    //     const req = socket.handshake.session.passport;
    //     const memId = req.user.mem_id;
    //     var enterMsg = 0;
    //     if (!(req && req.user)) {
    //         socket.emit("undefined user");
    //     }

    //     // participant(접속한 유저 확인 가능)에 유저 추가하기. 화면에 디비 검색하고 내용 보내기. 
    //     socket.on('connect user', async (roomId, done/*❤️*/) => {
    //         console.log(socket.room)
    //         socket.join(roomId);    //💚 chatController에서 보내줘야함 groupId.
    //         socket.to(roomId).emit('welcome');
    //         // var isEntered = await db.participant.findOne({ // 입장 여부 확인하는 걸 따로 빼는 게 나을까?
    //         //     attributes: ['isConnected'],
    //         //     where: { gathering_id: roomId, mem_id: memId }
    //         // })

    //         // if (!isEntered) { // 처음 입장 시, 입장 안내.  isConnected ON!! NOT ENTERED = 0, CONNECTED = 1, DISCONNECTED = 2
    //         //     try { // Participant 테이블에 접속한 유저. 환경변수로 둬야하나?
    //         //         await sequelize.transaction(async t => {
    //         //             await db.participant.update({ isConnected: CONNECTED }, {
    //         //                 where: {
    //         //                     gathering_id: roomId,
    //         //                     mem_id: memId
    //         //                 } //💚클라이언트 버튼 누를 때 
    //         //             }, { transaction: t });
    //         //         });
    //         //         // chat에다도 넣어야해. 될까???
    //         //         await sequelize.transaction(async t => {
    //         //             enterMsg = await db.chat.create({
    //         //                 gathering_id: roomId,
    //         //                 mem_id: memId,
    //         //                 content: `${user}님이 입장했습니다.`,
    //         //                 create_at: sequelize.literal(`NOW()`),
    //         //                 unread_count: 0,
    //         //                 image_url: ''
    //         //             });
    //         //         })
    //         //         socket.emit('new member', enterMsg);    //💚 모든 그룹멤(본인포함)에게 입장문 보냄.
    //         //     } catch (err) {
    //         //         console.log(`Error saving participant: ${err}`);
    //         //     }
    //         // }
    //         // else {
    //         //     db.chat.findAll({ //attributes: ['mem_id', 'content', ''],
    //         //         limit: 10,
    //         //         order: [[sequelize.literal("create_at"), 'DESC']]
    //         //     })
    //         //         .then(messages => {
    //         //             socket.to(roomId).emit('load messages', messages.reverse());
    //         //         })
    //         //     // socket.to(roomId).emit("welcome", 유저);
    //         // }
    //     })

    //     socket.on('message', (data) => {              // 사용자 정의 메시지이벤트 수신
    //         console.log(data);
    //         // ❓그러면 모임 id를 url로 받는데, 그걸로 하면 여기서 바로 들어가지 않나??????????
    //         let messageAttributes = {
    //             // data에는 시간, 보내는 사람, 그룹 아이디, 있어야함.
    //             gathering_id: data.gathering_id,
    //             mem_id: data.mem_id,
    //             content: data.content,
    //             create_at: sequelize.literal(`NOW()`),
    //             // unread_count: sequelize.literal(`   //❓여기 안됨.
    //             // SELECT maximumHeadCount FROM gathering
    //             // WHERE gathering_id = ${data.gathering_id}`)-1,
    //             image_url: ''
    //         };
    //         // try {
    //         //     db.chat.create(messageAttributes);
    //         // } catch (err) {
    //         //     console.log(`error: ${err.message}`);
    //         // }   //❓캐치하면 아예 못 탈출하ㅏㄴ? 가물치가물치네
    //         io.to(gathering_id/*❓roomId?*/).emit('show message', messageAttributes);
    //     });

    //     // participant에서 isConnected=2로 변경.
    //     socket.on('disconnect', async (data) => {
    //         // try {
    //         //     await sequelize.transaction(async t => {
    //         //         await db.participant.update({ isConnected: DISCONNECTED }, {
    //         //             where: {
    //         //                 gathering_id: roomId,
    //         //                 mem_id, memId
    //         //             }
    //         //         }, { transcation: t });
    //         //     });
    //         // } catch (err) {
    //         //     console.log(`Error changing participant state: ${err}`);
    //         // }
    //         // socket.to(data.gathering_id).broadcast.emit("user disconnected", memId);
    //         console.log("user disconnected");     //사용자가 연결 끊는 것 확인    
    //     });
    // }); 
};

