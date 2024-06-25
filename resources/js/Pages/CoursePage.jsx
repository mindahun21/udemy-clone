import Accordian from "@/Components/Accordian";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useState } from 'react'; 
import moment from "moment";
import StarRatings from "react-star-ratings";

export default function CoursePage({auth}) {
    const { course } = usePage().props;
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isExpandedObjective, setIsExpandedObjective] = useState(false);
    const [isExpandedRating, setIsExpandedRating] = useState(false);

   const [isInCart, setIsInCart] = useState(() => {
       return auth.user.cart_courses.some(
           (cartCourse) => cartCourse.id === course.id
       );
   });

   const [isInEnrolled, setIsInEnrolled] = useState(() => {
       return auth.user.enrolled_courses.some(
           (enrolledCourse) => enrolledCourse.id === course.id
       );
   });
    
    const handleLectureClick = (lecture) => {
        
    }

    const objectivesToShow = isExpandedObjective
        ? course.objectives
        : course.objectives.slice(0, 3);
    
    const ratingToShow = isExpandedRating ? course.rating : course.rating.slice(0,3); 
    
    const avgRating = () => {
        if (course.rating.length > 0) {
            const totalRating = course.rating.reduce(
                (sum, rating) => sum + rating.rating,
                0
            );
            return totalRating / course.rating.length;
        } else {
            return 0;
        }
    };

    const handleAddToCart = () => {
        router.post(`/course/addtocart/${course.id}`, { course_id: course.id });
        setIsInCart(true);
    }

    const handleEnroll = () => { 
        router.post(`/course/enroll/${course.id}`, { course_id: course.id });
        setIsInEnrolled(true);
        setIsInCart(true);
    }


    console.log(auth.user.cart_courses);
  
  return (
      <AuthenticatedLayout auth={auth}>
          <Head title="course" />

          <div className="flex flex-col">
              <div className="bg-gray-800 text-white px-96 flex ">
                  <div className="w-2/3 flex flex-col py-6">
                      <h1 className="text-3xl font-bold my-3">
                          {" "}
                          {course.title}
                      </h1>
                      <p> {course.short_desc} </p>
                      <div>
                          <span className="text-orange-500">
                              {" "}
                              {course.rating_avg_rating}{" "}
                          </span>
                          <StarRatings
                              rating={course.rating_avg_rating}
                              starRatedColor="gold"
                              starDimension="12px"
                              starSpacing="0px"
                          />
                          {"  "}
                          <span className="text-sm">
                              {" "}
                              ({course.rating.length} ratings),{" "}
                          </span>
                          <span> {course.students.length} students</span>
                      </div>
                      <p>
                          {" "}
                          Created By{" "}
                          <Link className="text-purple-600 underline">
                              {" "}
                              {course.creator.name}
                          </Link>
                      </p>
                  </div>
                  <div className="relative flex flex-col w-1/3 ">
                      <div className="absolute ms-20 top-5 right-0 z-50 bg-white">
                          <div>
                              <video className="w-full" controls>
                                  <source
                                      src="/course_previews/wellcome.mp4"
                                      type="video/mp4"
                                  />
                                  your browser does not support the video
                              </video>
                          </div>

                          <div className="m-5 flex flex-col">
                              <p className="ps-10 font-bold text-green-600 text-3xl">
                                  ${course.price}
                              </p>
                              <div className="flex justify-around">
                                  {!isInCart && (
                                      <button
                                          onClick={handleAddToCart}
                                          className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-md text-white"
                                      >
                                          Add to cart
                                      </button>
                                  )}
                                  {isInEnrolled ? (
                                      <span className="bg-green-400 px-5 py-2 rounded-md">
                                          you are enrolled
                                      </span>
                                  ) : (
                                      <button
                                          onClick={handleEnroll}
                                          className="bg-gray-400 hover:bg-slate-500 px-5 py-2 rounded-md text-white"
                                      >
                                          Enroll Now
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col px-96">
                  <div className="w-2/3 flex flex-col py-6">
                      <div
                          className={`border-2 border-gray-200 my-4 flex flex-col p-2 ${
                              course.objectives.length > 3 ? "shadow-inner" : ""
                          }`}
                      >
                          <p className="text-3xl font-bold pb-2">
                              what you will learn
                          </p>
                          {objectivesToShow.map((objective, i) => (
                              <p key={i} className="my-2">
                                  <span>&#10003;</span> {objective.text}
                              </p>
                          ))}
                          {course.objectives.length > 3 && (
                              <button
                                  className="text-purple-700 hover:bg-purple-100"
                                  onClick={() => {
                                      setIsExpandedObjective(
                                          !isExpandedObjective
                                      );
                                  }}
                              >
                                  {!isExpandedObjective
                                      ? "show More"
                                      : "show less"}
                              </button>
                          )}
                      </div>
                      <Accordian
                          sections={course.sections}
                          handleClick={handleLectureClick}
                      />
                      <div className="border-2 border-gray-200 my-4 flex flex-col p-2">
                          <p className="text-3xl font-bold pb-2">
                              Requirements
                          </p>
                          {course.requirements.map((objective, i) => (
                              <p key={i} className="my-2 ms-3">
                                  <span className="text-3xl font-extrabold">
                                      &#x2022;
                                  </span>{" "}
                                  {objective.text}
                              </p>
                          ))}
                      </div>
                      <div className="border-2 border-gray-200 my-4 flex flex-col p-2">
                          <p className="text-3xl font-bold pb-2">Description</p>
                          <p>{course.description}</p>
                      </div>
                      <div className="w-[600px] mt-10 flex flex-col gap-2">
                          <div className="flex flex-col mb-5 border-b-2 border-gray-200 p-4">
                              <p className="text-2xl">
                                  <span className="text-yellow-400 text-3xl font-extrabold me-5">
                                      {avgRating().toFixed(1)}
                                  </span>
                                  course rating
                                  <span className="text-3xl font-extrabold">
                                      {" "}
                                      &#x2022;
                                  </span>
                                  {course.rating.length} ratings
                              </p>
                              <StarRatings
                                  rating={avgRating()}
                                  starDimension="20px"
                                  starSpacing="0px"
                                  starRatedColor="gold"
                                  starEmptyColor="grey"
                              />
                          </div>
                          {ratingToShow.map((rating, i) => (
                              <div
                                  className="flex gap-10 items-start border-b-2 border-gray-200"
                                  key={i}
                              >
                                  <div className="flex items-center justify-center">
                                      <div className="bg-black text-white text-2xl font-extrabold rounded-full flex items-center justify-center w-16 h-16">
                                          <span>
                                              {rating.user.name.slice(0, 1)}
                                          </span>
                                      </div>
                                  </div>

                                  <div className="flex flex-col ">
                                      <p>{rating.user.name}</p>
                                      <div className="fle items-center">
                                          <StarRatings
                                              rating={rating.rating}
                                              starDimension="10px"
                                              starSpacing="0px"
                                              starRatedColor="gold"
                                              starEmptyColor="grey"
                                          />
                                          <span className="font-extralight text-[10px] ps-2">
                                              {moment(
                                                  rating.updated_at
                                              ).fromNow()}
                                          </span>
                                      </div>
                                      <p className="py-5 ">{rating.comment}</p>
                                  </div>
                              </div>
                          ))}
                          {course.rating.length > 3 && (
                              <button
                                  className="text-purple-700 hover:bg-purple-100"
                                  onClick={() => {
                                      setIsExpandedRating(
                                          !isExpandedRating
                                      );
                                  }}
                              >
                                  {!isExpandedRating
                                      ? "show More"
                                      : "show less"}
                              </button>
                          )}
                      </div>
                  </div>
              </div>
              <div
                  className={` p-5" ${
                      message || error ? "opacity-100" : "opacity-0"
                  } ${error ? "bg-red-700" : "bg-gray-900"}`}
              >
                  {message ? <p>{message}</p> : <p>{error}</p>}
              </div>
          </div>
      </AuthenticatedLayout>
  );
}
