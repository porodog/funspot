import { useState } from "react";

const DetailModal = ({ feedIdx, closeDetailModal }) => {
  console.log(feedIdx);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지 배열
  const images = [
    "https://watermark.lovepik.com/photo/20211122/large/lovepik-big-supermarket-picture_500757753.jpg",
    "https://via.placeholder.com/1200x800/4682B4/FFFFFF?text=Image+2",
    "https://via.placeholder.com/1200x800/32CD32/FFFFFF?text=Image+3",
  ];

  // 이전 이미지로 이동
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 다음 이미지로 이동
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-9/12 h-5/6 p-6 flex">
        <div className="w-3/5 pr-3 relative">
          {/* 왼쪽 영역: 게시글 정보 */}
          <div className="w-full h-full mx-auto">
            <img
              src={images[0]}
              alt="게시물 이미지"
              className="rounded-md w-full h-full object-contain px-4"
            />
          </div>

          {/* 슬라이드 버튼 */}
          <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
            <button
              onClick={prevImage}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            >
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
            <button
              onClick={nextImage}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="w-2/5 pl-3">
          {/* 오른쪾 영역: 댓글 정보*/}
          {/* 상단 툴바 X 버튼 */}
          <div className="flex justify-between mb-4 items-start">
            <div className="text-lg font-semibold flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-semibold text-gray-800 ml-1">아이디</p>
            </div>
            <button
              onClick={closeDetailModal}
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
          <div>
            <div>{/* 컨텐츠 내용 */}</div>
            <div>{/* 댓글 목록 + 등록인풋 */}</div>
            <div>{/* 좋아요 수 */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;

// <div className="w-1/3">
//               {/* 댓글 목록 */}
//               <div className="h-96 overflow-y-auto p-4 space-y-4">
//                 <div className="flex space-x-3">
//                   <img
//                     src="https://via.placeholder.com/50"
//                     alt="프로필 이미지"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-800">사용자 1</p>
//                     <p className="text-sm text-gray-600">댓글 내용이 여기에 들어갑니다.</p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-3">
//                   <img
//                     src="https://via.placeholder.com/50"
//                     alt="프로필 이미지"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-800">사용자 2</p>
//                     <p className="text-sm text-gray-600">다른 댓글 내용입니다.</p>
//                   </div>
//                 </div>
//               </div>

//               {/* 댓글 입력란 */}
//               <div className="mt-4 flex items-center space-x-3">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded-md text-sm"
//                   placeholder="댓글을 작성하세요..."
//                 />
//                 <button className="text-blue-500">게시</button>
//               </div>
//             </div>
