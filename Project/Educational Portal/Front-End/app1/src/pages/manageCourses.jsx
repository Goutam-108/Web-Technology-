import React, { useEffect, useState } from "react";
import {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,

} from "../services/adminServices";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    course_ID: "",
    course_name: "",
    description: "",
    fees: "",
    video_expire_days: "",
    start_date: "",
    end_date: "",
  });

  /* ---------------- FETCH COURSES ---------------- */
  const fetchCourses = async () => {
    const result = await getAllCourses();
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ---------------- EDIT COURSE ---------------- */
  const handleEdit = (course) => {
    setFormData({
      ...course,
    start_date: formatDateForInput(course.start_date),
    end_date: formatDateForInput(course.end_date),
    });
    setIsEdit(true);
  };

  /* ---------------- DELETE COURSE ---------------- */
const handleDeleteCourse = async (course_ID) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {
    const token = sessionStorage.getItem("token");
    const result = await deleteCourse(course_ID, token);

    if (result.data.status === "success") {
      fetchCourses();  
      resetForm();    
    }
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete course");
  }
};


  /* ---------------- RESET FORM ---------------- */
  const resetForm = () => {
    setFormData({
      course_ID: "",
      course_name: "",
      description: "",
      fees: "",
      video_expire_days: "",
      start_date: "",
      end_date: "",
    });
    setIsEdit(false);
  };

      //  formate date for input fields
  const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
};  

  /* ---------------- ADD COURSE ---------------- */
  const handleAddCourse = async () => {
    const token = sessionStorage.getItem("token");

    const payload = {
      course_name: formData.course_name,
      title: formData.title,
      description: formData.description,
      fees: formData.fees,
      video_expire_days: formData.video_expire_days,
      start_date: formData.start_date,
      end_date: formData.end_date,
    };

    const result = await addCourse(payload, token);

    if (result.data.status === "success") {
      fetchCourses();
      resetForm();
    }
  };

  /* ---------------- UPDATE COURSE ---------------- */
  const handleUpdateCourse = async () => {
    const token = sessionStorage.getItem("token");
    const result = await updateCourse(formData, token);

    if (result.status === "success") {
      fetchCourses();
      resetForm();
    }


  };

  return (
    <>
      <div className="container mt-4">
        <h3 className="text-info mb-3">Admin – Manage Courses</h3>

        <div className="row">
          {/* ================= LEFT : TABLE ================= */}
          <div className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Courses</h5>
              </div>

              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Fees</th>
                    <th>Dates</th>
                    <th>Expire</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((c) => (
                    <tr key={c.course_ID}>
                      <td>{c.course_ID}</td>
                      <td>
                        <strong>{c.course_name}</strong>
                        <br />
                        <small>{c.description}</small>
                      </td>
                      <td>₹{c.fees}</td>
                      <td>
                        {c.start_date} → {c.end_date}
                      </td>
                      <td>{c.video_expire_days} days</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleEdit(c)}
                        >
                          Edit
                        </button>
                        <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCourse(c.course_ID)}
                      >
                        Delete
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= RIGHT : FORM ================= */}
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5>{isEdit ? "Update Course" : "Add Course"}</h5>
              </div>

              <div className="card-body">
                <input
                  className="form-control mb-2"
                  placeholder="Course Name"
                  value={formData.course_name}
                  onChange={(e) =>
                    setFormData({ ...formData, course_name: e.target.value })
                  }
                />

                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Fees"
                  value={formData.fees}
                  onChange={(e) =>
                    setFormData({ ...formData, fees: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Video Expire Days"
                  value={formData.video_expire_days}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video_expire_days: e.target.value,
                    })
                  }
                />

                <input
                className="form-control mb-2"
                type="date"
                value={formData.start_date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />

              <input
                className="form-control mb-3"
                type="date"
                value={formData.end_date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />

                <div className="text-end">
                  <button
                    className="btn btn-info text-white me-2"
                    onClick={isEdit ? handleUpdateCourse : handleAddCourse}
                  >
                    {isEdit ? "Update Course" : "Add Course"}
                  </button>

                  {isEdit && (
                    <button
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ManageCourses
