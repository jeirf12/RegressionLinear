const createSelect = (valueSelect) => {
  let select = document.createElement("select");
  select.setAttribute("name", "data-input");
  select.setAttribute("value", valueSelect);
  select.setAttribute("id", "data-input");

  let options = ["Elegir datos de entrada", "Subida archivo excel", "Introducir valores Manualmente"];
  let valueOptions = ["data", "dataExcel", "dataManual"];

  options.forEach((data, index) => {
    let option = document.createElement("option");
    option.setAttribute("value", valueOptions[index]);
    if (valueSelect === valueOptions[index]) option.setAttribute("selected", "selected");
    option.textContent = data;
    select.appendChild(option);
  })
  return select;
}

const init = (datatitle, valueSelect) => {
  let content = document.getElementById("content");
  let title = document.createElement("h4");
  title.textContent = datatitle;
  let select = createSelect(valueSelect);
  if (valueSelect === "dataExcel") {
    let firstNode = document.getElementById("input-excel");
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
  } else if (valueSelect === "dataManual") {
    let firstNode = document.getElementById("myGraph");
    content.insertBefore(title, firstNode);
    content.insertBefore(select, firstNode);
  } else {
    content.appendChild(title);
    content.appendChild(select);
  }
  selectEvents();
}

const selectEvents = () => {
let select = document.getElementById("data-input");
select.addEventListener("change", (e) => {
  let valueSelect = e.target.value;
  if (valueSelect === "dataExcel") location.href = "viewExcel.html";
  if (valueSelect === "dataManual") location.href = "viewManual.html";
  if (valueSelect === "") location.href = "index.html";
})
}

