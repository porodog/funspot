import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SliderComponent from "./SliderComponent";
import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const RecommendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/usr/course/datecourses");
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setCourses([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 font-bold">
      <span className="text-xl font-bold mb-4 text-custom-cyan">Fun </span>
      <span className="text-base pr-1">추천코스</span>
      <Link to="/datecourses" className="text-xl text-gray-400">
        <span className="bg-gray-200 rounded-3xl pl-2 pr-2 pb-1">&gt;</span>
      </Link>
      <SliderComponent items={courses} />
    </div>
  );
};

export default RecommendedCourses;
