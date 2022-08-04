class Row {
	constructor(rows){
		this.rows = rows
	}

	getX(index){
		return this.rows[index].X
	}

	getY(index){
		return this.rows[index].Y
	}
    
    getRows() {
      return this.rows;
    }
}

class RowCollection {
  constructor(rows) {
    this.rows = rows;
  }
  
  size() {
    return this.rows.getRows().length;
  }

  getRows() {
    return this.rows.getRows();
  }
  
  summationX() {
    let sumX = 0;
    this.rows.getRows().forEach((row)=> {
      sumX = row.X + sumX;
    })
    return sumX;
  }

  summationY() {
    let sumY = 0;
    this.rows.getRows().forEach((row)=> {
      sumY = row.Y + sumY;
    })
    return sumY;
  }

  summationXY() {
    let sumXY = 0;
    this.rows.getRows().forEach((row)=> {
      sumXY += row.Y * row.X;
    })
    return sumXY;
  }

  summationSquareX() {
    let sumXY = 0;
    this.rows.getRows().forEach((row)=> {
      sumXY += row.X * row.X;
    })
    return sumXY;
  }

  getColumnX(){
    let array = []
    this.rows.getRows().forEach((row) => {
	  array.push(row.X);
	})
	return array
  }

  getColumnY(){
    let array = []
    this.rows.getRows().forEach((row) => {
	  array.push(row.Y);
	})
	return array
  }

  averageX() {
    let average = this.summationX() / this.size();
    return average;
  }

  averageY() {
    let average = this.summationY() / this.size();
    return average;
  }

  getCovariance() {
    let firstTerm = this.summationXY() / this.size();
    let secondTerm = this.averageX() * this.averageY();
    let covariance = firstTerm - secondTerm;
    return covariance;
  }

  getSCR() {
    let a = this.getA();
    let b = this.getB();

    let sumY = this.summationY();
    let sumXY = this.summationXY();
    let n = this.size();
    let valueAverageY = this.averageY();
    let scr = (a * sumY) + (b * sumXY) - (n * valueAverageY * valueAverageY);
    return scr;
  }

  getSCE() {
    let firstTerm = this.summationY() * this.summationY();
    let secondTerm = this.getA() * this.summationY();
    let thirdTerm = this.getB() * this.summationXY();
    let sce = firstTerm - secondTerm - thirdTerm;
    return sce;
  }

  getSCT() {
    let valueAverageY = this.averageY();
    let columnY = this.getColumnY();
    let sum = 0;
    columnY.forEach((Y) => {
      let aux = Y - valueAverageY;
      let aux2 = aux * aux;
      sum += aux2;
    })
    return sum;
  }

  getCMR() {
    let cmr = this.getSCT()/1;
    return cmr;
  }

  getCME() {
    let cme = this.getSCE() / (this.size() - 2);
    return cme;
  }

  getF() {
    let f = this.getCMR() / this.getCME();
    return f;
  }

  getB(){
	let numerator = this.summationXY() - (this.size() * this.averageX() * this.averageY());
	let divisor = this.summationSquareX() - (this.size() * this.averageX() * this.averageX());
	let b = numerator / divisor;
	return b;
  }

  getA(){
	let a = this.averageY() - (this.getB() * this.averageX());
	return a;
  }

  getFunction(){
  	let result = this.getA() + "+" +  (this.getB() + "x");
	return result;
  }
  
  getValuesFunction(){
	let miArray = [];
	let auxA = this.getA();
	let auxB = this.getB();
    this.rows.getRows().forEach((row) => {
	    let termB = auxB * row.X;
	    let complete = auxA + termB;
		miArray.push(complete);
	});
	return miArray;
  }
}

