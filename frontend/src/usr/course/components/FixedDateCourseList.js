import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FixedDateCourseList() {
    const [fixedCourses, setFixedCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', location: '' });

    useEffect(() => {
        fetchFixedCourses();
    }, []);

    const fetchFixedCourses = () => {
        axios.get('api/usr/course/datecourses/fixed')
            .then(response => setFixedCourses(response.data))
            .catch(error => console.error('Error data: ', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({
            ...newCourse,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('api/usr/course/datecourses/fixed', newCourse)
            .then(response => {
                setFixedCourses([...fixedCourses, response.data]);
                setNewCourse({ name: '', location: '' });
            })
            .catch(error => console.error('Error saving data: ', error));
    };

    return (
        <div>
            <h1>고정 데이트 코스</h1>
            <ul>
                {fixedCourses.map(course => (
                    <li key={course.id}>{course.name} - {course.location}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    placeholder="코스 이름"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={newCourse.location}
                    onChange={handleInputChange}
                    placeholder="위치"
                    required
                />
                <button type="submit">코스 추가</button>
            </form>
        </div>
    );
}

export default FixedDateCourseList;
