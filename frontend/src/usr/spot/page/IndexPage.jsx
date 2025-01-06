import GoBackButton from "../../../common/hook/useBackbutton";
import BasicLayout from "../../../common/layout/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
  return (
    <BasicLayout>
      <GoBackButton />
      <Outlet />
    </BasicLayout>
  );
};

export default IndexPage;
