class Table {

  static create({inputLenghtEvent, buttonParamEvent, buttonResultEvent, props}) {
    let content = document.getElementById("content");
    let table = document.getElementById("table-content");
    let root = document.createElement("div");
    root.setAttribute("class", "content-input");
    let rootBtn = document.createElement("div");
    rootBtn.setAttribute("class", "content-buttons");
    this.addTitles(root);
    this.addInput(root);
    rootBtn.appendChild(this.addButton());
    content.insertBefore(root, table);
    content.insertBefore(rootBtn, table);
    buttonParamEvent(props);
    buttonResultEvent(props);
    inputLenghtEvent();
  }

  static addTitles(root) {
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
  }

  static addInput(root) {
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
    root.appendChild(div);
  }

  static addButton() {
    let div = document.createElement("div");
    div.setAttribute("class", "buttons");
    let btn1 = document.createElement("button");
    btn1.setAttribute("class", "addParam");
    btn1.setAttribute("type", "button");
    btn1.textContent = " + ";
    let btn2 = document.createElement("button");
    btn2.setAttribute("class", "showResult disabled");
    btn2.setAttribute("type", "button");
    btn2.textContent = "Calcular";
    div.appendChild(btn1);
    div.appendChild(btn2);
    return div;
  };
}

export { Table };
