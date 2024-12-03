import React, { createContext, useContext, useEffect, useState } from "react";

export const BasicContext = createContext();

// Context 생성
export const useBasic = () => {
  return useContext(BasicContext);
};

// Context를 사용할 수 있도록 하는 custom hook
// useContext를 통해 값을 가져옴

// UserProvider 컴포넌트 - 하위 컴포넌트들에 Context 값 제공
export const UserProvider = ({ children }) => {
  const [userIdx, setUserIdx] = useState(null); // userIdx 상태 관리

  return (
    <BasicContext.Provider value={{ userIdx, setUserIdx }}>
      {children}
    </BasicContext.Provider>
  );
};
