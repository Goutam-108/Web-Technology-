import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyVideos, studentRCourses, getCourseStatus } from "../services/userService"; 
import { toast } from "react-toastify";

export default function CourseVideos() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateAndFetch();
  }, []);

  const validateAndFetch = async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const coursesResult = await studentRCourses(email, token);
      
      if (coursesResult.status === "success") {
        const currentCourse = coursesResult.data.find(c => c.course_ID == courseId);

        if (currentCourse) {
            const status = getCourseStatus(currentCourse);
            if (status !== "ACTIVE") {
                toast.error(`Access Denied: This course is ${status}`);
                navigate('/'); 
                return;
            }
            setCourseName(currentCourse.course_name);
        }
      }

      const result = await getMyVideos(email, token);
      if (result.status === "success") {
        const filtered = result.data.filter((v) => v.course_ID == courseId);
        setVideos(filtered);
      } 
    } catch (error) {
        console.error(error);
        toast.error("Error loading course data");
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/")}>
        ← Back to Courses
      </button>

      <h2 className="text-info fw-bold mb-4">
        {courseName ? `${courseName} - Video Lectures` : "Course Videos"}
      </h2>

      {videos.length === 0 ? (
        <div className="alert alert-warning">No videos found.</div>
      ) : (
        <div className="list-group">
          {videos.map((video, index) => (
            <div key={video.video_ID} className="list-group-item list-group-item-action p-4 shadow-sm mb-3 rounded border">
              <h5 className="mb-1 fw-bold text-primary">
                 {index + 1}. {video.title}
              </h5>
              <p className="mb-3 mt-2">{video.description}</p>
              <a 
                href={video.youtube_url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-danger"
              >
                Watch Video ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}