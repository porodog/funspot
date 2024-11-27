import React, { useEffect } from "react";
import { useCheckToken } from "../../../common/hook/useCheckToken";
import { getInfoApi } from "../api/MypageApi";
import IndexComponent from "../component/IndexComponent";
import MenuComponent from "../component/MenuComponent";
import BasicLayout from "../../../common/layout/BasicLayout";

const MyPage = () => {
  const { checkToken } = useCheckToken();

  useEffect(() => {
    const init = async () => {
      await checkToken();

      getInfoApi()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    init();
  }, [checkToken]);

  return (
    <BasicLayout>
      <div id="main-page">
        마이페이지
        <div>
          <IndexComponent />
        </div>
        <div>
          <MenuComponent />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
