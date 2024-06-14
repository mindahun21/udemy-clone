import Accordian from "@/Components/Accordian";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useState } from 'react'; 
import StarRatings from "react-star-ratings";

export default function CoursePage({auth, flash}) {
    const { course } = usePage().props;
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

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

   console.log(auth.user.cart_courses);
   console.log(auth.user.enrolled_courses);
   const handleAddToCart = () => {
       router.post(
           /course/addtocart/${course.id},
           { course_id: course.id },
           {
               onSuccess: (page) => {
                   setIsInCart(true);   
                   setMessage(flash.message);
                   setError(null);
               },
               onError: (errors) => {
                   setError(flash.errors.course_id);
                   setMessage(null);
               },
           }
       );

   };

   const handleEnroll = () => {
       setIsInEnrolled(true);
       router.post(
           /course/enroll/${course.id},
           { course_id: course.id },
           {
               onSuccess: (page) => {
                   setIsInEnrolled(true);
               },
               onError: (errors) => {
                   //handle errors
               }
           }
       );
   };
  
  return (
      <AuthenticatedLayout user={auth.user}>
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
                      <div className="absolute top-5 right-0 z-50 bg-white">
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
                                  {isInCart  isInEnrolled 
                                    <PrimaryButton
                                        className={
                                            "bg-purple-600 hover:bg-purple-500"
                                        }
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </PrimaryButton>
                                  
                                  }
                                  {
                                      isInEnrolled ? (
                                          <span className="bg-green-400 px-5 py-2 rounded-md">you are enrolled</span>
                                      ) : (
                                        <PrimaryButton
                                            className="bg-gray-400 hover:bg-slate-500"
                                            onClick={handleEnroll}
                                            >
                                            {" "}
                                            Enroll Now
                                        </PrimaryButton>
                                      )

                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex px-96">
                  <div className="w-2/3 flex flex-col py-6">
                      <Accordian sections={course.sections} />
                  </div>
              </div>
              <div className={" p-5" ${message || error?'opacity-100': 'opacity-0' } ${error?'bg-red-700':'bg-gray-900'}}>
                  {message ? (
                      <p>{ message}</p>
                  ) : (
                          <p>{error}</p>
                  )}
              </div>
          </div>
      </AuthenticatedLayout>
  );
}
