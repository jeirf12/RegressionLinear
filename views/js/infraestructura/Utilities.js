import { Dom } from "./Dom.js";

class Utilities {
  static dataInput = [];

  static showTableAnova(idTable, dataExcel) {
    let table = document.getElementById(idTable);
    table.innerHTML = "";
    let titleTable = Dom.createH({ id: "4", text: "Tabla Anova" });
    let tab = Dom.createTable();
    table.appendChild(titleTable);
    table.appendChild(tab);
    table.querySelector("thead>tr").innerHTML += `<th>Fuente</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>SC</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>GL</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>CM</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>Fc</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>Determinante</th>`;
    let scr = dataExcel.getSCR();
    let sce = dataExcel.getSCE();
    let sct = dataExcel.getSCT();
    let glr = 1;
    let glt = dataExcel.size() - 1;
    let gle = glt - glr;
    let R2 = 1 - (sce / sct);
    table.querySelector("tbody").innerHTML += `
			<tr>
				<td>Regr. Lineal</td>
				<td>${scr}</td>
				<td>${glr}</td>
				<td>${dataExcel.getCMR()}</td>
				<td>${dataExcel.getF()}</td>
                <td>${R2}</td>
			</tr>
			<tr>
				<td>Error</td>
				<td>${sce}</td>
				<td>${gle}</td>
				<td>${dataExcel.getCME()}</td>
			</tr>
			<tr>
				<td>T</td>
				<td>${sct}</td>
				<td>${glt}</td>
				<td>${sct / glt}</td>
			</tr>
			`;
  }

  static showTableExcel(idTable, dataExcel) {
    this.dataInput = dataExcel.getRows(); // Esta linea verifica para salir de la vista con calculos en excel
    let table = document.getElementById(idTable);
    let titleTable = Dom.createH({ id: "4", text: "Tabla Ingresada" });
    let tab = Dom.createTable();
    table.appendChild(titleTable);
    table.appendChild(tab);
    table.querySelector("thead>tr").innerHTML += `<th>X</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>Y</th>`;
    dataExcel.getRows().forEach((row) => {
    table.querySelector("tbody").innerHTML += `
			<tr>
				<td>${row.X}</td>
				<td>${row.Y}</td>
			</tr>
			`;
    });
    let table2 = document.getElementById("table-content-data");
    var promeX = dataExcel.averageX();
    var promeY = dataExcel.averageY();
    var funcion = dataExcel.getFunction();
    let covariance = dataExcel.getCovariance();
    let correlation = dataExcel.getCorrelation();
    let titleTable2 = document.createElement("h4");
    titleTable2.textContent = "Datos Obtenidos";
    let tab2 = Dom.createTable();
    table2.appendChild(titleTable2);
    table2.appendChild(tab2);
    table2.querySelector("tbody").innerHTML += `
        <tr>
          <th>promedio X</th>
          <th>Promedio Y</th>
          <th>funcion</th>
          <th>covarianza</th>
          <th>Coeficiente variacion</th>
        </tr>
        <tr>
          <td>${promeX}</td>
          <td>${promeY}</td>
          <td>${funcion}</td>
          <td>${covariance}</td>
          <td>${correlation}</td>
        </tr>
		 `;
  }

  static showTable({data, editTableEvent}) {
    let table = document.getElementById("table-content");
    table.innerHTML = "";
    let titleTable = Dom.createH({ id: "4", text: "Tabla Datos Ingresados" });
    let tab = Dom.createTable();
    tab.setAttribute("id", "datos-insertados");
    let p = Dom.createParagraph({ text: "Nota: Para modificar los valores, dar doble click en el valor a cambiar, puede dar enter o escape para guardar el valor", });
    table.appendChild(titleTable);
    table.appendChild(p);
    table.appendChild(tab);
    table.querySelector("thead>tr").innerHTML += `<th>X</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>Y</th>`;
    if(data !== "") this.dataInput.push(data);
    this.dataInput.forEach((row) => {
    table.querySelector("tbody").innerHTML += `
			<tr>
				<td>${Number(row.X)}</td>
				<td>${Number(row.Y)}</td>
			</tr>
			`;
    });
    editTableEvent();
  }

