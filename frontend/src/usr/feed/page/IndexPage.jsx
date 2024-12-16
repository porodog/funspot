import BasicLayout from "../../../common/layout/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
  return (
    <BasicLayout>
      <div className="w-full h-auto">
        <Outlet />
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
