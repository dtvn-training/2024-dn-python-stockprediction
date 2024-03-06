from models import StockHistory, StockList, StockFollow
from datetime import datetime, timedelta


def get_history_by_date(date):
    queryDate = datetime.strptime(date, '%Y-%m-%d')
    dayOfWeek = queryDate.weekday()
    dashboardData = []
    if (dayOfWeek==5 or dayOfWeek==6):
        return dashboardData
    elif(dayOfWeek==0):
        beforeOneDay = queryDate - timedelta(days=3)
    else:
        beforeOneDay = queryDate - timedelta(days=1)
    dataQueryByDate = StockHistory.query.filter(StockHistory.date.in_([queryDate, beforeOneDay])).all()

    return dataQueryByDate

def get_history_stock(stockList,date):
    dashboardData=[]
    dataQueryByDate = get_history_by_date(date)
    for stock in stockList:
        dataStock = [item for item in dataQueryByDate if item.stockid == stock.stockid]
        diffirenceVolume = dataStock[0].close - dataStock[1].close
        stockDetail = {
            "id": stock.stockid,
            "stockid": stock.stockid,
            "symbol": stock.symbol,
            "company_name": stock.company_name,
            "company_detail": stock.company_detail,
            "previous_close_price": dataStock[0].close,
            "date": str(date),
            "open": dataStock[1].open,
            "high": dataStock[1].high,
            "low": dataStock[1].low,
            "percent": (diffirenceVolume)*100/dataStock[0].close,
            "diffirence": diffirenceVolume,
            "volume": dataStock[1].volume,
        }
        dashboardData.append(stockDetail)
    return dashboardData

def get_stock_history(date):
    stocks = StockList.query.all()  
    dashboardData = get_history_stock(stocks,date)
    
    return dashboardData

def get_follow_stock(userID,date):

    followList = StockFollow.query.filter_by(userID=userid).all()

    listStock=[]
    for stockFollow in followList:
        stock = StockList.query.filter_by(stockFollow=stockid)
        listStock.append(stockFollow)
    followData = get_history_stock(listStock,date)

    return followData
