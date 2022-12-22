function apiGetBoletas(query){
  // API BSALE
  var apiurl = 'https://api.bsale.cl/v1/documents.json?documenttypeid=10&expand&limit=50&offset=804';
  var token = 'API KEY'
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
    const hojaDatos = ss.getSheetByName("REPARTOS")
    var datasheet = ss.getSheetByName("CLIENTES BSALE");
    var lastRDataSheet = datasheet.getLastRow();
    json.items.forEach(item => {
      const n_boleta = item.number; 
      const total = item.totalAmount;
      const cliente = item.client.id;
      const fecha = item.emissionDate;
      const direccion = item.address;
      const comuna = item.municipality;
      var data_1 = datasheet.getRange(2,1,lastRDataSheet - 1, 7).getValues();
      var name;
      var apellido_1;
      var numero_telefonico;
      for (var i = 0; i < data_1.length; i++){
      if (data_1[i][0] == cliente){
        name = data_1[i][1]
        apellido_1 = data_1[i][2]
        numero_telefonico = data_1[i][4]
      }
      }
      // TIMESTAMP UNIX TO DATE
      var date = new Date(fecha*1000);
      var formattedDate = Utilities.formatDate(date, "GMT+0:00", "dd-MM");
      // agregar datos en la tabla
      hojaDatos.appendRow([formattedDate,cliente, name, apellido_1, direccion, comuna, numero_telefonico, n_boleta, "$"+total]);
    })
  
    // ELIMINA DUPLICADOS
    let sheet = SpreadsheetApp.openById('1kbEywmw5EKJt91abU4QHB8XzbEPKupFtHSaY8ViH0ac').getSheetByName("REPARTOS");
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
