import { Suspense, lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>;

const MainPage = lazy(() => import("../../main/page/MainPage"));
const LoginPage = lazy(() => import("../../login/page/LoginPage"));


const rootRouter = createBrowserRouter(
    [
        {
            path: "",
            element: (
                <Suspense fallback={Loading}>
                    <MainPage />
                </Suspense>
            ),
        },
        {
            path: "login",
            element: (
                <Suspense fallback={Loading}>
                    <LoginPage />
                </Suspense>
            ),
        },
    ], {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
            v7_relativeSplatPath: true,
        },
    }
);

export default rootRouter;

