import requests
from bs4 import BeautifulSoup
import pandas as pd
from ast import literal_eval  
import mysql.connector
host = 'localhost'
user = 'root'
password = 'Ncgncg1102@'
database = 'stock_prediction'
def get_data_from_web(bank):
    print('bank', bank)
    url = f'https://simplize.vn/co-phieu/{bank}/lich-su-gia'
    response = requests.get(url)
    datas = {}
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
            datas[today] = stockHistory
    return datas
def crawl(bankss):
    data = {}
    for  bank in bankss:
        data[bank] = {}
        data[bank] = get_data_from_web(bank)
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

def data_insert(banklist,stockids):
    data=crawl(banklist)
    data_historys=[]
    for symbol in banklist:
        data_historys.append(data[symbol])

    data_history_dfs=[]
    for data_history in data_historys:
        data_history_dfs.append(convert_dict_to_df(data_history))
    i=0
    data_inserts = []
    for  dataframe in  data_history_dfs:
        for index, row in dataframe.iterrows():
            date = row.name.date()  
            open_price = row['open']  
            high_price = row['high'] 
            low_price = row['low']  
            close_price = row['close']  
            volume = row['volume']  
            record = (stockids[i],str(date), open_price, high_price, low_price, close_price, volume)
            data_inserts.append(record)
        i += 1
    return data_inserts
def insertdb(data_inserts):
    try:
        conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        if conn.is_connected():
            print("Connected to MySQL")
            
            cursor = conn.cursor()
            insert_stock_hist_query = "INSERT INTO stockhistory (stockid, date, open, high, low, close, volume) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            cursor.executemany(insert_stock_hist_query, data_inserts)
            conn.commit()

            cursor.close()
            conn.close()

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()