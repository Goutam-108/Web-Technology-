import base64 
import tools as ut
from flask import Blueprint, Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from passlib.hash import sha256_crypt as crypt
import os
from flask_cors import CORS


# server = Flask(__name__)


# jwt_secret = os.getenv("MY_SECRET_KEY")
# server.config["JWT_SECRET_KEY"] = jwt_secret
# jwt_mgr = JWTManager(server)

studentsRouter = Blueprint("student_API", __name__, url_prefix="/students")
CORS(studentsRouter)

@studentsRouter.post('/student/register-to-course')
def create_student():
    email = request.get_json().get('email')
    query3 = "SELECT email FROM users WHERE email = %s;"
    isemail = ut.queryExecutor(query3, (email,))

    param1 = (
    request.get_json().get('name'),
    email,
    request.get_json().get('course_ID'),
    request.get_json().get('mobile_no')
    )
        
    if not isemail :
        param2 = (
            email,
            crypt.hash("student123")
        )
        query2 = f"INSERT INTO users(email,password) VALUES(%s, %s);"
        ut.queryExecutor(query2,param2)

    query1 = f"INSERT INTO student(name,email,course_ID,mobile_no) VALUES(%s,%s,%s,%s);"
    result = ut.queryExecutor(query1, param1)
    return ut.createResult(None, result)
   

@studentsRouter.put('/student/changepassword')
@jwt_required()
def update_student():
    sql = "SELECT* FROM users WHERE email = %s;"
    email = request.get_json().get('email')
    result = ut.queryExecutor(sql, (email,))
    rawpassword = request.get_json().get('old_password')
    if not crypt.verify(rawpassword,result[0]["password"]):
        return ut.createResult("Invalid email or password", None)
    
    newpassword = request.get_json().get('new_password')
    encpassword = crypt.hash(newpassword)
    query = f"UPDATE users SET password = %s WHERE email = %s;"
    param = (
        encpassword,
        email
    )
    result = ut.queryExecutor(query,param)
    return ut.createResult(None, result)    


@studentsRouter.get('/student/my-courses')
@jwt_required()
def studentCourses():
    query = f"SELECT c.course_name, c.description, c.fees, c.course_ID, c.start_date, c.end_date, c.video_expire_days FROM courses c JOIN student s ON s.course_ID = c.course_ID WHERE s.email = %s;"
    param = (request.args.get("email"),)
    result = ut.queryExecutor(query,param)
    return ut.createResult(None, result)


@studentsRouter.get('/student/my-coursewith-videos')
@jwt_required()
def studentCourseVideos():
    query = f"SELECT v.video_ID,v.title, v.description, v.added_at, c.course_name, c.course_ID, v.youtube_url FROM videos v JOIN courses c ON v.course_ID = c.course_ID JOIN student s ON c.course_ID = s.course_ID WHERE s.email = %s;"
    param = (request.args.get("email"),)
    data = ut.queryExecutor(query,param)
    return ut.createResult(None, data)


@studentsRouter.get('/student/profile')
@jwt_required()
def get_student_profile():
    email = request.args.get('email')
    query = "SELECT name, email, mobile_no, profile_pic FROM student WHERE email = %s"
    result = ut.queryExecutor(query, (email,))
    
    if result and len(result) > 0:
        student = result[0]
        
        # Convert Binary BLOB -> Base64 String for the frontend
        if student['profile_pic']:
            # Decode bytes to string
            student['profile_pic'] = base64.b64encode(student['profile_pic']).decode('utf-8')
            
        return ut.createResult(None, student)
    
    return ut.createResult("Student not found", None)


@studentsRouter.post('/student/upload-pic')
@jwt_required()
def upload_pic():
    try:
        print("--- START UPLOAD DEBUG ---")
        
        # 1. Check for file part
        if 'profile_image' not in request.files:
            print("Error: 'profile_image' key missing from request.files")
            return jsonify({"status": "error", "error": "No file part"}), 400

        file = request.files['profile_image']
        email = request.form.get('email')

        print(f"Received File: {file.filename}")
        print(f"Received Email: {email}")

        if not email:
            print("Error: Email is missing")
            return jsonify({"status": "error", "error": "Email is missing"}), 400

        if file.filename == '':
            print("Error: Filename is empty")
            return jsonify({"status": "error", "error": "No selected file"}), 400

        # 2. Read File
        file_data = file.read()
        print(f"File Size: {len(file_data)} bytes")

        query = "UPDATE student SET profile_pic = %s WHERE email = %s"
        
        # Wrap DB call in try/except to catch SQL errors
        try:
            ut.queryExecutor(query, (file_data, email))
            print("Database update successful!")
        except Exception as db_e:
            print(f"DATABASE ERROR: {db_e}")
            return jsonify({"status": "error", "error": f"Database failed: {str(db_e)}"}), 500

        return jsonify({"status": "success", "data": "Profile picture updated successfully"}), 200

    except Exception as e:
        # This catches any other python crashes
        print(f"CRITICAL SERVER ERROR: {e}")
        return jsonify({"status": "error", "error": f"Server crash: {str(e)}"}), 500
    
# if __name__ == "__main__":
#     server.run(host = '0.0.0.0',port = 4000, debug=True)