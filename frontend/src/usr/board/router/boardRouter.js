import { lazy, Suspense } from "react";


const Loading = <div>Loading....</div>;
const BoardList = lazy(() => import("../components/BoardList"));
const BoardDetail = lazy(() => import("../components/BoardDetail"));
const CreateBoard = lazy(() => import("../components/CreateBoard"));
const EditBoard = lazy(() => import("../components/EditBoard"));

const boardRouter = () => [
  {
    path: "", // 게시판 홈
    element: (
        <Suspense fallback={Loading}>
          <BoardList />
        </Suspense>
    ),
  },
  {
    path: "detail/:id", // 게시글 상세보기
    element: (
        <Suspense fallback={Loading}>
          <BoardDetail />
        </Suspense>
    ),
  },
  {
    path: "create", // 글쓰기 화면
    element: (
        <Suspense fallback={Loading}>
          <CreateBoard />
        </Suspense>
    ),
  },
    {
        path: "edit/:id", // 수정 페이지 라우트 추가
        element: (
            <Suspense fallback={Loading}>
                <EditBoard/>
            </Suspense>
        ),
    },
];

export default boardRouter;
