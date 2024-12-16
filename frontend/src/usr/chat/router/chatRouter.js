// usr/chat/router/chatRouter.js
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <div>Feed Page Loading....</div>;
const ChatListPage = lazy(() => import("../../chat/page/ChatListPage"));
const ChatRoomPage = lazy(() => import("../../chat/page/ChatRoomPage"));

const chatRouter = () => {
    return [
        {
            path: "",
            element: <ChatListPage />
        },
        {
            path: ":otherIdx",
            element: <ChatRoomPage />
        }
    ];
}

// const chatRouter = () => {
//     return [
//         {
//             path: "",
//             element: (
//                 <Suspense fallback={Loading}>
//                     <ChatListPage />
//                 </Suspense>
//             ),
//         },
//         {
//             path: ":otherIdx",
//             element: <Suspense fallback={Loading}>
//                 <ChatRoomPage />
//             </Suspense>,
//         }
//     ];
// }

// const chatRouter = () => [
//     {
//         path: "",
//         element: <ChatListPage />,
//         children: [
//             {
//                 path: ":otherIdx",
//                 element: <ChatRoomPage />
//             }
//         ]
//     }
// ];

export default chatRouter;
