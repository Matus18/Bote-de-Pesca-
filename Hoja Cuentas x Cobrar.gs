function pagado_cuentas(){
  // BOTON DESPACHADO A HOJA
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("CUENTAS PAGADAS");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,8).getValue() == "Pagado_2"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,1).getValue();
  const apellido2 = hojaOri.getRange(filaActiva,2).getValue();
  const n_bole = hojaOri.getRange(filaActiva,3).getValue();
  const monto_total = hojaOri.getRange(filaActiva,4).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,5).getValue();
  hojaDesti.appendRow([nombre,apellido2,n_bole,monto_total,fecha_boleta])
  var ss = SpreadsheetApp.getActive().getSheetByName("CUENTAS X COBRAR");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 8).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][7] == "Pagado_2"){
      ss.deleteRow(i+2);
    }
  }
}
}

function insistir(){
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOrig = libro.getActiveSheet();
  const filaActiva1 = hojaOrig.getActiveCell().getRow();
  var sheet_configuracion = libro.getSheetByName("confi");
  var plantilla = sheet_configuracion.getRange(5, 2).getValue();
  var token = sheet_configuracion.getRange(2, 2).getValue();
  var api = sheet_configuracion.getRange(3, 2).getValue();
  const nombresito = hojaOrig.getRange(filaActiva1,1).getValue();
  const numero_telefono12 = hojaOrig.getRange(filaActiva1,6).getValue();
  if (hojaOrig.getRange(filaActiva1,7).getValue() == "Enviar"){
  var payload = {
                "messaging_product": "whatsapp",
                "to": numero_telefono12,
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
                                "text": nombresito
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
