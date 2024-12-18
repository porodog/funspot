import SearchInputComponent from "./search/SearchInputComponent";
import SearchSelectComponent from "./search/SearchSelectComponent";
import InventoryComponent from "./inventory/InventoryComponent";
import { useEffect, useRef, useState } from "react";
import { BiMessageAltDots } from "react-icons/bi";

// 유형, 연령, 테마, 기타 셀렉트 API로 하나?
const initList = [
  {
    name: "",
    optionList: [],
  },
];
const sampleList = [
  {
    id: "id1",
    title: "유형",
    optionList: [
      { value: 1, name: "유형1" },
      { value: 2, name: "유형2" },
    ],
  },
  {
    id: "id2",
    title: "연령",
    optionList: [
      { value: 1, name: "연령1" },
      { value: 2, name: "연령2" },
    ],
  },
  {
    id: "id3",
    title: "테마",
    optionList: [
      { value: 1, name: "테마1" },
      { value: 2, name: "테마22323" },
    ],
  },
  {
    id: "id4",
    title: "기타",
    optionList: [
      { value: 1, name: "기타1" },
      { value: 2, name: "기타2" },
    ],
  },
];

const LeftSideComponent = ({ spotList, handleSpotSearchEvent }) => {
  // 검색어 정보
  const useInputRef = useRef(null);

  // 셀렉트 정보
  const [selectList, setSelectList] = useState(initList);
  const useSelectRef = useRef([]);

  // 검색 파라미터 설정
  const handleParameterEvent = () => {
    // 검색어 값
    const searchObj = { searchValue: useInputRef.current.value };

    // 셀렉트 값
    const selectObj = useSelectRef.current.reduce((old, now) => {
      return { ...old, [now.id]: now.value };
    }, {});

    // 파라미터 전달
    const param = { ...searchObj, ...selectObj };
    handleSpotSearchEvent(param);
  };

  // 최초 마운트
  useEffect(() => {
    setSelectList(sampleList);
  }, []);

  return (
    <div className="w-2/6 h-full bg-white border-r-2 border-gray-200 flex flex-col">
      {/* 상단 */}
      <div className="w-full h-1/6 p-2 space-y-2 bg-white border-b-2 border-gray-200 flex flex-col justify-center">
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
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* 하단 */}
      {/* 인벤토리(검색결과) */}
      <div className="w-full h-auto p-2 space-y-5 flex flex-col">
        {(spotList ?? []).length > 0 ? (
          <>
            {spotList.map((spot, index) => (
              <InventoryComponent key={index} spot={spot} />
            ))}
          </>
        ) : (
          <>
            <div
              className="w-full h-full 
              my-10 py-10
              flex flex-col justify-center items-center 
            text-gray-600 space-y-4 "
            >
              <BiMessageAltDots className="text-4xl" />
              <span className="font-semibold text-xl">검색결과가 없습니다</span>
            </div>
          </>
        )}
      </div>

      {/* 페이지 */}
      {(spotList ?? []).length > 0 && (
        <div className="w-full h-auto my-auto">
          <ul className="p-0 space-x-1 flex justify-center list-none">
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                «
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-2 hover:bg-emerald-400 hover:text-white hover:rounded-full"
              >
                »
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftSideComponent;
