class Dom {
  static createTable() {
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('thead');
    let tb = document.createElement('tbody');
    th.appendChild(tr);
    table.appendChild(th);
    table.appendChild(tb);
    return table;
  }

  static createGroupInput({ type = "", id = "", name = "", textLabel = "", idContent = "" }) {
    let divContentInput = this.createDiv({ id: idContent });
    let labelInput = this.createSpan({ text: textLabel });
    let valueInput = this.createInput({ name, type, id, });
    divContentInput.appendChild(labelInput);
    divContentInput.appendChild(valueInput);
    return divContentInput;
  }

  static createButton({ className = "", id = "", type = "button", text = "" }) {
    let button = document.createElement("button");
    button.setAttribute("class", className);
    button.setAttribute("id", id);
    button.setAttribute("type", type);
    button.textContent = text;
    return button;
  }

  static createDiv({ className = "", id = "" }) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    div.setAttribute("id", id);
    return div;
  }

  static createInput({ className = "", type = "text", id = "", name = "", value = "" }) {
    let input = document.createElement("input");
    input.setAttribute("class", className);
    input.setAttribute("type", type);
    input.setAttribute("id", id);
    input.setAttribute("name", name);
    input.setAttribute("value", value);
    return input;
  }

  static createSpan({ className = "", id = "", text = "", textHTML = "" }) {
    let span = document.createElement("span");
    span.setAttribute("class", className);
    span.setAttribute("id", id);
    if (textHTML !== "") span.innerHTML = textHTML;
    else span.textContent = text;
    return span;
  }

  static createParagraph({ className = "", id = "", text = "" }) {
    let p = document.createElement("p");
    p.setAttribute("class", className);
    p.setAttribute("id", id);
    p.textContent = text;
    return p;
  }

  static createH({ id = "1", text = "" }) {
    let h = document.createElement("h" + id);
    h.textContent = text;
    return h;
  }

  static createSelect({ id = "", value = "", name = "" }) {
    let select = document.createElement("select");
    select.setAttribute("name", name);
    select.setAttribute("value", value);
    select.setAttribute("id", id);
    return select;
  }
  
  static createOption({ value = "", isSelect = false, text = "" }) {
    let option = document.createElement("option");
    option.setAttribute("value", value);
    if(isSelect) option.setAttribute("selected", "selected");
    option.textContent = text;
    return option;
  }

  static createLinkHead({ rel = "", type = "", href = "" }) {
    let link = document.createElement("link");
    link.setAttribute("rel", rel);
    link.setAttribute("type", type);
    link.setAttribute("href", href);
    return link;
  }

  static createITag({ className = "" }) {
    let i = document.createElement("i");
    i.setAttribute("class", className);
    return i;
  }
}

export { Dom }
