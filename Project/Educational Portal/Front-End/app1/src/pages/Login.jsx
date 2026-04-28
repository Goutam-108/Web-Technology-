import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/userService'
import { toast } from 'react-toastify'


function Login() {
    // Destructuring of array
    const [email, setEmail] = useState('') // email
    const [password, setPassword] = useState('')// password
    const navigate = useNavigate()

    const signin = async (event) => {
        console.log('Sign in button clicked')
        console.log(`email - ${email}`)
        console.log(`password - ${password}`)
        if (email == '')
            toast.warn('email must be entered')
        else if (password == '')
            toast.warn('password must be entered')
        else {
            const result = await loginUser(email, password)
            console.log(result)
            if (result.status == 'success') {
                // dynamic navigation -> useNavigate()
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem('role', result.data.role)
                sessionStorage.setItem('email', result.data.email)
                navigate('/')
                toast.success('Login successful')
            }
            else
                toast.error(result.error)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '400px', borderRadius: '10px' }}>
                <h3 className="card-title text-center mb-4">Sign In</h3>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid mb-3">
                    <button className="btn btn-success" onClick={signin}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Login
