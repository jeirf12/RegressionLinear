import { 
  Dom
} from "../infraestructura/Dom.js";

class Table {

  static create({inputLenghtEvent, buttonParamEvent, buttonResultEvent, props}) {
    let content = document.getElementById("content");
    let table = document.getElementById("table-content");
    let root = Dom.createDiv({ className: "content-input" })
    let rootBtn = Dom.createDiv({ className: "content-buttons" });
    this.addTitles(root);
    this.addInput(root);
    rootBtn.appendChild(this.addButtons());
    content.insertBefore(root, table);
    content.insertBefore(rootBtn, table);
    buttonParamEvent(props);
    buttonResultEvent(props);
    inputLenghtEvent();
  }

  static addTitles(root) {
    let div = Dom.createDiv({ className: "content-input-header" })
    let subtitle = Dom.createSpan({ text: "Digite solo números" });
    let spanX = Dom.createSpan({ text: "X" });
    let spanY = Dom.createSpan({ text: "Y" });
    div.appendChild(spanX);
    div.appendChild(spanY);
    root.appendChild(subtitle);
    root.appendChild(div);
  }

  static addInput(root) {
    let div = Dom.createDiv({ className: "content-input-number" });
    let divParam = Dom.createDiv({});
    let divValue = Dom.createDiv({});
    let input1 = Dom.createInput({ className: "parametro" });
    let p1 = Dom.createParagraph({ id: "parameterError" });
    let input2 = Dom.createInput({ className: "valor" });
    let p2 = Dom.createParagraph({ id: "valueError" });
    divParam.appendChild(input1);
    divParam.appendChild(p1);
    divValue.appendChild(input2);
    divValue.appendChild(p2);
    div.appendChild(divParam);
    div.appendChild(divValue);
    root.appendChild(div);
  }

  static addButtons() {
    let div = Dom.createDiv({ className: "buttons", });
    let btn1 = Dom.createButton({ text: " + ", className: " addParam", });
    let btn2 = Dom.createButton({ text: "Calcular", className: "showResult disabled", });
    div.appendChild(btn1);
    div.appendChild(btn2);
    return div;
  };
}

export { Table };
