import BasicLayout from "../../../common/layout/BasicLayout";
import DateCourseList from "../components/DateCourseList";
import FixedDateCourseList from "../components/FixedDateCourseList";

const CourseListPage = () => {
    return (
        <BasicLayout>
            <div id="course-page">
                데이트 코스 조회
                <DateCourseList />
                <FixedDateCourseList />
            </div>
        </BasicLayout>
    );
};

export default CourseListPage;