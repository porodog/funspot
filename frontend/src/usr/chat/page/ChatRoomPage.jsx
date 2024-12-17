// import React, { useEffect, useState } from 'react';
// import { useBasic } from "../../../common/context/BasicContext";
// import BasicLayout from "../../../common/layout/BasicLayout";
//
// const ChatListPage = () => {
//     // 객체 { nickname: "유나티비", userIdx: 1 }
//     const { userInfo } = useBasic();
//     return (
//         <BasicLayout>
//             채팅방 티비
//         </BasicLayout>
//     );
// };
//
// export default ChatListPage;

// pages/ChatRoomPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { chatApi } from '../api/chatApi';
import { useBasic } from '../../../common/context/BasicContext';
// import ChatListPage from "./ChatListPage";

const ChatRoomPage = () => {
    const { userInfo } = useBasic();
    const { otherIdx } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [roomInfo, setRoomInfo] = useState(null);

    useEffect(() => {
        console.log("userInfo : " + !!userInfo);
        console.log(userInfo);
        // if (!userInfo) return; // 인증 체크
        const initializeChat = async () => {
            try {
                // 채팅방 정보 조회
                const response = await chatApi.getChatRoom(otherIdx);
                const { userRoomId, otherRoomId, chatIdChatMessageDTOMap, chatRoomContentDTO } = response;
                console.log(response);

                setRoomInfo({
                    userRoomId,
                    otherRoomId,
                    ...chatRoomContentDTO
                });

                // 메시지 배열로 변환
                setMessages(Object.values(chatIdChatMessageDTOMap));

                // WebSocket 연결 설정
                // WebSocket 연결 시 userInfo 전달
                chatApi.connectWebSocket(
                    userRoomId,
                    otherRoomId,
                    userInfo?.userIdx,  // userInfo 전달
                    (receivedMessage) => {
                        setMessages(prev => [...prev, receivedMessage]);
                    }
                );
                // chatApi.connectWebSocket(userRoomId, otherRoomId, (receivedMessage) => {
                //     setMessages(prev => [...prev, receivedMessage]);
                // });
            } catch (error) {
                console.error('채팅방 초기화 실패:', error);
            }
        };
        if(userInfo){
            initializeChat();
        }

        // 컴포넌트 언마운트 시 WebSocket 연결 종료
        return () => chatApi.disconnect();
    }, [otherIdx, userInfo]);

    const handleSendMessage = () => {
        if (newMessage.trim() && roomInfo && userInfo) {
            chatApi.sendMessage(userInfo.userIdx, otherIdx, newMessage, roomInfo.userRoomId, roomInfo.otherRoomId, userInfo.userIdx);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* 채팅방 헤더 */}
            <div className="p-4 border-b">
                <h2 className="text-lg font-medium"><b>{roomInfo?.otherNickname}</b>님과의 대화방</h2>
            </div>

            {/* 메시지 목록 */}
            {/*<div className="flex-1 overflow-y-auto p-4 space-y-4">*/}
            <div className="flex-0 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                                message.isMine
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-900'
                            }`}
                        >
                            {message.msg}
                        </div>
                    </div>
                ))}
            </div>

            {/* 메시지 입력 */}
            <div className="p-4 border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 p-2 border rounded-lg"
                        placeholder="메시지를 입력하세요..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ChatRoomPage;
