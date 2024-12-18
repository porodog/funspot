// api/chatApi.js
// api/chatApi.js 수정
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import {useBasic} from "../../../common/context/BasicContext";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정
let stompClient = null;

const defaultConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
};

export const chatApi = {
    connectWebSocket: (userRoomId, otherRoomId, userIdx, onMessageReceived) => {
        // const userInfo = useBasic();
        // 기존 stompClient 연결 해제
        if (stompClient) {
            chatApi.disconnect();
        }
        // 새로운 STOMP 클라이언트 생성
        stompClient = new Client({
            webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
            connectHeaders: {
                userIdx: userIdx?.toString()
            },
            debug: function (str) {
                console.log('STOMP: ' + str);
            },
            reconnectDelay: 5000,  // 자동 재연결 시도 간격 (ms)
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        // 연결 성공 시 콜백
        stompClient.onConnect = (frame) => {
            console.log('Connected to STOMP');

            // 구독 설정
            stompClient.subscribe(`/sub/user/${userRoomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
            });

            stompClient.subscribe(`/sub/other/${otherRoomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
            });
        };


        // const socket = new SockJS(`${API_BASE_URL}/ws`);
        // stompClient = Stomp.over(socket);

        // 토큰 추가
        // const accessToken = localStorage.getItem("access_token");
        // const accessTokenSecret = coo
        // console.log(accessToken);
        // const headers = {
        //     // Authorization: `Bearer ${accessToken}`
        // };

        // stompClient.connect(headers,
        //     () => {
        //     stompClient.subscribe(`/sub/user/${userRoomId}`, (message) => {
        //         const receivedMessage = JSON.parse(message.body);
        //         onMessageReceived(receivedMessage);
        //     });
        //
        //     stompClient.subscribe(`/sub/other/${otherRoomId}`, (message) => {
        //         const receivedMessage = JSON.parse(message.body);
        //         onMessageReceived(receivedMessage);
        //     });
        // },
        //     (error) => {
        //     console.log('STOMP connection error:', error);
        //     });
        // 에러 처리
        stompClient.onStompError = (frame) => {
            console.error('STOMP error:', frame);
        };

        // WebSocket 연결
        stompClient.activate();
    },

    // getChatRoomList: async () => {
    //     const accessToken = localStorage.getItem("access_token");
    //     return await axios.get(`${API_BASE_URL}/api/chat/`, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     });
    // },
    getChatRoomList: async () => {
        const res = await axios.get(`${API_BASE_URL}/api/chat/`);
        console.log(res);
        return res.data;
        // return await axios.get(`${API_BASE_URL}/api/chat/`, defaultConfig);
    },

    // getChatRoom: async (otherIdx) => {
    //     const accessToken = localStorage.getItem("access_token");
    //     return await axios.get(`${API_BASE_URL}/api/chat/${otherIdx}`, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     });
    // },
    getChatRoom: async (otherIdx) => {
        const res = await axios.get(`${API_BASE_URL}/api/chat/${otherIdx}`);
        // console.log(res.data);
        return res.data;
        // return await axios.get(`${API_BASE_URL}/api/chat/${otherIdx}`, defaultConfig);
    },

    sendMessage: (fromIdx, toIdx, message, roomId, otherRoomId, userIdx) => {
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/pub/msg/${roomId}/${otherRoomId}`,
                body: JSON.stringify({
                    fromIdx: userIdx,
                    toIdx: toIdx,
                    msg: message,
                    roomId,
                    otherRoomId,
                    userIdx: userIdx?.toString(),
                    timestamp: Date.now(),
                })
            });
            console.log("sendMessage : roomId-" + roomId + " otherRoomId-" + otherRoomId + " message-" + message);
        } else {
            console.error('STOMP client is not connected');
        }
    },

    disconnect: () => {
        if (stompClient) {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
            stompClient = null;
        }
    }

    // 메시지 전송
    // sendMessage: (roomId, otherRoomId, message) => {
    //     if (stompClient) {
    //         stompClient.send(`pub/msg/${roomId}`, {}, JSON.stringify({
    //             roomId,
    //             otherRoomId,
    //             msg: message
    //         }));
    //         console.log("sendMessage : roomId-" + roomId + " otherRoomId-" + otherRoomId + " message-" + message);
    //     }
    // },
    //
    // // WebSocket 연결 종료
    // disconnect: () => {
    //     if (stompClient) {
    //         stompClient.disconnect();
    //     }
    // }
};