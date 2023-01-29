import {
  loadChangeEvent,
  loadClickEvent,
  loadInputEvent,
  loadEvent
} from "./Events.js";

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

const loadExcelEvent = (methodInput) => {
  console.log(document.querySelector("#input-excel"));
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

const buttonResultEvent = (methodResult) => {
  let btn2 = document.getElementsByClassName("showResult")[0];
  loadClickEvent(btn2, methodResult);
};

const buttonStartEvent = () => {
  let button = document.getElementById("as");
  if (button !== null) {
    loadClickEvent(button, toggleButton);
  }
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

const onSubmit = (methodMain, props) => {
  let onForm = document.getElementById("calc-form" + props.letter);
  loadClickEvent(onForm, methodMain, props);
}

const mainEvent = (methodInitial) => {
  let title = document.title;
  let page = title.split(" ")[2];
  loadEvent(document.getElementsByTagName("body")[0], methodInitial, { datatitle: title, value: page });
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
  onSubmit,
  mainEvent,
};
