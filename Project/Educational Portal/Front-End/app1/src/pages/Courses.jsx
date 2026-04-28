import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentRCourses, getMyVideos, getCourseStatus } from "../services/userService"; 
import { toast } from "react-toastify";

export default function Courses() {
  const [myCourses, setMyCourses] = useState([])
  const [allVideos, setAllVideos] = useState([]) 
  const [expandedCourseId, setExpandedCourseId] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('email')

    if (!token || !email) {
      toast.warning("Please login to view your courses")
      navigate('/login')
      return
    }

    try {
      const coursesResult = await studentRCourses(email, token)
      if (coursesResult && coursesResult.status === "success") {
        setMyCourses(coursesResult.data)
      }

      const videosResult = await getMyVideos(email, token)
      if (videosResult && videosResult.status === "success") {
        setAllVideos(videosResult.data)
      }

    } catch (error) {
      console.error("Error loading data", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleVideos = (courseId) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null)
    } else {
      setExpandedCourseId(courseId)
    }
  }

  const formatDate = (dateString) => {
    if(!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toDateString(); 
  }

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-info"></div></div>

  return (
    <div className="container mt-4">
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-2">
        <h2 className="fw-normal mb-0" style={{ color: '#0dcaf0' }}>My Enrolled Courses</h2>
        <p className="text-muted mb-0 small mt-2 mt-md-0">
          View courses you've registered for and access video lectures
        </p>
      </div>

      {myCourses.length === 0 ? (
         <div className="alert alert-light border text-center p-5">
           <h4>No courses found.</h4>
         </div>
      ) : (
        <div className="row g-4">
          {myCourses.map((course) => {
            const courseVideos = allVideos.filter(v => v.course_ID === course.course_ID);
            const isOpen = expandedCourseId === course.course_ID;
            
            const status = getCourseStatus(course);

            return (
              <div key={course.course_ID} className="col-lg-6">
                <div className="card h-100 shadow-sm border rounded-3 p-3 bg-white">
                  
                  <div className="card-body">
                    {/* Title */}
                    <h4 className="card-title fw-normal mb-3" style={{ color: '#0dcaf0' }}>
                      {course.course_name}
                    </h4>

                    {/* Description */}
                    <p className="card-text text-secondary mb-4 small">
                      {course.description}
                    </p>

                    {/* Course Info */}
                    <div className="mb-4 small">
                      <div className="mb-1"><strong className="text-dark">Course ID:</strong> {course.course_ID}</div>
                      <div className="mb-1"><strong className="text-dark">Fees:</strong> ₹{course.fees && course.fees.toLocaleString()}</div>
                      <div className="mb-1"><strong className="text-dark">Start Date:</strong> <span className="text-secondary">{formatDate(course.start_date)}</span></div>
                      <div className="mb-1"><strong className="text-dark">End Date:</strong> <span className="text-secondary">{formatDate(course.end_date)}</span></div>
                      <div className="mb-1"><strong className="text-dark">Video Expire Days:</strong> {course.video_expire_days}</div>
                    </div>

                    {/* --- 2. ACTION BUTTONS (With Logic) --- */}
                    
                    {/* CASE A: Course hasn't started yet */}
                    {status === "UPCOMING" && (
                        <button disabled className="btn w-100 btn-secondary py-2 mb-3">
                             Starts on {formatDate(course.start_date)}
                        </button>
                    )}

                    {/* CASE B: Course Expired */}
                    {status === "EXPIRED" && (
                        <button disabled className="btn w-100 btn-danger py-2 mb-3">
                             Course Expired
                        </button>
                    )}

                    {/* CASE C: Active - Show your original toggle button */}
                    {status === "ACTIVE" && (
                        <button 
                          className="btn w-100 text-white fw-bold py-2 mb-3"
                          style={{ backgroundColor: '#0dcaf0', borderColor: '#0dcaf0' }}
                          onClick={() => toggleVideos(course.course_ID)}
                        >
                          {isOpen ? 'Hide Videos' : 'View Videos'} 
                        </button>
                    )}

                    {/* VIDEO LIST SECTION (Only shows if Active AND Open) */}
                    {isOpen && status === "ACTIVE" && (
                      <div className="mt-2 animate__animated animate__fadeIn">
                          <hr className="text-muted" />
                        
                        {courseVideos.length === 0 ? (
                           <p className="text-muted small">No videos available for this course.</p>
                        ) : (
                          <div>
                            {courseVideos.map((video, index) => (
                              <div key={video.video_ID} className="mb-4">
                                {/* Video Title */}
                                <h6 className="fw-bold text-dark mb-1">
                                  {index + 1}. {video.title}
                                </h6>
                                
                                {/* Description */}
                                <p className="text-muted small mb-2">
                                  {video.description}
                                </p>
                                
                                {/* Play Button */}
                                <a 
                                  href={video.youtube_url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="btn btn-sm btn-outline-info fw-bold"
                                  style={{ borderColor: '#0dcaf0', color: '#0dcaf0' }}
                                  onMouseOver={(e) => {e.currentTarget.style.backgroundColor='#0dcaf0'; e.currentTarget.style.color='white'}}
                                  onMouseOut={(e) => {e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#0dcaf0'}}
                                >
                                  <i className="bi bi-play-fill me-1"></i>
                                  Play Video
                                </a>
                                
                                {index < courseVideos.length - 1 && <hr className="text-light mt-3" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}