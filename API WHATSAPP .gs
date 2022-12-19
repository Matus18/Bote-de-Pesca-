 function whatsapps(){
  var excel = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_configuracion = excel.getSheetByName("confi");
  var plantilla = sheet_configuracion.getRange(1, 2).getValue();
  var token = sheet_configuracion.getRange(2, 2).getValue();
  var api = sheet_configuracion.getRange(3, 2).getValue();
  if (excel.getSheetByName("CUENTAS X COBRAR")) {
        var sheet = excel.getSheetByName("CUENTAS X COBRAR");
        var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        for (var i = 0, l = rows.length; i < l; i++) {
            var numero = rows[i][5];
            var nombres = rows[i][0];
            var monto = rows[i][3];
            var payload = {
                "messaging_product": "whatsapp",
                "to": numero,
                "type": "template",
                "template": {
                    "name": plantilla,
                    "language": {
                        "code": "es"
                    },
                    "components": [{
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": nombres
                            },
                            {
                              "type":"text",
                              "text": monto
                            }
                        ]
                    }]
                }
            }
            var options =
            {
              'headers': { "Content-Type": "application/json","Authorization": token},
                'method': "POST",
                'payload': JSON.stringify(payload)
            };
            try {
                var response = UrlFetchApp.fetch(api, options);
                var json = JSON.parse(response.getContentText());
            } catch (e) {
            }
        }
    }
  }
