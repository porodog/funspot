import SearchInputComponent from "./search/SearchInputComponent";
import SearchSelectComponent from "./search/SearchSelectComponent";
import InventoryComponent from "./inventory/InventoryComponent";
import { useEffect, useRef, useState } from "react";
import { BiMessageAltDots } from "react-icons/bi";
import PagingComponent from "./paging/PagingComponent";
import {spotApi} from "../../../api/spotApi";

const LeftSideComponent = ({spotList, setSpotList, setSearchParameter, setSpotSelected,}) => {
  // 검색어 정보
  const useInputRef = useRef(null);

  // 초기 selectList 상태를 상수로 분리
  const initialSelectList = [
    {
      id: "area",
      title: "지역",
      optionList: []
    },
    {
      id: "sigungu",
      title: "시군구",
      optionList: []
    },
    {
      id: "theme",
      title: "테마",
      optionList: []
    },
    {
      id: "arrange",
      title: "정렬",
      optionList: []
    },
  ];

  // selectList 상태 초기화 값 수정
  const [selectList, setSelectList] = useState(initialSelectList);

  const useSelectRef = useRef([]);

  // 필터 초기화 함수
  const handleReset = async () => {
    // 검색어 초기화
    if (useInputRef.current) {
      useInputRef.current.value = '';
    }

    // select refs 초기화
    useSelectRef.current.forEach(ref => {
      if (ref) ref.value = '';
    });

    // 지역 데이터만 다시 로드하고 나머지는 초기화
    await loadAreaData();

    // 검색 파라미터도 초기화
    setSearchParameter({});
  };

  // 지역 데이터 로드
  const loadAreaData = async () => {
    try {
      const response = await spotApi.getArea();
      console.log(response);
      // const data = await response.json();
      // const areaData = data.body.items.item;
      // axios는 이미 JSON을 파싱해서 주므로 response.json() 불필요
      const areaData = response.response.body.items.item;

      const areaOptions = areaData.map(area => ({
        key: area.code,
        value: area.code,
        name: area.name
      }));

      setSelectList(prevList =>
          prevList.map(item =>
              item.id === "area"
                  ? { ...item, optionList: areaOptions }
                  : item
          )
      );
    } catch (error) {
      console.error("지역 데이터 로딩 중 에러 발생:", error);
    }
  };

  // 시군구 데이터 로드 함수
  const loadSigunguData = async (areaCode) => {
    try {
      // 선택된 지역코드로 시군구 정보 조회
      const response = await spotApi.getArea(areaCode);
      const sigunguData = response.response.body.items.item;

      // 시군구 데이터 가공
      const sigunguOptions = sigunguData.map(sigungu => ({
        key: sigungu.code,
        value: sigungu.code,
        name: sigungu.name
      }));

      // 시군구 옵션 업데이트
      setSelectList(prevList =>
          prevList.map(item =>
              item.id === "sigungu"
                  ? { ...item, optionList: sigunguOptions }
                  : item
          )
      );
    } catch (error) {
      console.error("시군구 데이터 로딩 중 에러 발생:", error);
    }
  };

  // 테마(contentTypeId) 데이터 로드 함수
  const loadThemeData = async () => {
    try {
      // 선택된 지역코드로 시군구 정보 조회
      const response = await spotApi.getCategory();
      const themeData = response.response.body.items.item;

      // 시군구 데이터 가공
      const themeOptions = themeData.map(theme => ({
        key: theme.code,
        value: theme.code,
        name: theme.name
      }));

      // 시군구 옵션 업데이트
      setSelectList(prevList =>
          prevList.map(item =>
              item.id === "theme"
                  ? { ...item, optionList: themeOptions }
                  : item
          )
      );
    } catch (error) {
      console.error("테마 데이터 로딩 중 에러 발생:", error);
    }
  };

  // select 변경 이벤트 처리 함수
  const handleSelectChange = async (selectId, value) => {
    if (selectId === 'area') {
      // 지역이 변경되면 기존 시군구 옵션 초기화
      setSelectList(prevList =>
          prevList.map(item =>
              item.id === "sigungu"
                  ? { ...item, optionList: [] }
                  : item
          )
      );

      // 새로운 지역이 선택된 경우에만 시군구 데이터 로드
      if (value) {
        await loadSigunguData(value);
      }
    }
  };

  // 검색 실행 함수
  const executeSearch = async (searchParams) => {
    try {
      // API 호출을 위한 파라미터 객체 구성
      const apiParams = {
        contentTypeId_: searchParams.theme || null,     // 테마(컨텐츠타입) 값
        areaCode_: searchParams.area || null,           // 지역 코드
        sigunguCode_: searchParams.sigungu || null,     // 시군구 코드
        keyword_: searchParams.searchValue || null,      // 검색어
        arrange_: searchParams.arrange || null,          // 정렬 기준
        category1_: null,                               // 미사용
        category2_: null,                               // 미사용
        category3_: null                                // 미사용
      };

      // spotApi의 searchKeywordOrArea 메서드 호출
      const response = await spotApi.searchKeywordOrArea(apiParams);

      // 검색 결과가 있는 경우
      if (response?.response?.body?.items?.item) {
        setSpotList(response.response.body.items.item);
      } else {
        // 검색 결과가 없는 경우
        setSpotList([]);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSpotList([]);
    }
  };

  // 검색 파라미터 설정 및 검색 실행
  const handleParameterEvent = async () => {
    // 검색어 값
    const searchObj = { searchValue: useInputRef.current.value };

    // 셀렉트 값
    const selectObj = useSelectRef.current.reduce((old, now) => {
      return { ...old, [now.id]: now.value };
    }, {});

    // 검색 파라미터 통합
    const searchParams = { ...searchObj, ...selectObj };

    // 상위 컴포넌트 상태관리값 세팅
    setSearchParameter(searchParams);

    // 검색 실행
    await executeSearch(searchParams);
  };

  // // 검색 파라미터 설정
  // const handleParameterEvent = () => {
  //   // 검색어 값
  //   const searchObj = { searchValue: useInputRef.current.value };
  //
  //   // 셀렉트 값
  //   const selectObj = useSelectRef.current.reduce((old, now) => {
  //     return { ...old, [now.id]: now.value };
  //   }, {});
  //
  //   // 상위 컴포넌트 상태관리값 세팅처리
  //   const param = { ...searchObj, ...selectObj };
  //   setSearchParameter(param);
  // };



  // 최초 마운트
  useEffect(() => {
    // setSelectList(sampleList);
    loadAreaData();
    loadThemeData();
  }, []);

  return (
      <div className="w-2/6 h-full bg-white border-r-2 border-gray-200 flex flex-col">
        {/* 상단 */}
        {/*<div className="w-full h-1/6 p-2 space-y-2 bg-white border-b-2 border-gray-200 flex flex-col justify-center">*/}
        <div className="w-full h-auto p-2 space-y-2 bg-white border-b-2 border-gray-200 flex flex-col justify-center">
          {/* 검색어 입력 */}
          <SearchInputComponent
              handleParameterEvent={handleParameterEvent}
              useInputRef={useInputRef}
          />

          {/* 셀렉트 */}
          <div className="w-full h-auto space-x-3 flex justify-center">
            {(selectList ?? []).length > 0 && (
                <>
                  {selectList.map((select, index) => (
                      <SearchSelectComponent
                          key={index}
                          select={select}
                          useSelectRef={(e) => (useSelectRef.current[index] = e)}
                          // select 변경 이벤트 핸들러 전달
                          onSelectChange={handleSelectChange}
                      />
                  ))}
                </>
            )}
          </div>
          <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-3xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            필터 초기화
          </button>
        </div>


        {/* 하단 */}
        {/* 인벤토리(검색결과) */}
        <div className="w-full h-auto p-2 space-y-3 flex flex-col overflow-y-auto">
          {(spotList ?? []).length > 0 ? (
              <>
                {/* 아이템 (목록) */}
                {spotList.map((spot, index) => (
                    <InventoryComponent
                        key={index}
                        spot={spot}
                        setSpotSelected={setSpotSelected}
                    />
                ))}

                {/* 페이지 */}
                <PagingComponent/>
              </>
          ) : (
              <>
                <div
                    className="w-full h-full
              my-10 py-10
              flex flex-col justify-center items-center 
            text-gray-600 space-y-4 "
                >
                  <BiMessageAltDots className="text-4xl"/>
                  <span className="font-semibold text-xl">검색결과가 없습니다</span>
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default LeftSideComponent;
