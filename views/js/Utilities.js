class Utilities {
  static dataInput = [];

  static showTableAnova(idTable, dataExcel) {
    let table = document.getElementById(idTable);
    table.innerHTML = "";
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
    let tab2 = document.createElement("table");
    let tr2 = document.createElement("tr");
    let th2 = document.createElement("thead");
    let tb2 = document.createElement("tbody");
    th2.appendChild(tr2);
    tab2.appendChild(th2);
    tab2.appendChild(tb2);
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

  static showTable(data) {
    let table = document.getElementById("table-content");
    table.innerHTML = "";
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
    table.querySelector("thead>tr").innerHTML += `<th>X</th>`;
    table.querySelector("thead>tr").innerHTML += `<th>Y</th>`;
    this.dataInput.push(data);
    // this.dataInput = this.sumDataRepeat(this.dataInput);
    this.dataInput.forEach((row) => {
    table.querySelector("tbody").innerHTML += `
			<tr>
				<td>${Number(row.X)}</td>
				<td>${Number(row.Y)}</td>
			</tr>
			`;
    });
  }

  static showTableInput() {
    let table = document.getElementById("table-content");
    table.innerHTML = "";
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
      let div = document.createElement("div");
      let title = document.createElement("H3");
      title.textContent = "Elija un color deseado para:";
      let div1 = document.createElement("div");
      div1.setAttribute("id", "contentD");
      let span = document.createElement("span");
      let span2 = document.createElement("span");
      span.textContent = "Gráfico Dispersión";
      div1.appendChild(span);
      let div2 = document.createElement("div");
      div2.setAttribute("id", "contentF");
      div.setAttribute("class", "input-colors");
      let color = document.createElement("input");
      let color2 = document.createElement("input");
      color.setAttribute("type", "color");
      color.setAttribute("id", "graphD");
      span2.textContent = "Gráfico Función";
      div2.appendChild(span2);
      color2.setAttribute("type", "color");
      color2.setAttribute("id", "graphF");
      colorD = colorD.split(",");
      colorF = colorF.split(",");
      color.value = this.convertRGBtoHex(Number(colorD[0]), Number(colorD[1]), Number(colorD[2]));
      color2.value = this.convertRGBtoHex(Number(colorF[0]), Number(colorF[1]), Number(colorF[2])); 
      div1.appendChild(color);
      div2.appendChild(color2);
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
    let input = document.createElement("input");
    let label = document.createElement("label");
    label.textContent = "digite un numero para " + letter;
    let divInput = document.createElement("div");
    divInput.setAttribute("class", "group-input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "data" + letter);
    let input2 = document.createElement("input");
    input2.setAttribute("type", "submit");
    input2.setAttribute("id", "calc-form" + letter)
    input2.setAttribute("value", "Calcular")
    let p = document.createElement("p");
    p.setAttribute("id", "result-cal"+letter);
    divInput.appendChild(label);
    divInput.appendChild(input);
    divInput.appendChild(input2);
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
