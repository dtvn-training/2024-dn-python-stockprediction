import uuid
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from models import db, StockList,StockHistory,StockPrediction, Users, Comments
from sqlalchemy import desc
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import json
import pandas as pd
import numpy as np
import uuid
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'python'

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql://root:1234@127.0.0.1:3306/stock_prediction"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

db.init_app(app)
jwt = JWTManager(app)
CORS(app)
def cusum_filter(dataset, threshold):
    pos_dates, neg_dates = [], []
    pos_sum, neg_sum = 0, 0
    dataset["differences"] = dataset["close"].diff()
    for i, r in dataset.iloc[1:].iterrows():
        pos_sum = max(0, pos_sum + r["differences"])
        neg_sum = min(0, neg_sum + r["differences"])
        if pos_sum > threshold:
            pos_sum = 0  # Reset
            pos_dates.append(i)
        elif neg_sum < -threshold:
            neg_sum = 0  # Reset
            neg_dates.append(i)
    return pos_dates, neg_dates


def detect_peaks(y, lag, threshold, influence):
    signals = np.zeros(len(y))
    filtered_y = np.copy(y)
    avg_filter = np.mean(y[:lag])
    std_filter = np.std(y[:lag])

    for i in range(lag, len(y)):
        if np.abs(y[i] - avg_filter) > threshold * std_filter:
            if y[i] > avg_filter:
                signals[i] = 1  # Positive signal
            else:
                signals[i] = -1  # Negative signal
            if i < len(y) - 1:
                filtered_y[i + 1] = (
                    influence * y[i + 1] + (1 - influence) * filtered_y[i]
                )
        else:
            signals[i] = 0  # No signal
            if i < len(y) - 1:
                filtered_y[i + 1] = y[i + 1]

        avg_filter = np.mean(filtered_y[max(i - lag + 1, 0) : i + 1])
        std_filter = np.std(filtered_y[max(i - lag + 1, 0) : i + 1])

    return signals


def label_tripple_barrier_method(data, length):
    data["tri_barr_point"] = 0
    for i in range(length, len(data) - 1):
        volatility = data["close"].iloc[i - length : i].std()

        upper_barrier = data["close"].iloc[i] + volatility
        lower_barrier = data["close"].iloc[i] - volatility

        if data.iloc[i + 1, 4] > upper_barrier:
            data.loc[i, "tri_barr_point"] = 1
        elif data.iloc[i + 1, 4] < lower_barrier:
            data.loc[i, "tri_barr_point"] = -1
    return data


def predict(df):
    dataema = df.tail(200)
    dataema["ema_point"] = 0
    dataema["EMA5"] = dataema.close.ewm(span=5, adjust=False).mean()
    dataema["EMA20"] = dataema.close.ewm(span=20, adjust=False).mean()
    dataema["EMA50"] = dataema.close.ewm(span=50, adjust=False).mean()
    dataema.loc[
        (dataema["EMA5"] < dataema["EMA20"])
        & (dataema["EMA5"].shift(1) >= dataema["EMA20"].shift(1)),
        "ema_point",
    ] = 1
    dataema.loc[
        (dataema["EMA5"] > dataema["EMA20"])
        & (dataema["EMA5"].shift(1) <= dataema["EMA20"].shift(1)),
        "ema_point",
    ] = -1

    dataema.loc[
        (dataema["EMA20"] < dataema["EMA50"])
        & (dataema["EMA20"].shift(1) >= dataema["EMA50"].shift(1)),
        "ema_point",
    ] = 1
    dataema.loc[
        (dataema["EMA20"] > dataema["EMA50"])
        & (dataema["EMA20"].shift(1) <= dataema["EMA50"].shift(1)),
        "ema_point",
    ] = -1

    threshold_value = 1000
    dataframe = df
    positive_dates, negative_dates = cusum_filter(dataframe, threshold_value)
    df["cusum_point"] = 0
    df.loc[df.index.isin(positive_dates), "cusum_point"] = 1
    df.loc[df.index.isin(negative_dates), "cusum_point"] = -1
    df["ema_point"] = dataema["ema_point"]

    lag = 10
    threshold = 2.5
    influence = 0.3
    df["peak_point"] = detect_peaks(df["close"], lag, threshold, influence)

    df.reset_index(inplace=True)
    df.rename(columns={"index": "date"}, inplace=True)

    data_copy = df.copy()
    data_label = label_tripple_barrier_method(data_copy, 20)
    return data_label


