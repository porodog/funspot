import BasicLayout from "../../../common/layout/BasicLayout";
import LoginComponent from "../component/LoginComponent";
import { useBasic } from "../../../common/context/BasicContext";
import usePostTokenCheck from "../../../common/hook/usePostTokenCheck";

const LoginPage = () => {
  return (
    <BasicLayout>
      <div id="login-page">
        로그인 페이지
        <LoginComponent />
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
