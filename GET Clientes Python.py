import requests
import gspread
from pprint import pprint

url = 'https://api.bsale.cl/v1/clients.json?limit=50&offset=350'  
headers = {'Content-Type':'application/json','access_token':'API KEY'}
response = requests.get(url, headers=headers)
print(response.status_code)
    
gc = gspread.service_account(filename= 'api_botedepesca.json')
sh = gc.open_by_key('1_Rkit6ZWYAufAmZOq7g6krB_Y8hge8_GBSOe0x8CBGE')
worksheet = sh.sheet1#Hoja boletas bsale


if response.status_code == 200:
    response_json = response.json()   
    origin = response_json['items']
        
    for items in origin:
            res = (items['id'],items['firstName'],items['lastName'],items['company'],items['phone'],items['address'],items['municipality'],items['city'])
            
