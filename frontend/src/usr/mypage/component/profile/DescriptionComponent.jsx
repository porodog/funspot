import { useState } from "react";

const DescriptionComponent = ({ useDescriptionRef, userDescription }) => {
  const [description, setDescription] = useState(userDescription);
  return (
    <div className="space-x-4">
      <p className="font-bold mb-2">소개글</p>
      <textarea
        className="p-2 w-full border-2 bg-white rounded-3xl resize-none
                focus:outline-none focus:ring-1 focus:border-emerald-500"
        placeholder="소개글을 입력해주세요 (최대 30자)"
        rows="4"
        maxLength="30"
        ref={useDescriptionRef}
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
  );
};

export default DescriptionComponent;
