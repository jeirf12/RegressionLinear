import {
  loadChangeEvent,
  loadClickEvent,
  loadInputEvent,
  loadEvent
} from "./Events.js";

const loadClickPopupEvent = (props) => {
  let btnCancel = document.getElementById("cancel");
  let btnOk = document.getElementById("ok");
  var resultado;
  loadClickEvent(btnCancel, () => {
    props.element.classList.toggle(`popup-${props.state}`);
    props.element.classList.add("popup-invisible");
    resultado = false;
  });
  loadClickEvent(btnOk, () => {
    resultado = true;
  });
  return resultado;
};

const selectEvent = (props) => {
  let select = document.getElementById("data-input");
  props.select = select;
  loadChangeEvent(select, loadSelect, props);
};

const loadSelect = (props) => {
  let valueSelect = props.select.value;
  let resultado = true;
  if (props.Utilities.dataInput.length > 0) {
    console.log("entro popup new");
    props.popup.initWithButtons();
    resultado = props.popup.showWithButtons(
      "success",
      "Desea salir de la pagina?",
      loadClickPopupEvent
    );
  }
  if (valueSelect === "dataExcel" && resultado)
    location.href = location.origin + "/views/viewExcel.html";
  if (valueSelect === "dataManual" && resultado)
    location.href = location.origin + "/views/viewManual.html";
  if (valueSelect === "data" && resultado) location.replace(location.origin);
};

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
      let data = { X: inputX, Y: inputY };
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
  mainEvent,
};
