import { useEffect, useState } from "react";

const InputComponent = ({ handleCommentEvent, content }) => {
  const [commentText, setCommentText] = useState("");
  const submitComment = () => {
    if (commentText.trim().length < 1) {
      window.alert("[피드댓글] 댓글을 입력해주세요");
      return;
    }
    handleCommentEvent(commentText);
    setCommentText("");
  };

  const handleInputEvent = (e) => {
    if (e.key === "Enter") {
      if (commentText.trim().length < 1) {
        window.alert("[피드댓글] 댓글을 입력해주세요");
        return;
      }
      submitComment();
    }
  };

  useEffect(() => {
    if (content) {
      setCommentText(content);
    }
  }, [content]);

  return (
    <div className="mt-2 flex space-x-3 w-full">
      <input
        type="text"
        className="w-4/5 px-3 py-1 text-sm border-2 border-gray-200 rounded-2xl"
        placeholder="댓글을 입력해주세요 (최대 50자)"
        maxLength="50"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleInputEvent}
      />
      <button
        className="w-1/6 bg-emerald-400 text-white px-2 py-1 rounded-2xl text-sm font-semibold"
        onClick={submitComment}
      >
        등록
      </button>
    </div>
  );
};

export default InputComponent;
