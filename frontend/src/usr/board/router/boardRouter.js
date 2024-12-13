import { lazy, Suspense } from "react";

const Loading = <div>Loading....</div>;
const BoardList = lazy(() => import("../components/BoardList"));
const BoardDetail = lazy(() => import("../components/BoardDetail"));
const CreateBoard = lazy(() => import("../components/CreateBoard"));

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
];

export default boardRouter;
