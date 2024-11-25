import './App.css';
import {RouterProvider} from "react-router-dom";
import rootRouter from "./common/router/rootRouter";

const App = () => {
    return (
        <RouterProvider
            router={rootRouter}
            future={{
                v7_startTransition: true,
            }}
        />
    );
};

export default App;