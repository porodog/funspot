const ContentComponent = ({ feed, openDetailModal }) => {
  const { content, feedHashtags } = feed;
  return (
    <>
      {/* 컨텐츠 내용 */}
      <div
        className={`
          flex flex-col justify-start 
          w-full break-words whitespace-normal space-y-6
          ${openDetailModal ? "cursor-pointer" : ""}
          `}
        onClick={openDetailModal}
      >
        <span className="font-semibold text-gray-800">{content}</span>

        <div className="flex space-x-3 flex-wrap">
          {/* 해시태그 */}
          {feedHashtags != null &&
            (feedHashtags ?? []).length > 0 &&
            feedHashtags.map((tag, index) => (
              <span key={tag.idx} className="text-black font-bold text-lg mb-1">
                #{tag.tagName}
              </span>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContentComponent;
