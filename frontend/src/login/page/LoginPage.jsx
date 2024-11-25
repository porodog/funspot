import BasicLayout from "../../common/layout/BasicLayout";
import LoginComponent from "../component/LoginComponent";

const LoginPage = () => {
    return (
        <BasicLayout>
            <div id="login-page">
                로그인 페이지
                <LoginComponent/>
            </div>
        </BasicLayout>
    );
};

export default LoginPage;
