import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SPOT_API_URL;
const REACT_APP_SPOT_SEARCH_KEYWORD_API_ENCODING = process.env.REACT_APP_SPOT_SEARCH_KEYWORD_API_ENCODING;
const REACT_APP_SPOT_SEARCH_KEYWORD_API_DECODING = process.env.REACT_APP_SPOT_SEARCH_KEYWORD_API_DECODING;
const REACT_APP_SPOT_SEARCH_AREA_API_ENCODING = process.env.REACT_APP_SPOT_SEARCH_AREA_API_ENCODING;
const REACT_APP_SPOT_SEARCH_AREA_API_DECODING = process.env.REACT_APP_SPOT_SEARCH_AREA_API_DECODING;
const REACT_APP_SPOT_AREACODE_API_ENCODING = process.env.REACT_APP_SPOT_AREACODE_API_ENCODING;
const REACT_APP_SPOT_AREACODE_API_DECODING = process.env.REACT_APP_SPOT_AREACODE_API_DECODING;
const REACT_APP_SPOT_CATEGORY_API_ENCODING = process.env.REACT_APP_SPOT_CATEGORY_API_ENCODING;
const REACT_APP_SPOT_CATEGORY_API_DECODING = process.env.REACT_APP_SPOT_CATEGORY_API_DECODING;

const contentTypeId = "&cat1="
// const contentTypeId = "&contentTypeId="
const areaCode = "&areaCode="
const sigunguCode = "&sigunguCode="
const category1 = "&cat1="
const category2 = "&cat2="
const category3 = "&cat3="
const arrange = "&arrange="
const keyword = "&keyword="
const pageNo = "&pageNo="

// Tour API 전용 axios 인스턴스 생성
const tourApiClient = axios.create({
    withCredentials: false  // credentials 비활성화
});

export const spotApi = {
    searchKeywordOrArea: async ({contentTypeId_, areaCode_, sigunguCode_, category1_, category2_, category3_, arrange_, pageNo_, keyword_}) => {
        let parameter = ""
        if(contentTypeId_){
            parameter = parameter + contentTypeId + contentTypeId_;
        }
        if(areaCode_){
            parameter = parameter + areaCode + areaCode_;
        }
        if(sigunguCode_){
            parameter = parameter + sigunguCode + sigunguCode_;
        }
        if(category1_){
            parameter = parameter + category1 + category1_;
        }
        if(category2_){
            parameter = parameter + category2 + category2_;
        }
        if(category3_){
            parameter = parameter + category3 + category3_;
        }
        if(arrange_){
            parameter = parameter + arrange + arrange_;
        }
        if(pageNo_){
            parameter = parameter + pageNo + pageNo_;
        }
        if(keyword_){
            parameter = parameter + keyword + keyword_;
            const response = await tourApiClient.get(`${REACT_APP_SPOT_SEARCH_KEYWORD_API_ENCODING}${parameter}`);
            console.log(response);
            return response.data;
        }

        const response = await tourApiClient.get(`${REACT_APP_SPOT_SEARCH_AREA_API_ENCODING}${parameter}`);
        console.log(response);
        return response.data;
    },

    getArea: async (areaCode_) => {
        try {
            let parameter = "";
            if (areaCode_) {
                parameter += "&areaCode=" + areaCode_;
            }

            // 실제 URL 확인을 위한 디버깅 로그
            console.log('API URL:', REACT_APP_SPOT_AREACODE_API_ENCODING);
            console.log(API_BASE_URL)

            // 공공 API 호출
            const response = await tourApiClient.get(`${REACT_APP_SPOT_AREACODE_API_ENCODING}${parameter}`);
            console.log(response)
            console.log(response.data)

            // 응답 확인
            if (!response.data?.response?.body?.items?.item) {
                throw new Error('API 응답 형식이 올바르지 않습니다');
            }
            return response.data;

        } catch (error) {
            console.error("getArea 호출 중 에러 발생:", error);
            if (error.response) {
                // API 에러 응답 확인
                console.error("API 응답 에러:", error.response.data);
            }
            throw error;
        }
    },

    getCategory: async () => {
        let parameter = ""
        // if(contentTypeId){
        //     parameter += contentTypeId + contentTypeId_;
        // }
        // if(category1_){
        //     parameter += category1 + category1_;
        // }
        // if(category2_){
        //     parameter += category2 + category2_;
        // }
        // if(category3_){
        //     parameter += category3 + category3_;
        // }
        const response = await tourApiClient.get(`${REACT_APP_SPOT_CATEGORY_API_ENCODING}${parameter}`);
        console.log(response);
        return response.data;
    },

    getSpotList: async (userIdx) => {
        const response = await axios.get(`/api/spot/getSpotList/${userIdx}`);
        console.log(response);
        return response.data;
    },

    getSpot: async (spotId) => {
        const response = await axios.get(`/api/spot/getSpot/${spotId}`);
        console.log(response);
        return response.data;
    },

    postSpot: async (spotDTO) => {
        const response = await axios.post(`/api/spot/postSpot`, spotDTO);
        console.log(response);
        return response.data;
    }
}


    // 키워드 검색 시 정렬기준 가까운 순, 인기순
    // 필터 컨텐츠타입, 이미지유무,

    // 내가 해야할 남은 일...
    // 1. chat DM버튼을 피드에 삽입
    // 2. chat 채팅방 목록 디자인 수정(현쟂 0%)
    // 3. chat 채팅방 디자인 수정(말풍선 색, 자동스크롤, 스크롤 숨기기, 무한스크롤(근데 이건 걍 알아서 되는듯))
    // 4. spot 백엔드 DTO 형식 손봐야댐
    // 5. spot 프론트랑 연결해야함... 그게 머냐면
    // 5-1. 그냥 keyword 조회, 위치기반조회
    // 6. spot 조회 response mapX, mapY로 지도 api 핀 꽂기

    // * keyword 조회 옵션: contentTypeId, areaCode, areaCode-sigunguCode, cat1, cat1-cat2, cat1-cat2-cat3, "keyword"
    // * 위치기반관광정보조회 옵션: arrange(...거리순), contentTypeId, radius(=<20000)

    // => 검색 탭을 2가지로 만들자. 키워드조회, 위치기반조회
    // [ 옵션 ]
    // 키워드: 지역(+시군구), 콘텐츠타입(관광지, 문화시설, 축제/공연/행사, 레포츠, 숙박, 쇼핑, 음식), 정렬(담긴수)
    // 위치기반: 정렬, 콘텐츠타입(관광지, 문화시설, 축제/공연/행사, 레포츠, 숙박, 쇼핑, 음식), 반경
    //
    // 하근데 위치기반과 별개로 지역기반 조회도 필요하지 않나?
    // 응아니야 시간 없어서 그냥 키워드 검색만 넣어도 될듯 만약 검색창에 키워드가 입력되지 않은 상태로 검색버튼을 누르면
    // 지역기반관광정보조회 api로 호출하는ㄱㅓㅇㅇ


