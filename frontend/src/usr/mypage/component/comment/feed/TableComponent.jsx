import { putFeedCommentDeleteApi } from "../../../api/MypageApi";

const TableComponent = ({
  commentList,
  handleDeleteListEvent,
  openDetailModal,
}) => {
  const handleDetailButtonEvent = ({ feedIdx, feedDelYn }) => {
    if (feedDelYn) {
      window.alert("[상세조회] 삭제된 피드입니다");
      return;
    }
    openDetailModal(feedIdx);
  };

  const handleDeleteButtonEvent = async (commentIdx) => {
    const confirm = window.confirm("[댓글삭제] 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }

    try {
      const data = await putFeedCommentDeleteApi({ commentIdx });
      window.alert("[댓글삭제] 삭제를 성공했습니다");
      handleDeleteListEvent(data.commentIdx);
    } catch (err) {
      window.alert("[댓글삭제] 삭제를 실패했습니다");
      console.log(err);
    }
  };

  return (
    <div className="w-full h-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              번호
            </th>
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              유형
            </th>
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              내용
            </th>
            <th className="px-6 py-4 text-left text-gray-800 font-semibold">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {commentList &&
            commentList.map((comment, index) => (
              <tr
                key={comment.idx}
                className="border-b hover:bg-gray-50 w-full"
              >
                <td className="w-1/6 px-6 py-4 text-gray-700">{index + 1}</td>
                <td className="w-1/6 px-6 py-4 text-gray-700">
                  {comment.parentIdx ? "답글" : "댓글"}
                </td>
                <td
                  className="w-3/6 max-w-12 px-6 py-4 text-gray-700 cursor-pointer hover:text-gray-800 hover:font-bold hover:scale-x-105 transition-all duration-200 ease-in-out truncate"
                  onClick={() => handleDetailButtonEvent(comment)}
                >
                  {comment.content}
                </td>
                <td className="w-1/6 px-6 py-4">
                  <button
                    className="text-red-500 hover:text-red-600 hover:font-bold hover:scale-x-105 transition-all duration-200 ease-in-out"
                    onClick={() => handleDeleteButtonEvent(comment.idx)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
