import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <h1>Student Management System</h1>

      <Link to="/">Home</Link> | 
      <Link to="/add">Add Student</Link> | 
      <Link to="/students">Student List</Link>
    </nav>
  )
}

export default Navbar