import { useState } from "react";

const NicknameComponent = ({
  useNicknameRef,
  useOriginNicknameRef,
  handleNicknameDuplicateEvent,
  handleNicknameChangeEvent,
}) => {
  const [nickname, setNickname] = useState(useOriginNicknameRef.current);
  const handleInputChangeEvent = (e) => {
    setNickname(e.target.value);
    handleNicknameChangeEvent();
  };

  return (
    <div className="space-x-4">
      <p className="font-bold mb-2">닉네임</p>
      <input
        type="text"
        placeholder="한/영/숫자를 포함 4~12자"
        className="p-2 w-80 border-2 bg-white rounded-3xl 
        focus:outline-none focus:ring-1 focus:border-emerald-500"
        maxLength="12"
        ref={useNicknameRef}
        value={nickname || ""}
        onChange={handleInputChangeEvent}
      />
      <button
        type="button"
        className="px-6 py-3 border bg-emerald-400 
        text-white
        rounded-3xl hover:bg-emerald-500"
        onClick={() => handleNicknameDuplicateEvent(nickname)}
      >
        중복확인
      </button>
    </div>
  );
};

export default NicknameComponent;
