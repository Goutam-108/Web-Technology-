import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUser_course, getStudentProfile } from '../services/userService'; 

export default function RegisterCourse() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [courseId, setCourseId] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        if (id) setCourseId(id);
        
        // --- AUTO-FILL LOGIC ---
        const token = sessionStorage.getItem('token');
        const userEmail = sessionStorage.getItem('email');

        if (token && userEmail) {
            setIsLoggedIn(true);
            loadUserData(userEmail, token);
        }
    }, [id]);

    const loadUserData = async (email, token) => {
        try {
            const result = await getStudentProfile(email, token);
            if (result && result.status === 'success') {
                const data = result.data;
                // Auto-fill the state
                setName(data.name);
                setEmail(data.email);
                setMobile(data.mobile_no); 
                
                // Optional: Show a small toast
                toast.info(`Welcome back, ${data.name}. Details auto-filled!`);
            }
        } catch (error) {
            console.error("Failed to fetch profile for auto-fill");
        }
    };

    const handleRegister = async () => {
        if (name.length === 0 || email.length === 0 || mobile.length === 0) {
            toast.warning('Please enter all details');
            return;
        }

        const result = await registerUser_course({
            name, 
            email, 
            course_ID: courseId, 
            mobile_no: mobile
        });

        if (result['status'] === 'success') {
            toast.success('Successfully registered for the course!');
            navigate('/courses');
        } else {
            toast.error(result['error']);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
                <h3 className="text-center mb-4 text-info">Course Registration</h3>

                <div className="mb-3">
                    <label>Full Name</label>
                    <input
                        readOnly={isLoggedIn} // Optional: Lock field if logged in
                        type="text"
                        className={`form-control ${isLoggedIn ? 'bg-light' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        readOnly={isLoggedIn} // Lock email is important so they don't register for someone else
                        type="email"
                        className={`form-control ${isLoggedIn ? 'bg-light' : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Course ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />
                </div>

                <button onClick={handleRegister} className="btn btn-info w-100 text-white fw-bold">
                    Confirm Registration
                </button>
            </div>
        </div>
    );
}