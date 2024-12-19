import React from "react";

import BasicLayout from "../../../common/layout/BasicLayout";
import MapSection from "../components/map/MapSection";
import CourseSection from "../components/map/CourseSection";

const Detail = () => {
  return (
    <BasicLayout >
      <MapSection />
      <CourseSection />
    </BasicLayout>
  );
};

export default Detail;
