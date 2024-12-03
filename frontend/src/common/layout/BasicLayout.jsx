import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Aside from "../component/Aside";
import { useBasic } from "../context/BasicContext";
import usePostTokenCheck from "../hook/usePostTokenCheck";

const BasicLayout = ({ children }) => {
  const { userIdx } = useBasic();
  usePostTokenCheck();
  console.log(userIdx);

  return (
    <div id="basic-layout">
      <Header />
      <main id="basic-content">{children}</main>
      <Aside />
      <Footer />
    </div>
  );
};

export default BasicLayout;
