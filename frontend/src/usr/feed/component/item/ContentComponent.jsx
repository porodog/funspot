const ContentComponent = ({ feed, openDetailModal }) => {
  const { content, feedHashtags } = feed;
  return (
    <>
      {/* 컨텐츠 내용 */}
      <div
        className={`flex flex-col justify-start px-4 
      w-full break-words whitespace-normal space-y-6
      ${openDetailModal ? "cursor-pointer" : ""}`}
        onClick={openDetailModal}
      >
        <span className="font-semibold text-gray-800">{content}</span>

        <div className="flex space-x-3">
          {/* 해시태그 */}
          {feedHashtags != null &&
            (feedHashtags ?? []).length > 0 &&
            feedHashtags.map((tag, index) => (
              <span key={tag.idx} className="text-black font-bold text-lg">
                #{tag.tagName}
              </span>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContentComponent;
