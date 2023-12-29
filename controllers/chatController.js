// 채팅에 이미지 보내는 경우는 어떻게 하죵??
"use strict"
const {db, sequelize} = require("../models/index");
const { Op, Sequelize } = require('sequelize');
const cookie = require('cookie');
const NOT_ENTERED = 0,
    CONNECTED = 1,
    DISCONNECTED = 2;

// 연결된 클라이언트 데이터 저장할 객체
const connectedClients ={};
var roomId=0;
module.exports = io => {

    io.on('connection', (socket)=>{
        // console.log('server side socket.roomId: ', socket.roomId);
        console.log('chat connection');
        //먼저 req 존재하는지 undefined아닌지 체크하고 
        const req = socket.handshake.session.passport;  
        const memId = req.user;
        socket.onAny((event)=>{
            console.log(`소켓 이벤트 : ${event}`, 'user: ', memId);
            // console.log(connectedClients);
        })

        socket.on('setSessionId', (sessionId, socket)=>{
            // console.log('소켓아이디', socket.id);
            // 연결된 클라이언트 데이터를 세션  id와 연결
            connectedClients[sessionId.memId] = {
                memId_s: sessionId.memId,
                roomId_s: sessionId.room_id,
                socket_id: socket.id
            }
            roomId = sessionId.room_id;
            console.log(`세션 ID ${sessionId.memId}로 연결된 클라이언트가 설정되었습니다.`);
        })

        socket.on('join room', async (roomId, done) => {    //r거기서 room_id
            socket['roomId']=roomId;
            socket.join(roomId);
            // console.log(socket.rooms, '소켓룸s');
            console.log(`조인룸하기 ${roomId} 소켓 아이디: ${socket.id}`);
            const count = await getCurrentHeadCount(io, roomId); // 채팅방 인원수 표시.
            const isParticipant = await db.participant.findOne({
                where: {mem_id: memId, gathering_id: roomId}
            })
            done(roomId);
            if(isParticipant.isConnected == NOT_ENTERED){
                io.to(socket.roomId).emit('welcome', memId);
                await sequelize.transaction(async t=>{
                    await isParticipant.update({
                        isConnected: CONNECTED
                    },
                    {transaction:t})
                    await db.chat.create({
                        gathering_id: roomId,
                        mem_id: memId,
                        content: memId+'님이 입장하셨습니다 :)',
                    },
                    {transaction:t}
                    )
                })

            } else if(isParticipant.isConnected == CONNECTED) {
                const data = await db.chat.findAll({
                    where: {
                        gathering_id: roomId,
                        createdAt: {[Op.gt]: isParticipant.createdAt},
                    },
                    order: [['createdAt', 'DESC']],
                    limit:  10,
                    raw: true,
                });
                data.forEach((chat, index)=>{
                    chat.content = chat.content.replaceAll(/\r\n/g, '<br>');
                })
                sendMessageToUser(memId, data, socket);
                // console.log(data, 'and ', roomId, socket.roomId);
            }
        })

        socket.on('message', async (data) => {
            let messageAttributes = {
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
            console.log('roomId from client-leave room-', roomId);
            socket.leave(roomId);
            const count = await getCurrentHeadCount(io, roomId);
            // console.log('server-leave room', count);
        })

        socket.on('disconnect', async (roomId) => {
            console.log('disconnect - ',socket.rooms, roomId);
            console.log("user disconnected");     //사용자가 연결 끊는 것 확인
            const sessionId = socket.handshake.sessionId;
            if (connectedClients[sessionId]) {
                delete connectedClients[sessionId];
                console.log(`세션 ID ${sessionId}로 연결된 클라이언트가 연결을 끊었습니다.`);
            }  
        });
    })

    const getCurrentHeadCount = async (io, roomId)=>{
        const listOfClients = await io.in(roomId).fetchSockets();   
        io.to(roomId).emit('update headcount', listOfClients.length);
        return listOfClients.length;    
    };

    const getGatheringHeadCount = async (roomId) => {
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
        return socket.id;//connectedClients[userId]//.socket_id;
    }

    const sendMessageToUser = (userId, data, socket) => {
        const targetSocketId = findSocketByUserId(socket);
        if (targetSocketId){
            io.to(targetSocketId).emit('load messages', data);
        } else{
            console.log(`사용자(${userId})의 소켓을 찾을 수 없습니다.`);
        }
    }
};

