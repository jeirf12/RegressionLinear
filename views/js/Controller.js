import {
  loadChangeEvent,
  loadClickEvent,
  loadInputEvent,
  loadEvent
} from "./Events.js";

const loadClickPopupEvent = (props) => {
  let btnCancel = document.getElementById("cancel");
  let btnOk = document.getElementById("ok");
  loadClickEvent(btnCancel, () => {
    let select = document.getElementById("data-input");
    select.value = props.valueSelectPrev;
    props.element.classList.toggle(`popup-${props.state}`);
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
      message: "Desea salir de la pagina",
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

const loadExcelEvent = (methodInput) => {
  loadChangeEvent(document.querySelector("#input-excel"), methodInput);
};

const buttonParamEvent = (Utilities, popup) => {
  let btn = document.getElementsByClassName("addParam");
  let btn2 = document.getElementsByClassName("showResult");
  let inputs = document.getElementsByTagName("input");
  loadClickEvent(btn[0], () => {
    let inputX = inputs[0].value;
    let inputY = inputs[1].value;
    if (inputX !== "" && inputY !== "") {
      let data = { X: Number(inputX), Y: Number(inputY) };
      Utilities.showTable(data);
      inputs[0].value = "";
      inputs[1].value = "";
    } else {
      inputs[0].value = inputs[0].value !== "" ? inputs[0].value : "";
      inputs[1].value = inputs[1].value !== "" ? inputs[1].value : "";
      popup.show("warning", "Alguno de los campos no deben estar vacios");
    }
    if (Utilities.dataInput.lenght > 1) btn2[0].classList.remove("disabled");
  });
};

const buttonResultEvent = (methodResult) => {
  let btn2 = document.getElementsByClassName("showResult");
  loadClickEvent(btn2[0], methodResult);
};

const buttonStartEvent = () => {
  let button = document.getElementById("as");
  if (button !== null) {
    loadClickEvent(button, toggleButton);
  }
};

const toggleButton = () => {
  let content = document.getElementById("content");
  content.classList.toggle("hidden");
  window.scrollTo({
    top: 150,
    behavior: "smooth",
  });
}

const inputLenghtEvent = () => {
  let inputs = document.getElementsByTagName("input");
  loadInputEvent(inputs[0], () => {
    let value = inputNumber(inputs[0].value);
    if (value === inputs[0].value) {
      let span = document.getElementById("parameterError");
      span.textContent = "El numero no es valido";
    }
    inputs[0].value = value;
    inputs[0].value = inputSize(inputs[0], "parameterError");
  });
  loadInputEvent(inputs[1], () => {
    let value = inputNumber(inputs[1].value);
    if (value === inputs[1].value) {
      let span = document.getElementById("valueError");
      span.textContent = "El numero no es valido";
    }
    inputs[1].value = value;
    inputs[1].value = inputSize(inputs[1], "valueError");
  });
};

const inputNumber = (value) => {
  return value.replace(/[^0-9,.]/g, "").replace(/,/g, ".");
};

const inputSize = (input, idSpanElement) => {
  let span = document.getElementById(idSpanElement);
  let value = input.value;
  if (value.length > 4) {
    value = value.slice(0, 4);
    input.style.outline = "solid rgba(136, 8, 8, 0.5)";
    span.textContent = "El numero maximo permitido de caracteres es 4";
  } else {
    input.style.outline = "none";
    span.textContent = "";
  }
  return value;
};

const changedColorEvent = (props, utilities) => {
  let graphD = document.getElementById("graphD");
  let graphF = document.getElementById("graphF");
  let result = utilities.convertHextoRGB(graphD.value);
  let colorD = result.r + "," + result.g + "," + result.b;
  let resultF = utilities.convertHextoRGB(graphF.value);
  let colorF = resultF.r + "," + resultF.g + "," + resultF.b;
  let propsEvent = { props, utilities, colorD, colorF }
  loadInputEvent(graphD, changedColor, propsEvent);
  loadInputEvent(graphF, changedColor, propsEvent);
};

const changedColor = (propsEvent, event) => {
  let result = propsEvent.utilities.convertHextoRGB(event.target.value);
  result = result.r + "," + result.g + "," + result.b;
  switch(event.target.id) {
    case "graphD": propsEvent.utilities.showGraph(propsEvent.props, result, propsEvent.colorF);break;
    case "graphF": propsEvent.utilities.showGraph(propsEvent.props, propsEvent.colorD, result);break;
  }
};

const mainEvent = (methodInitial) => {
  let title = document.title;
  let page = title.split(" ")[2];
  loadEvent(document.getElementsByTagName("body")[0], methodInitial, { datatitle: title, value: page });
};

export {
  selectEvent,
  loadExcelEvent,
  buttonParamEvent,
  buttonResultEvent,
  buttonStartEvent,
  inputLenghtEvent,
  changedColorEvent,
  mainEvent,
};