  static showTableInput() {
    let table = document.getElementById("table-content");
    table.innerHTML = "";
    let titleTable = Dom.createH({ id: "4", text: "Tabla Datos Ingresados" });
    let tab = Dom.createTable();
    table.appendChild(titleTable);
    table.appendChild(tab);
    table.querySelector("thead>tr").innerHTML += `<th>X</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>Y</th>`;
    this.dataInput.forEach((row) => {
    table.querySelector("tbody").innerHTML += `
			<tr>
				<td>${Number(row.X)}</td>
				<td>${Number(row.Y)}</td>
			</tr>
			`;
    });
  }

  static showGraph(props, colorD="255,0,0", colorF="128,0,128") {
    if (window.graph) {
      window.graph.clear();
      window.graph.destroy();
    }
    let graph = document.getElementById("myGraph").getContext("2d");
    document.getElementById("myGraph").style.opacity = 1;
    let graphD = document.getElementById("graphD");
    let graphF = document.getElementById("graphF")
    if (graphD === null && graphF === null) {
      let context = document.getElementById("content");
      let div = Dom.createDiv({ className: "input-colors" });
      let title = Dom.createH({ id: "3", text: "Elija un color deseado para:" });
      let div1 = Dom.createGroupInput({
        type: "color",
        id: "graphD",
        textLabel: "Gráfico Dispersión",
        idContent: "contentD",
      });
      let div2 = Dom.createGroupInput({
        type: "color",
        id: "graphF",
        textLabel: "Gráfico Función",
        idContent: "contentF",
      });
      colorD = colorD.split(",");
      colorF = colorF.split(",");
      div1.getElementsByTagName("input")[0].value = this.convertRGBtoHex(Number(colorD[0]), Number(colorD[1]), Number(colorD[2]));
      div2.getElementsByTagName("input")[0].value = this.convertRGBtoHex(Number(colorF[0]), Number(colorF[1]), Number(colorF[2])); 
      div.appendChild(title);
      div.appendChild(div1);
      div.appendChild(div2);
      context.insertBefore(div, document.getElementById("myGraph"));
    }
    let data = [];
    if (props.columnFunction === "")
      data.push({
        label: "Gráfico Dispersión",
        data: props.columnY,
        backgroundColor: "rgb(" + colorD + ")",
      });
    else {
      data.push(
        {
          label: "Gráfico Dispersión",
          data: props.columnY,
          backgroundColor: "rgb(" + colorD + ")",
        },
        {
          type: "line",
          label: "Gráfico Función",
          data: props.columnFunction,
          backgroundColor: "rgb(" + colorF + ")",
          borderColor: "rgba(" + colorF + ", 0.4)",
        }
      );
    }
    window.graph = new Chart(graph, {
      type: "scatter",
      data: {
        labels: props.columnX,
        datasets: data,
      },
    });
  }

  static sumDataRepeat = (array) => {
    let arrayResult = array.reduce((acc, number) => {
      acc
        .filter((num) => number.X === num.X)
        .reduce((acc, num) => {
          number.Y += num.Y;
          acc = number;
        }, {});
      let newAcc = acc.filter((num) => num.X !== number.X);
      newAcc.push(number);
      return newAcc;
    }, []);
    return arrayResult;
  };

  static colorToHex = (color) => {
    let hex = color.toString(16);
    return hex.length === 1 ? "0" + hex: hex;
  };

  static convertRGBtoHex = (red, green, blue) => {
    return "#" + this.colorToHex(red) + this.colorToHex(green) + this.colorToHex(blue);
  };

  static convertHextoRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };

  static verifiedOnlyNumber(array) {
    let value = 0;
    let reg = /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/;
    array.forEach((row) => {
      if (reg.test(row.X) && reg.test(row.Y)) value++;
    });
    return value === array.length;
  };
  
  static genericForm(idform, letter, method, onSubmit) {
    let root = document.getElementById(idform);
    root.innerHTML = "";
    const variables = {
      "X": "Y",
      "Y": "X",
    };
    root.appendChild(document.createTextNode("Cálculo de recta de regresión estimada para " + variables[letter]));
    let divInput = Dom.createGroupInput({
      type: "text",
      name: "data" + letter,
      textLabel: "digite un numero para " + letter,
      idContent: "group-input",
    });
    let input = Dom.createInput({ type: "submit", id: "calc-form" + letter, value: "Calcular", });
    let p = Dom.createParagraph({ id: "result-cal" + letter, });
    divInput.appendChild(input);
    divInput.appendChild(p);
    root.appendChild(divInput);
    let propsForm = {
      letter: letter,
      method: method,
      variables: variables,
    };
    onSubmit(propsForm);
  };
}

export { Utilities };
