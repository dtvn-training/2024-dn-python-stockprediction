from selenium import webdriver
from bs4 import BeautifulSoup

import time

banks_hose = ['ACB', 'BID', 'CTG','EIB', 'HDB', 'MBB', 'MSB','OCB','SHB','SSB','STB','TCB','TPB','VCB','VIB','VPB']
banks_hnx = ['NVB', 'BAB']
data = {"symbol":{}}
driver = webdriver.Chrome()

class Stock:
    def __init__(self, date, open, high, low, close, volume):
        self.date = date
        self.open = open
        self.high = high
        self.low = low
        self.close = close
        self.volume = volume

url = 'https://simplize.vn/co-phieu/MBB/lich-su-gia'
driver.get(url)
time.sleep(5)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

tbody = soup.find('tbody', class_='simplize-table-tbody')
tr_simplize_table_row = tbody.findAll('tr',class_='simplize-table-row')
for tr in tr_simplize_table_row:
    # print('tr',tr)
    h6_css_cvilom = tr.findAll('h6',class_='css-cvilom')
    for h6 in h6_css_cvilom:
        print(h6.text.strip())
    # print('h6',h6_css_cvilom[0])
    date = h6_css_cvilom[0].text.strip()
    open = h6_css_cvilom[1].text.strip()
    high = h6_css_cvilom[2].text.strip()
    low = h6_css_cvilom[3].text.strip()
    close = h6_css_cvilom[4].text.strip()
    volume = h6_css_cvilom[5].text.strip()
    data['MBB'] = Stock(date, open, high, low, close, volume)

# print(data,'data') 
# Mở hoặc tạo một tệp với chế độ ghi ('w')
with open('data.json', 'w') as json_file:
    file.write(data)





