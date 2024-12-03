import React, { useState } from 'react';
import FixedCourseList from './FixedCourseList';
import AddFixedCourseForm from './AddFixedCourseForm';

function FixedDateCourseList() {
    const [fixedCourses, setFixedCourses] = useState([]);

    const handleCourseAdded = (newCourse) => {
        setFixedCourses([...fixedCourses, newCourse]);
    };

    return (
        <div>
            <FixedCourseList fixedCourses={fixedCourses} />
            <AddFixedCourseForm onCourseAdded={handleCourseAdded} />
        </div>
    );
}

export default FixedDateCourseList;
