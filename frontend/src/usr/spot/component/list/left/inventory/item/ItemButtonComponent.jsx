// ItemButtonComponent.jsx
import React from 'react';
import {spotApi} from "../../../../../api/spotApi";
import {useBasic} from "../../../../../../../common/context/BasicContext";

const ItemButtonComponent = ({ id, spotData }) => {
    const { userInfo } = useBasic();
    const handleAddSpot = async () => {
        try {
            // 현재 로그인한 사용자의 userIdx (실제 구현에서는 로그인 상태 관리에서 가져와야 함)
            const userIdx = userInfo.userIdx

            if (!userIdx) {
                alert('로그인이 필요한 서비스입니다.');
                return;
            }

            const spotPostRequestDTO = {
                spotId: Number(id), // contentid를 spotId로 사용
                userIdx: Number(userIdx),
                contentId: Number(id),
                addr1: spotData.addr1 || '',
                addr2: spotData.addr2 || '',
                areaCode: spotData.areacode || '',
                cat1: spotData.cat1 || '',
                cat2: spotData.cat2 || '',
                cat3: spotData.cat3 || '',
                contentTypeId: spotData.contenttypeid ? Number(spotData.contenttypeid) : 0,
                createdTime: spotData.createdtime ? Number(spotData.createdtime) : null,
                firstImage: spotData.firstImage || null,
                firstImage2: spotData.firstImage2 || null,
                cpyrhtDivCd: spotData.cpyrhtDivCd || '',
                mapX: spotData.mapX ? Number(spotData.mapX) : 0,
                mapY: spotData.mapX ? Number(spotData.mapX) : 0,
                mlevel: spotData.mlevel ? Number(spotData.mlevel) : null,
                modifiedTime: spotData.modifiedtime ? Number(spotData.modifiedtime) : null,
                sigunguCode: spotData.sigungucode ? Number(spotData.sigungucode) : null,
                tel: spotData.tel,
                title: spotData.title
            };

            // const spotPostRequestDTO = {
            //     // spotId: Number(id), // contentid를 spotId로 사용
            //     userIdx: Number(userIdx),
            //     contentId: Number(id),
            //     addr1: spotData.addr1,
            //     addr2: spotData.addr2,
            //     areaCode: spotData.areacode,
            //     cat1: spotData.cat1,
            //     cat2: spotData.cat2,
            //     cat3: spotData.cat3,
            //     contentTypeId: Number(spotData.contenttypeid),
            //     createdTime: Number(spotData.createdtime),
            //     firstImage: spotData.firstimage,
            //     firstImage2: spotData.firstimage2,
            //     cpyrhtDivCd: spotData.cpyrhtDivCd,
            //     mapX: Number(spotData.mapx),
            //     mapY: Number(spotData.mapy),
            //     mlevel: Number(spotData.mlevel),
            //     modifiedTime: Number(spotData.modifiedtime),
            //     sigunguCode: Number(spotData.sigungucode),
            //     tel: spotData.tel,
            //     title: spotData.title
            // };

            const response = await spotApi.postSpot(spotPostRequestDTO);
            alert(response); // "내 스팟에 추가되었습니다" 또는 "이미 내 스팟에 추가된 항목입니다"
        } catch (error) {
            console.error('스팟 추가 중 오류 발생:', error);
            alert('스팟 추가에 실패했습니다.');
        }
    };

    return (
        <button
            onClick={handleAddSpot}
            // className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button"
            className="w-full py-2 self-end
            bg-emerald-400
            text-white text-sm rounded-3xl
            hover:bg-emerald-500"
        >
            내 Spot에 담기
        </button>
    );
};

export default ItemButtonComponent;
// const ItemButtonComponent = ({ id }) => {
//   return (
//     <>
//       <button
//         type="button"
//         className="w-full py-2 self-end
//         bg-emerald-400
//         text-white text-sm rounded-3xl
//         hover:bg-emerald-500"
//         onClick={() => console.log("click button id >> " + id)}
//       >
//         내코스 담기
//       </button>
//     </>
//   );
// };
//
// export default ItemButtonComponent;
