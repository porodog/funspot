// pages/ChatListPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import { chatApi } from '../api/chatApi';
// import { useAuth } from '../../../common/hook/useAuth';
//
// const ChatListPage = () => {
//     const { isAuthenticated, user } = useAuth();
//     const [chatRooms, setChatRooms] = useState([]);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetchChatRooms = async () => {
//             try {
//                 console.log("ChatListPage.jsx : " + isAuthenticated);
//                 if (!isAuthenticated) {
//                     navigate('/login');
//                     console.log("isAuthenticated : ", isAuthenticated);
//                     return;
//                 }
//
//                 console.log("setChatRooms : ", chatApi.getChatRoomList())
//                 const response = await chatApi.getChatRoomList();
//                 setChatRooms(response.data.chatRoomList);
//                 console.log("setChatRooms : ", response.data.chatRoomList);
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     navigate('/login');
//                 } else {
//                     setError('채팅방 목록을 불러오는데 실패했습니다.');
//                     console.error('채팅방 목록 조회 실패:', error);
//                 }
//             }
//         };
//
//         fetchChatRooms();
//     }, [isAuthenticated, navigate]);
//
//     if (error) {
//         return <div className="p-4 text-red-500">{error}</div>;
//     }
//
//     const handleRoomClick = (otherIdx) => {
//         navigate(`/chat/${otherIdx}`);
//     };
//
//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">채팅 목록</h1>
//             <div className="space-y-2">
//                 {chatRooms.map((room) => (
//                     <div
//                         key={room.otherIdx}
//                         onClick={() => handleRoomClick(room.otherIdx)}
//                         className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
//                     >
//                         <div className="flex items-center gap-4">
//                             <img
//                                 src={room.otherProfileImg || '/default-avatar.png'}
//                                 alt="프로필"
//                                 className="w-12 h-12 rounded-full"
//                             />
//                             <div>
//                                 <h3 className="font-medium">{room.otherNickname}</h3>
//                                 <p className="text-gray-600">{room.recentMessage}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <Outlet />
//         </div>
//     );
// };
// export default ChatListPage;


// pages/ChatListPage.jsx
import React, { useEffect, useState } from 'react';
import { useBasic } from "../../../common/context/BasicContext";
import BasicLayout from "../../../common/layout/BasicLayout";
import ChatRoomListComponent from "../component/ChatRoomListComponent";
import { chatApi } from "../api/chatApi";
import { useNavigate } from 'react-router-dom';

// currentUser의 채팅방 목록 조회 페이지

// 1. List<RoomListResponseDTO>는 chatApi /api/chat 요청으로 백엔드에게서 응답받아야댐
//      -> 백엔드 controller로 userIdx를 받으면 굳이 토큰 꺼내쓰는 작업 없어도 될거임(= ChatController 수정 必)
// 2. <ChatRoomListComponent/>에 props로 List<RoomListResponseDTO> 전달
// 3. <ChatRoomListComponent>에서 .map으로 recentMessageTimestamp 순으로 순회
// 3-1. .map으로 {otherNickname, recentMessage, isRecentMessageRead, otherIdx(DTO에 추가해야함)} 추출
// 3-2. 추출한 데이터를 <ChatRoomItemComponent>에 props로 전달
// 4-1. <ChatRoomItemComponent>에서 <div>태그에 데이터 채워서 반환


const ChatListPage = () => {
    // 객체 { nickname: "유나티비", userIdx: 1 }
    const { userInfo } = useBasic();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [chatRoomListResponseDTOList, setChatRoomListResponseDTO] = useState([]);


    useEffect(() => {
        // if(userInfo == null){
        //     console.log("useEffect userInfo: "+ userInfo);
        //     navigate('/login')
        // }
        const fetchChatRoomListResponseDTOList = async () => {
            try{
                const response = await chatApi.getChatRoomList();
                setChatRoomListResponseDTO(response);
                console.log(response);
            }catch(error){
                setError('채팅방 목록을 불러오는데 실패했습니다.');
                console.error('채팅방 목록 조회 실패:', error);
            }
        }
        fetchChatRoomListResponseDTOList();
    }, [])  // 아마 최초 마운트 시에만 동작

    if(error){
        return <BasicLayout>
            {error}
        </BasicLayout>
    }

    const handleRoomClick = (otherIdx) => {
        navigate(`/chat/${otherIdx}`);
    }

    return (
        <div>
            {userInfo == null ? (
                <>비로그인 사용자는 채팅 목록을 열람할 수 없습니다.</>
            ) : (
                <>
                    채팅 목록 티비
                    <ChatRoomListComponent
                        chatRoomListResponseDTOList={chatRoomListResponseDTOList}
                        handleRoomClick={handleRoomClick}
                    />
                </>
            )}
        </div>
    );

    // return (
    //
    //     <BasicLayout>
    //         {userInfo == null? (<>비로그인 사용자는 채팅 목록을 열람할 수 없습니다.</>) : <>채팅 목록 티비
    //             {/*<ChatListItemComponent/>*/}
    //             <ChatRoomListComponent
    //                 chatRoomListResponseDTOList = {chatRoomListResponseDTOList}
    //                 handleRoomClick={handleRoomClick}
    //             /></>}
    //
    //     </BasicLayout>
    // );
};

export default ChatListPage;