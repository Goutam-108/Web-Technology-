import React, { useEffect, useState } from "react";
import {
  getAllCourses,
  getEnrolledStudents,
} from "../services/adminServices";

function ManageEnrolledStudents() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  /* ---------------- FETCH COURSES ---------------- */
  const fetchCourses = async () => {
    const result = await getAllCourses();
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  /* ---------------- FETCH STUDENTS ---------------- */
  const fetchStudents = async () => {
    const token  = sessionStorage.getItem("token");
    const result = await getEnrolledStudents(token);
    if (result.status === "success") {
      setStudents(result.data);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  /* ---------------- FILTER + SEARCH + SORT ---------------- */
  const filteredStudents = students
    .filter((s) => {
      if (selectedCourse === "all") return true;
      return s.course_ID == selectedCourse;
    })
    .filter((s) => {
  const text = searchText.toLowerCase();

  const name = s.name?.toLowerCase() || "";
  const email = s.email?.toLowerCase() || "";
  const mobile = s.mobile?.toString() || "";

  return (
    name.includes(text) ||
    email.includes(text) ||
    mobile.includes(text)
  );
})

    .sort((a, b) => {
      if (sortOrder === "asc") return a.reg_no - b.reg_no;
      return b.reg_no - a.reg_no;
    });

  return (
    <>

      <div className="container mt-4">
        {/* PAGE HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-info">Admin – Registered Students</h3>
          <small className="text-muted">
            View and filter students registered per course
          </small>
        </div>

        {/* FILTER BAR */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              {/* COURSE FILTER */}
              <div className="col-md-3">
                <label className="form-label">Course</label>
                <select
                  className="form-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="all">All courses</option>
                  {courses.map((c) => (
                    <option key={c.course_ID} value={c.course_ID}>
                      {c.course_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEARCH */}
              <div className="col-md-5">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email or mobile"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* SORT */}
              <div className="col-md-3">
                <label className="form-label">Sort By</label>
                <div className="d-flex gap-2">
                  <select
                    className="form-select"
                    disabled
                  >
                    <option>Registration No.</option>
                  </select>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? "Asc" : "Desc"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Course</th>
                  <th>
                    Reg. No{" "}
                    <span className="text-muted">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No students found
                    </td>
                  </tr>
                )}

                {filteredStudents.map((s) => (
                  <tr key={s.reg_no}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.mobile_no}</td>
                    <td>{s.course_name}</td>
                    <td>{s.reg_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageEnrolledStudents;
