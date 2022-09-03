const selectEvent = (props) => {
  let select = document.getElementById("data-input");
  select.addEventListener("change", (e) => {
    let valueSelect = e.target.value;
    let resultado = true;
    if(props.Utilities.dataInput.length > 0) {
      console.log("entro popup new");
      props.popup.initWithButtons();
      resultado = props.popup.showWithButtons("success", "Desea salir de la pagina?", loadClickPopupEvent);
    }
    if (valueSelect === "dataExcel" && resultado) location.href = location.origin+"/views/viewExcel.html";
    if (valueSelect === "dataManual" && resultado) location.href = location.origin+"/views/viewManual.html";
    if (valueSelect === "data" && resultado) location.replace(location.origin);
  })
}

const loadClickEvent = (element, method) => {
  element.addEventListener("click", () => method());
}

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
  })
  console.log(resultado, "event click");
  return resultado;
}

const loadExcelEvent = (methodInput) => {
  document.querySelector("#input-excel").addEventListener('change', () =>{
    methodInput()
  })
}

const buttonParamEvent = (Utilities, popup) => {
  let btn = document.getElementsByClassName("addParam");
  let btn2 = document.getElementsByClassName("showResult");
  let inputs = document.getElementsByTagName("input");
  btn[0].addEventListener("click", () => {
    let inputX = inputs[0].value;
    let inputY = inputs[1].value;
    if(inputX !== "" && inputY !== "") {
      let data = {"X": inputX, "Y": inputY};
      Utilities.showTable(data);
      inputs[0].value = "";
      inputs[1].value = "";
    } else {
      inputs[0].value = inputs[0].value !== "" ? inputs[0].value : "";
      inputs[1].value = inputs[1].value !== "" ? inputs[1].value : "";
      popup.show("warning", "Alguno de los campos no deben estar vacios");
    }
    if(Utilities.dataInput.lenght > 1) btn2[0].classList.remove('disabled');
  });
}

const buttonResultEvent = (methodResult) => {
  let btn2 = document.getElementsByClassName("showResult");
  btn2[0].addEventListener("click", () => {
    methodResult();
  });
}

const buttonStartEvent = () => {
  let button = document.getElementById('as');
  if(button !== null) {
    let content = document.getElementById('content');
    button.addEventListener('click', () =>{
      content.classList.toggle('hidden');
      window.scrollTo({
        top: 150,
        behavior: 'smooth'
      });
    })
  }
}

const inputLenghtEvent = () => {
  let inputs = document.getElementsByTagName("input");
  inputs[0].addEventListener('input', () => {
    let value = inputNumber(inputs[0].value);
    if(value === inputs[0].value) {
      let span = document.getElementById("parameterError");
      span.textContent = "El numero no es valido";
    }
    inputs[0].value = value;
    inputs[0].value = inputSize(inputs[0], 'parameterError');
  })
  inputs[1].addEventListener('input', () => {
    let value = inputNumber(inputs[1].value);
    if(value === inputs[1].value) {
      let span = document.getElementById("valueError");
      span.textContent = "El numero no es valido";
    }
    inputs[1].value = value;
    inputs[1].value = inputSize(inputs[1], 'valueError');
  })
}

const inputNumber = (value) => {
  return value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
}

const inputSize = (input, idSpanElement) => {
  let span = document.getElementById(idSpanElement);
  let value = input.value;
  if(value.length > 4) {
    value = value.slice(0, 4);
    input.style.outline = "solid rgba(136, 8, 8, 0.5)";
    span.textContent = "El numero maximo permitido de caracteres es 4";
  }else {
    input.style.outline = "none";
    span.textContent = "";
  } 
  return value;
}

const popupEvent = (Popup)=> {
  document.addEventListener('load', () => Popup.init());
}

const mainEvent = (methodInitial) => {
  let title = document.title;
  let page = title.split(" ")[2];
  document.getElementsByTagName('body')[0].addEventListener('load', methodInitial(title, page));
}

export { selectEvent, loadExcelEvent, buttonParamEvent, buttonResultEvent, buttonStartEvent, inputLenghtEvent, popupEvent, mainEvent };
