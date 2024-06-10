import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from 'react';

const CourseLandingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Course Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Course Subtitle</label>
        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Course Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Submit for Review
      </button>
    </form>
  );
};




const IntendedLearnersForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    objectives: ['', '', '', ''],
    requirements: '',
    courseFor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    setFormData({ ...formData, objectives: newObjectives });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formData.objectives.map((objective, index) => (
        <div key={index}>
          <label className="block mb-1">Objective {index + 1}</label>
          <input
            type="text"
            name={`objective${index}`}
            value={objective}
            onChange={(e) => handleObjectiveChange(index, e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      ))}
      <div>
        <label className="block mb-1">Requirements</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        ></textarea>
      </div>
      <div>
        <label className="block mb-1">Who is this course for?</label>
        <input
          type="text"
          name="courseFor"
          value={formData.courseFor}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Submit for Review
      </button>
    </form>
  );
};


const CurriculumForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        sections: [{ title: "", lectures: [{ title: "" }] }],
    });

    const handleSectionChange = (index, value) => {
        const newSections = [...formData.sections];
        newSections[index].title = value;
        setFormData({ ...formData, sections: newSections });
    };

    const handleLectureChange = (sectionIndex, lectureIndex, value) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].lectures[lectureIndex].title = value;
        setFormData({ ...formData, sections: newSections });
    };

    const handleAddLecture = (sectionIndex) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].lectures.push({ title: "" });
        setFormData({ ...formData, sections: newSections });
    };

    const handleAddSection = () => {
        setFormData({
            ...formData,
            sections: [
                ...formData.sections,
                { title: "", lectures: [{ title: "" }] },
            ],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {formData.sections.map((section, sectionIndex) => (
                <div
                    key={sectionIndex}
                    className="border p-4 rounded space-y-4"
                >
                    <div>
                        <label className="block mb-1">Section Title</label>
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) =>
                                handleSectionChange(
                                    sectionIndex,
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    {section.lectures.map((lecture, lectureIndex) => (
                        <div key={lectureIndex}>
                            <label className="block mb-1">Lecture Title</label>
                            <input
                                type="text"
                                value={lecture.title}
                                onChange={(e) =>
                                    handleLectureChange(
                                        sectionIndex,
                                        lectureIndex,
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                    ))}
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
            <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded"
            >
                Submit for Review
            </button>
        </form>
    );
};

export default function EditCourse({ auth }) {
    const [currentForm, setCurrentForm] = useState("intendedLearners");

    const handleFormSubmit = (formData) => { };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="instructor" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                        </div>

                        <div className="w-3/4 p-4">
                            {currentForm === "intendedLearners" && (
                                <IntendedLearnersForm
                                    onSubmit={handleFormSubmit}
                                />
                            )}
                            {currentForm === "curriculum" && (
                                <CurriculumForm onSubmit={handleFormSubmit} />
                            )}
                            {currentForm === "courseLanding" && (
                                <CourseLandingForm
                                    onSubmit={handleFormSubmit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
