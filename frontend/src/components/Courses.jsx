import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser, FaDiscourse, FaDownload } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import logo1 from "../../public/logo1.jpg";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching courses:", error);
        setLoading(false);
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
      toast.error("Logout failed");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredCourses = courses.filter((course) =>
    (course.title + course.description)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Mobile menu toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg w-64 z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 flex items-center gap-4 border-b">
          <img
            onClick={() => navigate("/")}
            src={logo1}
            alt="Logo"
            className="h-12 w-12 rounded-full"
          />
          <h2
            onClick={() => navigate("/")}
            className="text-lg font-semibold text-gray-800 cursor-pointer"
          >
            CourseOcean
          </h2>
        </div>
        <nav className="px-6 py-4">
          <ul className="space-y-4 text-gray-700">
            <li>
              <a
                href="/"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <RiHome2Fill className="text-xl" /> Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-blue-600 font-medium"
              >
                <FaDiscourse className="text-xl" /> Courses
              </a>
            </li>
            <li>
              <a
                href="/purchases"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <FaDownload className="text-xl" /> Purchases
              </a>
            </li>

            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 hover:text-red-600 transition"
                >
                  <IoLogOut className="text-xl" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-3 hover:text-green-600 transition"
                >
                  <IoLogIn className="text-xl" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Available Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search courses..."
                className="px-4 py-2 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="px-4">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
            <p className="text-center text-gray-500">
              No courses found for "{searchQuery}"
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded-lg mb-4 w-full h-40 object-cover"
                  />
                  <h2 className="font-semibold text-lg text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-orange-500">
                      ₹{course.price}{" "}
                      <span className="text-sm text-gray-400 line-through">
                        ₹5999
                      </span>
                    </span>
                    <span className="text-green-600 text-sm">20% off</span>
                  </div>
                  <Link
                    to={`/buy/${course._id}`}
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;
