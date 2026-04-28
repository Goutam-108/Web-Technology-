import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const role = sessionStorage.getItem('role')
    
    if (token) {
      setIsLoggedIn(true)
      setUserRole(role) 
    } else {
      setIsLoggedIn(false)
      setUserRole("")
    }
  }, [location]) 

  const handleLogout = () => {
    sessionStorage.clear()
    setIsLoggedIn(false)
    setUserRole("")
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm mb-4">
      <div className="container-fluid">
        {/* Left  Part of navbar */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
           <span className="bg-info text-white rounded-circle d-flex justify-content-center align-items-center me-2" style={{width: '35px', height: '35px'}}>S</span>
           Sunbeam Portal
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER LINKS + SEARCH */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

            {userRole !== 'Admin' && (
                <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
            )}

            {userRole === 'Admin' && (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-danger fw-bold" to="#" role="button" data-bs-toggle="dropdown">
                  Admin Panel
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/admin/manage-courses">Manage Courses</Link></li>
                  <li><Link className="dropdown-item" to="/admin/manage-videos">Manage Videos</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" to="/admin/enrolled-students">Enrolled Students</Link></li>
                </ul>
              </li>
            )}

            {/* --- SEARCH BAR RESTORED HERE --- */}
            <li className="nav-item ms-lg-4 mt-2 mt-lg-0">
               <form className="d-flex" role="search">
                 <input className="form-control form-control-sm me-2" type="search" placeholder="Search courses..." aria-label="Search" style={{width: '200px'}} />
                 <button className="btn btn-sm btn-outline-secondary" type="submit">Search</button>
               </form>
            </li>

          </ul>

          {/* RIGHT: User Profile Dropdown & Logout */}
          <div className="d-flex align-items-center gap-3">
             {isLoggedIn ? (
               <>
                 {/* USER DROPDOWN */}
                 <div className="dropdown">
                   <button 
                     className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border" 
                     type="button" 
                     data-bs-toggle="dropdown" 
                     aria-expanded="false"
                   >
                     <i className="bi bi-person-circle fs-5 text-secondary"></i>
                     <span className="fw-bold small text-muted">
                       {sessionStorage.getItem("email")}
                     </span>
                   </button>
                   <ul className="dropdown-menu dropdown-menu-end shadow">
                     <li>
                        <Link className="dropdown-item" to="/student-profile">
                          <i className="bi bi-info-circle me-2"></i> Student Info
                        </Link>
                     </li>
                     <li>
                        <Link className="dropdown-item" to="/change-password">
                          <i className="bi bi-key me-2"></i> Change Password
                        </Link>
                     </li>
                   </ul>
                 </div>

                 <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
               </>
             ) : (
               <div className="d-flex gap-2">
                 <Link to="/login" className="btn btn-sm btn-primary px-4">Login</Link>
               </div>
             )}
          </div>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar