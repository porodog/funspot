import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;
const AddCoursePage = lazy(() => import("../page/AddCoursePage.js"));
const DetailPage = lazy(() => import("../page/Detail.jsx"));
const MapComponent = lazy(() => import("../components/map/MapComponent.js")); // 지도 컴포넌트 추가

const DateRouter = () => {
  return [
    {
      path: "addcourse",
      element: (
        <Suspense fallback={Loading}>
          <AddCoursePage />
        </Suspense>
      ),
    },
    {
      path: "datecourses/:id",
      element: (
        <Suspense fallback={Loading}>
          <DetailPage />
        </Suspense>
      ),
    },
    {
      path: "map", // 지도 경로 추가
      element: (
        <Suspense fallback={Loading}>
          <MapComponent />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="addcourse" />,
    },
  ];
};

export default DateRouter;
