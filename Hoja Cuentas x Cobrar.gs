function pagado_cuentas(){
  // BOTON DESPACHADO A HOJA
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOri = libro.getActiveSheet();
  const hojaDesti = libro.getSheetByName("CUENTAS PAGADAS");
  const filaActiva = hojaOri.getActiveCell().getRow();
  if (hojaOri.getRange(filaActiva,8).getValue() == "Pagado"){
  const rangoOri = hojaOri.getRange(filaActiva,1,1,hojaOri.getLastColumn()).getValues();
  const nombre = hojaOri.getRange(filaActiva,1).getValue();
  const apellido2 = hojaOri.getRange(filaActiva,2).getValue();
  const n_bole = hojaOri.getRange(filaActiva,3).getValue();
  const monto_total = hojaOri.getRange(filaActiva,4).getValue();
  const fecha_boleta = hojaOri.getRange(filaActiva,5).getValue();
  const numero_telefono = hojaOri.getRange(filaActiva,6).getValue();
  hojaDesti.appendRow([nombre,apellido2,n_bole,monto_total,fecha_boleta])
  var ss = SpreadsheetApp.getActive().getSheetByName("CUENTAS X COBRAR");
  var uf = ss.getLastRow();
  var data = ss.getRange(2,1, uf, 8).getDisplayValues();
  for(var i = data.length-1;i>=0;i--){
    if (data[i][7] == "Pagado"){
      ss.deleteRow(i+2);
    }
  }
}
}
