import { 
  Row, 
  RowCollection, 
  Utilities, 
  Popup 
} from "./Model.js";
import {
  loadChangeEvent,
  loadClickEvent,
  loadInputEvent,
  loadEvent
} from "./Events.js";

const popup = new Popup();

const props = {
  Utilities: Utilities,
  popup: popup,
}

const loadClosePopupEvent = (value) => {
  let element = document.getElementById("myPopup");
  let btnClose = document.getElementsByClassName("popup-close")[0];
  loadClickEvent(btnClose, ()=> {
    let select = document.getElementById("data-input");
    select.value = value;
    element.classList.add("popup-invisible");
  });
}

const loadClickPopupEvent = (props) => {
  let btnCancel = document.getElementById("cancel");
  let btnOk = document.getElementById("ok");
  loadClickEvent(btnCancel, () => {
    let select = document.getElementById("data-input");
    select.value = props.valueSelectPrev;
    props.content.classList.toggle(`popup-${props.state}`);
    props.element.classList.add("popup-invisible");
  });
  loadClickEvent(btnOk, () => {
    props.element.classList.add("popup-invisible");
    selectLocation(props.valueSelect);
  });
};

const selectEvent = (props) => {
  let select = document.getElementById("data-input");
  props.select = select;
  props.valueSelectPrev = select.value;
  loadChangeEvent(select, loadSelect, props);
};

const loadSelect = (props) => {
  let valueSelect = props.select.value;
  if (props.Utilities.dataInput.length > 0) {
    props.popup.initWithButtons();
    props.popup.showWithButtons({
      stateProp: "success",
      message: "¿Desea salir de la página?",
      method: loadClickPopupEvent,
      valueSelect: valueSelect,
      valueSelectPrev: props.valueSelectPrev
    });
  } else selectLocation(valueSelect);
};

const selectLocation = (valueSelect) => {
  if (valueSelect === "dataExcel") location.href = location.origin + "/views/viewExcel.html";
  if (valueSelect === "dataManual") location.href = location.origin + "/views/viewManual.html";
  if (valueSelect === "data") location.replace(location.origin);
} 

const loadExcelEvent = (props) => {
  loadChangeEvent(document.querySelector("#input-excel"), inputExcel, props);
};

const inputExcel = ({ Utilities, popup }) => {
  const excel = document.querySelector("#input-excel");
  document.getElementById("info-excel").textContent = excel.files[0].name;
  let allowedExtensions = /(.xlsx|.xls)$/i;
  if (allowedExtensions.exec(excel.value)) {
    document.getElementById("table-content").innerHTML = "";
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
      if (!Utilities.verifiedOnlyNumber(arraySheet)) {
        popup.show("error", "Alguno de los datos no es un número válido");
        excel.value = "";
        return;
      }
      let row = new Row(arraySheet);
      let dataExcel = new RowCollection(row);
      Utilities.showTableAnova("table-content-anova", dataExcel);
      Utilities.showTableExcel("table-content", dataExcel);
      let propsChart = {
        columnX: dataExcel.getColumnX(), 
        columnY: dataExcel.getColumnY(), 
        columnFunction: dataExcel.getValuesFunction()
      };
      Utilities.showGraph(propsChart);
      popup.show("success", "Cálculos hechos correctamente!");
      changedColorEvent(propsChart, Utilities);
    };
    reader.readAsArrayBuffer(file);
  } else {
    popup.show("error", "Extensión no válida, solo se acepta archivos excel");
    document.getElementById("info-excel").textContent = "Seleccioné un archivo";
    excel.value = "";
  }
};

