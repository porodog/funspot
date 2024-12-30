import {useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";

const SearchInputComponent = ({ handleParameterEvent, useInputRef }) => {
  // 검색어
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueEvent = (e) => {
    // 엔터키 입력 시 검색 실행
    if (e.key === "Enter") {
      handleParameterEvent(searchValue);
    }
    setSearchValue(e.target.value);
  };

  // useEffect를 추가하여 input 값 동기화
  useEffect(() => {
    if (useInputRef.current) {
      useInputRef.current.value = searchValue;
    }
  }, [searchValue]);

  return (
    <>
      <div className="w-full h-auto relative overflow-hidden">
        <input
          type="text"
          className="w-full p-2 pr-14 mx-auto border-2 bg-white rounded-3xl focus:outline-none focus:ring-1 focus:border-emerald-500"
          maxLength="20"
          placeholder="검색어 입력"
          ref={useInputRef}
          value={searchValue}
          onChange={handleSearchValueEvent}
          onKeyDown={handleSearchValueEvent}
        />
        <button
          type="button"
          className="px-4 py-2 
          border-l-2 border-gray-200
          absolute right-1 top-1/2 
          text-xl
          transform -translate-y-1/2
          hover:text-emerald-400"
          onClick={() => handleParameterEvent()}
        >
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default SearchInputComponent;
