import PrimaryButton from "@/Components/ui/PrimaryButton";
import { useCategories } from "@/Contexts/CategoyContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";


export default function CreateCourse({ auth }) {
    const categories = useCategories();
    const { data, setData, post, processing } = useForm({
        title: "",
        category_id: null,
    })
    const [errors, setErrors] = useState({});
    console.log(auth.user);

    const handleSubmit = (e) => { 
        e.preventDefault();
        setData('errors', {});
        if (!data.title) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                title: "Please enter a title",
            }));
            return;
        }

        if (!data.category_id) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                category_id: "Please select a category",
            }));
            return;
        }
        post("/instructor/course/create");
        
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="instructor" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 min-h-screen">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-16"
                        >
                            <div className="flex flex-col items-center w-full gap-3">
                                <label
                                    htmlFor="course-title"
                                    className="text-center font-semibold text-2xl font-serif"
                                >
                                    How About The Working Tilte
                                </label>
                                <p className="text-xs text-center">
                                    It's ok if you can't think of a good title
                                    now. You can change it later.
                                </p>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className="max-w-[450px] min-w-[450px]"
                                        placeholder="e.g learn php laravel from scratch"
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <span className="text-red-500 text-sm">
                                            {errors.title}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full gap-3">
                                <label
                                    htmlFor="course-title"
                                    className="text-center font-semibold text-2xl font-serif"
                                >
                                    What category best fits the knowledge you'll
                                    share?
                                </label>
                                <p className="text-xs text-center">
                                    If you're not sure about the right category,
                                    you can change it later.
                                </p>
                                <div className="flex flex-col">
                                    <select
                                        type="text"
                                        className="max-w-[450px] min-w-[450px]"
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        {categories.map((category, index) => (
                                            <option
                                                key={index}
                                                value={category.id}
                                            >
                                                {" "}
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <span className="text-red-500 text-sm">
                                            {errors.category_id}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <PrimaryButton
                                    type="submit"
                                    className="text-white bg-purple-500 hover:bg-purple-400"
                                    disabled={processing}
                                >
                                    create course
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}