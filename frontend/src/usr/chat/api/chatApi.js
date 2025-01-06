// api/chatApi.js
// api/chatApi.js 수정
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정
let stompClient = null;

// const defaultConfig = {
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };

export const chatApi = {
    connectWebSocket: (userRoomId, otherRoomId, userIdx, onMessageReceived) => {
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

            // 상대방의 채널만 구독
            stompClient.subscribe(`/sub/roomId/${otherRoomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
            });
        };

        // 에러 처리
        stompClient.onStompError = (frame) => {
            console.error('STOMP error:', frame);
        };

        // WebSocket 연결
        stompClient.activate();
    },

    getChatRoomList: async () => {
        const res = await axios.get(`${API_BASE_URL}/api/chat/`);
        console.log("API 응답 데이터:", res.data);  // API 응답 데이터 확인
        return res.data;
    },

    getChatRoom: async (otherIdx) => {
        const res = await axios.get(`${API_BASE_URL}/api/chat/${otherIdx}`);
        return res.data;
    },

    // 내 채널에만 퍼블리싱
    sendMessage: (fromIdx, toIdx, message, roomId, otherRoomId, userIdx) => {
        if (stompClient && stompClient.connected) {
            const messageData = {
                fromIdx: userIdx,
                toIdx: toIdx,
                msg: message,
                roomId,
                otherRoomId,
                userIdx: userIdx?.toString(),
                timestamp: Date.now(),
            };

            stompClient.publish({
                destination: `/pub/msg/${roomId}/${otherRoomId}`,
                body: JSON.stringify(messageData)
            });

            // 메시지 전송 성공 시 콜백 반환
            return messageData;
        } else {
            console.error('STOMP client is not connected');
            return null;
        }
    },

    disconnect: () => {
        if (stompClient) {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
            stompClient = null;
        }
    },

    markMessagesAsRead: async (roomId) => {
        try {
            if (!roomId) {
                console.error('Invalid roomId');
                return;
            }
            const response = await axios.post(`${API_BASE_URL}/api/chat/${roomId}/read`);
            if (response.status === 200) {
                console.log('Mey' +
                    'ssages marked as read successfully');
            }
        } catch (error) {
            console.error('메시지 읽음 처리 실패:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            throw error;
        }
    }

};