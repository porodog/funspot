import ItemButtonComponent from "../left/inventory/item/ItemButtonComponent";
import InventoryComponent from "./inventory/InventoryComponent";

import initSrc from "../../../../../common/img/image_upload.jpg";
import { useEffect, useState } from "react";
let id = 0;
const getId = () => {
  return id + 1;
};

const sampleList = [
  {
    id: getId(),
    name: `펀스팟 명소입니다_ ${id}`,
    imageList: [
      {
        name: `상세사진_ ${id}`,
        imageList: [initSrc, initSrc, initSrc, initSrc],
      },
      {
        name: `상세사진_ ${id}`,
        imageList: [initSrc, initSrc, initSrc],
      },
      {
        name: `상세사진_ ${id}`,
        imageList: [initSrc, initSrc],
      },
      {
        name: `상세사진_ ${id}`,
        imageList: [initSrc],
      },
    ],
  },
];

// const CenterSideComponent = ({ spotSelected, setSpotSelected }) => {
//   return (
//       <div className="relative z-10">
//         <div className="w-96 h-4/5 absolute top-0 left-0 bg-white shadow-lg rounded-lg">
//           <div className="w-full h-full p-4 space-y-6 flex flex-col">
//             {/* 상단: 제목과 버튼 */}
//             <div className="w-full flex justify-between items-start border-b pb-4">
//               <div className="w-3/4">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {spotSelected.title}
//                 </h3>
//               </div>
//               <div className="w-1/4">
//                 <ItemButtonComponent id={spotSelected.contentid} />
//               </div>
//             </div>
//
//             {/* 중간: 이미지 섹션 */}
//             <div className="w-full">
//               {spotSelected.firstimage && (
//                   <div className="space-y-4">
//                     <img
//                         src={spotSelected.firstimage}
//                         alt={spotSelected.title}
//                         className="w-full h-64 object-cover rounded-lg"
//                     />
//                     {spotSelected.firstimage2 && (
//                         <img
//                             src={spotSelected.firstimage2}
//                             alt={`${spotSelected.title} 추가 이미지`}
//                             className="w-full h-64 object-cover rounded-lg"
//                         />
//                     )}
//                   </div>
//               )}
//             </div>
//
//             {/* 하단: 상세 정보 */}
//             <div className="w-full space-y-4">
//               <div className="space-y-2">
//                 <h4 className="font-medium text-gray-700">주소</h4>
//                 <p className="text-gray-600">{spotSelected.addr1 || '주소 정보가 없습니다.'}</p>
//               </div>
//               <div className="space-y-2">
//                 <h4 className="font-medium text-gray-700">연락처</h4>
//                 <p className="text-gray-600">{spotSelected.tel || '연락처 정보가 없습니다.'}</p>
//               </div>
//             </div>
//           </div>
//
//           {/* 닫기 버튼 */}
//           <button
//               className="absolute top-1/2 -right-5 px-4 py-2 bg-gray-500 text-white rounded-full transform -translate-y-1/2 z-10 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
//               onClick={() => setSpotSelected({})}
//           >
//             ❮
//           </button>
//         </div>
//       </div>
//   );
// };

const CenterSideComponent = ({ spotSelected, setSpotSelected }) => {
  const [spotDetail, setSpotDetail] = useState({});

  useEffect(() => {
    // 선택한 키값으로 상세정보 조회(임시)
    if (Object.keys(spotSelected).length > 0) {
      console.log(spotDetail);
      setSpotDetail(sampleList[0]);
    }
  }, [spotSelected]);

  return (
    <div className="relative z-10">
      <div
        className="w-96 h-4/5
        absolute top-0 left-0
        bg-gray-200"
      >
        <div className="w-full h-full p-4 space-y-10 flex flex-col">
          {/* 상단 */}
          <div className="w-full h-auto max-h-24 flex justify-between items-center">
            {/* 명소이름 */}
            <div className="w-3/5 relative">
              <h3 className="text-lg font-semibold text-gray-600 break-words">
                {spotDetail.name}
              </h3>
            </div>
            {/* 코스 담기 */}
            <div className="w-2/5 relative">
              <ItemButtonComponent id={spotSelected.id} />
            </div>
          </div>

          {/* 하단 */}
          <div className="w-full h-full space-y-6 flex flex-col overflow-y-auto">
            {(spotDetail.imageList ?? []).length > 0 ? (
              <>
                {spotDetail.imageList.map((image, index) => (
                  <InventoryComponent key={index} image={image} />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* 닫기 */}
        <button
          className="px-4 py-2 absolute top-1/2 -right-5 bg-gray-400 text-white rounded-full
                      transform -translate-y-1/2 z-10 hover:bg-gray-500"
          onClick={() => setSpotSelected({})}
        >
          ❮
        </button>
      </div>
    </div>
  );
};

export default CenterSideComponent;
