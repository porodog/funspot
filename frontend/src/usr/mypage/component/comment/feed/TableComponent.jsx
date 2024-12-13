import React from "react";
import { putFeedCommentDeleteApi } from "../../../api/MypageApi";

const TableComponent = ({
  commentList,
  handleDeleteListEvent,
  openDetailModal,
}) => {
  const handleDetailButtonEvent = (feedIdx, delYn) => {
    if (delYn) {
      console.log("[상세조회] 삭제된 피드입니다");
      return;
    }

    openDetailModal(feedIdx);
  };

  const handleDeleteButtonEvent = async (id) => {
    try {
      const data = await putFeedCommentDeleteApi({ commentIdx: id });
      console.log("[댓글삭제] 삭제를 성공했습니다");
      handleDeleteListEvent(data.commentIdx);
    } catch (err) {
      console.log("[댓글삭제] 삭제를 실패했습니다");
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              번호
            </th>
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              유형
            <