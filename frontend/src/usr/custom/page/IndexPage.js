import BasicLayout from "../../../common/layout/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
  return (
    <BasicLayout>
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
