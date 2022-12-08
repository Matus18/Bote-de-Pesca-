
function enviar() {
    var excel = SpreadsheetApp.getActiveSpreadsheet();
    var sheet_configuracion = excel.getSheetByName("Configuracion");
    var plantilla = sheet_configuracion.getRange(1, 2).getValue();
    var token = sheet_configuracion.getRange(2, 2).getValue();
    var api = sheet_configuracion.getRange(3, 2).getValue();
    if (excel.getSheetByName("Mensaje")) {
        var sheet = excel.getSheetByName("Mensaje");
        var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        for (var i = 0, l = rows.length; i < l; i++) {
            var numero = rows[i][0];
            var nombre = rows[i][1];
            var payload = {
                "messaging_product": "whatsapp",
                "to": numero,
                "type": "template",
                "template": {
                    "name": plantilla,
                    "language": {
                        "code": "ese"
                    },
                    "components": [{
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": nombre
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
