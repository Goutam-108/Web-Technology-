import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../services/config";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    if (!oldPassword || !newPassword) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const url = `${config.BASE_URL}/students/student/changepassword`;
      const body = { email, old_password: oldPassword, new_password: newPassword };
      
      const response = await axios.put(url, body, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === "success") {
        toast.success("Password changed successfully! Please login again.");
        sessionStorage.clear();
        navigate("/login");
      } else {
        toast.error("Error: " + response.data.error);
      }
    } catch (error) {
      toast.error("Failed to change password");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto p-4" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4 text-info">Change Password</h3>
        
        <div className="mb-3">
          <label className="form-label">Old Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-info text-white w-100 fw-bold" onClick={handleChangePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
}