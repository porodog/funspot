import BasicLayout from "../../../common/layout/BasicLayout";
import SignupComponent from "../component/SignupComponent";

const SignupPage = () => {
    return (
        <BasicLayout>
            <div id="Singup-page">
                 회원가입 페이지
                <SignupComponent/>
            </div>
        </BasicLayout>
    );
};

export default SignupPage;