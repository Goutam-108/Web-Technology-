import React, { useEffect, useState } from "react";
import {
  getAllVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  getAllCourses,
} from "../services/adminServices";

function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    video_ID: "",
    course_ID: "",
    title: "",
    youtube_url: "",
    description: "",
  });

  /* ---------------- FETCH ---------------- */
  const fetchVideos = async () => {
    const result = await getAllVideos();
    if (result.status === "success") setVideos(result.data);
  };

  const fetchCourses = async () => {
    const result = await getAllCourses();
    if (result.status === "success") setCourses(result.data);
  };

  useEffect(() => {
    fetchVideos();
    fetchCourses();
  }, []);

  /* ---------------- EDIT ---------------- */
  const handleEdit = (video) => {
    setFormData({
      video_ID: video.video_ID,
      course_ID: video.course_ID,
      title: video.title,
      youtube_url: video.youtube_url || video.url, 
      description: video.description,
    });
    setIsEdit(true);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (video_ID) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    const token = sessionStorage.getItem("token");
    const result = await deleteVideo(video_ID, token);

    if (result.data.status === "success") {
      fetchVideos();
      resetForm();
    }
  };

  /* ---------------- RESET ---------------- */
  const resetForm = () => {
    setFormData({
      video_ID: "",
      course_ID: "",
      title: "",
      youtube_url: "",
      description: "",
    });
    setIsEdit(false);
  };

  /* ---------------- ADD ---------------- */
  const handleAddVideo = async () => {
    const token = sessionStorage.getItem("token");

    const payload = {
      course_ID: formData.course_ID,
      title: formData.title,
      description: formData.description,
      url: formData.youtube_url,
    };

    const result = await addVideo(payload, token);
    if (result.data.status === "success") {
      fetchVideos();
      resetForm();
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdateVideo = async () => {
    const token = sessionStorage.getItem("token");

    const payload = {
      video_ID: formData.video_ID,
      course_ID: formData.course_ID,
      title: formData.title,
      description: formData.description,
      url: formData.youtube_url,
    };

    const result = await updateVideo(payload, token);
    if (result.data.status === "success") {
      fetchVideos();
      resetForm();
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h3 className="text-info mb-3">Admin – Manage Videos</h3>

        <div className="row">
          {/* ================= TABLE ================= */}
          <div className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Videos</h5>
              </div>

              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Course</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {videos.map((v) => (
                    <tr key={v.video_ID}>
                      <td>{v.video_ID}</td>
                      <td>{v.course_ID}</td>
                      <td>{v.title}</td>
                      <td>
                        <a
                          href={v.youtube_url || v.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleEdit(v)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(v.video_ID)}
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

          {/* ================= FORM ================= */}
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5>{isEdit ? "Update Video" : "Add Video"}</h5>
              </div>

              <div className="card-body">
                <select
                  className="form-select mb-2"
                  value={formData.course_ID}
                  onChange={(e) =>
                    setFormData({ ...formData, course_ID: e.target.value })
                  }
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.course_ID} value={c.course_ID}>
                      {c.course_name}
                    </option>
                  ))}
                </select>

                <input
                  className="form-control mb-2"
                  placeholder="Video Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  placeholder="YouTube URL"
                  value={formData.youtube_url}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube_url: e.target.value })
                  }
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                {isEdit && (
                  <input
                    className="form-control mb-2"
                    value={`Video ID: ${formData.video_ID}`}
                    disabled
                  />
                )}

                <div className="text-end">
                  <button
                    className="btn btn-info text-white me-2"
                    onClick={isEdit ? handleUpdateVideo : handleAddVideo}
                  >
                    {isEdit ? "Update Video" : "Add Video"}
                  </button>

                  {isEdit && (
                    <button className="btn btn-secondary" onClick={resetForm}>
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
  );
}

export default ManageVideos;
