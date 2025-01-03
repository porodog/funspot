import {useEffect, useRef} from "react";

const SearchSelectComponent = ({select, useSelectRef, onSelectChange}) => {
    // ref 직접 선언
    const selectRef = useRef(null);

    useEffect(() => {
        // 부모 컴포넌트에 ref 전달
        if(selectRef.current) {
            useSelectRef(selectRef.current);
        }
    }, [useSelectRef]);

    const handleChange = (e) => {
        // 모든 select 변경을 부모에게 알림
        if (onSelectChange) {
            onSelectChange(select.id, e.target.value);
        }
    };

    // // select 변경 이벤트 처리
    // const handleChange = (e) => {
    //     // area가 변경될 때만 부모 컴포넌트에 알림
    //     if (select.id === 'area' && onSelectChange) {
    //         onSelectChange(select.id, e.target.value);
    //     }
    // };

  return (
    <>
      <select
        // id={select.id}
        // defaultValue={'all'}
        ref={selectRef}
        className="w-1/4 p-2 
        text-sm font-light
        border-2 bg-white rounded-3xl 
        focus:outline-none focus:ring-1 focus:border-emerald-500"
        onChange={handleChange}
        // 시군구이면서 옵션 목록이 비어있을 때 비활성화
        disabled={select.id === 'sigunguCode' && !select.optionList.length}
      >
        <option disabled hidden value="">{select.title}</option>
        {/*<option value="all">전체</option>*/}
        {select.optionList.map((option) => (
          <option key={option.key} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SearchSelectComponent;
