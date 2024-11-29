import React from "react";

// 해시태그 목록 (예시)
const hashtagList = [
  "#react",
  "#javascript",
  "#webdevelopment",
  "#programming",
  "#coding",
];

const HashTagModal = ({ closeHashtagModal, addHashtag }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-80 p-6">
        {/* 상단 툴바 X 버튼 */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">해시태그 선택</h3>
          <button
            onClick={() => closeHashtagModal()}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          {hashtagList.map((hashtag, index) => (
            <button
              key={index}
              onClick={() => {
                addHashtag(hashtag);
                closeHashtagModal();
              }}
              className="block w-full text-left py-2 px-4 border-b border-gray-200 hover:bg-gray-100"
            >
              {hashtag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HashTagModal;
