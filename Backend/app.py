from flask import Flask, request, jsonify, session
# from flask_bcrypt import Bcrypt #pip install Flask-Bcrypt = https://pypi.org/project/Flask-Bcrypt/
# from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
# from models import db, User
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS
import json

app = Flask(__name__)
 
app.config['SECRET_KEY'] = 'python-team'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
CORS(app)  
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # print(email!="test@gmail.com",'mail')
    # print(password!="test",'pass')
    # print(email != "test@gmail.com" or password != "test",'check')
    if email != "test@gmail.com" or password != "test":
        return {"msg": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    print(access_token,'access_token')
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Marvelous",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
# SQLALCHEMY_TRACK_MODIFICATIONS = False
# SQLALCHEMY_ECHO = True
  
# bcrypt = Bcrypt(app) 
# CORS(app, supports_credentials=True)
# db.init_app(app)
  
# with app.app_context():
#     db.create_all()
 
@app.route("/")
def hello_world():
    return "Hello, World!"
 
# @app.route("/signup", methods=["POST"])
# def signup():
#     fullname = request.json.get("fullname", None)
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)

#     initial_users = [
#         {"email": "test1@gmail.com", "password": "1234"},
#         {"email": "test2@gmail.com", "password": "1234"},
#         {"email": "test3@gmail.com", "password": "1234"},
#     ]
 
#     user_exists = any(user["email"] == email for user in initial_users)
 
#     if user_exists:
#         return jsonify({"error": "Email already exists"}), 409
     
#     # hashed_password = bcrypt.generate_password_hash(password)
#     # new_user = User(email=email, password=hashed_password)
#     # db.session.add(new_user)
#     # db.session.commit()
 
#     # session["user_id"] = new_user.id
 
#     # return jsonify({
#     #     "id": new_user.id,
#     #     "email": new_user.email
#     # })

#     return jsonify({
#         "id": "1",
#         "email": "a@gmail.com"
#     })
@app.route("/signup", methods=["POST"])
def signup():
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if fullname == "":
        return jsonify({"error": "Fullname is required"}), 400
    if email == "":
        return jsonify({"error": "Email is required"}), 400
    if password == "":
        return jsonify({"error": "Password is required"}), 400
    
    with open("users.json", "r") as file:
        users = json.load(file)
    
    user_exists = any(user["email"] == email for user in users)
    
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    
    new_user = {"fullname": fullname, "email": email, "password": password}
    users.append(new_user)
    
    with open("users.json", "w") as file:
        json.dump(users, file, indent=4)
    
    return jsonify(new_user)

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email
    })


if __name__ == "__main__":
    app.run(debug=True)