class Utilities {
  static showTableAnova(idTable, dataExcel) {
      let table = document.getElementById(idTable);
      table.innerHTML = '';
      let titleTable = document.createElement("h4");
      titleTable.textContent = "Tabla Anova";
      let tab = document.createElement("table");
      let tr = document.createElement("tr");
      let th = document.createElement("thead");
      let tb = document.createElement("tbody");
      th.appendChild(tr);
      tab.appendChild(th);
      tab.appendChild(tb);
      table.appendChild(titleTable);
      table.appendChild(tab);
	  table.querySelector("thead>tr").innerHTML += `<th>Fuente</th>` 
	  table.querySelector("thead>tr").innerHTML += `<th>SC</th>` 
	  table.querySelector("thead>tr").innerHTML += `<th>GL</th>` 
	  table.querySelector("thead>tr").innerHTML += `<th>CM</th>` 
	  table.querySelector("thead>tr").innerHTML += `<th>Fc</th>` 
      let scr = dataExcel.getSCR();
      let sce = dataExcel.getSCE();
      let sct = scr + sce;
      let glr = 1;
      let glt = dataExcel.size() - 1;
      let gle = glt - glr;
	    table.querySelector('tbody').innerHTML += `
			<tr>
				<td>Regr. Lineal</td>
				<td>${dataExcel.getSCR()}</td>
				<td>${glr}</td>
				<td>${dataExcel.getCMR()}</td>
				<td>${dataExcel.getF()}</td>
			</tr>
			<tr>
				<td>Error</td>
				<td>${dataExcel.getSCE()}</td>
				<td>${gle}</td>
				<td>${dataExcel.getCME()}</td>
				<td></td>
			</tr>
			<tr>
				<td>T</td>
				<td>${sct}</td>
				<td>${glt}</td>
				<td>${sct/glt}</td>
				<td></td>
			</tr>
			`
  }
  static showTable(idTable, dataExcel) {
      let table = document.getElementById(idTable);
      let titleTable = document.createElement("h4");
      titleTable.textContent = "Tabla Ingresada";
      let tab = document.createElement("table");
      let tr = document.createElement("tr");
      let th = document.createElement("thead");
      let tb = document.createElement("tbody");
      th.appendChild(tr);
      tab.appendChild(th);
      tab.appendChild(tb);
      table.appendChild(titleTable);
      table.appendChild(tab);
	  table.querySelector("thead>tr").innerHTML += `<th>X</th>` 
	  table.querySelector("thead>tr").innerHTML += `<th>Y</th>` 
      dataExcel.getRows().forEach((row) => {
	    table.querySelector('tbody').innerHTML += `
			<tr>
				<td>${row.X}</td>
				<td>${row.Y}</td>
			</tr>
			`
      });
	  var promeX = dataExcel.averageX()
	  var promeY = dataExcel.averageY()
	  var funcion = dataExcel.getFunction()
      let title = document.createElement("p");
      title.content = 'Datos obtenidos';
      let body = document.createElement("p");
	  body.innerHTML = `El promedio en X es: ${promeX} <br>
		 El promedio de Y es : ${promeY} <br>
		 La función de mínimos cuadrados es : ${funcion}
		 `
      table.appendChild(title);
      table.appendChild(body);
  }

  static showGraph(columnX, columnY, columnFunction="") {
      if (window.graph) {
        window.graph.clear();
        window.graph.destroy();
      }
      document.getElementById("myGraph").style.opacity = 1;
      let graph = document.getElementById("myGraph").getContext("2d")
      let data = [];
      if (columnFunction === "") data.push({
            label: "grafico Dispersion",
            data: columnY,
			backgroundColor: "rgb(255,0,0)"
      });
      else {
        data.push({
            label: "grafico Dispersion",
            data: columnY,
			backgroundColor: "rgb(255,0,0)"
          },{
            type: "line",
            label: "grafico Funcion",
            data: columnFunction,
			backgroundColor: "rgb(128,0,128)",
            borderColor: "rgba(128, 0, 128, 0.4)"
        });
      }
      window.graph = new Chart(graph, {
        type: "scatter",
        data: {
          labels: columnX,
          datasets: data
        }
      });
  }
}

