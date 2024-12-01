import { useEffect, useState } from "react";
import ListComponent from "../component/ListComponent";
import InsertModal from "../modal/InsertModal";
import DetailModal from "../modal/DetailModal";
import {useCheckToken} from "../../../common/hook/useCheckToken";

const ListPage = () => {
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);

    // 로그인
    const [isLogin, setIsLogin] = useState(false);
    const {checkToken} = useCheckToken();
    const checkLoginToken = async () => {
        const result = await checkToken();
        console.log("isLogin >> "+result);
        setIsLogin(isLogin);
    };

  // 등록 모달
  const closeInsertModal = () => {
    setIsInsertModalOpen(false);
  };

  // 상세 모달
  const openDetailModal = (idx) => {
    setFeedIdx(idx);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // 모달 외 영역은 스크롤 비활성화
  useEffect(() => {
    if (isInsertModalOpen || isDetailModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isInsertModalOpen, isDetailModalOpen]);

  return (
    <div id="feed-list-page" className="bg-amber-200">
      피드 리스트 페이지
      <button
        type="button"
        className="bg-blue-500 text-white"
        onClick={() => {
          setIsInsertModalOpen(true);
        }}
      >
       !!!! 등록 버튼 !!!!
      </button>
      <ListComponent openDetailModal={openDetailModal} />
      {isInsertModalOpen && <InsertModal closeInsertModal={closeInsertModal} />}
      {isDetailModalOpen && <DetailModal feedIdx={feedIdx} closeDetailModal={closeDetailModal} />}
    </div>
  );
};

export default ListPage;
