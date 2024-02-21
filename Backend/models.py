from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class StockList(db.Model):
    __tablename__ = 'stocklist'

    stockid = db.Column(db.String(50), primary_key=True, nullable=False)
    symboy = db.Column(db.String(10), unique=True, nullable=False)
    company_name = db.Column(db.String(255, collation='utf8mb4_unicode_ci'))
    company_detail = db.Column(db.String(200))
    previous_close_price = db.Column(db.Float, nullable=False)

class StockHistory(db.Model):
    __tablename__ = 'stockhistory'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    stockid = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    open = db.Column(db.Float, nullable=False)
    high = db.Column(db.Float, nullable=False)
    low = db.Column(db.Float, nullable=False)
    close = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=False)

    stocklist = db.relationship('StockList', backref='stockhistory', lazy=True)
    stockid = db.Column(db.String(50), db.ForeignKey('stocklist.stockid'))
