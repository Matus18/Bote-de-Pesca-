// CHANGE SHEET NAMES TO YOUR SHEET NAMES
// THESE ARE EXAMPLES

// FECHA ACTUAL
function fechaActual() {
  var mensaje = new Date();
  Logger.log(mensaje);
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SHEET_DATA");
  Logger.log(hoja);
  hoja.getRange(1,12).setValue(mensaje)
}

// DESPACHADO SIN PAGO DE TARJETA
function cuentas_x_cobrar(){
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("DATA_SHEET");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,11).getValue() == "Despachado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,2).getValue();
  const n_bole = hojaOri.getRange(filaActiva,6).getValue();
  const monto_total = hojaOri.getRange(filaActiva,7).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,1).getValue();
  hojaDesti.appendRow([nombre, n_bole,monto_total,fecha_boleta])
  }
  var ss = SpreadsheetApp.getActive().getSheetByName("REPARTOS");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 11).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][10] == "Despachado"){
      ss.deleteRow(i+2);
    }
  }
}

// DESPACHADO CON PAGO DE TARJETA
function cuentas_pagadas(){
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("DATA_SHEET2");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,10).getValue() == "Pagado", hojaOri.getRange(filaActiva,11).getValue() == "Despachado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,2).getValue();
  const n_bole = hojaOri.getRange(filaActiva,6).getValue();
  const monto_total = hojaOri.getRange(filaActiva,7).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,1).getValue();
  hojaDesti.appendRow([nombre, n_bole,monto_total,fecha_boleta])
  }
  var ss = SpreadsheetApp.getActive().getSheetByName("DATA_SHEET");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 11).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][10] == "Despachado"){
      ss.deleteRow(i+2);
    }
  }
}
