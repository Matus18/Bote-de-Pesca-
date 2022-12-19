function apiGetBasic(query){
  // API BSALE
  var apiurl = 'https://api.bsale.cl/v1/documents.json?documenttypeid=10&expand&limit=50&offset=778';
  var token = 'API-KEY'
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
    const hojaClientes = ss.getSheetByName("CLIENTES BSALE");
    const rango = hojaClientes.getRange("A2:E900")
    json.items.forEach(item => {
      const n_boleta = item.number; 
      const total = item.totalAmount;
      const cliente = item.client.id;
      const pdf = item.urlPdfOriginal;
      const fecha = item.emissionDate;
      const direccion = item.address;
      const comuna = item.municipality;
      const formula1 = "=BUSCARV(B6;'CLIENTES BSALE'!$A$2:$D$1000;2;0)"; 
      const formula2 = "=ARRAYFORMULA(BUSCARV(B6;'CLIENTES BSALE'!$A$2:$E$1000;3;0))";
      const formula3 = "=ARRAYFORMULA(BUSCARV(B6;'CLIENTES BSALE'!$A$2:$E$1000;5;0))";

      // TIMESTAMP UNIX TO DATE
      var date = new Date(fecha*1000);
      var formattedDate = Utilities.formatDate(date, "GMT+0:00", "dd-MM");

      // agregar datos en la tabla
      hojaDatos.appendRow([formattedDate,cliente, formula1, formula2, direccion, comuna, formula3, n_boleta, "$"+total]);
      
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
