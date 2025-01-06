import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomDetail, deleteCustom } from "../api/CustomApi";
import { addWishList, removeWishList } from "../api/WishListApi";
import { useBasic } from "../../../common/context/BasicContext";
import vector from "../img/Vector.png";
import locate from "../img/locate.png";
import restaurant from "../img/Restaurant.png";
import cafe from "../img/Cafe.png";
import exercise from "../img/Exercise.png";
import walk from "../img/Walk.png";
import basic from "../img/Basic.png";
import addwish from "../img/addWish.png";
import removewish from "../img/removeWish.png";

const ReadComponent = () => {
  const mapElement = useRef(null);
  const { cno } = useParams(); // URL 파라미터에서 cno 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate
  const [custom, setCustom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getCustomDetail(cno, loginUserIdx);
        setCustom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [cno, loginUserIdx]);

  useEffect(() => {
    if (!mapElement.current || !custom || custom.places.length === 0) return;

    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6v5g0a8cnc";
    script.async = true;

    script.onload = () => {
      const { naver } = window;
      if (!naver) {
        console.error("Naver Map is not loaded.");
        return;
      }

      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(
          custom.places[0].latitude,
          custom.places[0].longitude
        ),
        zoom: 14,
      });

      const pathCoords = custom.places.map(
        (place) => new naver.maps.LatLng(place.latitude, place.longitude)
      );

      for (let i = 0; i < pathCoords.length; i++) {
        const position = pathCoords[i];

        const place = custom.places[i];

        const categoryIcons = {
          식당: restaurant,
          카페: cafe,
          체험: exercise,
          명소: walk,
          기본: basic,
        };

        new naver.maps.Marker({
          position: position,
          map: map,
          icon: {
            content: `
              <div style="
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                background-color: #00E5E5; /* 마커 배경 색상 */
                border-radius: 50% 50% 50% 0; /* 핀 형태 */
                transform: rotate(-45deg);
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
              ">
                <!-- 내부 아이콘 -->
                <div style="
                  position: absolute;
                  width: 30px;
                  height: 30px;
                  background-color: #FFFFFF; /* 아이콘 배경색 흰색 */
                  border-radius: 50%; /* 원형 */
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transform: rotate(45deg); /* 회전 복구 */
                ">
                  <img src="${
                    categoryIcons[place.category] || categoryIcons["기본"]
                  }" alt="아이콘" style="
                    width: 18px;
                    height: 18px;
                  "/>
                </div>
        
                <!-- 마커 번호 -->
                <div style="
                  position: absolute;
                  top: -12px;
                  left: 4px;
                  width: 20px;
                  height: 20px;
                  background-color: #2C3E50; /* 번호 배경색 */
                  color: white;
                  border-radius: 50%;
                  font-size: 12px;
                  font-weight: bold;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transform: rotate(45deg);
                ">
                  ${i + 1} <!-- 번호 -->
                </div>
              </div>
            `,
            anchor: new naver.maps.Point(25, 60), // 마커 위치 조정
          },
        });

        if (i > 0) {
          new naver.maps.Polyline({
            map: map,
            path: [pathCoords[i - 1], position],
            strokeColor: "#25E2B6", // 선 색상
            strokeWeight: 5, // 선 두께
            strokeOpacity: 1, // 선 투명도
            strokeStyle: "solid",
          });
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [custom]);

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteCustom(cno);
        alert("정상적으로 삭제되었습니다!");
        navigate("/custom/list"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("Error deleting date course:", error);
        alert("Failed to delete the date course. Please try again.");
      }
    }
  };

  // 🔥 찜하기 / 찜 취소 토글 함수
  const handleWishListToggle = async () => {
    try {
      const updatedWishListStatus = !custom.wishList; // 🔥 변경된 상태
      setCustom((prevCustom) => ({
        ...prevCustom,
        wishList: updatedWishListStatus,
      }));

      if (custom.wishList) {
        await removeWishList(loginUserIdx, cno);
        alert("위시리스트에서 삭제되었습니다.");
      } else {
        await addWishList(loginUserIdx, cno);
        alert("위시리스트에 추가되었습니다.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setCustom((prevCustom) => ({
        ...prevCustom,
        wishList: !prevCustom.wishList,
      })); // 🔥 실패하면 상태를 되돌림
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!custom) return <div>No detail found.</div>;

  return (
    <div>
      <div
        style={{
          position: "relative", // 부모 요소를 relative로 설정
          width: "1150px",
          height: "400px",
          border: "0",
          borderRadius: "25px",
          marginBottom: "10px",
        }}
      >
        {/* 지도 */}
        <div
          ref={mapElement}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "25px",
          }}
        />

        {/* 코스 설명 텍스트 */}
        <div
          style={{
            position: "absolute", // 텍스트를 지도의 좌측 상단에 배치
            top: "10px",
            left: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // 반투명 검정 배경
            color: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: "10", // 텍스트가 지도 위에 표시되도록 설정
          }}
        >
          {custom.description}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        {/* 제목 */}
        <h1 className="text-2xl font-bold">
          {custom.nickname}님의 {custom.title}
        </h1>

        {/* 버튼 그룹 */}
        <div className="flex items-center gap-2">
          {custom.idx === loginUserIdx && (
            <>
              <button
                onClick={() => navigate(`/custom/update/${cno}`)}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-200 text-red-600 rounded hover:bg-red-300"
              >
                삭제
              </button>
            </>
          )}

          <button
            onClick={handleWishListToggle}
            className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-500 hover:text-gray-700 transition"
          >
            {/* 하트 이미지 */}
            <img
              src={custom.wishList ? addwish : removewish} // 조건부 렌더링
              alt={custom.wishList ? "찜 취소" : "찜하기"}
              className="w-5 h-5"
            />
            {/* 텍스트 */}
            <span className="text-sm">
              {custom.wishList ? "찜 취소" : "찜하기"}
            </span>
          </button>

          <button
            onClick={() => navigate("/custom/list")}
            className="px-4 py-2 bg-custom-cyan text-white rounded-lg hover:bg-emerald-500 transition duration-200 cursor-pointer"
          >
            코스 목록
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {custom.tags.map((tag) => (
          <span className="px-4 py-1 text-sm font-semibold text-custom-cyan border border-custom-cyan rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="container mx-auto px-4">
        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {custom.places.map((place, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              {/* 이미지 */}
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />

                {/* 왼쪽 상단에 아이콘과 추가 텍스트 */}
                <div className="absolute top-1 left-1 flex items-center bg-black/60 text-white px-1.5 py-0.5 rounded text-xs">
                  {/* 아이콘 */}
                  <img src={locate} alt="위치" className="w-3 h-3 mr-0.5" />
                  {/* 텍스트 */}
                  <span>{place.simpleAddress}</span>
                </div>

                {/* 번호 */}
                <div className="absolute bottom-6 left-2 text-white text-xl font-bold bg-black/60 px-1 rounded">
                  {index + 1}
                </div>

                {/* 장소 이름 */}
                <p className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/60 px-1 rounded">
                  {place.name}
                </p>

                {/* 하단 오른쪽에 길찾기 버튼 */}
                <div className="absolute bottom-6 right-2">
                  <button
                    onClick={() =>
                      window.open(
                        `https://map.kakao.com/link/to/${encodeURIComponent(
                          place.name
                        )},${place.latitude},${place.longitude}`
                      )
                    }
                    className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full"
                  >
                    <img src={vector} alt="길찾기" className="w-4 h-4 mb-1" />
                    <span className="text-[10px] font-bold">길찾기</span>
                  </button>
                </div>
              </div>

              {/* 예상 비용 및 소요 시간 */}
              <div className="p-4">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-600">1인 예상 비용</p>
                  <p className="font-bold">{place.estimatedCost}원</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-600">소요 시간</p>
                  <p className="font-bold">
                    {Math.floor(place.durationMinutes / 60) > 0 &&
                      `${Math.floor(place.durationMinutes / 60)}시간`}
                    {place.durationMinutes % 60 > 0 &&
                      `${place.durationMinutes % 60}분`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadComponent;
