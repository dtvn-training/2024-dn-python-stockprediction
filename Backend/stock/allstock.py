from models import StockHistory, StockList
from datetime import datetime, timedelta


def allstock(stockArr):
    stocks = []
    for stock in stockArr:
        stock_info = (
            StockHistory.query.filter_by(stockid=stock.stockid)
            .order_by(StockHistory.date.desc())
            .limit(2)
        )
        stock = {
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
    return stocks

def get_stock_by_date(date):

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
    
    stocks = StockList.query.all()

    for stock in stocks:
        dataStock = [item for item in dataQueryByDate if item.stockid == stock.stockid]
        diffirenceVolume = dataStock[0].close - dataStock[1].close
        stockDetail = {
            "id": stock.stockid,
            "stockid": stock.stockid,
            "symbol": stock.symbol,
            "company_name": stock.company_name,
            "company_detail": stock.company_detail,
            "previous_close_price": dataStock[0].close,
            "date": str(queryDate),
            "open": dataStock[1].open,
            "high": dataStock[1].high,
            "low": dataStock[1].low,
            "percent": (diffirenceVolume)*100/dataStock[0].close,
            "diffirence": diffirenceVolume,
            "volume": dataStock[1].volume,
        }
        dashboardData.append(stockDetail)
    return dashboardData
def get_top_stock(date):

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
    
    stocks = StockList.query.all()

    for stock in stocks:
        dataStock = [item for item in dataQueryByDate if item.stockid == stock.stockid]
        diffirenceVolume = dataStock[0].close - dataStock[1].close
        stockDetail = {
            "id": stock.stockid,
            "stockid": stock.stockid,
            "symbol": stock.symbol,
            "previous_close_price": dataStock[0].close,
            "date": str(queryDate),
            "percent": (diffirenceVolume)*100/dataStock[0].close,
            "diffirence": diffirenceVolume,
            "volume": dataStock[1].volume,
        }
        dashboardData.append(stockDetail)

    dashboardData_sorted = sorted(dashboardData, key=lambda x: x["percent"], reverse=True)
    top_3_highest_percent = dashboardData_sorted[:4]
    top_3_lowest_percent = dashboardData_sorted[-4:]
    
    return top_3_highest_percent,top_3_lowest_percent