const createSelect = (valueSelect) => {
  let select = document.createElement("select");
  select.setAttribute("name", "data-input");
  select.setAttribute("value", valueSelect);
  select.setAttribute("id", "data-input");

  let options = ["Elegir datos de entrada", "Subida archivo excel", "Introducir valores Manualmente"];
  let valueOptions = ["data", "dataExcel", "dataManual"];

  options.forEach((data, index) => {
    let option = document.createElement("option");
    option.setAttribute("value", valueOptions[index]);
    if (valueSelect === valueOptions[index]) option.setAttribute("selected", "selected");
    option.textContent = data;
    select.appendChild(option);
  })
  return select;
}

const init = (datatitle, valueSelect) => {
  let content = document.getElementById("content");
  let title = document.createElement("h4");
  title.textContent = datatitle;
  let select = createSelect(valueSelect);
  if (valueSelect === "dataExcel") {
    let firstNode = document.getElementById("input-excel");
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
    document.querySelector("#input-excel").addEventListener('change', () =>{
      inputExcel();
    })
  } else if (valueSelect === "dataManual") {
    let firstNode = document.getElementById("table-content");
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
    addTable();
  } else {
    content.appendChild(title);
    content.appendChild(select);
  }
  selectEvents();
}

const selectEvents = () => {
  let select = document.getElementById("data-input");
  select.addEventListener("change", (e) => {
    let valueSelect = e.target.value;
    if (valueSelect === "dataExcel") location.href = "viewExcel.html";
    if (valueSelect === "dataManual") location.href = "viewManual.html";
    if (valueSelect === "data") location.replace(location.origin);
  })
}

const addTable = () => {
  let content = document.getElementById("content");
  let table = document.getElementById("table-content");
  let root = document.createElement("div");
  root.setAttribute("class", "content-input");
  let rootBtn = document.createElement("div");
  rootBtn.setAttribute("class", "content-buttons");
  addTitles(root);
  root.appendChild(addRow());
  root.appendChild(addRow());
  rootBtn.appendChild(addButton());
  content.insertBefore(root, table);
  content.insertBefore(rootBtn, table);
  let btn = document.getElementsByClassName("addParam");
  let input = document.getElementsByClassName("content-input");
  btn[0].addEventListener("click", () => {
    input[0].appendChild(addRow());
  });
  document.getElementsByClassName("showResult")[0].addEventListener("click", () => {
    validateFieldsEmpty();
    showResult();
  });
}

const validateFieldsEmpty = () => {
  document.querySelectorAll(".parametro").forEach((value, index) => {
    let par = value;
    console.log(par.value === "");
  })
}

const addTitles = (root) => {
  let div = document.createElement("div");
  div.setAttribute("class", "content-input-header")
  let p1 = document.createElement("span");
  p1.textContent = "X";
  let p2 = document.createElement("span");
  p2.textContent = "Y";
  div.appendChild(p1);
  div.appendChild(p2);
  root.appendChild(div);
}

const addRow = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "content-input-number");
  let input1 = document.createElement("input");
  input1.setAttribute("type", "number");
  input1.setAttribute("class", "parametro");
  input1.setAttribute("onkeypress", "return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)");
  let input2 = document.createElement("input");
  input2.setAttribute("type", "number");
  input2.setAttribute("class", "valor");
  input2.setAttribute("onkeypress", "return (event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46)");
  div.appendChild(input1);
  div.appendChild(input2);
  return div;
}

const addButton = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "buttons");
  let btn1 = document.createElement("button");
  btn1.setAttribute("class", "addParam");
  btn1.setAttribute("type", "button");
  btn1.textContent = "Agregar mas parametros";
  let btn2 = document.createElement("button");
  btn2.setAttribute("class", "showResult");
  btn2.setAttribute("type", "button");
  btn2.textContent = "Calcular";
  div.appendChild(btn1);
  div.appendChild(btn2);
  return div;
}

