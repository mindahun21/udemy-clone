import CardList from "@/Components/CardList";
import CourseList from "@/Components/CourseList";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/ui/Footer";
import { Head } from "@inertiajs/react";

export default function Welcome({ auth, courses }) {
    // console.log(auth.user);
  return (
      <>
          <Head title="Udemy-clone" />
          <div className="dark:bg-black dark:text-white/50 ">
              <Navbar user={auth.user} />
              <div className="mx-96">
                  <div className="text-center font-sans mb-10">
                      <div className="flex justify-between items-center bg-gray-100 p-6">
                          <div className="bg-white w-96 p-5 text-wrap text-left">
                              <h2 className="text-3xl font-bold">
                                  Skills for your future
                              </h2>
                              <p className="text-lg mt-5">
                                  Expand your potential with a course. Starting
                                  at just $13.99 through June 5.
                              </p>
                          </div>
                          <div className="text-right">
                              <img
                                  src="app_images/banner1.avif"
                                  alt="Learning Banner"
                                  className="max-w-full h-auto"
                              />
                          </div>
                      </div>
                        {auth.user && (
                          <div className="flex justify-between mt-6">
                            <h2 className="text-3xl">
                              Let's start learning, {auth.user.name}</h2>
                              <a
                                  href="/my-learning"
                                  className="text-purple-600 mt-2 inline-block"
                              >
                                  My learning
                              </a>
                          </div>
                        ) }
                  </div>
                  <CardList courses={courses} />
                  {/* <CourseReview /> */}
              </div>
              <Footer />
          </div>
      </>
  );
}
