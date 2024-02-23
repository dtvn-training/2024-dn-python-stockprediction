from flask import Flask, jsonify, render_template,request
from flask_sqlalchemy import SQLAlchemy
from models import db, StockList,StockHistory,StockPrediction, Users
from sqlalchemy import desc
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import json
import pandas as pd
from datetime import datetime
import numpy as np
import uuid
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql://root:123456@localhost:3306/stock_prediction"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.init_app(app)

@app.route('/stock-chart/<stockCode>')
def stockchart(stockCode):
    stock = StockList.query.filter_by(symboy=stockCode).first()

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
        'Date': dates,
        'Open': opens,
        'High': highs,
        'Low': lows,
        'Close': closes,
        'Volume': volumes
    }
    df = pd.DataFrame(data)
    df['SMA5'] = df['Close'].rolling(5).mean()
    df['SMA20'] = df['Close'].rolling(20).mean()
    df['SMA50'] = df['Close'].rolling(50).mean()
    df['SMA75'] = df['Close'].rolling(75).mean()
    df.replace({np.nan: None}, inplace=True)
    chart_data = {
        "dates": df["Date"].tolist(),
        "open": df["Open"].tolist(),
        "high": df["High"].tolist(),
        "low": df["Low"].tolist(),
        "close": df["Close"].tolist(),
        "volume": df["Volume"].tolist(),
        "sma5": df["SMA5"].tolist(),
        "sma20": df["SMA20"].tolist(),
        "sma50": df["SMA50"].tolist(),
        "sma75": df["SMA75"].tolist(),
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
    plt.figure(figsize=(5, 3))
    plt.plot(df['Date'], df['SMA5'], label='SMA5')
    plt.plot(df['Date'], df['SMA20'], label='SMA20')
    plt.plot(df['Date'], df['SMA50'], label='SMA50')
    plt.plot(df['Date'], df['SMA75'], label='SMA75')
    plt.ylabel('SMA Values')
    plt.legend()
    plt.gca().xaxis.set_major_locator(plt.MaxNLocator(nbins=5))
    plt.title('SMA Line Chart')
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    plt.close()
    img_base64 = base64.b64encode(img_buffer.getvalue()).decode('utf-8')
    return jsonify({"chart_data": dataSource,"chart_SMA":img_base64})

@app.route('/stock/<stockCode>', methods=['GET','POST','UPDATE'],)
def get_stock_list(stockCode):
    stock = StockList.query.filter_by(symboy=stockCode).first()
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
@app.route('/admin/predictions/<stockCode>', methods=['POST'])
def predictions(stockCode):
    stock = StockList.query.filter_by(symboy=stockCode).first()
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
    stock = StockList.query.filter_by(symboy=stockCode).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()
    if not stock_prediction:
        return jsonify({'error': 'Prediction not found for this stock'}), 404
    return jsonify({'textPrediction': stock_prediction.text_prediction}), 200

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
    return jsonify({"success": "User registered successfully"}), 201

if __name__ == '__main__':
    app.run()
