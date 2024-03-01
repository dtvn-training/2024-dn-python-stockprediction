import uuid
from flask import Flask, request, jsonify
from models import db, StockList,StockHistory,StockPrediction, Users, Comments
from sqlalchemy import desc
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')
import json
import uuid
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from stock.predict import chart_stock
from stock.allstock import allstock

sqlstring="mysql://root:Ncgncg1102@127.0.0.1:3306/stock_prediction"
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'python'
app.config["SQLALCHEMY_DATABASE_URI"] = (sqlstring)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
db.init_app(app)
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
        return response
    
@app.route('/stock-chart/<stockCode>')
def stockchart(stockCode):
    stock = StockList.query.filter_by(symbol=stockCode).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    stock_infos = (
        StockHistory.query.filter_by(stockid=stock.stockid)
        .order_by(desc(StockHistory.date))
        .all()
    )
    dataSource ,img_predict=chart_stock(stock_infos)
    return jsonify({"chart_data": dataSource, "img_predict": img_predict})

@app.route('/stock/<stockCode>', methods=['GET','POST','UPDATE'],)
def get_stock_list(stockCode):
    stock = StockList.query.filter_by(symbol=stockCode).first()
    if request.method == 'POST':
        data = request.get_json()
        new_text_prediction = data.get('text_prediction')
        if not stock:
            return jsonify({'error': 'Stock not found'}), 404
        stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()
        if not stock_prediction:
            stock_prediction = StockPrediction(
                stockid=stock.stockid,
                userid='user_id_placeholder',
                date=datetime.now(),
                text_prediction=new_text_prediction
            )
            db.session.add(stock_prediction)
        else:
            stock_prediction.text_prediction = new_text_prediction
        db.session.commit()
        return jsonify({'success': True}), 200
    if request.method == 'GET':
        stock_info = (
            StockHistory.query.filter_by(stockid=stock.stockid)
            .order_by(StockHistory.date.desc())
            .first()
        )
        if not stock:
            return jsonify({'error': 'Stock not found'}), 404
        stock_dict = {
            "stockid": stock.stockid,
            "symbol": stock.symbol,
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

@app.route('/admin/predictions/<stockCode>', methods=['POST','DELETE'])
@jwt_required()
def predictions(stockCode):
    
    emailUser = get_jwt_identity()
    user = Users.query.filter_by(email=emailUser).first()
    if not user or user.type != "admin":
        return jsonify({'error': 'Unauthorized access'}), 403
    stock = StockList.query.filter_by(symbol=stockCode).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    if request.method == 'POST':
        data = request.get_json()
        new_text_prediction = data.get('textpredict') 
        stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()

        if not stock_prediction:
            stock_prediction = StockPrediction(
                stockid=stock.stockid,
                userid=user.userid,  
                date=datetime.now(),
                text_prediction=new_text_prediction
            )
            db.session.add(stock_prediction)
            db.session.commit()
        else:
            stock_prediction.text_prediction = new_text_prediction
            db.session.flush()
            db.session.commit()
        return jsonify({'success': True}), 200
    if request.method == "DELETE":
        stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()
        if stock_prediction:
            db.session.delete(stock_prediction)
            db.session.commit()
        return jsonify({'success': True}), 200

@app.route('/user/predictions/<stockCode>')
def get_predictions(stockCode):
    stock = StockList.query.filter_by(symbol=stockCode).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()
    if not stock_prediction:
        return jsonify({'textPrediction': ''}), 200
    return jsonify({'textPrediction': stock_prediction.text_prediction}), 200

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = Users.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
    if email != user.email or password != user.password:
        return {"msg": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/signup", methods=["POST"])
def signup():
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exists = Users.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    new_user = Users(
        userid=str(uuid.uuid4()),
        username=email.split('@')[0],
        password=password,
        email=email,
        fullname=fullname,
        type='user',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": "User registered successfully"}), 200

@app.route('/getAllStocks', methods=['GET'])
def get_stock_lists():
    stockArr = StockList.query.all()
    stocks=allstock(stockArr)
    return (
        jsonify(stocks)
    )

@app.route('/userprofile', methods=['GET'])
@jwt_required()
def user_profile():
    email_user = get_jwt_identity()
    user = Users.query.filter_by(email=email_user).first()
    user_get_by_email = {
        "fullname": user.fullname,
        "email": user.email,
        "password": user.password
    }
    return jsonify(user_get_by_email)
@app.route('/userprofile', methods=['POST'])
def update_user_profile():
    fullname = request.json.get('fullname') 
    password = request.json.get('password')
    email = request.json.get('email')
    user = Users.query.filter_by(email=email).first()
    user.fullname = fullname
    user.password = password
    db.session.commit()  
    return jsonify({"message": "Updated profile successfully."}), 200
@app.route('/comment/showAll/<symbol>', methods=['GET'])

def get_comment_lists(symbol):
    stock = StockList.query.filter_by(symbol=symbol).first()
    commentArr = Comments.query.filter_by(stockid=stock.stockid).all()
    current_time = datetime.now()
    commentStock=[]
    for commentObject in commentArr:
        user = Users.query.filter_by(userid=commentObject.userid).first()
        tokenUser = create_access_token(identity=user.email)
        time_difference = current_time - commentObject.updated_at
        total_seconds = time_difference.total_seconds()
        hours = int(total_seconds // 3600)
        minutes = int((total_seconds % 3600) // 60)
        time = f"{hours} giờ, {minutes} phút"
        comment = {
            "commentid": commentObject.commentid,
            "name": str(user.fullname),
            "userToken": str(tokenUser),
            "stockid": commentObject.stockid,
            "comment_text":commentObject.comment_text,
            "updated_at":time,
        }
        commentStock.append(comment)
    return (
       jsonify(commentStock)
    )
@app.route('/comment/create', methods=["POST"])

@jwt_required()  
def comment():
    comment = request.json.get("comment", None)
    symbol = request.json.get("symbol", None)
    emailUser = get_jwt_identity()
    user = Users.query.filter_by(email=emailUser).first()
    stock = StockList.query.filter_by(symbol=symbol['stocks']).first()
    new_cmt = Comments(
        commentid=str(uuid.uuid4()),
        userid=user.userid,
        stockid=stock.stockid,
        comment_text=comment,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.session.add(new_cmt)
    db.session.commit()
    return jsonify({'a':'b'})

@app.route('/comment/update/<commentid>', methods=["PUT"])
@jwt_required()  
def updateComment(commentid):
    emailUser = get_jwt_identity()
    user = Users.query.filter_by(email=emailUser).first()
    comment = Comments.query.filter_by(commentid=commentid).first()
    print(emailUser,'lll')
    if user.userid == comment.userid:
        update_comment_text = request.json.get("commenttext", None)
        comment.comment_text = update_comment_text
        db.session.commit()  
        return jsonify({"message": "Comment updated successfully"}), 200
    else:
        return jsonify({"error": "You are not authorized to update this comment"}), 401

if __name__ == '__main__':
    app.run()