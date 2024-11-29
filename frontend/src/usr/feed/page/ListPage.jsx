import { useEffect, useState } from "react";
import ListComponent from "../component/ListComponent";
import InsertModal from "../modal/InsertModal";
import DetailModal from "../modal/DetailModal";

const ListPage = () => {
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);

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
    console.log("sad");
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
    <div id="feed-list-page" className="text-3xl font-bold underline">
      피드 리스트 페이지
      <button
        type="button"
        onClick={() => {
          setIsInsertModalOpen(true);
        }}
      >
        등록 모달
      </button>
      {isInsertModalOpen && <InsertModal closeInsertModal={closeInsertModal} />}
      {isDetailModalOpen && (
        <DetailModal feedIdx={feedIdx} closeDetailModal={closeDetailModal} />
      )}
      <ListComponent openDetailModal={openDetailModal} />
    </div>
  );
};

export default ListPage;
