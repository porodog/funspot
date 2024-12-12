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
    <div className="mt-2">
      <p className="font-bold mb-2">닉네임</p>
      <input
        type="text"
        placeholder="한글, 영문, 숫자 포함 4~12자"
        className="p-2 w-80 rounded-3xl border focus:outline-none focus:ring-1 focus:border-custom-cyan focus:ring-custom-cyan bg-gray-200"
        maxLength="12"
        ref={useNicknameRef}
        value={nickname || ""}
        onChange={handleInputChangeEvent}
      />
      <button
        type="button"
        className="border bg-custom-cyan rounded-3xl ml-2 p-2 w-32 hover:bg-emerald-400"
        onClick={() => handleNicknameDuplicateEvent(nickname)}
      >
        중복 확인
      </button>
    </div>
  );
};

export default NicknameComponent;