const showResult = () => {
    document.getElementById("table-content").innerHTML = '';
	let table = []
	for (var i = 0; i <= document.querySelectorAll(".parametro").length -1 ; i++) {
        let parameter = document.querySelectorAll(".parametro")[i].value;
        let value = document.querySelectorAll(".valor")[i].value;
        let aux = parameter !== "" ? Number(parameter): -1;
        let aux2 = value !== "" ? Number(value): -1;
        table.push({"X": aux, "Y": aux2})
	}
    if(!verifiedOnlyNumber(table)) {
      alert("Alguno de los datos no es un numero valido");
      location.href = "viewManual.html";
      return;
    }
    let arrayX = [];
    table.forEach((row) => {
      arrayX.push(row.X);
    });
    if(!verifiedDataRepeat(arrayX)) {
      alert("Los datos en la variable X no pueden ser repetidos\nVuelva a intentarlo");
      location.href = "viewManual.html";
      return;
    }
    let row = new Row(table);
    let dataExcel = new RowCollection(row);
    Utilities.showTableAnova("table-content-anova", dataExcel);
    Utilities.showTable("table-content", dataExcel);
    Utilities.showGraph(dataExcel.getColumnX(), dataExcel.getColumnY(), dataExcel.getValuesFunction());
}

const inputExcel = () => {
  document.getElementById("table-content").innerHTML = '';
  const excel = document.querySelector("#input-excel");
  let allowedExtensions = /(.xlsx|.xls)$/i;
  if(allowedExtensions.exec(excel.value)) {
    let reader = new FileReader();
    let file = excel.files[0];
    reader.onload = (event) => {
      let data = new Uint8Array(event.target.result);
      let workbook = XLSX.read(data, {type: 'array'});
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let arraySheet = XLSX.utils.sheet_to_row_object_array(worksheet);
      if(arraySheet[0].X === undefined && arraySheet[0].Y === undefined ) {
        alert("No se puede calcular porque los encabezados debe ser tipo X y Y en mayusculas");
        location.href = "viewExcel.html";
        return;
      }
      console.log(arraySheet);
      if(!verifiedOnlyNumber(arraySheet)) {
        alert("Alguno de los datos no es un numero valido");
        location.href = "viewExcel.html";
        return;
      }
      let arrayX = [];
      arraySheet.forEach((row) => {
        arrayX.push(row.X);
      });
      if(!verifiedDataRepeat(arrayX)) {
        alert("Los datos en la variable X no pueden ser repetidos\nVuelva a intentarlo");
        location.href = "viewExcel.html";
        return;
      }
      let row = new Row(arraySheet);
      let dataExcel = new RowCollection(row);
      Utilities.showTableAnova("table-content-anova", dataExcel);
      Utilities.showTable("table-content", dataExcel);
      Utilities.showGraph(dataExcel.getColumnX(), dataExcel.getColumnY(), dataExcel.getValuesFunction());
    }
    reader.readAsArrayBuffer(file);
  } else {
    alert("Extensión no valida, solo se acepta archivos excel");
  }
}

const verifiedDataRepeat = (array) => {
  let set = new Set(array);
  return set.size === array.length;
}

const verifiedOnlyNumber = (array) => {
  let value = 0;
  // let reg = /^[1-9]\d*(\.\d+)?$/;
  // let reg = /^(\d+(\.\d+)?)$/
  let reg = /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/;
  array.forEach((row) => {
    if(reg.test(row.X) && reg.test(row.Y)) value++;
  })
  console.log(value, array.length);
  return value === array.length;
}

const addTableAnova = (idTable) => {
  let tableAnova = document.getElementById(idTable);
  let tab = document.createElement("table");
  let tr = document.createElement("tr");
  let th = document.createElement("thead");
  let tb = document.createElement("tbody");
  th.appendChild(tr);
  tab.appendChild(th);
  tab.appendChild(tb);
  tableAnova.appendChild(tab);
}
