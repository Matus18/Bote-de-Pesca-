import requests
import gspread
from datetime import datetime

#TIEMPO UNIX A FECHA ACTUAL
timestamp = datetime.today().timestamp()

#BOLETA MANUAL 
access_token ='API KEY'
url = 'https://api.bsale.cl/v1/documents.json?documenttypeid=10&emissiondate={}'.format(timestamp)  
#url = 'https://api.bsale.cl/v1/documents.json?documenttypeid=10&expand&limit=50&offset=642'  
headers = {'Content-Type':'application/json','access_token':'96e6b15f45e9eb8b8755d67c3d22d490d214d5bb'}
response = requests.get(url, headers=headers)

#GOOGLE SHEETS
gc = gspread.service_account(filename= 'api_botedepesca.json')
sh = gc.open_by_key('1kbEywmw5EKJt91abU4QHB8XzbEPKupFtHSaY8ViH0ac')
worksheet = sh.sheet1 #Hoja boletas bsale
print(response.status_code)

#CONDICION Y EXTRACCIÓN DE DATOS JSON
if response.status_code == 200:
    response_json = response.json()
    origin = response_json['items']

    for items in origin:
        res = (items['client']['id'],items['number'],items['emissionDate'],items['totalAmount'],items['urlPdfOriginal'])
        user = worksheet.append_row(res)
