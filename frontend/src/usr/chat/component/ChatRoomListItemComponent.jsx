import React, { useEffect, useState } from "react";
// import {chatroomListApi} from "../api/chatroomApi";
// import ChatOtherProfileComponent from "./ChatOtherProfileComponent";
//

const ChatRoomListItemComponent = ({otherIdx, otherNickname, recentMessage, isRecentMessageRead, handleRoomClick}) => {
    // console.log(otherIdx, otherNickname, recentMessage);
    // const isUnread = isRecentMessageRead === 'false' || isRecentMessageRead === false;
    return(
        <button
            onClick={() => handleRoomClick(otherIdx)}
            // className="bg-emerald-300"
            className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out focus:outline-none"
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                    {/* 프로필 이미지 플레이스홀더 */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">{otherNickname.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                        <h3 className="font-medium text-gray-900">{otherNickname}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{recentMessage}</p>
                    </div>
                </div>
                {/*{isRecentMessageRead === 'false' && (*/}
                {/*    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>*/}
                {/*)}*/}
                {/*{isUnread && (*/}
                {/*    <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full"></span>*/}
                {/*)}*/}
                {!isRecentMessageRead && (
                    <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full"></span>
                )}
            </div>
            {/*<div>otherIdx : {otherIdx}</div>*/}
            {/*<div>otherNickname : {otherNickname}</div>*/}
            {/*<div>recentMessage : {recentMessage}</div>*/}
            {/*/!*isRecentMessageRead가 자꾸만 undefined 가 댐... 왜이러냐*!/*/}
            {/*<div>isRecentMessageRead : {isRecentMessageRead}</div>*/}
        </button>
    )
}
export default ChatRoomListItemComponent;


// // 초기화
// const initState = {
//     // 빈 배열로 초기화
//     chatRoomListResponseDTOs: [],
// };
//
// const ChatRoomListItemComponent = () => {
//     const [chatRoomListResponseDTOs, setChatRoomListResponseDTOs] = useState(initState);
//
//     // 컴포넌트가 마운트될 때 한 번만 실행됨 > []라서
//     useEffect(() => {
//         chatroomListApi()
//             .then((data) => {
//                 console.log(data);
//                 setChatRoomListResponseDTOs(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);
//     return(
//         <>
//             {chatRoomListResponseDTOs.map((chatRoomListResponseDTO) => (
//                 <div key={chatRoomListResponseDTO.roomId}>
//                     <ChatOtherProfileComponent />
//                     <div id="chatroom-text-container">
//                         <p>{chatRoomListResponseDTO.otherNickname}</p>
//                         <p>최근 대화 : {chatRoomListResponseDTO.recentMessage}</p>
//                     </div>
//                     {chatRoomListResponseDTO.isRecentMessageRead ? <></> : <img alt="unCheckedSign"/> }
//                 </div>
//             ))}
//         </>
//     )
// }
//
// export default ChatRoomListItemComponent;