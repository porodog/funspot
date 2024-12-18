import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Feed Page Loading....</div>;
const ListPage = lazy(() => import("../page/ListPage"));

const spotRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ListPage />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/spot/list" />,
    },
  ];
};

export default spotRouter;
