const excel = document.querySelector("#input-excel");
let allowedExtensions = /(.xlsx|.xls)$/i;
excel.addEventListener('change', (event) => {
  if(allowedExtensions.exec(excel.value)) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = (event) => {
      let data = new Uint8Array(event.target.result);
      let workbook = XLSX.read(data, {type: 'array'});
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let sheet = XLSX.utils.sheet_to_html(worksheet);
      const table = document.getElementById('table-content');
      table.innerHTML = sheet;
      // Cuando lee el archivo empezar a calcular a partir de ciertos criterios en el documento (valores de x, valores de y)
    }
    reader.readAsArrayBuffer(file);
  } else {
    alert("Extensión no valida, solo se acepta archivos excel");
  }
})
