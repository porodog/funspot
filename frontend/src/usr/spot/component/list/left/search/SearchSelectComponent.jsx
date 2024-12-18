const SearchSelectComponent = ({
  select: { id, title, optionList },
  useSelectRef,
}) => {
  return (
    <>
      <select
        id={id}
        ref={useSelectRef}
        className="w-1/4 p-2 
        text-sm font-light
        border-2 bg-white rounded-3xl 
        focus:outline-none focus:ring-1 focus:border-emerald-500"
      >
        <option value="">{title}</option>
        {optionList.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SearchSelectComponent;
