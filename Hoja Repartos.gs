// CHANGE SHEET NAMES TO YOUR SHEET NAMES
// THESE ARE EXAMPLES

// FECHA ACTUAL
function fechaActual() {
  var mensaje = new Date();
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("REPARTOS");
  hoja.getRange(1,1).setValue(mensaje)
}

// DESPACHADO SIN PAGO DE TARJETA
function cuentas_x_cobrar(){
  // BOTON DESPACHADO A HOJA
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("CUENTAS X COBRAR");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,13).getValue() == "Despachado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,3).getValue();
  const apellido2 = hojaOri.getRange(filaActiva,4).getValue();
  const n_bole = hojaOri.getRange(filaActiva,8).getValue();
  const monto_total = hojaOri.getRange(filaActiva,9).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,1).getValue();
  const numero_telefono = hojaOri.getRange(filaActiva,7).getValue();
  hojaDesti.appendRow([nombre,apellido2,n_bole,monto_total,fecha_boleta,numero_telefono])
  var ss = SpreadsheetApp.getActive().getSheetByName("REPARTOS");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 13).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][12] == "Despachado"){
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
  if (hojaOri.getRange(filaActiva,12).getValue() == "Pagado", hojaOri.getRange(filaActiva,13).getValue() == "Despachado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,3).getValue();
  const apellido1 = hojaOri.getRange(filaActiva,4).getValue();
  const n_bole = hojaOri.getRange(filaActiva,8).getValue();
  const monto_total = hojaOri.getRange(filaActiva,9).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,1).getValue();
  hojaDesti.appendRow([nombre,apellido1,n_bole,monto_total,fecha_boleta])
  var ss = SpreadsheetApp.getActive().getSheetByName("REPARTOS");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 13).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][12] == "Despachado"){
      ss.deleteRow(i+2);
    }
  }
  }
}
