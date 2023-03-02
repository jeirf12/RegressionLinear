import { Dom } from "../infraestructura/Dom.js";

class Popup {

  init() {
    this.state = "";
    this.hideTimeout = null;
    this.icons = {
      success: "fa-circle-check",
      warning: "fa-circle-exclamation",
      error: "fa-circle-xmark",
    };
    this.parent = Dom.createDiv({ className: "popup popup-invisible", id: "myPopup" });
    this.child = Dom.createDiv({ className: "popup-content", id: "myPopupContent" });
    this.span = Dom.createSpan({ className: "popup-close", textHTML: "&times;" });
    this.i = Dom.createITag({ className: "fa-solid" });
    this.p = Dom.createParagraph({ className: "popup-message" });
    this.child.appendChild(this.span);
    this.child.appendChild(this.i);
    this.child.appendChild(this.p);
    this.parent.appendChild(this.child);
    return this.parent;
  }

  initWithButtons() {
    let cancel = document.getElementById("cancel");
    let ok = document.getElementById("ok");
    if (cancel === null && ok === null) {
      let popup = document.getElementById("myPopupContent");
      this.divButtons = Dom.createDiv({ className: "popup-buttons" });
      this.buttonCancel = Dom.createButton({ id: "cancel", text: "Cancelar" });
      this.buttonOk = Dom.createButton({ id: "ok", text: "Aceptar" });
      this.divButtons.appendChild(this.buttonCancel);
      this.divButtons.appendChild(this.buttonOk);
      popup.appendChild(this.divButtons);
    }
  }

  removeButtons() {
    let cancel = document.getElementById("cancel");
    let ok = document.getElementById("ok");
    if (cancel !== null && ok !== null) {
      let popup = document.getElementById("myPopupContent");
      let divButtons = document.getElementsByClassName("popup-buttons");
      popup.removeChild(divButtons[0]);
    }
  }

  show(stateProp, message) {
    this.removeButtons();
    clearTimeout(this.hideTimeout);
    let element = document.getElementById("myPopup");
    let content = document.getElementById("myPopupContent");
    if (element === null) return;
    element.classList.remove("popup-invisible");
    if (this.state !== "" && content.classList.contains(`popup-${this.state}`)) {
      content.classList.remove(`popup-${this.state}`);
      content.getElementsByTagName("i")[0].classList.toggle(this.icons[this.state]);
    }
    this.state = stateProp;
    if (this.state) {
      content.getElementsByTagName("p")[0].textContent = message;
      content.getElementsByTagName("i")[0].classList.add(this.icons[this.state]);
      content.classList.add(`popup-${this.state}`);
    }
    this.hideTimeout = setTimeout(() => {
      content.classList.toggle(`popup-${this.state}`);
      content.getElementsByTagName("i")[0].classList.toggle(this.icons[this.state]);
      element.classList.add("popup-invisible");
    }, 3000);
  }

  showWithButtons(props) {
    let btnCancel = document.getElementById("cancel");
    let btnOk = document.getElementById("ok");
    let element = document.getElementById("myPopup");
    let content = document.getElementById("myPopupContent");
    if (element === null || btnCancel === null || btnOk === null) return;
    element.classList.remove("popup-invisible");
    if (this.state !== "" && content.classList.contains(`popup-${this.state}`)) {
      content.getElementsByTagName("i")[0].classList.toggle(this.icons[this.state]);
      content.classList.remove(`popup-${this.state}`);
    }
    this.state = props.stateProp;
    let propsSend = {
      element: element,
      content: content,
      state: this.state,
      valueSelect: props.valueSelect,
      valueSelectPrev: props.valueSelectPrev,
    };
    props.method(propsSend);
    if (this.state) {
      content.getElementsByTagName("p")[0].textContent = props.message;
      content.getElementsByTagName("i")[0].classList.add(this.icons[this.state]);
      content.classList.add(`popup-${this.state}`);
    }
  }
}

export { Popup };