def combine_labels(row):
    if row.sum() >= 1:
        return 1
    elif row.sum() <= -1:
        return -1
    else:
        return 0
    
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
    dates = []
    opens = []
    highs = []
    lows = []
    closes = []
    volumes = []
    for stock_info in stock_infos:
        dates.append(stock_info.date.strftime('%Y-%m-%d'))
        opens.append(stock_info.open)
        highs.append(stock_info.high)
        lows.append(stock_info.low)
        closes.append(stock_info.close)
        volumes.append(stock_info.volume)
    data = {
        "dates": dates,
        "open": opens,
        "high": highs,
        "low": lows,
        "close": closes,
        "volume": volumes,
    }
    df = pd.DataFrame(data)
    data_label = predict(df)
    label_combine_feature = ["ema_point", "cusum_point", "peak_point", "tri_barr_point"]
    data_label["combined_label"] = data_label[label_combine_feature].apply(
        combine_labels, axis=1
    )
    chart_data = {
        "dates": df["dates"].tolist(),
        "open": df["open"].tolist(),
        "high": df["high"].tolist(),
        "low": df["low"].tolist(),
        "close": df["close"].tolist(),
        "volume": df["volume"].tolist(),
    }
    dataSource = []
    for i in range(len(chart_data["dates"])):
        data_point = {
            "Date": chart_data["dates"][i],
            "Open": chart_data["open"][i],
            "High": chart_data["high"][i],
            "Low": chart_data["low"][i],
            "Close": chart_data["close"][i],
            "Volume": chart_data["volume"][i],
        }
        dataSource.append(data_point)

    close_prices = data_label["close"].values
    combined_labels = data_label["combined_label"].values
    last_label = combined_labels[-1]
    num_points = 20
    x_values = np.linspace(
        len(close_prices) - 1, len(close_prices) - 1 + num_points, num_points
    )
    plt.figure(figsize=(6, 3))
    plt.plot(close_prices, label="Close Prices")
    if last_label == 1:
        y_values_parabol = (
            5 * (x_values - len(close_prices) + 1) ** 2 + close_prices[-1]
        )
        plt.plot(
            x_values,
            y_values_parabol,
            color="green",
            linestyle="--",
            label="line prediction",
        )
    elif last_label == -1:
        y_values_parabol = (
            -5 * (x_values - len(close_prices) + 1) ** 2 + close_prices[-1]
        )
        plt.plot(
            x_values,
            y_values_parabol,
            color="red",
            linestyle="--",
            label="line prediction",
        )
    else:
        y_values_parabol = np.full_like(x_values, fill_value=close_prices[-1])
        plt.plot(x_values, y_values_parabol, linestyle="--", label="line prediction")

    plt.xlabel("Time")
    plt.ylabel("Close Prices")
    plt.title("Trend Prediction")

    close_prices = data_label["close"].values
    combined_labels = data_label["combined_label"].values
    last_label = combined_labels[-1]
    num_points = 20
    x_values = np.linspace(
        len(close_prices) - 1, len(close_prices) - 1 + num_points, num_points
    )
    plt.figure(figsize=(6, 3))
    plt.plot(close_prices, label="Close Prices")
    if last_label == 1:
        y_values_parabol = (
            5 * (x_values - len(close_prices) + 1) ** 2 + close_prices[-1]
        )
        plt.plot(
            x_values,
            y_values_parabol,
            color="green",
            linestyle="--",
            label="line prediction",
        )
    elif last_label == -1:
        y_values_parabol = (
            -5 * (x_values - len(close_prices) + 1) ** 2 + close_prices[-1]
        )
        plt.plot(
            x_values,
            y_values_parabol,
            color="red",
            linestyle="--",
            label="line prediction",
        )
    else:
        y_values_parabol = np.full_like(x_values, fill_value=close_prices[-1])
        plt.plot(x_values, y_values_parabol, linestyle="--", label="line prediction")

    plt.xlabel("Time")
    plt.ylabel("Close Prices")
    plt.title("Trend Prediction")
    plt.legend()
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    plt.close()
    img_predict = base64.b64encode(img_buffer.getvalue()).decode("utf-8")
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
                userid='user_id_placeholder',  # You need to replace this with the actual user ID
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
@app.route('/admin/predictions/<stockCode>', methods=['POST'])
def predictions(stockCode):
    # print(stockCode)
    stock = StockList.query.filter_by(symbol=stockCode).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    if request.method == 'POST':
        data = request.get_json()
        new_text_prediction = data.get('textPrediction') 
        stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()
        if not stock_prediction:
            
            stock_prediction = StockPrediction(
                stockid=stock.stockid,
                userid=data.get('userid'),  
                date=datetime.now(),
                text_prediction=new_text_prediction
            )
            db.session.add(stock_prediction)
        else:
            stock_prediction.text_prediction = new_text_prediction
        db.session.commit()
        return jsonify({'success': True, 'predictionId': stock_prediction.predictionid}), 200

