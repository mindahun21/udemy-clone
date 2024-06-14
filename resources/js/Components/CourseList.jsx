import { router } from "@inertiajs/react";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const CourseList = ({courses }) => {

  return (
    <div className=" w-3/4 p-3">
      {courses.map((course, index) => (
        <CourseListItem key={index} course={course} />
      ))}
    </div>
  );
};

export const CourseListItem = ({ course, children }) => {
  let rating;
  if (course.rating.length > 0) {
    const totalRating = course.rating.reduce((sum, rating) => sum + rating.rating, 0);
    rating = totalRating / course.rating.length;
    
  } else {
    rating = 0;
  }

  const handleClick = (course) => {
      router.get(`/course/${course.id}`);
  };

  
  return (
      <div
          className="flex items-center mb-4 border-b border-gray-400 w-full"
          onClick={() => handleClick(course)}
      >
          <img
              src={course.image_path}
              alt="course image"
              className="w-40 h-28 mr-4 object-cover"
          />
          <div className="flex-1 flex justify-between mr-4 w-full">
              <div className="flex flex-col">
                  <div className="font-bold text-md text-wrap">
                      {course.title}
                  </div>
                  <p className="text-sm text-gray-900">{course.short_desc}</p>
                  <div className="text-sm text-gray-400">
                      {" "}
                      {course.creator.name}
                  </div>
                  <div className="flex mr-4 text-gray-600">
                      <span className="text-bold me-3 text-orange-600">
                          {rating}{" "}
                      </span>
                      <StarRatings
                          rating={rating}
                          starRatedColor="gold"
                          starDimension="12px"
                          starSpacing="0px"
                      />
                      <span>({course.rating.length})</span>
                  </div>
              </div>
      </div>
      <div className="flex flex-col">
          <p className="font-bold text-3xl text-green-600"> ${course.price}</p>
          {children}
      </div>
      </div>
  );
};

export default CourseList;
