import React from "react";
import { ReactComponent as HomeState } from "../icons/home-state.svg";
import { ReactComponent as LikeSpot } from "../icons/like-spots.svg";
import { ReactComponent as MakeCourse } from "../icons/make-course.svg";
import { ReactComponent as Feed } from "../icons/feed.svg";
import { ReactComponent as Board } from "../icons/Board.svg";
import { Link } from "react-router-dom";

const categories = [
  { name: "명소", img: <HomeState />, path: "/spot" },
  { name: "펀추천코스", img: <LikeSpot />, path: "/datecourses" },
  { name: "코스만들기", img: <MakeCourse />, path: "/custom" },
  { name: "피드", img: <Feed />, path: "/feed" },
  { name: "게시판", img: <Board />, path: "/board" },
];

const SideNavigationMenu = () => {
  return (
      <div className="fixed top-1/4 right-60 bg-gray-100 shadow-lg rounded-l-lg w-16 flex flex-col items-center py-4 space-y-4">
        {categories.map((category, index) => (
            <Link
                to={category.path}
                key={index}
                className="group flex flex-col items-center justify-center w-full text-gray-700 hover:bg-gray-200 p-2 rounded-md transition top-4"
            >
              <div className="w-30 h-6 justify-center mb-1">{category.img}</div>

              <p className="hidden group-hover:block text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded-md mt-2">
            {category.name}
          </p>
            </Link>
        ))}
      </div>
  );
};

export default SideNavigationMenu;
