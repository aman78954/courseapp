import React, { useEffect, useState } from "react";
import logo1 from "../../public/logo1.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`);
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error in fetchCourses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error(error?.response?.data?.errors || "Error in logging out");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="min-h-screen text-white container mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img
              src={logo1}
              alt="logo"
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              CourseOcean
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
                <Link
                  to="/admin/login"
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Admin
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl font-semibold text-orange-500">
            CourseOcean
          </h1>
          <p className="text-gray-400 mt-4">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to="/courses"
              className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white hover:text-black transition"
            >
              Explore Courses
            </Link>
          </div>
        </section>

        {/* Course Slider */}
        <section className="p-6 md:p-10">
          {courses.length > 0 ? (
            <Slider {...settings}>
              {courses.map((course) => (
                <div key={course._id} className="p-4">
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-xl transition">
                    <img
                      src={course.image?.url}
                      alt={course.title}
                      className="h-40 w-full object-contain"
                    />
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-bold text-white mb-2">
                        {course.title}
                      </h2>
                      <Link
                        to={`/buy/${course._id}`}
                        className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 transition"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-400">No courses found.</p>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-800 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo1} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">
                  CourseOcean
                </h1>
              </div>
              <div className="mt-4">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="#">
                    <FaFacebook className="text-2xl hover:text-blue-500 transition" />
                  </a>
                  <a href="#">
                    <FaInstagram className="text-2xl hover:text-pink-600 transition" />
                  </a>
                  <a href="#">
                    <FaTwitter className="text-2xl hover:text-sky-500 transition" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right text-gray-400">
              <h3 className="text-lg font-semibold mb-2">© 2025 CourseOcean</h3>
              <ul className="space-y-1">
                <li className="hover:text-white cursor-pointer transition">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
