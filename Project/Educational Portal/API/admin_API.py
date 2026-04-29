import os
from flask_cors import CORS
import tools as ut
from flask import Blueprint, Flask, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt

# server = Flask(__name__)

# jwt_secret = os.getenv("MY_SECRET_KEY")
# server.config["JWT_SECRET_KEY"] = jwt_secret
# jwt_mgr = JWTManager(server)

adminRouter = Blueprint("admin_API", __name__, url_prefix="/admin")
CORS(adminRouter)

@adminRouter.get("/course/all-courses")
@jwt_required()
def getCourses():
    sql = "SELECT * FROM courses WHERE  (start_date <= %s AND end_date >= %s);"
    param = (
        request.args.get("endDate"),
        request.args.get("startDate")
    )
    result = ut.queryExecutor(sql, param)
    return ut.createResult(None, result)

@adminRouter.post("/course/add")
@jwt_required()
def addCourse():
    try:
        data = request.get_json()

        sql = """
        INSERT INTO courses 
        (course_name, description, fees, start_date, end_date, video_expire_days)
        VALUES (%s, %s, %s, %s, %s, %s);
        """

        param = (
            data.get("course_name"),
            data.get("description"),
            data.get("fees"),
            data.get("start_date"),
            data.get("end_date"),
            data.get("video_expire_days")
        )

        result = ut.queryExecutor(sql, param)
        return ut.createResult(error=None, data=result)

    except Exception as e:
        print("ADD COURSE ERROR:", e)
        return ut.createError(str(e))


@adminRouter.put("/course/update")
@jwt_required()
def updateCourse():
    sql = "UPDATE courses SET course_name = %s, description = %s, fees = %s, start_date = %s,end_date = %s,video_expire_days = %s WHERE course_ID = %s;"
    param = (
        request.get_json().get("course_name"),
        request.get_json().get("description"),
        request.get_json().get("fees"),
        request.get_json().get("start_date"),
        request.get_json().get("end_date"),
        request.get_json().get("video_expire_days"),
        request.get_json().get("course_ID")
    )
    result = ut.queryExecutor(sql, param)
    return ut.createResult(None, result)

@adminRouter.delete("/course/delete")
@jwt_required()
def deleteCourse():
    sql1 = "DELETE FROM student WHERE course_ID = %s;"
    sql2 = "DELETE FROM videos WHERE course_ID = %s;"
    sql3 = "DELETE FROM courses WHERE course_ID = %s;"
    course_ID = request.args.get("course_ID")
    result = ut.queryExecutor(sql1, (course_ID,))
    result = ut.queryExecutor(sql2, (course_ID,))
    result = ut.queryExecutor(sql3, (course_ID,))
    return ut.createResult(None, result)
    

@adminRouter.get("/video/all-videos")
@jwt_required()
def getVideos():
    sql = "SELECT * FROM videos;"
    result = ut.queryExecutor(sql)
    return ut.createResult(None, result)

@adminRouter.post("/video/add")
@jwt_required()
def addVideo():
    sql = "INSERT INTO videos(course_ID, title, description, youtube_url) VALUES (%s,%s,%s,%s);"
    param = (
        request.get_json().get("course_ID"),
        request.get_json().get("title"),
        request.get_json().get("description"),
        request.get_json().get("url")
    )
    result = ut.queryExecutor(sql, param)
    return ut.createResult(error=None, data=result)


@adminRouter.put("/video/update")
@jwt_required()
def updateVideo():
    sql = "UPDATE videos SET course_ID = %s, title = %s, description = %s, youtube_url = %s WHERE video_ID = %s;"
    param = (
        request.get_json().get("course_ID"),
        request.get_json().get("title"),
        request.get_json().get("description"),
        request.get_json().get("url"),
        request.get_json().get("video_ID")
    )
    result = ut.queryExecutor(sql, param)
    return ut.createResult(None, result)

@adminRouter.delete("/video/delete")
@jwt_required()
def deleteVideo():
    sql = "DELETE FROM videos WHERE video_ID = %s"
    video_ID = request.args.get("video_ID")
    result = ut.queryExecutor(sql, (video_ID,))
    return ut.createResult(None, result)
  
@adminRouter.get("/enrolled-students")
@jwt_required()  
def getEnrolledStudents():
    sql = "SELECT s.reg_no, s.name, s.mobile_no, s.course_ID, c.course_name, s.email FROM student s JOIN courses c ON s.course_ID = c.course_ID;"
    result = ut.queryExecutor(sql, None)
    return ut.createResult(None, result)

# if __name__ == "__main__":
#     server.run(host = '0.0.0.0', port=4000, debug=True)
    

    


