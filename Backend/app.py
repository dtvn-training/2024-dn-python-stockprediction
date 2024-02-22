from flask import Flask, jsonify, render_template,request
from flask_sqlalchemy import SQLAlchemy
from models import db, StockList,StockHistory,StockPrediction
from sqlalchemy import desc
from flask_cors import CORS
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import json
import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio
from datetime import datetime


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql://root:Ncgncg1102@localhost:3306/stock_prediction"
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
        .limit(200)
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

    # Tạo DataFrame từ dữ liệu
    data = {
        'Date': dates,
        'Open': opens,
        'High': highs,
        'Low': lows,
        'Close': closes,
        'Volume': volumes
    }

    df = pd.DataFrame(data)
    
    # Tính toán các đường trung bình động
    df['SMA5'] = df['Close'].rolling(5).mean()
    df['SMA20'] = df['Close'].rolling(20).mean()
    df['SMA50'] = df['Close'].rolling(50).mean()
    df['SMA75'] = df['Close'].rolling(75).mean()

    chart_data = {
        'dates': df.index.tolist(),
        'open': df['Open'].tolist(),
        'high': df['High'].tolist(),
        'low': df['Low'].tolist(),
        'close': df['Close'].tolist(),
        'volume':df['Volume'].tolist(),
        'sma5': df['SMA5'].tolist(),
        'sma20': df['SMA20'].tolist(),
        'sma50': df['SMA50'].tolist(),
        'sma75': df['SMA75'].tolist(),
    }

# Gửi dữ liệu JSON về frontend
    return jsonify({'chart_data': chart_data})

@app.route('/stock/<stockCode>', methods=['GET','POST','UPDATE'],)
def get_stock_list(stockCode):


    stock = StockList.query.filter_by(symboy=stockCode).first()

    if request.method == 'POST':
        # Handle POST request to update text_prediction
        data = request.get_json()

        new_text_prediction = data.get('text_prediction')

        if not stock:
            return jsonify({'error': 'Stock not found'}), 404

        stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()

        if not stock_prediction:
            # Create a new StockPrediction record if it doesn't exist
            stock_prediction = StockPrediction(
                stockid=stock.stockid,
                userid='user_id_placeholder',  # You need to replace this with the actual user ID
                date=datetime.now(),
                text_prediction=new_text_prediction
            )
            db.session.add(stock_prediction)
        else:
            # Update the existing StockPrediction record
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
        new_text_prediction = data.get('textPrediction')  # Adjust to match the frontend's field name
        
        stock_prediction = StockPrediction.query.filter_by(stockid=stock.stockid).first()

        if not stock_prediction:
            # Create a new StockPrediction record if it doesn't exist
            stock_prediction = StockPrediction(
                stockid=stock.stockid,
                userid=data.get('userid'),  # Replace with the actual user ID
                date=datetime.now(),
                text_prediction=new_text_prediction
            )
            db.session.add(stock_prediction)
        else:
            # Update the existing StockPrediction record
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

if __name__ == '__main__':
    app.run()
