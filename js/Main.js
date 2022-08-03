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
      document.getElementById("myGraph").innerHTML = '';
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
      let myChart = new Chart(graph, {
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
    showResult();
  });
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
  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("class", "parametro");
  let input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("class", "valor");
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
		var aux = Number(document.querySelectorAll(".parametro")[i].value) 	
		var aux2 = Number(document.querySelectorAll(".valor")[i].value)
        table.push({"X": aux, "Y": aux2})
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
