import React from "react";

const ListComponent = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* 게시판 타이틀 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">피드 댓글</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left text-gray-800 font-semibold">
                번호
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold">
                댓글 내용
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold">
                삭제
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 댓글 목록 예시 */}
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-700">1</td>
              <td className="px-6 py-4 text-gray-700">
                첫 번째 댓글 내용입니다.
              </td>
              <td className="px-6 py-4">
                <button className="text-red-500 hover:text-red-700">
                  삭제
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-700">2</td>
              <td className="px-6 py-4 text-gray-700">
                두 번째 댓글 내용입니다.
              </td>
              <td className="px-6 py-4">
                <button className="text-red-500 hover:text-red-700">
                  삭제
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-700">3</td>
              <td className="px-6 py-4 text-gray-700">
                세 번째 댓글 내용입니다.
              </td>
              <td className="px-6 py-4">
                <button className="text-red-500 hover:text-red-700">
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListComponent;
