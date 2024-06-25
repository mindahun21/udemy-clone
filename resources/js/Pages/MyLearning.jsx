import { CourseListItem } from "@/Components/CourseList";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";


export default function MyLearning({ auth }) {
    const enrolled_courses = auth.user.enrolled_courses;
    
    const handleStartLearn = (course) => {
        router.get(`/course/learn/${course.id}`);
    }

    console.log(auth.user);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="shoping-cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col p-6 text-gray-900">
                            <div className="flex justify-between mb-5">
                                {enrolled_courses.length > 0 ? (
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
                                    {enrolled_courses.map((course, index) => (
                                        <CourseListItem
                                            key={index}
                                            course={course}
                                        >
                                            <PrimaryButton
                                                className="bg-purple-400 hover:bg-purple-500"
                                                onClick={() =>handleStartLearn(course)}
                                            >
                                                {" "}
                                                start learning
                                            </PrimaryButton>
                                        </CourseListItem>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
