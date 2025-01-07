import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import usePostTokenCheck from "../hook/usePostTokenCheck";
import { useBasic } from "../context/BasicContext";
import SideNavigationMenu from "../../usr/main/component/SideNavigationMenu";
import { useLocation } from "react-router-dom";

const BasicLayout = ({ children }) => {
    const { tokenLoading } = useBasic();
    usePostTokenCheck();
    const currentLocation = useLocation(); // 변수명 변경
    const loading = <div>로딩 중 입니다!!!!!!</div>;

    // MainPage 여부 확인
    const isMainPage = currentLocation.pathname === "/";

    return (
        <div>
            <Header />
            <main id="basic-content">{tokenLoading ? loading : children}</main>
            {/* MainPage가 아닌 경우에만 SideNavigationMenu 렌더링 */}
            {!isMainPage && <SideNavigationMenu />}
            <Footer />
        </div>
    );
};

export default BasicLayout;
