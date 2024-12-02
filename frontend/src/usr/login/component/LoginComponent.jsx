import React, { useState, useEffect, useRef } from "react";
import { postLoginApi } from "../api/LoginApi";
import { postLogoutApi } from "../api/LogoutApi";
import { useNavigate } from "react-router-dom";
import Searchid from "../../../common/searchuserinfomodal/Searchid";
import Searchpw from "../../../common/searchuserinfomodal/Searchpw";
import SearchModal from "../../../common/searchuserinfomodal/SearchModal";
import { useCheckToken } from "../../../common/hook/useCheckToken";
import axios from "axios";

const LoginComponent = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [isTouched, setIsTouched] = useState({});
  const { checkToken } = useCheckToken();

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const navigate = useNavigate();

  // 새로고침 시 로그인 상태 복원 및 토큰 유효성 확인
  useEffect(() => {
    const restoreUserInfo = async () => {
      const isTokenValid = await checkToken(); // 토큰 체크 및 재발급 시도
      if (isTokenValid) {
        const token = localStorage.getItem("access_token");
        if (token) {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_ROOT}/api/usr/me`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (response.status === 200) {
              setNickname(response.data.nickname); // 닉네임 복원
            }
          } catch (error) {
            console.error("사용자 정보 요청 실패:", error);
            localStorage.removeItem("access_token");
            setNickname(null);
          }
        }
      } else {
        setNickname(null);
        localStorage.removeItem("access_token");
      }
    };

    restoreUserInfo();
  }, [checkToken]);

  useEffect(() => {
    const newErrors = {};
    if (isTouched.userId && !userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요.";
    }
    if (isTouched.password && !password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }
    setErrors(newErrors);
  }, [userId, password, isTouched]);

  const doLogin = async () => {
    if (errors.userId) {
      alert(errors.userId);
      idInputRef.current?.focus();
      return;
    }

    if (errors.password) {
      alert(errors.password);
      passwordInputRef.current?.focus();
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("password", password);

    postLoginApi(formData, (result) => {
      if (result.status === 200) {
        const { nickname, accessToken } = result.data;
        setNickname(nickname);
        localStorage.setItem("access_token", accessToken);
        alert(`${nickname}님, 환영합니다!`);
      } else {
        alert("로그인 실패");
        setNickname(null);
      }
    });
  };

  const handleLogout = async () => {
    const result = await postLogoutApi();
    if (result.status >= 200 && result.status < 300) {
      setNickname(null);
      localStorage.removeItem("access_token");
      alert("로그아웃 되었습니다.");
      navigate("/");
    } else {
      alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {nickname ? (
        <div>
          <span>{nickname}님 | </span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <form id="login-form">
          <div>
            <label>아이디</label>
            <input
              type="text"
              name="userId"
              ref={idInputRef}
              value={userId}
              placeholder="ID"
              onChange={(e) => {
                setUserId(e.target.value);
                setIsTouched((prev) => ({ ...prev, userId: true }));
              }}
            />
            {errors.userId && <p style={{ color: "red" }}>{errors.userId}</p>}
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              ref={passwordInputRef}
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setIsTouched((prev) => ({ ...prev, password: true }));
              }}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <button type="button" onClick={doLogin}>
            로그인
          </button>
        </form>
      )}
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

      {isIdModalOpen && (
        <SearchModal
          isOpen={isIdModalOpen}
          onClose={() => setIsIdModalOpen(false)}
        >
          <Searchid onClose={() => setIsIdModalOpen(false)} />
        </SearchModal>
      )}

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
