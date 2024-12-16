import { useState } from "react";

const ContentComponent = ({ useTextRef }) => {
  const [feedContent, setFeedContent] = useState("");

  const handleContentEvent = (e) => {
    setFeedContent(e.target.value);
  };

  return (
    <>
      <textarea
        className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none"
        placeholder="내용을 입력해주세요 (최대 100자)"
        rows="6"
        maxLength="100"
        ref={useTextRef}
        value={feedContent}
        onChange={handleContentEvent}
      />
    </>
  );
};

export default ContentComponent;
