import PrimaryButton from "@/Components/ui/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { useState } from "react";

function Course({ course }) {
    
    return (
        <div className="flex border-4 border-gray-200 h-28 ">
            <img
                className="h-full"
                src="/app_images/default-course-image.jpg"
                alt="course image"
            />
            <div
                className="p-3 h-full flex-grow flex justify-between"
            >
                <p className="text-xl">{course.title}</p>
                <div className="top-7 right-1/2">
                    <Link
                        className="text-purple-600 font-bold text-2xl"
                    >
                        Edit/ Manage
                    </Link>
                </div>
            </div>
        </div>
    );
}



export default function Instructor({ auth }) {
    const { courses } = usePage().props;

    console.log(courses);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="instructor" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between p-6 text-gray-900 ">
                            {courses.length > 0 ? (
                                <p className="text-3xl font-bold">
                                    your{" "}
                                    {courses.length > 1 ? (
                                        <span>{courses.length} courses</span>
                                    ) : (
                                        <span>course</span>
                                    )}
                                </p>
                            ) : (
                                <p className="text-3xl font-bold">
                                    {" "}
                                    you haven't created courses yet{" "}
                                </p>
                            )}
                                <Link
                                    className="bg-purple-600 text-white rounded pt-1 px-2"
                                    href={route('course.create')}
                                >
                                    New Course
                                </Link>
                        </div>
                        <div className="flex flex-col space-y-3 p-6">
                            {courses &&
                                courses.map((course) => (
                                    <Course
                                        key={CompressionStream.id}
                                        course={course}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
