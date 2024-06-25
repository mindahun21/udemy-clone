import Accordian from "@/Components/Accordian";
import Footer from "@/Components/ui/Footer";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";
import ApplicationLogo from "@/Components/ui/ApplicationLogo";

export default function Learn({ auth }) {
    const { course } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        comment: "",
        rating: 0,
        id:null,
    });
    const [path, setPath] = useState("");
    const [open, setOpen] = useState("Overview");
    const videoRef = useRef("");
    const [isExpandedRating, setIsExpandedRating] = useState(false);
    const [openRating, setOpenRating] = useState(false);
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {
        if (auth.user) {
            const ratingObj = course.rating.find((rating) => rating.user.id === auth.user.id);
            if (ratingObj) {
                setIsRated(true);
                setData({comment:ratingObj.comment, rating: ratingObj.rating,id:ratingObj.id});
            } else {
                setIsRated(false);
                
            }

        }
    }, [course]);

    const handleRatingChange = (value) => {
        setData({...data, rating: value});
    }
    

    const ratingToShow = isExpandedRating
        ? course.rating
        : course.rating.slice(0, 3); 
    


    useEffect(() => {
        console.log("Course Preview Path:", course.preview_path);

        const previewPath = course.preview_path.startsWith("/")
            ? course.preview_path
            : `/${course.preview_path}`;
        setPath(previewPath);
    }, [course]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0.7;
            videoRef.current.pause();
        }
    }, [path]);

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
    
    const handleLectureClick = (lecture) => {
        const path = lecture.path.startsWith("/")
            ? lecture.path
            : `/${lecture.path}`;
        setPath(path);
    }

    const handleRatingSubmit = () => {
        post(`/course/${course.id}/rate`);
        setOpenRating(false);
    }

    console.log(course);
    
    return (
        <>
            <nav className="flex bg-slate-500 border-b-2 h-14 border-gray-300">
                <Link
                    href="/"
                    className="h-full flex-shrink-0 bg-slate-300 hover:bg-slate-400 px-2 pt-2"
                >
                    <ApplicationLogo />
                </Link>
            </nav>
            <div className="flex gap-3">
                <Head title="learn" />

                <div className="flex flex-col w-2/3 h-[839px] overflow-y-auto">
                    <video
                        ref={videoRef}
                        className="w-full max-h-[700px] m-2"
                        controls
                        key={path}
                    >
                        <source src={path} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="flex justify-start h-10 w-full border-b border-gray-400 px-5 mt-5">
                        <Button
                            text={"Overview"}
                            open={open}
                            setOpen={setOpen}
                        />
                        <Button
                            text={"Reviews"}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                    <div className="">
                        <Tab open={open} tab="Overview">
                            <h1 className="my-3">{course.title}</h1>
                            <div className="flex justify-start gap-20 border-b border-gray-400 pb-10">
                                <div className="flex flex-col items-center">
                                    <div className="text-xl font-bold">
                                        <span className="me-2">
                                            {avgRating().toFixed(1)}
                                        </span>
                                        <StarRatings
                                            rating={avgRating()}
                                            starDimension="15px"
                                            starSpacing="0px"
                                            starRatedColor="gold"
                                            starEmptyColor="grey"
                                        />
                                    </div>
                                    <p>{course.rating.length} ratings</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-xl font-bold">
                                        <span className="me-2">
                                            {course.students.length}
                                        </span>
                                    </p>
                                    <p>students</p>
                                </div>
                            </div>
                            <div className="flex justify-start gap-20 border-b border-gray-400 pb-10">
                                <span>Description</span>
                                <p>{course.description}</p>
                            </div>
                        </Tab>
                        <Tab open={open} tab="Reviews">
                            <div className="w-[600px] m-auto flex flex-col gap-2">
                                <p className="text-xl font-bold">
                                    Students feedback
                                </p>
                                <RatingPercentage course={course} />
                                <p className="text-xl font-bold mt-5 border-b-2 border-gray-200">
                                    Reviews
                                </p>
                                <div className="my-4 pb-2 border-b-2 border-gray-200">
                                    {openRating ? (
                                        <form className="flex flex-col">
                                            <textarea
                                                type="text"
                                                value={data.comment}
                                                onChange={(e) =>
                                                    setData({
                                                        ...data,
                                                        comment: e.target.value,
                                                    })
                                                }
                                                placeholder="right your comment hear ..."
                                                rows={5}
                                                className="border border-purple-500 focus:border-purple-500 rounded-md resize-none"
                                            />
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="text-2xl mt-3">
                                                        rating
                                                    </p>
                                                    <RatingStars
                                                        value={data.rating}
                                                        onChange={
                                                            handleRatingChange
                                                        }
                                                    />
                                                </div>
                                                <div className="mt-10">
                                                    <button
                                                        onClick={handleRatingSubmit}
                                                        className="bg-slate-950 text-white py-2 px-5 rounded-md hover:bg-slate-600"
                                                    >
                                                        submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setOpenRating(!openRating)
                                            }
                                            className="bg-slate-950 text-white py-2 px-5 rounded-md hover:bg-slate-600 w-full"
                                        >
                                            {isRated
                                                ? "edit your rating"
                                                : "rate this course"}
                                        </button>
                                    )}
                                </div>
                                {ratingToShow.map((rating, i) => (
                                    <div
                                        className="flex gap-10 items-start border-b-2 border-gray-200"
                                        key={i}
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="bg-black text-white text-2xl font-extrabold rounded-full flex items-center justify-center w-16 h-16">
                                                <span>
                                                    {rating.user.name.slice(
                                                        0,
                                                        1
                                                    )}
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
                                            <p className="py-5 ">
                                                {rating.comment}
                                            </p>
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
                        </Tab>
                    </div>
                    <Footer />
                </div>
                <div className="flex flex-col w-1/3 overflow-y-auto">
                    <p className="text-3xl font-bold bg-slate-200 px-10 py-2 border-b-4 border-gray-400">
                        lectures
                    </p>
                    <Accordian
                        sections={course.sections}
                        handleClick={handleLectureClick}
                    />
                </div>
            </div>
        </>
    );
}

function RatingPercentage({ course }) {
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

    const ratingCount = [];

    for (let i = 1; i <= 5; i++) {
        const starCount = course.rating.filter(
            (rating) => rating.rating === i
        ).length;
        ratingCount.push(starCount);
    }
    return (
        <div className="flex gap-10 w-full">
            <div className="flex flex-col text-yellow-400">
                <div className="text-[50px] font-extrabold p-0 m-0">
                    {avgRating().toFixed(1)}
                </div>
                <StarRatings
                    rating={avgRating()}
                    starDimension="10px"
                    starSpacing="0px"
                    starRatedColor="gold"
                    starEmptyColor="grey"
                />
                <p className="text-yellow-400">course rating</p>
            </div>
            <div className="flex flex-col flex-1 ">
                {ratingCount.map((rating, i) => (
                    <div className="flex gap-2 items-center" key={i}>
                        <ProgressBar
                            progress={(rating / course.rating.length) * 100}
                        />
                        <StarRatings
                            rating={i + 1}
                            starDimension="10px"
                            starSpacing="0px"
                            starRatedColor="gold"
                            starEmptyColor="grey"
                        />
                        <span>{((rating / course.rating.length) * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProgressBar({ progress }) {
    return (
        <div className="w-2/3 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div
                className="bg-gray-500 h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}

function Button({ text, open, setOpen }) {
    
    return (
        <button
            className={`h-full px-5 bg-transparent hover:bg-gray-200 ${open === text && "border-b-2 border-gray-500"}`}
            onClick={()=>setOpen(text)}
        >{text} </button>
        
    );
}

function Tab({open, tab, className="", children}) {
    return <div className={`w-full p-5 ${open === tab ? "flex flex-col" : "hidden"} ${className}`}>{children}</div>;
}

const RatingStars = ({ value, onChange }) => {
    const [hovered, setHovered] = useState(0);

    const handleMouseEnter = (index) => {
        setHovered(index + 1);
    };

    const handleMouseLeave = () => {
        setHovered(0);
    };

    const handleClick = (index) => {
        onChange(index + 1);
    };

    return (
        <div className="flex space-x-1 m-1 items-center">
            {[1, 2, 3, 4, 5].map((index) => (
                <svg
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${
                        (hovered || value) >= index
                            ? "text-yellow-400"
                            : "text-gray-400"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index - 1)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index - 1)}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                </svg>
            ))}
            <span className="text-yellow-400 ps-3 text-3xl font-extrabold">{ hovered>0 ? hovered : value}</span>
        </div>
    );
};