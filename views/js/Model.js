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
  static dataInput = [];

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

  static showTableExcel(idTable, dataExcel) {
      this.dataInput = dataExcel.getRows();      // Esta linea verifica para salir de la vista con calculos en excel
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
      let table2 = document.getElementById("table-content-data");
	  var promeX = dataExcel.averageX()
	  var promeY = dataExcel.averageY()
	  var funcion = dataExcel.getFunction()
      let titleTable2 = document.createElement("h4");
      titleTable2.textContent = 'Datos obtenidos';
      let tab2 = document.createElement("table");
      let tr2 = document.createElement("tr");
      let th2 = document.createElement("thead");
      let tb2 = document.createElement("tbody");
      th2.appendChild(tr2);
      tab2.appendChild(th2);
      tab2.appendChild(tb2);
      table2.appendChild(titleTable2);
      table2.appendChild(tab2);
	  table2.querySelector('tbody').innerHTML +=`
        <tr>
          <th>promedio X</th>
          <th>Promedio Y</th>
          <th>funcion</th>
        </tr>
        <tr>
          <td>${promeX}</td>
          <td>${promeY}</td>
          <td>${funcion}</td>
        </tr>
		 `;
  }

  static showTable(data) {
      let table = document.getElementById("table-content");
      table.innerHTML = '';
      let titleTable = document.createElement("h4");
      titleTable.textContent = "Tabla Datos Ingresados";
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
      this.dataInput.push(data);
      this.dataInput = this.sumDataRepeat(this.dataInput);
      this.dataInput.forEach((row) => {
	    table.querySelector('tbody').innerHTML += `
			<tr>
				<td>${Number(row.X)}</td>
				<td>${Number(row.Y)}</td>
			</tr>
			`
      });
  }

  static showTableInput() {
      let table = document.getElementById("table-content");
      table.innerHTML = '';
      let titleTable = document.createElement("h4");
      titleTable.textContent = "Tabla Datos Ingresados";
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
      this.dataInput.forEach((row) => {
	    table.querySelector('tbody').innerHTML += `
			<tr>
				<td>${Number(row.X)}</td>
				<td>${Number(row.Y)}</td>
			</tr>
			`
      });
  }

  static showGraph(columnX, columnY, columnFunction="") {
      if (window.graph) {
        window.graph.clear();
        window.graph.destroy();
      }
      let context = document.getElementById('content');
      document.getElementById("myGraph").style.opacity = 1;
      let graph = document.getElementById("myGraph").getContext("2d")
      let div = document.createElement("div");
      div.setAttribute('class', 'input-colors');
      let color = document.createElement("input");
      let color2 = document.createElement("input");
      color.setAttribute('type', 'color');
      color.setAttribute('id', 'graphD');
      color2.setAttribute('type', 'color');
      color2.setAttribute('id', 'graphF');
      // console.log(color);
      // console.log(context);
      div.appendChild(color);
      div.appendChild(color2);
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
  static sumDataRepeat = (array) => {
    let arrayResult = array.reduce((acc, number) => {
      acc.filter((num) => number.X === num.X).reduce((acc, num) => {
        number.Y += num.Y;
        acc = number;
      }, {})
      let newAcc = acc.filter((num) => num.X !== number.X);
      newAcc.push(number);
      return newAcc;
    }, [])
    return arrayResult;
  }
}

class Popup {
  init() {
    this.state = "";
    this.hideTimeout = null;
    this.parent = document.createElement("div");
    this.parent.setAttribute("class", "popup");
    this.child = document.createElement("div");
    this.child.setAttribute("id", "myPopup");
    this.child.setAttribute("class", "popup-content popup-invisible");
    this.i = document.createElement("i");
    this.p = document.createElement("p");
    this.p.setAttribute("class", "popup-message");
    this.child.appendChild(this.i);
    this.child.appendChild(this.p);
    this.parent.appendChild(this.child);
    return this.parent;
  }
  
  initWithButtons() {
    let cancel = document.getElementById("cancel");
    let ok = document.getElementById("ok");
    if(cancel === null && ok === null) {
      let popup = document.getElementById("myPopup");
      this.buttonCancel = document.createElement("button");
      this.buttonCancel.setAttribute("id", "cancel");
      this.buttonCancel.textContent = "Cancelar";
      this.buttonOk = document.createElement("button");
      this.buttonOk.setAttribute("id", "ok");
      this.buttonOk.textContent = "Aceptar"
      popup.appendChild(this.buttonCancel);
      popup.appendChild(this.buttonOk);
    }
  }

  removeButtons() {
    let cancel = document.getElementById("cancel");
    let ok = document.getElementById("ok");
    if(cancel !== null && ok !== null) {
      let popup = document.getElementById("myPopup");
      popup.removeChild(cancel);
      popup.removeChild(ok);
    }
  }

  show(stateProp, message) {
    this.removeButtons();
    clearTimeout(this.hideTimeout);
    let element = document.getElementById("myPopup")
    if(element === null) return;
    element.classList.remove("popup-invisible");
    if(this.state !== "" && element.classList.contains(`popup-${this.state}`)) element.classList.remove(`popup-${this.state}`);
    this.state = stateProp;
    if(this.state) {
      element.getElementsByTagName("p")[0].textContent = message;
      element.classList.add(`popup-${this.state}`);
    } 
    this.hideTimeout = setTimeout(()=> {
      element.classList.toggle(`popup-${this.state}`);
      element.classList.add("popup-invisible");
    }, 3000);
  }

  showWithButtons(props) {
    let btnCancel = document.getElementById("cancel");
    let btnOk = document.getElementById("ok");
    let element = document.getElementById("myPopup")
    if(element === null || btnCancel === null || btnOk === null) return;
    element.classList.remove("popup-invisible");
    if(this.state !== "" && element.classList.contains(`popup-${this.state}`)) element.classList.remove(`popup-${this.state}`);
    this.state = props.stateProp;
    let propsSend = {
      element: element,
      state: this.state,
      valueSelect: props.valueSelect,
      valueSelectPrev: props.valueSelectPrev
    }
    props.method(propsSend);
    if(this.state) {
      element.getElementsByTagName("p")[0].textContent = props.message;
      element.classList.add(`popup-${this.state}`);
    } 
  }
}

export { Row, RowCollection, Utilities, Popup };
