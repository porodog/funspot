import "./App.css";
import { RouterProvider } from "react-router-dom";
import rootRouter from "./common/router/rootRouter";
import { UserProvider } from "./common/context/BasicContext";

const App = () => {
  return (
    <UserProvider>
      <RouterProvider
        router={rootRouter}
        future={{
          v7_startTransition: true,
        }}
      />
    </UserProvider>
  );
};

export default App;