@app.route('/user/predictions/<stockCode>')
def get_predictions(stockCode):
    stock = StockList.query.filter_by(symbol=stockCode).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()
    if not stock_prediction:
        return jsonify({'error': 'Prediction not found for this stock'}), 404
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
    print(access_token,'access_token')
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

 
@app.route("/")
def hello_world():
    return "Hello, World!"

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
    user_exists = Users.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"error": "Email already exists"}), 400
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
    return jsonify({"success": "User registered successfully"})

@app.route('/getAllStocks', methods=['GET'])
def get_stock_lists():

    stockArr = StockList.query.all()
    history = StockHistory.query.all()
    stocks=[]
    for stock in stockArr:
        # print(stock,'..')
        stock_info = (
            StockHistory.query.filter_by(stockid=stock.stockid)
            .order_by(StockHistory.date.desc())
            .limit(2)
        )
        # print(stock_info[0].open - stock_info[1].close)
         
        stock = {
            "id":stock.stockid,
            "stockid": stock.stockid,
            "symbol": stock.symbol,
            "company_name": stock.company_name,
            "company_detail": stock.company_detail,
            "previous_close_price": stock.previous_close_price,
            "date": str(stock_info[0].date),
            "open": stock_info[0].open,
            "high": stock_info[0].high,
            "low": stock_info[0].low,
            "percent": (stock_info[0].open - stock.previous_close_price)*100/stock.previous_close_price,
            "diffirence": stock_info[0].open - stock.previous_close_price, 
            "volume": stock_info[0].volume,
        }
        stocks.append(stock)

    return (
        jsonify(stocks)
    )

@app.route('/userprofile', methods=['GET', 'POST'])
@jwt_required()
def user_profile():
    if request.method == 'GET':
        email_user = get_jwt_identity()
        user = Users.query.filter_by(email=email_user).first()
        user_get_by_email = {
            "fullname": user.fullname,
            "email": user.email,
            "password": user.password
        }
        return jsonify(user_get_by_email)
    # if request.method == 'POST':
    #     fullname = request.json.get('fullname')  # Lấy fullname từ dữ liệu JSON gửi lên
    #     password = request.json.get('password')
    #     email = request.json.get('email')
    #     user = Users.query.filter_by(email=email).first()
    #     user.fullname = fullname
    #     user.password = password
    #     db.session.commit()  
    #     return jsonify({"message": "Updated profile successfully."}), 200
@app.route('/comment/showAll/<symbol>', methods=['GET'])
def get_comment_lists(symbol):
    stock = StockList.query.filter_by(symbol=symbol).first()
    print(stock,'stock cmmttt',symbol)
    commentArr = Comments.query.filter_by(stockid=stock.stockid).all()
    current_time = datetime.now()
    commentStock=[]
    # print(commentArr,'cmt arr')
    for commentObject in commentArr:
        user = Users.query.filter_by(userid=commentObject.userid).first()
        tokenUser = create_access_token(identity=user.email)
        # Calculate the time difference
        time_difference = current_time - commentObject.updated_at
        total_seconds = time_difference.total_seconds()
        # Calculate hours, minutes, and seconds
        hours = int(total_seconds // 3600)
        minutes = int((total_seconds % 3600) // 60)
        time = f"{hours} giờ, {minutes} phút"
        print(user.fullname,'name')
        comment = {
            "commentid": commentObject.commentid,
            "name": str(user.fullname),
            "userToken": str(tokenUser),
            "stockid": commentObject.stockid,
            "comment_text":commentObject.comment_text,
            "updated_at":time,
        }
        commentStock.append(comment)
         
    # print(commentStock,'cmt stock')
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
    print(symbol,'a',stock,'lkjhgg')
 
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
        print(update_comment_text,'new cmt',comment)
        comment.comment_text = update_comment_text
        db.session.commit()  
        
        return jsonify({"message": "Comment updated successfully"}), 200
    else:
        return jsonify({"error": "You are not authorized to update this comment"}), 401

if __name__ == '__main__':
    app.run()