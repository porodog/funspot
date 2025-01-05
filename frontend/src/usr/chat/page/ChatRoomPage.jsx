// pages/ChatRoomPage.jsx
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import { chatApi } from '../api/chatApi';
import { useBasic } from '../../../common/context/BasicContext';

const ChatRoomPage = () => {
    const { userInfo } = useBasic();
    const { otherIdx } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [roomInfo, setRoomInfo] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 채팅방 메시지 읽음 처리
    const markMessagesAsRead = useCallback(async () => {
        if (roomInfo?.userRoomId) {
            await chatApi.markMessagesAsRead(roomInfo.userRoomId);
        }
    }, [roomInfo]);

    // 채팅방이 활성화될 때와 새 메시지가 올 때 읽음 처리
    useEffect(() => {
        if (messages.length > 0) {
            markMessagesAsRead();
        }
    }, [messages, markMessagesAsRead]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    // 내가 보낸 메시지는 프론트엔드에서 렌더링되도록
    const handleSendMessage = () => {
        if (newMessage.trim() && roomInfo && userInfo) {
            try {
                // 메시지 전송
                const sentMessage = chatApi.sendMessage(
                    userInfo.userIdx,
                    otherIdx,
                    newMessage,
                    roomInfo.userRoomId,
                    roomInfo.otherRoomId,
                    userInfo.userIdx
                );

                if (sentMessage) {
                    // 프론트엔드에서 직접 메시지 목록 업데이트
                    const messageToDisplay = {
                        ...sentMessage,
                        isMine: true  // 자신이 보낸 메시지 표시
                    };
                    setMessages(prev => [...prev, messageToDisplay]);
                    setNewMessage('');
                }
            }catch (error){
                // 메시지 전송 실패 처리
                console.error('메시지 전송 실패:', error);
                // 실패 알림 표시
                alert('메시지 전송 중 문제가 발생했습니다.');
                // 재시도 로직 구현
            }
        }
    };

    // 시간 포맷팅 함수 추가
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // 12시간 형식
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${ampm}${formattedHours}:${formattedMinutes}`;
    };

    // 날짜 포맷팅 함수 추가
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year} - ${month} - ${day}`;
    };

    // 날짜가 같은지 확인하는 함수
    const isSameDay = (timestamp1, timestamp2) => {
        const date1 = new Date(timestamp1);
        const date2 = new Date(timestamp2);
        return date1.toDateString() === date2.toDateString();
    };

    return (
        <div className="container mx-auto max-w-2xl bg-gray-50 h-[735px]">
            <div className="flex flex-col justify-center py-5 bg-white w-full h-[735px]">
                {/*<div className="flex flex-col h-screen">*/}
                {/* 채팅방 헤더 */}
                <div className="p-4 border-b">
                    <h2 className="text-lg font-medium"><b>{roomInfo?.otherNickname}</b>님과의 대화방</h2>
                </div>

                {/* 메시지 목록 */}
                {/*<div className="flex-1 overflow-y-auto p-4 space-y-4">*/}
                <div className="scrollbar-hide flex-0 overflow-y-auto p-4 space-y-4 h-[735px]">
                    {messages.map((message, index) => (
                        <React.Fragment key={index}>
                            {/* 날짜 구분선 추가 */}
                            {(index === 0 || !isSameDay(messages[index - 1].timestamp, message.timestamp)) && (
                                <div className="flex items-center justify-center my-4">
                                    <div className="border-t border-gray-300 flex-grow"></div>
                                    <div className="mx-4 text-sm text-gray-500">
                                        {formatDate(message.timestamp)}
                                    </div>
                                    <div className="border-t border-gray-300 flex-grow"></div>
                                </div>
                            )}

                        <div
                            key={index}
                            className={`flex ${message.fromIdx === userInfo.userIdx ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* 내 메시지의 경우 시간을 왼쪽에 표시 */}
                            {message.fromIdx === userInfo.userIdx && (
                                <span className="text-xs text-gray-500 mr-2">
                                    {formatTime(message.timestamp)}
                                </span>
                            )}

                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${
                                    message.fromIdx === userInfo.userIdx
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gray-200 text-gray-900'
                                }`}
                            >
                                {message.msg}
                            </div>

                            {/* 상대방 메시지의 경우 시간을 오른쪽에 표시 */}
                            {message.fromIdx !== userInfo.userIdx && (
                                <span className="text-xs text-gray-500 ml-2">
                                    {formatTime(message.timestamp)}
                                </span>
                            )}
                        </div>
                        </React.Fragment>
                    ))}
                    {/* 스크롤 위치 지정을 위한 빈 div */}
                    <div ref={messagesEndRef}/>
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
                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
    // return (
    //     <div className="flex flex-col h-screen bg-gray-50">
    //         {/* 채팅방 헤더 */}
    //         <div className="bg-white shadow-sm py-4 px-6 fixed top-0 w-full z-10">
    //             <h2 className="text-lg font-semibold text-gray-800">
    //                 {roomInfo?.otherNickname}님과의 대화
    //             </h2>
    //         </div>
    //
    //         {/* 메시지 목록 */}
    //         <div className="flex-1 overflow-y-auto scrollbar-hide pt-20 pb-24 px-4 space-y-4">
    //             {messages.map((message, index) => (
    //                 <div
    //                     key={index}
    //                     className={`flex ${message.fromIdx === userInfo.userIdx ? 'justify-end' : 'justify-start'}`}
    //                 >
    //                     <div
    //                         className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
    //                             message.fromIdx === userInfo.userIdx
    //                                 ? 'bg-blue-500 text-white ml-8'
    //                                 : 'bg-white text-gray-800 mr-8'
    //                         }`}
    //                     >
    //                         {message.msg}
    //                     </div>
    //                 </div>
    //             ))}
    //             <div ref={messagesEndRef} />
    //         </div>
    //
    //         {/* 메시지 입력 */}
    //         <div className="bg-white border-t fixed bottom-0 w-full p-4 shadow-lg">
    //             <div className="flex gap-2 max-w-4xl mx-auto">
    //                 <input
    //                     type="text"
    //                     value={newMessage}
    //                     onChange={(e) => setNewMessage(e.target.value)}
    //                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
    //                     className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    //                     placeholder="메시지를 입력하세요..."
    //                 />
    //                 <button
    //                     onClick={handleSendMessage}
    //                     className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    //                 >
    //                     전송
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );
};
export default ChatRoomPage;
