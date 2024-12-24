import { createContext, useContext, useState } from "react";

export const BasicContext = createContext();

// Context 생성
export const useBasic = () => {
  return useContext(BasicContext);
};

// Context를 사용할 수 있도록 하는 custom hook
// useContext를 통해 값을 가져옴

// UserProvider 컴포넌트 - 하위 컴포넌트들에 Context 값 제공
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // 상태 관리
  const [tokenLoading, setTokenLoading] = useState(true); // 상태 조회 로딩
  const [boards, setBoards] = useState([]); // 게시글 리스트 상태 조회

  return (
    <BasicContext.Provider
      value={{ userInfo, setUserInfo, tokenLoading, setTokenLoading, boards, setBoards }}
    >
      {children}
    </BasicContext.Provider>
  );
};