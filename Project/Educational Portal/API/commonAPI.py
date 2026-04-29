from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import tools as ut 
from flask import Flask, jsonify, request
from passlib.hash import sha256_crypt as crypt
from student_API import studentsRouter
from admin_API import adminRouter
import os
from flask_cors import CORS

server = Flask(__name__)

server.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

CORS(
    server,
    supports_credentials=True,
    resources={r"/*": {"origins": "http://localhost:5173"}}
)

@server.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        return "", 200



server.register_blueprint(adminRouter)
server.register_blueprint(studentsRouter)

jwt_secret = os.getenv("MY_SECRET_KEY")
server.config["JWT_SECRET_KEY"] = jwt_secret
jwt_mgr = JWTManager(server)

# --- JWT error handlers ---
@jwt_mgr.invalid_token_loader
def invalid_token_handler(e):
    return ut.createResult("Invalid JWT Token", None)

@jwt_mgr.unauthorized_loader
def unauthorized_handler(e):
    return ut.createResult("JWT Token is Absent", None)

# global error handlers are production feature.
# not executed when debug mode enabled.
@server.errorhandler(500)
def handle_exception(e):
    err = getattr(e, "original_exception", e)
    return ut.createResult(error=repr(err), data=None)

# --- Homepage ---
@server.route('/', methods=['GET'])
def homepage():
    return "<html><body><h1>This is home page</h1></body></html>"

# ---Admin Login route ---
@server.post("/auth/login")
def signin():
    sql = "SELECT * FROM users WHERE email = %s"
    email = request.get_json().get("email")
    result = ut.queryExecutor(sql, (email,))
    success = False
    if len(result) > 0:
        rawpassword = request.get_json().get("password")
        encpassword = result[0]["password"]
        success = crypt.verify(rawpassword, encpassword)
    
    if not success:
        return ut.createResult("Invalid email or password", None)

    result[0]["password"] = "******"
    jwt = create_access_token(identity=email, expires_delta=False)
    
    result[0]["token"] = jwt
    return ut.createResult(None, result[0])

@server.route('/user/signup', methods = ['POST'])
def signup():
    sql = "INSERT INTO users VALUES (%s, %s, DEFAULT);"
    encpassword = crypt.hash(request.json["password"])
    param = (
        request.json["email"],
        encpassword
    )
    result = ut.queryExecutor(sql, param)
    return ut.createResult(None, result)

@server.route('/course/all-active-courses', methods = ['GET'])
def getActiveCourses():
    sql = "SELECT * FROM courses;"
    result = ut.queryExecutor(sql)
    return ut.createResult(None, result)

if __name__ == "__main__":
    server.run(host="0.0.0.0", port=4000, debug=True)
