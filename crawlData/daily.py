import requests
from bs4 import BeautifulSoup
import time
import schedule
import mysql.connector
import json
import uuid
import pandas as pd
from ast import literal_eval  

banks_hose = ['ACB', 'BID', 'CTG','EIB', 'HDB', 'MBB', 'MSB','OCB','SHB','SSB','STB','TCB','TPB','VCB','VIB','VPB']
banks_hnx = ['NVB', 'BAB']
banks=['ACB', 'BID', 'CTG','EIB', 'HDB', 'MBB', 'MSB','OCB','SHB','SSB','STB','TCB','TPB','VCB','VIB','VPB','NVB', 'BAB']
data = {}
host = 'localhost'
user = 'root'
password = 'Ncgncg1102'
database = 'stock_prediction'


def get_data_from_web(bank):
    print('bank', bank)
    url = f'https://simplize.vn/co-phieu/{bank}/lich-su-gia'
    response = requests.get(url)
    data = {}
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        tbody = soup.find('tbody', class_='simplize-table-tbody')
        if tbody:
            tr_simplize_table_row = tbody.find_all('tr', class_='simplize-table-row')
            h6_css_cvilom_today = tr_simplize_table_row[0].find_all('h6', class_='css-cvilom')
            h6_css_cvilom_yesterday = tr_simplize_table_row[1].find_all('h6', class_='css-cvilom')
            stockHistory = {}
            today = h6_css_cvilom_today[0].text.strip()
            stockHistory['open'] = h6_css_cvilom_today[1].text.strip().replace('-', '0')
            stockHistory['high'] = h6_css_cvilom_today[2].text.strip().replace('-', '0')
            stockHistory['low'] = h6_css_cvilom_today[3].text.strip().replace('-', '0')
            stockHistory['close'] = h6_css_cvilom_today[4].text.strip().replace('-', '0')
            stockHistory['volume'] = h6_css_cvilom_today[5].text.strip().replace('-', '0')
            stockHistory['close_yesterday'] = h6_css_cvilom_yesterday[4].text.strip().replace('-', '0')
            stockHistory['volume_yesterday'] = h6_css_cvilom_yesterday[5].text.strip().replace('-', '0')
            data[today] = stockHistory
    return data
def crawl(banks_hose,banks_hnx):
    for  bank in banks_hose:
        data[bank] = {}
        data[bank] = get_data_from_web(bank)
    for bank in banks_hnx:
        data[bank] = {}
        data[bank] = get_data_from_web(bank)
    print(data)
    return data

def convert_str_to_float(str_num):
   return float(str_num.replace(',', ''))
def convert_dict_to_df(data_dict):
    data = {key: literal_eval(value.replace(',', '')) if isinstance(value, str) and ',' in value else value for key, value in data_dict.items()}
    df = pd.DataFrame.from_dict(data, orient='index')
    df.index = pd.to_datetime(df.index, format='%d/%m/%Y')
    df = df.map(convert_str_to_float)
    df=df.sort_index(ascending=True)
    return df

data=crawl(banks_hose,banks_hnx)
data_historys=[]
for symbol in banks:
  data_historys.append(data[symbol])
data_history_dfs=[]
for data_history in data_historys:
    data_history_dfs.append(convert_dict_to_df(data_history))

data_history_inserts = []

for  dataframe in  data_history_dfs:
    for index, row in dataframe.iterrows():
        print(index)
        date = row.name.date()  
        open_price = row['open']  
        high_price = row['high'] 
        low_price = row['low']  
        close_price = row['close']  
        volume = row['volume']  
        record = ( str(date), open_price, high_price, low_price, close_price, volume)
        data_history_inserts.append(record)

print(data_history_inserts)


# schedule.every(1).minutes.do(crawl, banks_hose=banks_hose,banks_hnx=banks_hnx)
# while True:
#     schedule.run_pending()
#     time.sleep(1)