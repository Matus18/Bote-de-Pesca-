function apiGetClientes(query){
  var apiurl = API URL;
  var token = ACCESS_TOKEN;
  var headers = {'Content-Type':'application/json',
  'access_token': token
  };
  var params = {
    "method":"GET",
    "headers": headers
  };
  try {
    var response = UrlFetchApp.fetch(apiurl+query, params);
    var responseData = response.getContentText();
    var json = JSON.parse(responseData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hojaDatos = ss.getSheetByName('DATA_SHEET')
    json.items.forEach(item => {
      const id = item.id; 
      const nombre = item.firstName;
      const apellido = item.lastName;
      const compania = item.company;
      const telefono = item.phone;
      const direccion = item.address;
      const comuna = item.municipality;
      const ciudad = item.city;
      hojaDatos.appendRow([id,nombre,apellido,compania,telefono,direccion,comuna,ciudad]);
    })
    let sheet = SpreadsheetApp.openById('ID_SHEET').getSheetByName('DATA_SHEET');
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
