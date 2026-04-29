import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, getEnrolledStudents } from "../services/adminServices";
import { studentRCourses } from "../services/userService";

export default function Home() {
  const [items, setItems] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

  // ADMIN STATE
  const [allStudents, setAllStudents] = useState([]);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const allCoursesResult = await getAllCourses();
      if (allCoursesResult && allCoursesResult.status === "success") {
        setItems(allCoursesResult.data);
      }

      if (token) {
        if (role === 'Admin') {
          const studentsResult = await getEnrolledStudents();
          if (studentsResult && studentsResult.status === "success") {
            setAllStudents(studentsResult.data);
          }
        } else {
          const email = sessionStorage.getItem('email');
          if (email) {
            const myCoursesResult = await studentRCourses(email, token);
            if (myCoursesResult && myCoursesResult.status === "success") {
              const myIds = myCoursesResult.data.map(c => c.course_ID);
              setEnrolledCourseIds(myIds);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading home data:", error);
    }
  };

  const handleRegisterClick = (courseId) => {
    navigate('/register-course', { state: { courseId: courseId } });
  };

  const toggleStudents = (courseId) => {
    setExpandedCourseId(prevId => (prevId === courseId ? null : courseId));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="text-info fw-bold">Sunbeam Online Course Portal</h1>
            <p className="mt-3 fs-5">
              Register for industry-oriented courses. New users get instant access!
            </p>
          </div>
          <div className="col-lg-5 text-center">
            <div className="p-5 text-white rounded-4 shadow" style={{ background: "linear-gradient(135deg,#14c6e8,#0d99b6)" }}>
              <h3 className="fw-bold mt-3">Sunbeam Courses</h3>
              <p className="mt-2">Learn. Grow. Succeed.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h3 className="fw-bold mb-4 text-center text-md-start">Available Courses</h3>

        <div className="row g-4">
          {items.map((course) => {
            const courseStudents = allStudents.filter(s => s.course_ID === course.course_ID);
            const studentCount = courseStudents.length;
            const isExpanded = expandedCourseId === course.course_ID;
            const isEnrolled = enrolledCourseIds.includes(course.course_ID);

            return (
              <div key={course.course_ID} className="col-lg-4 col-md-6">
                <div className={`card h-100 shadow-sm border-0 course-card ${isExpanded ? 'border-primary' : ''}`}>
                  <div className="card-body d-flex flex-column">
                    
                    {/* --- UPDATED HEADER SECTION --- */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            {/* New Badge for Course ID */}
                            <span className="badge bg-secondary mb-1" style={{fontSize: '0.7rem'}}>
                              ID: {course.course_ID}
                            </span>
                            <h5 className="card-title text-info fw-bold mb-0">{course.course_name}</h5>
                        </div>
                        
                        {/* Admin Badge for Student Count */}
                        {role === 'Admin' && (
                            <span className="badge bg-warning text-dark ms-2">{studentCount} Students</span>
                        )}
                    </div>
                    {/* ------------------------------- */}

                    <p className="card-text text-muted flex-grow-1 mt-2">{course.description}</p>
                    
                    <div className="mb-3">
                        <h6 className="fw-bold text-success mb-2">₹ {course.fees}</h6>
                        <div className="small text-muted">
                           <div><i className="bi bi-calendar-event me-1"></i> <b>Start:</b> {formatDate(course.start_date)}</div>
                           <div><i className="bi bi-calendar-check me-1"></i> <b>End:</b> {formatDate(course.end_date)}</div>
                           <div><i className="bi bi-clock-history me-1"></i> <b>Expiry:</b> {course.video_expire_days} Days</div>
                        </div>
                    </div>

                    <div className="mt-auto">
                      {role === 'Admin' ? (
                        <>
                           <button className="btn w-100 btn-info text-white fw-bold" onClick={() => toggleStudents(course.course_ID)}>
                             {isExpanded ? 'Hide Students' : 'View Registered Students'}
                           </button>
                           {isExpanded && (
                             <div className="mt-3 bg-light p-2 rounded border" style={{maxHeight: '150px', overflowY: 'auto'}}>
                                {courseStudents.length === 0 ? <p className="small text-center mb-0">No students enrolled.</p> : 
                                    courseStudents.map((s, i) => (
                                      <div key={i} className="small border-bottom py-1 text-truncate" title={s.email}>
                                        {s.name} <span className="text-muted">({s.email})</span>
                                      </div>
                                    ))
                                }
                             </div>
                           )}
                        </>
                      ) : (
                        isEnrolled ? (
                          <button className="btn btn-success w-100" onClick={() => navigate(`/course-videos/${course.course_ID}`)}>
                            View Videos
                          </button>
                        ) : (
                          <button 
                            className="btn btn-outline-primary w-100"
                            onClick={() => handleRegisterClick(course.course_ID)}
                          >
                            Register Now
                          </button>
                        )
                      )}
                    </div>
                  
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}