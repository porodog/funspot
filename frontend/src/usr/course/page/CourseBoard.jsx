// 코스 목록 페이지
import React, { useEffect, useState } from 'react';

function CourseBoard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/usr/datecourses')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map(course => (
        <div key={course.id} className="p-4 border rounded-lg shadow">
          <img src={course.imageUrl} alt={course.name} className="mb-2 rounded" />
          <h3 className="font-bold">{course.name}</h3>
          <p>{course.description}</p>
          <p className="text-sm text-gray-500">{course.place?.location}</p>
        </div>
      ))}
    </div>
  );
}

export default CourseBoard;
