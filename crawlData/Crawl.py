import requests
import json
from datetime import datetime, timedelta

api_key = 'FCI82WGNQZFPXU2Y'
symbol = 'IBM'
interval = '5min'  # Chọn interval tùy ý: '1min', '5min', '15min', '30min', '60min'

# Tùy chọn: adjusted, extended_hours, day, outputsize, datatype
adjusted = True  # True hoặc False
extended_hours = True  # True hoặc False
# Lấy ngày của tháng trước
day_last_month = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
outputsize = 'compact'  # 'compact' hoặc 'full'
datatype = 'json'  # 'json' hoặc 'csv'

# Tạo URL dựa trên các tham số đã chọn
url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&interval={interval}&adjusted={adjusted}&extended_hours={extended_hours}&day={day_last_month}&outputsize={outputsize}&datatype={datatype}&apikey={api_key}'

# Gửi yêu cầu API và lấy dữ liệu
response = requests.get(url)

# Kiểm tra xem yêu cầu có thành công không (status code 200)
if response.status_code == 200:
    # Parse dữ liệu JSON
    data = response.json()

    # Lưu dữ liệu vào một tệp JSON
    with open('stock_data.json', 'w') as json_file:
        json.dump(data, json_file)

    print("Dữ liệu đã được lưu vào 'stock_data.json'")
else:
    print(f"Lỗi: {response.status_code}")
