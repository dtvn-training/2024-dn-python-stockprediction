from models import StockHistory


def allstock(stockArr):
    stocks = []
    for stock in stockArr:
        stock_info = (
            StockHistory.query.filter_by(stockid=stock.stockid)
            .order_by(StockHistory.date.desc())
            .limit(2)
        )
        stock = {
            "id": stock.stockid,
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
