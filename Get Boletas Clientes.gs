function apiGetBasic(query){
  // API BSALE
  var apiurl = 'URL API';
  var token = 'ACCESS-TOKEN'
  var headers = {'Content-Type':'application/json',
  'access_token': token
  };
  var params = {
    "method":"GET",
    "headers": headers
  };

  // PARSE JSON
  try {
    var response = UrlFetchApp.fetch(apiurl+query, params);
    var responseData = response.getContentText();
    var json = JSON.parse(responseData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaDatos = ss.getSheetByName('SHEET_DATA')
    json.items.forEach(item => {
      const n_boleta = item.number; 
      const total = item.totalAmount;
      const cliente = item.client.id;
      const pdf = item.urlPdfOriginal;
      const fecha = item.emissionDate;
      const direccion = item.address;
      const comuna = item.municipality;

      // TIMESTAMP UNIX TO DATE
      var date = new Date(fecha*1000);
      var formattedDate = Utilities.formatDate(date, "GMT+0:00", "dd-MM-yyyy");

      // agregar datos en la tabla
      hojaDatos.appendRow([formattedDate,' ',direccion,comuna,' ',n_boleta,total,pdf,cliente]);
    })

    // ELIMINA DUPLICADOS
    let sheet = SpreadsheetApp.openById('ID_SHEET').getSheetByName('SHEET_DATA');
    let data = sheet.getDataRange().getValues();
    let newData = [];
    for (let i in data) {
      let row = data[i];
      let duplicate = false;
      for (let j in newData) {
        if (row.join() == newData[j].join()) {
        duplicate = true;
      }
    }
        if (!duplicate) {
      newData.push(row);
    }
  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);

    return json;
  
  }
  catch (e){
    return["Error",e];
  }
}
