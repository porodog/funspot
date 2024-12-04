import BasicLayout from "../../../common/layout/BasicLayout";
import HelloComponent from "../component/HelloComponent";

const MainPage = () => {
    return (
        <BasicLayout>
            <div id="main-page">
                메인 영역
                <HelloComponent/>
            </div>
        </BasicLayout>
    );
};

export default MainPage;
