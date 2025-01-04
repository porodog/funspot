// ItemButtonComponent.jsx
import React from 'react';
import { spotApi } from "../../../../../api/spotApi";
import { useBasic } from "../../../../../../../common/context/BasicContext";

const ItemButtonComponent = ({ id, spotData }) => {
    const { userInfo } = useBasic();

    // 카테고리 정보를 안전하게 가져오는 함수
    const getCategoryName = async (category, cat1, cat2, cat3) => {
        try {
            const name = await spotApi.findNameByCode(category, cat1, cat2, cat3);
            return name || '미분류';
        } catch (error) {
            console.error(`${category} 정보 조회 실패:`, error);
            return '미분류';
        }
    };

    // 지역 정보를 안전하게 가져오는 함수
    const getAreaName = async (areaCode, sigunguCode = null) => {
        try {
            const name = await spotApi.findAreaNameByCode(areaCode, sigunguCode);
            return name || '미분류';
        } catch (error) {
            console.error(`지역 정보 조회 실패 (area: ${areaCode}, sigungu: ${sigunguCode}):`, error);
            return '미분류';
        }
    };

    // 데이터 유효성 검증 함수
    const validateData = (data) => {
        return {
            areaCodeName: data.areaCodeName || '미분류',
            sigunguCodeName: data.sigunguCodeName || '미분류',
            cat1Name: data.cat1Name || '미분류',
            cat2Name: data.cat2Name || '미분류',
            cat3Name: data.cat3Name || '미분류',
            contentTypeIdName: data.contentTypeIdName || '미분류'
        };
    };

    const handleAddSpot = async () => {
        try {
            // 로그인 체크
            const userIdx = userInfo?.userIdx;
            if (!userIdx) {
                alert('로그인이 필요한 서비스입니다.');
                return;
            }

            // 로딩 시작을 표시할 수 있음
            // setIsLoading(true); // 필요한 경우 로딩 상태 관리 추가

            // 모든 필요한 정보를 병렬로 가져오기
            const [
                areaCodeName,
                sigunguCodeName,
                cat1Name,
                cat2Name,
                cat3Name,
                contentTypeIdName
            ] = await Promise.all([
                getAreaName(spotData.areacode),
                getAreaName(spotData.areacode, spotData.sigungucode),
                getCategoryName('cat1', spotData.cat1),
                getCategoryName('cat2', spotData.cat1, spotData.cat2),
                getCategoryName('cat3', spotData.cat1, spotData.cat2, spotData.cat3),
                Promise.resolve(spotApi.getContentTypeName(spotData.contenttypeid) || '미분류')
            ]);

            // 데이터 검증
            const validatedNames = validateData({
                areaCodeName,
                sigunguCodeName,
                cat1Name,
                cat2Name,
                cat3Name,
                contentTypeIdName
            });

            // spotPostRequestDTO 객체 생성
            const spotPostRequestDTO = {
                spotId: Number(id),
                userIdx: Number(userIdx),
                contentId: Number(id),
                addr1: spotData.addr1 || '',
                addr2: spotData.addr2 || '',
                areaCode: spotData.areacode || '',
                areaCodeName: validatedNames.areaCodeName,
                cat1: spotData.cat1 || '',
                cat1Name: validatedNames.cat1Name,
                cat2: spotData.cat2 || '',
                cat2Name: validatedNames.cat2Name,
                cat3: spotData.cat3 || '',
                cat3Name: validatedNames.cat3Name,
                contentTypeId: spotData.contenttypeid ? Number(spotData.contenttypeid) : 0,
                contentTypeIdName: validatedNames.contentTypeIdName,
                createdTime: spotData.createdtime ? Number(spotData.createdtime) : null,
                firstImage: spotData.firstImage || null,
                firstImage2: spotData.firstImage2 || null,
                cpyrhtDivCd: spotData.cpyrhtDivCd || '',
                mapX: spotData.mapX ? Number(spotData.mapX) : 0,
                mapY: spotData.mapY ? Number(spotData.mapY) : 0,
                mlevel: spotData.mlevel ? Number(spotData.mlevel) : null,
                modifiedTime: spotData.modifiedtime ? Number(spotData.modifiedtime) : null,
                sigunguCode: spotData.sigungucode ? Number(spotData.sigungucode) : null,
                sigunguCodeName: validatedNames.sigunguCodeName,
                tel: spotData.tel || '',
                title: spotData.title || ''
            };

            // API 호출 전 로깅
            console.log('Sending spotPostRequestDTO:', spotPostRequestDTO);

            // API 호출
            const response = await spotApi.postSpot(spotPostRequestDTO);

            // 성공 메시지 표시
            alert(response);

        } catch (error) {
            // 에러 처리
            console.error('스팟 추가 중 오류 발생:', error);
            let errorMessage = '스팟 추가에 실패했습니다.';
            if (error.response) {
                errorMessage += ` (${error.response.status}: ${error.response.data})`;
            }
            alert(errorMessage);
        } finally {
            // 로딩 상태 해제
            // setIsLoading(false); // 필요한 경우 로딩 상태 관리 추가
        }
    };

    return (
        <button
            onClick={handleAddSpot}
            type="button"
            className="w-full py-2 self-end
                bg-emerald-400
                text-white text-sm rounded-3xl
                hover:bg-emerald-500
                disabled:bg-gray-300 disabled:cursor-not-allowed"
            // disabled={isLoading} // 필요한 경우 로딩 중 비활성화
        >
            내 Spot에 담기
        </button>
    );
};

