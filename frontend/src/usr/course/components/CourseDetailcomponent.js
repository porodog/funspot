import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const CourseDetailComponent = ({ match }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/usr/datecourse/${match.params.id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourse();
  }, [match.params.id]);

  return (
    <div>
      {course && (
        <div>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <MapComponent course={course} />
          {/* 리뷰 컴포넌트 삽입 */}
        </div>
      )}
    </div>
  );
};

export default CourseDetailComponent;
