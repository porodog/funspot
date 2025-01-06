// 추천 NAV 바
import React from "react";
import { ReactComponent as HomeState } from "../icons/home-state.svg";
import { ReactComponent as LikeSpot } from "../icons/like-spots.svg";
import { ReactComponent as MakeCourse } from "../icons/make-course.svg";
import { ReactComponent as Feed } from "../icons/feed.svg";
import { ReactComponent as Board } from "../icons/Board.svg";
import { Link } from "react-router-dom";

// Fun Menu
const categories = [
  // { name: "맛집", img: <FoodFork />, path: "/restaurant" },
  { name: "명소", img: <HomeState />, path: "/spot" },
  // { name: "숙소", img: <Pack />, path: "/accommodation" },
  { name: "펀추천코스", img: <LikeSpot />, path: "/datecourses" },
  { name: "코스만들기", img: <MakeCourse />, path: "/custom" },
  { name: "피드", img: <Feed />, path: "/feed" },
  { name: "게시판", img: <Board />, path: "/board" },
  //  { name: '마이페이지', img: <FoodFork />, path: '/mypage' },
];

const NavigationMenu = () => {
  return (
    <nav className="bg-gray-100 p-4 px-10 mt-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-center justify-center p-3 font-bold">
          <span className="text-custom-cyan font-bold">Fun </span>Menu
        </div>
        {categories.map((category, index) => (
          <Link
            to={category.path}
            key={index}
            className="text-center cursor-pointer"
          >
            {/* SVG 컴포넌트를 직접 렌더링 */}
            <div style={{ width: "100px", height: "32px" }}>
              {" "}
              {category.img}
              <div className="text-xs">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationMenu;
