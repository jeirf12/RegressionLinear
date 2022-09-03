import { Row, RowCollection, Utilities, Popup } from "./Model.js";
import {
  selectEvent,
  loadExcelEvent,
  buttonParamEvent,
  buttonResultEvent,
  buttonStartEvent,
  inputLenghtEvent,
  mainEvent,
} from "./Events.js";

const popup = new Popup();

const createSelect = (valueSelect) => {
  let select = document.createElement("select");
  select.setAttribute("name", "data-input");
  select.setAttribute("value", valueSelect);
  select.setAttribute("id", "data-input");

  let options = [
    "Elegir datos de entrada",
    "Subida archivo excel",
    "Introducir valores Manualmente",
  ];
  let valueOptions = ["data", "dataExcel", "dataManual"];

  options.forEach((data, index) => {
    let option = document.createElement("option");
    option.setAttribute("value", valueOptions[index]);
    if (valueSelect === valueOptions[index])
      option.setAttribute("selected", "selected");
    option.textContent = data;
    select.appendChild(option);
  });
  return select;
};

const props = {
  Utilities: Utilities,
  popup: popup,
}

const init = (datatitle, value) => {
  let content = document.getElementById("content");
  let title = document.createElement("h4");
  title.textContent = datatitle;
  let valueSelect = value !== undefined ? "data" + value : "data";
  let select = createSelect(valueSelect);
  if (valueSelect === "dataExcel") {
    let firstNode = document.getElementById("input-excel");
    content.insertBefore(popup.init(), firstNode);
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
    loadExcelEvent(inputExcel);
  } else if (valueSelect === "dataManual") {
    let firstNode = document.getElementById("table-content");
    content.insertBefore(popup.init(), firstNode);
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
    addTable();
    inputLenghtEvent();
  } else {
    content.appendChild(popup.init());
    content.appendChild(title);
    content.appendChild(select);
  }
  selectEvent(props);
  buttonStartEvent();
  // let colorGraph = document.getElementById('graphD');
  // colorGraph.addEventListener("onclick", (e) => {
  // console.log(e.target.value);
  // content.insertBefore(colorGraph, graph);
  // })
};

const addTable = () => {
  let content = document.getElementById("content");
  let table = document.getElementById("table-content");
  let root = document.createElement("div");
  root.setAttribute("class", "content-input");
  let rootBtn = document.createElement("div");
  rootBtn.setAttribute("class", "content-buttons");
  addTitles(root);
  root.appendChild(addRow());
  rootBtn.appendChild(addButton());
  content.insertBefore(root, table);
  content.insertBefore(rootBtn, table);
  buttonParamEvent(Utilities, popup);
  buttonResultEvent(showResult);
};

const addTitles = (root) => {
  let div = document.createElement("div");
  div.setAttribute("class", "content-input-header");
  let cosa = document.createElement("span");
  cosa.textContent = "Digite solo numeros";
  let p1 = document.createElement("span");
  p1.textContent = "X";
  let p2 = document.createElement("span");
  p2.textContent = "Y";
  div.appendChild(p1);
  div.appendChild(p2);
  root.appendChild(cosa);
  root.appendChild(div);
};

const addRow = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "content-input-number");
  let divParam = document.createElement("div");
  let divValue = document.createElement("div");
  let input1 = document.createElement("input");
  let span1 = document.createElement("span");
  span1.setAttribute("id", "parameterError");
  input1.setAttribute("type", "text");
  input1.setAttribute("class", "parametro");
  let input2 = document.createElement("input");
  let span2 = document.createElement("span");
  span2.setAttribute("id", "valueError");
  input2.setAttribute("type", "text");
  input2.setAttribute("class", "valor");
  divParam.appendChild(input1);
  divParam.appendChild(span1);
  divValue.appendChild(input2);
  divValue.appendChild(span2);
  div.appendChild(divParam);
  div.appendChild(divValue);
  return div;
};

const addButton = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "buttons");
  let btn1 = document.createElement("button");
  btn1.setAttribute("class", "addParam");
  btn1.setAttribute("type", "button");
  btn1.textContent = " + ";
  let btn2 = document.createElement("button");
  btn2.setAttribute("class", "showResult");
  btn2.setAttribute("type", "button");
  btn2.textContent = "Calcular";
  div.appendChild(btn1);
  div.appendChild(btn2);
  return div;
};

const showResult = () => {
  document.getElementById("table-content").innerHTML = "";
  document.getElementById("table-content-data").innerHTML = "";
  let table = [];
  table = Utilities.dataInput;
  if (!verifiedOnlyNumber(table)) {
    popup.show("error", "Alguno de los datos no es un numero valido");
    if (table.length > 0) Utilities.showTableInput();
    return;
  }
  if (table.length < 2) {
    popup.show(
      "error",
      "Al menos debe ingresar dos filas para poder hacer el calculo"
    );
    if (table.length > 0) Utilities.showTableInput();
    return;
  }
  let row = new Row(table);
  let dataExcel = new RowCollection(row);
  Utilities.showTableAnova("table-content-anova", dataExcel);
  Utilities.showTableExcel("table-content", dataExcel);
  Utilities.showGraph(
    dataExcel.getColumnX(),
    dataExcel.getColumnY(),
    dataExcel.getValuesFunction()
  );
  popup.show("success", "Calculos hechos correctamente!");
};

const inputExcel = () => {
  document.getElementById("table-content").innerHTML = "";
  const excel = document.querySelector("#input-excel");
  let allowedExtensions = /(.xlsx|.xls)$/i;
  if (allowedExtensions.exec(excel.value)) {
    let reader = new FileReader();
    let file = excel.files[0];
    reader.onload = (event) => {
      let data = new Uint8Array(event.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let arraySheet = XLSX.utils.sheet_to_row_object_array(worksheet);
      if (arraySheet[0].X === undefined || arraySheet[0].Y === undefined) {
        popup.show(
          "warning",
          "No se puede calcular porque los encabezados debe ser tipo X y Y en mayusculas"
        );
        excel.value = "";
        return;
      }
      if (!verifiedOnlyNumber(arraySheet)) {
        popup.show("error", "Alguno de los datos no es un numero valido");
        excel.value = "";
        return;
      }
      let row = new Row(arraySheet);
      let dataExcel = new RowCollection(row);
      Utilities.showTableAnova("table-content-anova", dataExcel);
      Utilities.showTableExcel("table-content", dataExcel);
      Utilities.showGraph(
        dataExcel.getColumnX(),
        dataExcel.getColumnY(),
        dataExcel.getValuesFunction()
      );
      popup.show("success", "Calculos hechos correctamente!");
    };
    reader.readAsArrayBuffer(file);
  } else {
    popup.show("error", "Extensión no valida, solo se acepta archivos excel");
    excel.value = "";
  }
};

const verifiedDataRepeat = (array) => {
  const search = array.reduce((acc, element) => {
    acc[element.X] += element.Y;
    // return acc;
  }, {});
  // console.log(search);

  //TODO verificar numeros repetidos
  // const sum = dup.reduce((acc, element) => {
  //   console.log(acc, element);
  //   acc[element] += element.X;
  // })
  // console.log(sum);
};

const verifiedOnlyNumber = (array) => {
  let value = 0;
  let reg = /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/;
  array.forEach((row) => {
    if (reg.test(row.X) && reg.test(row.Y)) value++;
  });
  return value === array.length;
};

// Main program
mainEvent(init);
