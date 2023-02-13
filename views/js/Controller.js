import { Popup } from "./components/Popup.js";
import { Table } from "./components/Table.js";
import { Header } from "./components/Header.js";
import { Row, RowCollection } from "./model/Row.js";
import { Utilities } from "./Utilities.js";
import {
  loadChangeEvent,
  loadClickEvent,
  loadDBClickEvent,
  loadInputEvent,
  loadEvent,
  loadBlurEvent,
  loadKeyDownEvent
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
        document.getElementById("info-excel").textContent = "Seleccioné un archivo";
        excel.value = "";
        return;
      }
      if (!Utilities.verifiedOnlyNumber(arraySheet)) {
        popup.show("error", "Alguno de los datos no es un número válido");
        document.getElementById("info-excel").textContent = "Seleccioné un archivo";
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
      Utilities.genericForm("form-calX", "X", (value) => dataExcel.getFunctionCalculatedY(value), onSubmit);
      Utilities.genericForm("form-calY", "Y", (value) => dataExcel.getFunctionCalculatedX(value), onSubmit);
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
        Utilities.showTable({data, editTableEvent});
        inputs[0].value = "";
        inputs[1].value = "";
        if (Utilities.dataInput.length > 1) {
          btn2[0].classList.remove("disabled");
        }
      } else {
        popup.show("warning", "el campo solo recibe hasta 5 caracteres");
      }
    } else {
      inputs[0].value = inputs[0].value !== "" ? inputs[0].value : "";
      inputs[1].value = inputs[1].value !== "" ? inputs[1].value : "";
      popup.show("warning", "Alguno de los campos no deben estar vacíos");
    }
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
};

const editTableEvent = () => {
  let table = document.getElementById("datos-insertados");
  let tdsTable = table.querySelectorAll("td");

  tdsTable.forEach((td) => {
    loadDBClickEvent(td, editTable, td);
  });
};

const editTable = (event) => {
  let input = document.createElement("input");
  input.value = event.textContent;

  loadBlurEvent(input, removeInput, input);
  loadKeyDownEvent(input, (event) => {
    if(event.which == 13) removeInput(input);
  });
  event.textContent = "";
  event.appendChild(input);
};

const removeInput = (input) => { 
  input.parentElement.textContent = input.value; 
  Utilities.dataInput = loadDataList(Utilities.dataInput);
  Utilities.showTable({data: "", editTableEvent});
};

const loadDataList = (dataBackup) => {
  let newData = [];
  let table = document.getElementById("datos-insertados");
  let row = table.rows;
  
  for(let i = 1; i < row.length; i++){
    let cellX = Number(row[i].cells[0].innerText);
    let cellY = Number(row[i].cells[1].innerText);
    if(isNaN(cellX) || isNaN(cellY)) return dataBackup;
    newData.push({ X: cellX, Y: cellY }) ;
  }
  return newData;
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

const init = (propsInit) => {
  let content = document.getElementById("content");
  resetWindow(content, propsInit.value);
  Header.createIcon();
  let valueSelect = propsInit.value !== undefined ? "data" + propsInit.value : "data";
  let firstNode = getNodeFirst(valueSelect);
  Header.title(firstNode, {titleText: propsInit.datatitle, popup: popup});
  Header.createSelect(firstNode, {
    options: [
      "Elegir datos de entrada",
      "Subida archivo excel",
      "Introducir valores Manualmente",
    ], 
    valueOptions: ["data", "dataExcel", "dataManual"],
    valueSelect,
    selectEvent,
    props,
  });
  if (valueSelect === "dataExcel") {
    loadExcelEvent(props);
  } else if (valueSelect === "dataManual") {
    Table.create({inputLenghtEvent, buttonParamEvent, buttonResultEvent, props});
  } 
  loadClosePopupEvent(valueSelect);
  buttonStartEvent();
};

const getNodeFirst = (valueSelect) => {
  let firstNode = null;
  switch(valueSelect) {
    case "dataExcel": firstNode = document.getElementById("input-excel"); break;
    case "dataManual": firstNode = document.getElementById("table-content"); break;
    default: break;
  }
  return firstNode;
}

const resetWindow = (content, value) => {
  if (value !== undefined) {
    content.getElementsByTagName("h4")[0]?.remove();
    content.getElementsByTagName("select")[0]?.remove();
    content.getElementsByClassName("content-input")[0]?.remove();
    content.getElementsByClassName("content-buttons")[0]?.remove();
  } else content.innerHTML = "";
}

export { mainEvent };
