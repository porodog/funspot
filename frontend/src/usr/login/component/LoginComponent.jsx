import React from "react";
import { postLoginApi } from "../api/LoginApi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Searchid from "../../../common/searchuserinfomodal/Searchid";
import Searchpw from "../../../common/searchuserinfomodal/Searchpw";
import SearchModal from "../../../common/searchuserinfomodal/SearchModal"; // 파일 이름 대소문자 확인

const LoginComponent = () => {
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isIdModalOpen, setIsIdModalOpen] = React.useState(false); // 아이디 찾기 모달 상태
  const [isPwModalOpen, setIsPwModalOpen] = React.useState(false); // 비밀번호 찾기 모달 상태

  const idInputRef = useRef(null);

  const navigate = useNavigate();

  const doLogin = () => {
    const formData = new FormData(document.querySelector("#login-form"));

    postLoginApi(formData, (result) => {
      if (result.status !== 200) {
        window.alert("로그인 실패");
        localStorage.removeItem("access_token");
        return;
      }

      localStorage.setItem("access_token", result.data.accessToken);
      navigate({ pathname: "/" }, { replace: true });
    });
  };

  const handleFocusIdField = () => {
    if (idInputRef.current) {
      idInputRef.current.focus(); // ID 입력 필드에 포커스
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <form id="login-form">
        <label>아이디</label>
        <input
          type="text"
          name="userId"
          ref={idInputRef}
          value={userId}
          placeholder="ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={doLogin}>
          로그인
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </form>
      <div id="search-user-info">
        <div>
          <b
            style={{ marginLeft: "15px", cursor: "pointer" }}
            onClick={() => setIsIdModalOpen(true)}
          >
            아이디 찾기
          </b>
        </div>
        <div>
          <b
            style={{ cursor: "pointer" }}
            onClick={() => setIsPwModalOpen(true)}
          >
            비밀번호 찾기
          </b>
        </div>
      </div>

      {/* 아이디 찾기 모달 */}
      {isIdModalOpen && (
        <SearchModal
          isOpen={isIdModalOpen}
          onClose={() => {
            setIsIdModalOpen(false);
            handleFocusIdField();
          }}
        >
          <Searchid
            onClose={() => {
              setIsIdModalOpen(false);
              handleFocusIdField();
            }}
            focusIdField={handleFocusIdField}
          />
        </SearchModal>
      )}

      {/* 비밀번호 찾기 모달 */}
      {isPwModalOpen && (
        <SearchModal
          isOpen={isPwModalOpen}
          onClose={() => setIsPwModalOpen(false)}
        >
          <Searchpw onClose={() => setIsPwModalOpen(false)} />
        </SearchModal>
      )}
    </div>
  );
};

export default LoginComponent;