const buttonParamEvent = ({ Utilities, popup }) => {
  let btn = document.getElementsByClassName("addParam");
  let btn2 = document.getElementsByClassName("showResult");
  let inputs = document.getElementsByTagName("input");
  loadClickEvent(btn[0], () => {
    let inputX = inputs[0].value;
    let inputY = inputs[1].value;
    if (inputX !== "" && inputY !== "") {
      let numX = Number(inputX);
      let numY = Number(inputY);
      if (isNaN(numX) || isNaN(numY)) {
        popup.show("error", "Alguno de los campos no es numérico");
      }else if (inputX.replace(/\D+/g, "").length <= 5 && inputY.replace(/\D+/g, "").length <= 5){
        let data = { X: numX, Y: numY };
        Utilities.showTable(data);
        inputs[0].value = "";
        inputs[1].value = "";
      } else {
        popup.show("warning", "el campo solo recibe hasta 5 caracteres");
      }
    } else {
      inputs[0].value = inputs[0].value !== "" ? inputs[0].value : "";
      inputs[1].value = inputs[1].value !== "" ? inputs[1].value : "";
      popup.show("warning", "Alguno de los campos no deben estar vacíos");
    }
    if (Utilities.dataInput.lenght > 1) btn2[0].classList.remove("disabled");
  });
};

const buttonResultEvent = (props) => {
  let btn2 = document.getElementsByClassName("showResult")[0];
  loadClickEvent(btn2, showResult, props);
};

const showResult = ({Utilities, popup}) => {
  document.getElementById("table-content").innerHTML = "";
  document.getElementById("table-content-data").innerHTML = "";
  let table = [];
  table = Utilities.dataInput;
  if (!Utilities.verifiedOnlyNumber(table)) {
    popup.show("error", "Alguno de los datos no es un número válido");
    if (table.length > 0) Utilities.showTableInput();
    return;
  }
  if (table.length < 2) {
    popup.show(
      "error",
      "Al menos debe ingresar dos filas para poder hacer el cálculo"
    );
    if (table.length > 0) Utilities.showTableInput();
    return;
  }
  let row = new Row(table);
  let dataExcel = new RowCollection(row);
  Utilities.showTableAnova("table-content-anova", dataExcel);
  Utilities.showTableExcel("table-content", dataExcel);
  let propsChart = {
    columnX: dataExcel.getColumnX(), 
    columnY: dataExcel.getColumnY(), 
    columnFunction: dataExcel.getValuesFunction()
  };
  Utilities.showGraph(propsChart);
  Utilities.genericForm("form-calX", "X", (value) => dataExcel.getFunctionCalculatedY(value), onSubmit);
  Utilities.genericForm("form-calY", "Y", (value) => dataExcel.getFunctionCalculatedX(value), onSubmit);
  popup.show("success", "Cálculos hechos correctamente!");
  changedColorEvent(propsChart, Utilities);
};

const buttonStartEvent = () => {
  let button = document.getElementById("as");
  if (button !== null) loadClickEvent(button, toggleButton); 
};

const toggleButton = () => {
  let content = document.getElementById("content");
  let btn = document.getElementById("as");
  btn.textContent = btn.textContent === "CLOSE" ? "START": "CLOSE";
  content.classList.toggle("hidden");
  window.scrollTo({
    top: 150,
    behavior: "smooth",
  });
}

const inputLenghtEvent = () => {
  let inputs = document.getElementsByTagName("input");
  loadInputEvent(inputs[0], () => {
    let value = inputNumber(inputs[0], "parameterError");
    inputs[0].value = value;
  });
  loadInputEvent(inputs[1], () => {
    let value = inputNumber(inputs[1], "valueError");
    inputs[1].value = value;
  });
};

const inputNumber = (input, idspan) => {
  let reg = /^[0-9,.]+$/;
  let span = document.getElementById(idspan);
  let value = input.value
  if(reg.test(value) && value.replace(/\D+/g, "").length <= 5) {
    input.style.outline = "none";
    span.textContent = "";
    return value.replace(/,/g, ".");
  } 
  else {
    input.style.outline = "solid rgba(136, 8, 8, 0.5)";
    span.textContent = "El número no es válido";
    return value.replace(/,/g, ".");
  }
};

const changedColorEvent = (props, utilities) => {
  let propsEvent = { props, utilities}
  loadInputEvent(graphD, changedColor, propsEvent);
  loadInputEvent(graphF, changedColor, propsEvent);
};

