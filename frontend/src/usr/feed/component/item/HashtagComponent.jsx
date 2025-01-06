const HashtagComponent = ({ hashtagList, handleDeleteHashTagEvent }) => {
  return (
    <>
      {hashtagList.map((tag) => (
        <span
          key={tag.hashtagIdx}
          className="px-4 py-3 mb-1 inline-flex items-center
          bg-emerald-400
          text-white rounded-full text-sm font-medium cursor-pointer
          hover:bg-emerald-500 transition duration-300 ease-in-out"
          onClick={() => handleDeleteHashTagEvent(tag)}
        >
          {tag.tagName}
          <button type="button" className="ml-3 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      ))}
    </>
  );
};

export default HashtagComponent;
