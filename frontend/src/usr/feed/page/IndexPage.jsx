import React, { useContext, useEffect, useState } from "react";
import BasicLayout from "../../../common/layout/BasicLayout";
import { Outlet } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext";
import usePostTokenCheck from "../../../common/hook/usePostTokenCheck";

const IndexPage = () => {
  const { userIdx } = useBasic();
  usePostTokenCheck();

  console.log(">>>>>> " + userIdx);

  return (
    <BasicLayout>
      <div className="border border-gray-200 w-full">
        피드 인덱스 페이지
        <div className="border border-red-200 flex w-full">
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
