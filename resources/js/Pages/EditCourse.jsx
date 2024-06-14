import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from 'react';

const CourseLandingForm = ({data, setData}) => {


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => ({
                ...prevData,
                image: file,
                image_path: URL.createObjectURL(file),
            }))
        }
    }
    
    const handleVideoChange = (e) => {
        const videoFile = e.target.files[0];
        if (videoFile) { 
            setData((prevData) => ({
                ...prevData,
                prev_video: videoFile,
                preview_path: URL.createObjectURL(videoFile),
            }))
        }
    }


  return (
      <div className="space-y-4">
          <div className="p-6 text-2xl border-b-2 border-gray-300">
              <p>Intended Learners</p>
          </div>
          <div>
              <label className="block mb-1">Course Title</label>
              <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
              />
          </div>
          <div>
              <label className="block mb-1">Course Subtitle</label>
              <input
                  type="text"
                  name="short_desc"
                  value={data.short_desc}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
              />
          </div>
          <div>
              <label className="block mb-1">Course Description</label>
              <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
              ></textarea>
          </div>
          <div>
              <p className="text-xl p-3">Course Image</p>
              <div className="flex h-48 gap-4   ">
                  <img
                      className="h-full"
                      src={
                          data.image_path ||
                          "/app_images/default-course-image.jpg"
                      }
                      alt="course image"
                  />
                  <div className="flex flex-col gap-5">
                      <p>
                          Upload your course image here. It must meet our course
                          image quality standards to be accepted. Important
                          guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or
                          .png. no text on the image.
                      </p>
                      <input
                          type="file"
                          accept=".jpg,.jpeg,.gif,.png"
                          onChange={handleImageChange}
                          className="mr-2 border border-purple-400 bg-gray-100"
                      />
                  </div>
              </div>
          </div>
          <div>
              <p className="text-xl p-3">Promotional video</p>
              <div className="flex h-48 gap-4   ">
                  {data.preview_path ? (
                      <div className="h-full">
                          <video className="h-full" controls>
                              <source
                                  src={data.preview_path}
                                  type="video/mp4"
                              />
                              your browser does not support the video
                          </video>
                      </div>
                  ) : (
                      <img
                          className="h-full"
                          src="/app_images/default-course-image.jpg"
                          alt="course image"
                      />
                  )}
                  <div className="flex flex-col gap-5">
                      <p>
                          Your promo video is a quick and compelling way for
                          students to preview what they’ll learn in your course.
                          Students considering your course are more likely to
                          enroll if your promo video is well-made
                      </p>
                      <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="mr-2 border border-purple-400 bg-gray-100"
                      />
                  </div>
              </div>
          </div>
          <div className="m-3 flex border-t-2 border-gray-300 p-5">
              <label className="text-2xl text-green-500">price: $</label>
              <input
                  value={data.price}
                  type="number"
                  onChange={(e) => setData("price", e.target.value)}
                  className="border border-gray-400 ms-2 focus:border-purple-400"
              />
          </div>
      </div>
  );
};