export default ItemButtonComponent;

// // ItemButtonComponent.jsx
// import React from 'react';
// import {spotApi} from "../../../../../api/spotApi";
// import {useBasic} from "../../../../../../../common/context/BasicContext";
//
// const ItemButtonComponent = ({ id, spotData }) => {
//     const { userInfo } = useBasic();
//     const handleAddSpot = async () => {
//         try {
//             // 현재 로그인한 사용자의 userIdx (실제 구현에서는 로그인 상태 관리에서 가져와야 함)
//             const userIdx = userInfo.userIdx
//
//             if (!userIdx) {
//                 alert('로그인이 필요한 서비스입니다.');
//                 return;
//             }
//
//             // 각각의 이름 정보를 비동기로 가져오기
//             const [areaCodeName, sigunguCodeName, cat1Name, cat2Name, cat3Name] = await Promise.all([
//                 spotApi.findAreaNameByCode(spotData.areacode),
//                 spotApi.findAreaNameByCode(spotData.areacode, spotData.sigungucode),
//                 spotApi.findNameByCode('cat1', spotData.cat1),
//                 spotApi.findNameByCode('cat2', spotData.cat1, spotData.cat2),
//                 spotApi.findNameByCode('cat3', spotData.cat1, spotData.cat2, spotData.cat3)
//             ]);
//
//             // contentTypeId에 따른 이름은 동기식으로 처리
//             const contentTypeIdName = spotApi.getContentTypeName(spotData.contenttypeid);
//
//
//             const spotPostRequestDTO = {
//                 spotId: Number(id),
//                 userIdx: Number(userIdx),
//                 contentId: Number(id),
//                 addr1: spotData.addr1 || '',
//                 addr2: spotData.addr2 || '',
//                 areaCode: spotData.areacode || '',
//                 areaCodeName: areaCodeName,
//                 cat1: spotData.cat1 || '',
//                 cat1Name: cat1Name,
//                 cat2: spotData.cat2 || '',
//                 cat2Name: cat2Name,
//                 cat3: spotData.cat3 || '',
//                 cat3Name: cat3Name,
//                 contentTypeId: spotData.contenttypeid ? Number(spotData.contenttypeid) : 0,
//                 contentTypeIdName: contentTypeIdName,
//                 createdTime: spotData.createdtime ? Number(spotData.createdtime) : null,
//                 firstImage: spotData.firstImage || null,
//                 firstImage2: spotData.firstImage2 || null,
//                 cpyrhtDivCd: spotData.cpyrhtDivCd || '',
//                 mapX: spotData.mapX ? Number(spotData.mapX) : 0,
//                 mapY: spotData.mapY ? Number(spotData.mapY) : 0,
//                 mlevel: spotData.mlevel ? Number(spotData.mlevel) : null,
//                 modifiedTime: spotData.modifiedtime ? Number(spotData.modifiedtime) : null,
//                 sigunguCode: spotData.sigungucode ? Number(spotData.sigungucode) : null,
//                 sigunguCodeName: sigunguCodeName,
//                 tel: spotData.tel || '',
//                 title: spotData.title || ''
//             };
//
//             console.log('Sending spotPostRequestDTO:', spotPostRequestDTO); // 디버깅용
//             const response = await spotApi.postSpot(spotPostRequestDTO);
//             alert(response); // "내 스팟에 추가되었습니다" 또는 "이미 내 스팟에 추가된 항목입니다"
//         } catch (error) {
//             console.error('스팟 추가 중 오류 발생:', error);
//             alert('스팟 추가에 실패했습니다.');
//         }
//     };
//
//     return (
//         <button
//             onClick={handleAddSpot}
//             // className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             type="button"
//             className="w-full py-2 self-end
//             bg-emerald-400
//             text-white text-sm rounded-3xl
//             hover:bg-emerald-500"
//         >
//             내 Spot에 담기
//         </button>
//     );
// };
//
// export default ItemButtonComponent;
// // const ItemButtonComponent = ({ id }) => {
// //   return (
// //     <>
// //       <button
// //         type="button"
// //         className="w-full py-2 self-end
// //         bg-emerald-400
// //         text-white text-sm rounded-3xl
// //         hover:bg-emerald-500"
// //         onClick={() => console.log("click button id >> " + id)}
// //       >
// //         내코스 담기
// //       </button>
// //     </>
// //   );
// // };
// //
// // export default ItemButtonComponent;
