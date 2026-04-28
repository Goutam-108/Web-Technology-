import axios from 'axios'
import config from './config'

export async function loginUser(email, password) {
    const URL = config.BASE_URL + "/auth/login"
    const body = { email, password }
    const response = await axios.post(URL, body) 
    return response.data
}


export async function getMyVideos(email, token) {
  const URL = config.BASE_URL + '/students/student/my-coursewith-videos'
  const response = await axios.get(URL, {
    params: { email },
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}


export const registerUser_course = async (payload) => {
  try {
    const response = await axios.post(
      config.BASE_URL + '/students/student/register-to-course',
      payload
    )

    return response.data
  } catch (error) {
    console.error("API ERROR:", error)

    return {
      status: "error",
      error:
        error.response?.data?.error ||
        "Server unreachable / CORS / Network error"
    }
  }
}


export async function registerUser(name, email, password, mobile) {
    const URL = config.BASE_URL + '/user/signup'
    const body = { name, email, password, mobile }
    const response = await axios.post(URL, body)
    return response.data
}


export async function getUserProfile(token) {
    const URL = config.BASE_URL + '/user'
    const headers = { token }
    const response = await axios.get(URL, { headers })
    return response.data
}


export async function studentToken(token) {
    const URL = config.BASE_URL + '/admin/admin/enrolled-students'
    const headers = { token }
    const response = await axios.put(URL, { headers })
    return response.data
}


export async function studentRCourses(email, token){
    const URL = config.BASE_URL + '/students/student/my-courses'
    const response = await axios.get(URL, { 
    params: { email },         
    headers: {
      Authorization: `Bearer ${token}`
    }
    })
    return response.data
}


export async function getStudentProfile(email, token) {
  const URL = config.BASE_URL + '/students/student/profile'
  const response = await axios.get(URL, {
    params: { email },
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// Upload the image file
export async function uploadProfilePic(email, file, token) {
  const URL = config.BASE_URL + '/students/student/upload-pic'
  
  // Debug: Check if token exists before sending
  console.log("Token being sent:", token); 

  const formData = new FormData()
  formData.append('profile_image', file)
  formData.append('email', email)

  const response = await axios.post(URL, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}


export const getCourseStatus = (course) => {
  if (!course) return "ACTIVE"; // Safety check
  const today = new Date();
  
  const startDate = new Date(course.start_date);
  const endDate = new Date(course.end_date);
  
  const expiryDate = new Date(endDate);
  expiryDate.setDate(endDate.getDate() + (course.video_expire_days || 0));

  today.setHours(0,0,0,0);
  startDate.setHours(0,0,0,0);
  expiryDate.setHours(0,0,0,0);

  if (today < startDate) return "UPCOMING";
  if (today > expiryDate) return "EXPIRED";
  return "ACTIVE";
};
