const selectEvent = () => {
  let select = document.getElementById("data-input");
  select.addEventListener("change", (e) => {
    let valueSelect = e.target.value;
    if (valueSelect === "dataExcel") location.href = "viewExcel.html";
    if (valueSelect === "dataManual") location.href = "viewManual.html";
    if (valueSelect === "data") location.replace(location.origin);
  })
}

const loadExcelEvent = (methodInput) => {
  document.querySelector("#input-excel").addEventListener('change', () =>{
    methodInput()
  })
}

const buttonParamEvent = (Utilities) => {
  let btn = document.getElementsByClassName("addParam");
  let btn2 = document.getElementsByClassName("showResult");
  let inputs = document.getElementsByTagName("input");
  btn[0].addEventListener("click", () => {
    let inputX = inputs[0].value;
    let inputY = inputs[1].value;
    if(inputX !== "" && inputY !== "") {
      let data = {"X": inputX, "Y": inputY};
      Utilities.showTable(data);
    }
    inputs[0].value = "";
    inputs[1].value = "";
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
    inputs[0].value = inputNumber(inputs[0].value);
    inputs[0].value = inputSize(inputs[0], 'parameterError');
  })
  inputs[1].addEventListener('input', () => {
    inputs[1].value = inputNumber(inputs[1].value);
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
