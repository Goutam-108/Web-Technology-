import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStudentProfile, uploadProfilePic } from "../services/userService";

export default function StudentProfile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        mobile: "",
        profilePic: null // Will store the Base64 string
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // To show preview before upload

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const email = sessionStorage.getItem("email");
            const token = sessionStorage.getItem("token");
            
            const result = await getStudentProfile(email, token);
            
            if (result && result.status === "success") {
                const data = result.data;
                setProfile({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile_no,
                    profilePic: data.profile_pic ? `data:image/jpeg;base64,${data.profile_pic}` : null
                });
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create a temporary URL just for preview
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Handle the Upload Button Click
    const handleUpload = async () => {
        if (!selectedFile) {
            toast.warning("Please select a file first!");
            return;
        }

        const email = sessionStorage.getItem("email");
        const token = sessionStorage.getItem("token");

        // Prepare Form Data
        const formData = new FormData();
        formData.append("profile_image", selectedFile); // Must match Python: request.files['profile_image']
        formData.append("email", email);                // Must match Python: request.form.get('email')

        try {
            const result = await uploadProfilePic(email, selectedFile, token);
            
            if (result && result.status === "success") {
                toast.success("Profile picture updated!");
                loadProfile();
                setSelectedFile(null);
                setPreviewUrl(null);
            } else {
                toast.error("Upload failed: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Server error during upload.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="card-header bg-info text-white text-center">
                            <h3 className="mb-0">My Profile</h3>
                        </div>
                        <div className="card-body text-center p-4">
                            
                            {/* --- IMAGE SECTION --- */}
                            <div className="mb-4">
                                <img 
                                    // Logic: Show Preview OR Show Database Image OR Show Placeholder
                                    src={previewUrl || profile.profilePic || "https://placehold.co/150"} 
                                    alt="Profile" 
                                    className="rounded-circle border border-3 border-info"
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                            </div>

                            {/* --- FILE INPUT --- */}
                            <div className="input-group mb-3 w-75 mx-auto">
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    accept="image/*"
                                    onChange={handleFileChange} 
                                />
                                <button 
                                    className="btn btn-outline-primary" 
                                    type="button" 
                                    onClick={handleUpload}
                                    disabled={!selectedFile}
                                >
                                    Upload
                                </button>
                            </div>
                            
                            <hr />

                            {/* --- USER DETAILS --- */}
                            <div className="text-start px-4">
                                <div className="mb-3">
                                    <label className="fw-bold text-muted small">FULL NAME</label>
                                    <h5 className="text-dark">{profile.name || "N/A"}</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="fw-bold text-muted small">EMAIL ADDRESS</label>
                                    <h5 className="text-dark">{profile.email || "N/A"}</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="fw-bold text-muted small">MOBILE NUMBER</label>
                                    <h5 className="text-dark">{profile.mobile || "N/A"}</h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}