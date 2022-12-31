import requests

ACCESS_TOKEN = "API KEY"
PHONE_NUMBER = "NUMERO TELEFONO"
MESSAGE = "MENSAJE"
url = f"API-URL?access_token={ACCESS_TOKEN}"

# JSON API WHATSAPP
payload = { "messaging_product": "whatsapp",
                "to": PHONE_NUMBER,
                "type": "template",
                "template": {
                    "name": "pedido_enviado_sinpago", #PLANTILLA DE MENSAJE
                    "language": {
                        "code": "es"
                    },
                    "components": [{
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": "Benjamin"
                            },
                            {
                              "type":"text",
                              "text": "$23.990"
                            }
                        ]
                }]
            }
        }

response = requests.post(url, json=payload)

print(response.text)