const IntendedLearnersForm = ({ data, addItem, updateItem }) => {


    return (
        <div>
            <div className="p-6 text-2xl border-b-2 border-gray-300">
                <p>Intended Learners</p>
            </div>
            <div className="space-y-6 p-6">
                <div>
                    <p className="text-sm">
                        The following descriptions will be publicly visible on
                        your Course Landing Page and will have a direct impact
                        on your course performance. These descriptions will help
                        learners decide if your course is right for them.
                    </p>
                </div>
                <div>
                    <div className="mb-4">
                        <h2 className="text-2xl">
                            What will students learn in your course?
                        </h2>
                        <p className="text-sm">
                            {" "}
                            learning objectives or outcomes that learners can
                            expect to achieve after completing your course.
                        </p>
                    </div>

                    {data.objectives.map((obj, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={obj.text}
                                className="border border-gray-400 rounded-sm w-3/4 m-2 focus:border-purple-500"
                                onChange={(e) =>
                                    updateItem(
                                        "objectives",
                                        index,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-purple-500 text-xl hover:bg-purple-300 p-2"
                        onClick={() => addItem("objectives")}
                    >
                        + Add more to your response
                    </button>
                </div>
                <div>
                    <div className="mb-4">
                        <h2 className="text-2xl">
                            What are the requirements or prerequisites for
                            taking your course?
                        </h2>
                        <p className="text-sm">
                            {" "}
                            List the required skills, experience, tools or
                            equipment learners should have prior to taking your
                            course. If there are no requirements, use this space
                            as an opportunity to lower the barrier for
                            beginners.
                        </p>
                    </div>
                    {data.requirements.map((requirement, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={requirement.text}
                                className="border border-gray-400 rounded-sm w-3/4 m-2 focus:border-purple-500"
                                onChange={(e) =>
                                    updateItem(
                                        "requirements",
                                        index,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-purple-500 text-xl hover:bg-purple-300 p-2"
                        onClick={() => addItem("requirements")}
                    >
                        + Add more to your response
                    </button>
                </div>
                <div>
                    <div className="mb-4">
                        <h2 className="text-2xl">Who is this course for?</h2>
                        <p className="text-sm">
                            {" "}
                            Write a clear description of the intended learners
                            for your course who will find your course content
                            valuable. This will help you attract the right
                            learners to your course.
                        </p>
                    </div>
                    {data.courseFor.map((cFor, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={cFor.text}
                                className="border border-gray-400 rounded-sm w-3/4 m-2 focus:border-purple-500"
                                onChange={(e) =>
                                    updateItem(
                                        "courseFor",
                                        index,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-purple-500 text-xl hover:bg-purple-300 p-2"
                        onClick={() => addItem("courseFor")}
                    >
                        + Add more to your response
                    </button>
                </div>
            </div>
        </div>
    );
};


const CurriculumForm = ({ data, setData }) => {


    const handleAddSection = () => {
        setData({
            ...data,
            sections: [
                ...data.sections,
                {
                    id: null,
                    title: "",
                    lectures: [],
                },
            ],
        });
    };

    const handleAddLecture = (sectionIndex) => {
        const updatedSections = [...data.sections];
        updatedSections[sectionIndex].lectures.push({
            id: null,
            title: "",
            type: null,
            file: null,
        });
        setData({ ...data, sections: updatedSections });
    };

    const handleSectionTitleChange = (sectionIndex, value) => {
        const updatedSections = [...data.sections];
        updatedSections[sectionIndex].title = value;
        setData({ ...data, sections: updatedSections });
    };

    const handleLectureTitleChange = (sectionIndex, lectureIndex, value) => {
        const updatedSections = [...data.sections];
        updatedSections[sectionIndex].lectures[lectureIndex].title = value;
        setData({ ...data, sections: updatedSections });
    };

    const handleLectureTypeChange = (sectionIndex, lectureIndex, type) => {
        const updatedSections = [...data.sections];
        console.log(updatedSections);
        console.log(sectionIndex);
        updatedSections[sectionIndex].lectures[lectureIndex].type = type;
        setData({ ...data, sections: updatedSections });
    }

    const handleFileChange = (sectionIndex, lectureIndex, file) => {
        const updatedSections = [...data.sections];
        updatedSections[sectionIndex].lectures[lectureIndex].file = file;
        setData({ ...data, sections: updatedSections });
    };

    return (
        <div className="flex flex-col gap-10 mx-5 ">
            <div className="p-6 text-2xl border-b-2 border-gray-300">
                <p>Carriculum</p>
            </div>
            {data.sections.map((section, sectionIndex) => (
                <div
                    key={sectionIndex}
                    className="border border-gray-400 p-4 space-y-4 bg-gray-100"
                >
                    <div className="flex gap-2">
                        <label className="block mb-1 text-xl w-52">
                            Section {sectionIndex + 1}
                            {" title "}:
                        </label>
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) =>
                                handleSectionTitleChange(
                                    sectionIndex,
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>Lectures</div>
                    <div className="flex flex-col gap-5">
                        {section.lectures.map((lecture, lectureIndex) => (
                            <div
                                key={lectureIndex}
                                className="bg-white p-4 space-y-4"
                            >
                                <div className="text-xl mb-6">
                                    {" "}
                                    Lecture {lectureIndex + 1}:{" "}
                                </div>
                                <div className="flex gap-2">
                                    <label className="block mb-1 text-xl w-20">
                                        title:
                                    </label>
                                    <input
                                        type="text"
                                        value={lecture.title}
                                        onChange={(e) =>
                                            handleLectureTitleChange(
                                                sectionIndex,
                                                lectureIndex,
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                {lecture.type ? (
                                    <div className="flex flex-col">
                                        <p className="text-300 mb-4">
                                            Lecture Type{" "}
                                            <span className="bg-red-400 px-1 rounded-sm">
                                                {lecture.type}
                                            </span>
                                        </p>
                                        <input
                                            type="file"
                                            accept={
                                                lecture.type === "video"
                                                    ? "video/*"
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handleFileChange(
                                                    sectionIndex,
                                                    lectureIndex,
                                                    e.target.files[0]
                                                )
                                            }
                                            className="mr-2 border border-purple-400 bg-gray-100"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="lecture-type">
                                            Lecture Type:{" "}
                                        </label>
                                        <select
                                            id="lecture-type"
                                            value={lecture.type}
                                            onChange={(e) =>
                                                handleLectureTypeChange(
                                                    sectionIndex,
                                                    lectureIndex,
                                                    e.target.value
                                                )
                                            }
                                            className="px-4 border rounded mr-2 w-80"
                                        >
                                            <option value="">
                                                Select Type
                                            </option>
                                            <option value="video">Video</option>
                                            <option value="document">
                                                Document
                                            </option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleAddLecture(sectionIndex)}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Add Lecture
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddSection}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Add Section
            </button>
        </div>
    );
};

export default function EditCourse({ auth }) {
    const { course } = usePage().props;
    console.log(course);

    const [currentForm, setCurrentForm] = useState("intendedLearners");
    const { data, setData, post, processing, errors } = useForm({
        title: course.title || "",
        short_desc: course.short_desc || "",
        description: course.description || "",
        image: null,
        image_path: course.image_path || null,
        preview_path: course.preview_path || null,
        prev_video: null,
        price: course.price || 0,
        objectives: course.objectives.map((obj) => ({
            id: obj.id,
            text: obj.text,
        })) || [{ id: null, text: "" }],
        requirements: course.requirements.map((req) => ({
            id: req.id,
            text: req.text,
        })) || [{ id: null, text: "" }],
        courseFor: course.course_for.map((cfor) => ({
            id: cfor.id,
            text: cfor.text,
        })) || [{ id: null, text: "" }],
        sections: course.sections.map((section) => ({
            id: section.id || "",
            title: section.title || "",
            lectures: section.lectures.map((lecture) => ({
                id: lecture.id || null,
                title: lecture.title || "",
                type: lecture.type || "",
                file: null,
            })),
        })),
    });


    const addItem = (field) => {
        setData(field, [...data[field], { id: null, text: "" }]);
    };

    const updateItem = (field, index, value) => {
        const updatedItems = [...data[field]];
        updatedItems[index].text = value;
        setData(field, updatedItems);
    };

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("course.update", { id: course.id }));
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="instructor" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        method="post"
                    >
                    <div className="flex bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 min-h-screen">
                        <div className="w-1/4 p-4 border-r">
                            <div className="mb-4">
                                <input
                                    type="radio"
                                    id="intendedLearners"
                                    name="form"
                                    value="intendedLearners"
                                    checked={currentForm === "intendedLearners"}
                                    onChange={() =>
                                        setCurrentForm("intendedLearners")
                                    }
                                    className="mr-2 accent-purple-500"
                                />
                                <label htmlFor="intendedLearners">
                                    Intended Learners
                                </label>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="radio"
                                    id="curriculum"
                                    name="form"
                                    value="curriculum"
                                    checked={currentForm === "curriculum"}
                                    onChange={() =>
                                        setCurrentForm("curriculum")
                                    }
                                    className="mr-2"
                                />
                                <label htmlFor="curriculum">Curriculum</label>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="radio"
                                    id="courseLanding"
                                    name="form"
                                    value="courseLanding"
                                    checked={currentForm === "courseLanding"}
                                    onChange={() =>
                                        setCurrentForm("courseLanding")
                                    }
                                    className="mr-2"
                                />
                                <label htmlFor="courseLanding">
                                    Course Landing Page
                                </label>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded"
                                >
                                    Submit for Review
                                </button>
                            </div>
                        </div>

                        <div className="w-3/4 p-4">
                                {currentForm === "intendedLearners" && (
                                    <IntendedLearnersForm
                                        data={data}
                                        addItem={addItem}
                                        updateItem={updateItem}
                                    />
                                )}
                                {currentForm === "curriculum" && (
                                    <CurriculumForm
                                        data={data}
                                        setData={setData}
                                    />
                                )}
                                {currentForm === "courseLanding" && (
                                    <CourseLandingForm
                                        data={data}
                                        setData={setData}
                                    />
                                )}
                        </div>
                    </div>
                        </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
