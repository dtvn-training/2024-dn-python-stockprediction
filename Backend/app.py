from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, StockList,StockHistory
import json
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:Ncgncg1102@localhost:3306/stock_prediction"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.init_app(app)

@app.route('/stock/<stockCode>', methods=['GET'])
def get_stock_list(stockCode):
    
    stock = StockList.query.filter_by(symboy=stockCode).first()
    stock_info = StockHistory.query.filter_by(symboy=stockCode).order_by(StockHistory.date.desc()).first()
    if not stock:
        return jsonify({'error': 'Stock not found'}), 404
    stock_dict = {
        'stockid': stock.stockid,
        'symboy': stock.symboy,
        'company_name': stock.company_name,
        'company_detail': stock.company_detail,
        'previous_close_price': stock.previous_close_price,
        # 'date': stock_info.date,
        # 'open': stock_info.open,
        # 'high': stock_info.high,
        # 'low': stock_info.low,
        # 'close':stock_info.close,
        # 'volume':stock_info.volume
    }
    

    return jsonify(stock_dict), 200, {'Content-Type': 'application/json; charset=utf-8'}

if __name__ == '__main__':
    app.run()
