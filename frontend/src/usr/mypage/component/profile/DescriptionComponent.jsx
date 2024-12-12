import React, { useState } from "react";

const DescriptionComponent = ({ useDescriptionRef, userDescription }) => {
  const [description, setDescription] = useState(userDescription);
  return (
    <div className="mt-2">
      <p className="font-bold mb-2">소개글</p>
      <textarea
        className="p-2 w-full rounded-3xl border bg-gray-200 resize-none
                focus:outline-none focus:ring-1 focus:border-custom-cyan focus:ring-custom-cyan "
        placeholder="소개글을 입력해주세요..(최대 30자)"
        maxLength="30"
        ref={useDescriptionRef}
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
  );
};

export default DescriptionComponent;
