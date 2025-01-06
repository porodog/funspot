import GoBackButton from "../../../common/hook/useBackbutton";
import BasicLayout from "../../../common/layout/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
  return (
    <BasicLayout>
      <GoBackButton />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
