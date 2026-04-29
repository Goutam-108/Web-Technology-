import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Courses from "./pages/Courses";
import EnrolledStudents from "./pages/EnrolledStudents";
import ManageCourses from "./pages/ManageCourses";
import ManageVideos from "./pages/ManageVideos";
import Register_Course from "./pages/Register_Course";
import CourseVideos from "./pages/CourseVideos";
import ChangePassword from "./pages/ChangePassword";
import StudentProfile from "./pages/StudentProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        
        {/* Student Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/register-course" element={<Register_Course />} />
        <Route path="/course-videos/:courseId" element={<CourseVideos />} />
        
        {/* NEW ROUTES */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/student-profile" element={<StudentProfile />} />

        {/* Admin Routes */}
        <Route path="/admin/enrolled-students" element={<EnrolledStudents />} />
        <Route path="/admin/manage-courses" element={<ManageCourses />} />
        <Route path="/admin/manage-videos" element={<ManageVideos />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;