const changedColor = (propsEvent, event) => {
  let result = propsEvent.utilities.convertHextoRGB(event.target.value);
  let graphD = document.getElementById("graphD");
  let graphF = document.getElementById("graphF");
  let resultD = propsEvent.utilities.convertHextoRGB(graphD.value);
  let colorD = resultD.r + "," + resultD.g + "," + resultD.b;
  let resultF = propsEvent.utilities.convertHextoRGB(graphF.value);
  let colorF = resultF.r + "," + resultF.g + "," + resultF.b;
  result = result.r + "," + result.g + "," + result.b;
  switch(event.target.id) {
    case "graphD": propsEvent.utilities.showGraph(propsEvent.props, result, colorF);break;
    case "graphF": propsEvent.utilities.showGraph(propsEvent.props, colorD, result);break;
  }
};

const onSubmit = (props) => {
  let onForm = document.getElementById("calc-form" + props.letter);
  loadClickEvent(onForm, calculeEstimationValue, props);
}

const calculeEstimationValue = (props) => {
  let calc = document.getElementsByName("data" + props.letter)[0];
  let result = document.getElementById("result-cal" + props.letter);
  if(calc.value !== "") result.textContent =  props.variables[props.letter]+": " + props.method(Number(calc.value));
  else result.textContent = "Ingrese un numero valido";
}

const mainEvent = () => {
  let title = document.title;
  let page = title.split(" ")[2];
  loadEvent(document.getElementsByTagName("body")[0], init, { datatitle: title, value: page });
};

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

const init = (propsInit) => {
  let content = document.getElementById("content");
  let title = document.createElement("h4");
  resetWindow(content, propsInit.value);
  title.textContent = propsInit.datatitle;
  let valueSelect = propsInit.value !== undefined ? "data" + propsInit.value : "data";
  let select = createSelect(valueSelect);
  if (valueSelect === "dataExcel") {
    let firstNode = document.getElementById("input-excel");
    content.insertBefore(popup.init(), firstNode);
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
    loadExcelEvent(props);
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
  loadClosePopupEvent(select.value);
  selectEvent(props);
  buttonStartEvent();
  createIcon();
};

const resetWindow = (content, value) => {
  if (value === undefined) {
    content.getElementsByTagName("h4")[0]?.remove();
    content.getElementsByTagName("select")[0]?.remove();
    content.getElementsByTagName("div")[2]?.remove();
    content.getElementsByTagName("div")[2]?.remove();
  } else content.innerHTML = "";
}

const createIcon = () => {
  let icon = document.createElement("link");
  icon.setAttribute("rel", "shortcut icon");
  icon.setAttribute("type", "image/x-icon");
  icon.setAttribute("href", "data:image/png;base64,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");
  document.head.appendChild(icon);
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
  rootBtn.appendChild(addButton());
  content.insertBefore(root, table);
  content.insertBefore(rootBtn, table);
  buttonParamEvent(props);
  buttonResultEvent(props);
};

const addTitles = (root) => {
  let div = document.createElement("div");
  div.setAttribute("class", "content-input-header");
  let subtitle = document.createElement("span");
  subtitle.textContent = "Digite solo números";
  let spanX = document.createElement("span");
  spanX.textContent = "X";
  let spanY = document.createElement("span");
  spanY.textContent = "Y";
  div.appendChild(spanX);
  div.appendChild(spanY);
  root.appendChild(subtitle);
  root.appendChild(div);
};

const addRow = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "content-input-number");
  let divParam = document.createElement("div");
  let divValue = document.createElement("div");
  let input1 = document.createElement("input");
  let p1 = document.createElement("p");
  p1.setAttribute("id", "parameterError");
  input1.setAttribute("type", "text");
  input1.setAttribute("class", "parametro");
  let input2 = document.createElement("input");
  let p2 = document.createElement("p");
  p2.setAttribute("id", "valueError");
  input2.setAttribute("type", "text");
  input2.setAttribute("class", "valor");
  divParam.appendChild(input1);
  divParam.appendChild(p1);
  divValue.appendChild(input2);
  divValue.appendChild(p2);
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

export {
  loadClosePopupEvent,
  selectEvent,
  loadExcelEvent,
  buttonParamEvent,
  buttonResultEvent,
  buttonStartEvent,
  inputLenghtEvent,
  changedColorEvent,
  mainEvent,
};
