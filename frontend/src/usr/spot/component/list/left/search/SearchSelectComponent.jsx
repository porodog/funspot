const SearchSelectComponent = ({select, useSelectRef, onSelectChange}) => {
    // select 변경 이벤트 처리
    const handleChange = (e) => {
        // area가 변경될 때만 부모 컴포넌트에 알림
        if (select.id === 'area' && onSelectChange) {
            onSelectChange(select.id, e.target.value);
        }
    };

  return (
    <>
      <select
        // id={select.id}
        defaultValue={'all'}
        ref={useSelectRef}
        className="w-1/4 p-2 
        text-sm font-light
        border-2 bg-white rounded-3xl 
        focus:outline-none focus:ring-1 focus:border-emerald-500"
        onChange={handleChange}
        // 시군구이면서 옵션 목록이 비어있을 때 비활성화
        disabled={select.id === 'sigungu' && !select.optionList.length}
      >
        <option disabled hidden value="all">{select.title}</option>
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
