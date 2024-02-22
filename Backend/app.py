from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from models import db, StockList,StockHistory
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS
import MySQLdb

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql://root:1234@127.0.0.1:3306/stock_prediction"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
CORS(app)  
db.init_app(app)

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

 
@app.route("/")
def hello_world():
    return "Hello, World!"
 
@app.route("/signup", methods=["POST"])
def signup():
    return jsonify({
        "id": "1",
        "email": "a@gmail.com"
    })
 
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

@app.route('/stock/<stockCode>', methods=['GET'])
def get_stock_list(stockCode):

    stock = StockList.query.filter_by(symboy=stockCode).first()
    stock_info = (
        StockHistory.query.filter_by(stockid=stock.stockid)
        .order_by(StockHistory.date.desc())
        .first()
    )
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    stock_dict = {
        "stockid": stock.stockid,
        "symboy": stock.symboy,
        "company_name": stock.company_name,
        "company_detail": stock.company_detail,
        "previous_close_price": stock.previous_close_price,
        "date": str(stock_info.date),
        "open": stock_info.open,
        "high": stock_info.high,
        "low": stock_info.low,
        "close": stock_info.close,
        "volume": stock_info.volume,
    }

    return (
        json.dumps(stock_dict, ensure_ascii=False).encode("utf8"),
        200,
        {"Content-Type": "application/json; charset=utf-8"},
    )

@app.route('/getAllStocks', methods=['GET'])
def get_stock_lists():

    stocks = StockList.query.all()
    history = StockHistory.query.all()
    # print(stock)
    # print('....')
    # print(history[6])
    # print(',,,')
    for stock in stocks:
        print(stock,'..')
        stock_info = (
            StockHistory.query.filter_by(stockid=stock.stockid)
            .order_by(StockHistory.date.desc())
            .limit(2)
        )
        print(stock_info[0].open - stock_info[1].close)
        stock_dict = {
            "stockid": stock.stockid,
            "symboy": stock.symboy,
            "company_name": stock.company_name,
            "company_detail": stock.company_detail,
            "previous_close_price": stock.previous_close_price,
            # price
            "diffirence": stock_info[0].open - stock_info[1].close, 
            "volume": stock_info[0].volume,
        }

    return (
        jsonify(stock_dict)
    )

if __name__ == "__main__":
    app.run(debug=True)