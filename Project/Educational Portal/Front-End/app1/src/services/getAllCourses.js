import axios from "axios";
import config from "./config";

export const getAllCourses = async () => {
  const response = await axios.get(
    config.BASE_URL + "/course/all-active-courses"
  )
  return response.data
}

export async function getEnrolledStudents() {
    const URL = config.BASE_URL + '/admin/enrolled-students'
    const response = await axios.get(URL,{
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return response.data
}

export async function getAllVideos() {
    const URL = config.BASE_URL + '/admin/video/all-videos'
    const response = await axios.get(URL, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    return response.data
}

export async function addCourse(data, token) {
  const apiUrl = config.BASE_URL + "/admin/course/add"
  const result = await axios.post(
    apiUrl,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return result.data
}


export async function addVideo(data, token) {
  return axios.post(
    config.BASE_URL + "/admin/video/add",
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export async function updateVideo(data, token) {
  return axios.put(
    config.BASE_URL + "/admin/video/update", 
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export async function deleteVideo(video_ID, token) {
  const URL = config.BASE_URL + `/admin/video/delete`
  return axios.delete(URL, {
    params: { video_ID },
    headers: { Authorization: `Bearer ${token}` }
  })
}

export async function updateCourse(data, token) {
  return axios.put(
    config.BASE_URL + "/admin/course/update",
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export async function deleteCourse(course_ID, token) {
  const URL = config.BASE_URL + `/admin/course/delete`
  return axios.delete(URL, {
    params: { course_ID },
    headers: { Authorization: `Bearer ${token}` }
  })
}


