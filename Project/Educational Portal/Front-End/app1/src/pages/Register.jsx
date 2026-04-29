import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '../services/userService'
import { toast } from 'react-toastify'


function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course_ID, setCourse] = useState('')
    const [mobile, setMobile] = useState('')
    const navigate = useNavigate()

    const signup = async () => {
        if (name == '')
            toast.warn('name must be entered')
        else if (email == '')
            toast.warn('email must be entered')
        else if (course_ID == '')
            toast.warn('course_ID must be entered')
        else if (mobile == '')
            toast.warn('mobile no. must be entered')
        else {
            const result = await registerUser(name, email,course_ID, mobile)
            if (result.status == 'success') {
                navigate('/')
                toast.success('user registered successfully')
            } else
                toast.error(result.error)
        }
    }
    return (    
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '400px', borderRadius: '10px' }}>
                <h3 className="card-title text-center mb-4">Registration</h3>
            <div className="mb-3">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter name" onChange={e => setName(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inputMobile" className="form-label">Course</label>
                <input type="number" className="form-control" onChange={e => setCourse(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inputMobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="inputMobile" placeholder="Enter Mobile number" onChange={e => setMobile(e.target.value)} required />
            </div>


            <div className="mb-3">
                <button className="btn btn-success" onClick={signup}>Signup</button>
            </div>

            <div>
                Already have an account? then to login <Link to='/login' >Click Here</Link>
            </div>
        </div>
    </div>
    )
}

export default Register
