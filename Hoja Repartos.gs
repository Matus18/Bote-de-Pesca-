// CHANGE SHEET NAMES TO YOUR SHEET NAMES
// THESE ARE EXAMPLES

// FECHA ACTUAL
function fechaActual() {
  var mensaje = new Date();
  Logger.log(mensaje);
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("REPARTOS");
  Logger.log(hoja);
  hoja.getRange(1,1).setValue(mensaje)
}

// DATOS DE "BSALE" A "REPARTOS" (APPEND ONLY X FECHA)
function moverHojaBsale_Repartos() {
  var dest = SpreadsheetApp.openById('1kbEywmw5EKJt91abU4QHB8XzbEPKupFtHSaY8ViH0ac');
  var rangoDest = dest.getSheetByName("REPARTOS").getRange("A2:H70")
  var hojaOrigen = SpreadsheetApp.getActive().getSheetByName("BSALE")
  var datosOrigen = hojaOrigen.getRange("A2:H70").getValues();
  rangoDest.setValues(datosOrigen);
}

// DESPACHADO SIN PAGO DE TARJETA
function cuentas_x_cobrar(){
  // BOTON DESPACHADO A HOJA
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("CUENTAS X COBRAR");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,12).getValue() == "Despachado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,2).getValue();
  const apellido2 = hojaOri.getRange(filaActiva,3).getValue();
  const n_bole = hojaOri.getRange(filaActiva,7).getValue();
  const monto_total = hojaOri.getRange(filaActiva,8).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,1).getValue();
  const numero_telefono = hojaOri.getRange(filaActiva,6).getValue();
  hojaDesti.appendRow([nombre,apellido2,n_bole,monto_total,fecha_boleta])
  
// WHATSAPP API
  var sheet_configuracion = libro.getSheetByName("confi");
  var plantilla = sheet_configuracion.getRange(1, 2).getValue();
  var token = sheet_configuracion.getRange(2, 2).getValue();
  var api = sheet_configuracion.getRange(3, 2).getValue();
  if (libro.getSheetByName("REPARTOS")) {
        var sheet = libro.getSheetByName("REPARTOS");
        var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        for (var i = 0, l = rows.length; i < l; i++) {
            var numero = rows[i][5];
            var nombres = rows[i][1];
            var monto = rows[i][7];
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
  
  var ss = SpreadsheetApp.getActive().getSheetByName("REPARTOS");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 12).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][11] == "Despachado"){
      ss.deleteRow(i+2);
    }
  }
}
}

// DESPACHADO CON PAGO DE TARJETA
function cuentas_pagadas(){
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("CUENTAS PAGADAS");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,11).getValue() == "Pagado", hojaOri.getRange(filaActiva,12).getValue() == "Despachado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,2).getValue();
  const apellido1 = hojaOri.getRange(filaActiva,3).getValue();
  const n_bole = hojaOri.getRange(filaActiva,7).getValue();
  const monto_total = hojaOri.getRange(filaActiva,8).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,1).getValue();
  hojaDesti.appendRow([nombre,apellido1,n_bole,monto_total,fecha_boleta])
  var sheet_configuracion = libro.getSheetByName("confi");
  var plantilla = sheet_configuracion.getRange(4, 2).getValue();
  var token = sheet_configuracion.getRange(2, 2).getValue();
  var api = sheet_configuracion.getRange(3, 2).getValue();
  if (libro.getSheetByName("REPARTOS")) {
        var sheet = libro.getSheetByName("REPARTOS");
        var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        for (var i = 0, l = rows.length; i < l; i++) {
            var numero = rows[i][5];
            var nombres = rows[i][1];
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
  
  var ss = SpreadsheetApp.getActive().getSheetByName("REPARTOS");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 12).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][11] == "Despachado"){
      ss.deleteRow(i+2);
    }
  }
  }
}
