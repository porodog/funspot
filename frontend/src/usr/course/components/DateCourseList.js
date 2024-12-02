import React, { useState } from "react";
import axios from "axios";

function DateCourseList() {
    const [location, setLocation] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [course, setCourse] = useState([]);

    const fetchCourses = () => {
        axios.get(`/api/usr/course/datecourses?location=${location}&ageGroup=${ageGroup}`)
            .then(response => setCourse(response.data))
            .catch(error => console.error('Error data:', error));
    };

    return (
        <div>
            <h1>데이트 코스 추천</h1>
            <div>
                <input type="text" placeholder="지역" value={location} onChange={e => setLocation(e.target.value)} />
                <select value={ageGroup} onChange={e => setAgeGroup(parseInt(e.target.value))}>
                    <option value="" disabled>연령대</option>
                    <option value={10}>10대</option>
                    <option value={20}>20대</option>
                    <option value={30}>30대</option>
                    <option value={40}>40대</option>
                </select>
                <button onClick={fetchCourses}>검색</button>
            </div>
            <ul>
                {course.map(course => (
                    <li key={course.id}>{course.name} - {course.location}</li>
                ))}
            </ul>
        </div>
    );
}

export default DateCourseList;
