import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import usePostTokenCheck from "../hook/usePostTokenCheck";
import { useBasic } from "../context/BasicContext";


const BasicLayout = ({ children }) => {
  // 전역 값(userInfo) 처리 전 로딩 << 디자인 필요??
  const { tokenLoading } = useBasic();
  usePostTokenCheck();
  const loading = <div>로딩 중 입니다!!!!!!</div>;

  return (
    <div>
      <Header />
      <main id="basic-content">{tokenLoading ? loading : children}</main>
      {/* <MainPage /> */}
      {/* <Aside /> */}
      <Footer />
    </div>
  );
};

export default BasicLayout;
