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
    inputs[0].value = inputSize(inputs[0].value, 'parameterError');
  })
  inputs[1].addEventListener('input', () => {
    inputs[1].value = inputNumber(inputs[1].value);
    inputs[1].value = inputSize(inputs[1].value, 'valueError');
  })
}

const inputNumber = (value) => {
  // let reg = /^([0-9]+\.?[0-9]{0,2})$/
  // if(value.length > 0 && !reg.test(value)) return String(Number.parseFloat(value).toFixed(2));
  return value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
  // let reg = /^\d{1,2}\.,\d{1,2}+$/
  // if(reg.test(value)) alert("valida");
  // return value;
}

const inputSize = (value, idSpanElement) => {
  let span = document.getElementById(idSpanElement);
  if(value.length > 4) {
    value = value.slice(0, 4);
    span.textContent = "El numero maximo permitido de caracteres es 4";
  }else span.textContent = "";
  return value;
}

const mainEvent = (methodInitial) => {
  let title = document.title;
  let page = title.split(" ")[2];
  document.getElementsByTagName('body')[0].addEventListener('load', methodInitial(title, page));
}

export { selectEvent, loadExcelEvent, buttonParamEvent, buttonResultEvent, buttonStartEvent, inputLenghtEvent, mainEvent };
