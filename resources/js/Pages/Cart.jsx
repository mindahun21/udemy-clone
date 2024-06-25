import CourseList, { CourseListItem } from "@/Components/CourseList";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Cart({ auth }) {
    const cart_courses = auth.user.cart_courses;
    const [isInEnrolled, setIsInEnrolled] = useState({});

    useEffect(() => {
        const initialIsInEnrolledState = cart_courses.reduce((acc, course) => {
            acc[course.id] = false;
            return acc;
        }, {});

        setIsInEnrolled(initialIsInEnrolledState);
    }, [cart_courses]);


    const totalCost = cart_courses.reduce((a, b) => a + b.price, 0);
    const handleEnroll = (course) => {
        setIsInEnrolled((prevState) => ({
            ...prevState,
            [course.id]: true,
        }));
        router.post(
            `/course/enroll/${course.id}`,
            { course_id: course.id },
            {
                onSuccess: (page) => {
                    setIsInEnrolled(true);
                },
                onError: (errors) => {
                    //handle errors
                },
            }
        );
    };

    const handleCheckoutAll = () => { 
        router.post('/course/enroll-all');
    }

    console.log(cart_courses);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="shoping-cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col p-6 text-gray-900">
                            <div className="flex justify-between mb-5">
                                {cart_courses.length > 0 ? (
                                    <p className="text-2xl font-bold">
                                        Courses in your cart
                                    </p>
                                ) : (
                                    <p className="text-2xl font-bold">
                                        No Courses in your cart
                                    </p>
                                )}
                            </div>
                            <div className="flex">
                                <div className=" w-3/4 p-3">
                                    {cart_courses.map((course, index) => (
                                        <CourseListItem
                                            key={index}
                                            course={course}
                                        >
                                            {!isInEnrolled[course.id] && (
                                                <PrimaryButton
                                                    className="bg-purple-400 hover:bg-purple-500 z-10"
                                                    onClick={() =>
                                                        handleEnroll(course)
                                                    }
                                                >
                                                    {" "}
                                                    check out
                                                </PrimaryButton>
                                            )}
                                        </CourseListItem>
                                    ))}
                                </div>
                                {cart_courses.length > 0 && (
                                    <div className="flex flex-col w-1/4 items-end">
                                        <PrimaryButton
                                            className="bg-purple-600 hover:bg-purple-500"
                                            onClick={handleCheckoutAll}
                                        >
                                            check out all
                                        </PrimaryButton>
                                        <div className="mt-2">
                                            <p className="text-2xl">
                                                {" "}
                                                Total cost{" "}
                                                <span className="text-3xl font-bold text-green-700">
                                                    ${totalCost}
                                                </span>{" "}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
