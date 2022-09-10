const loadBlurEvent = (element, methodBlur, parameter="") => {
  element.addEventListener("blur", ()=> {
    if(parameter !== "") methodBlur(parameter);
    else methodBlur();
  });
};
const loadKeyupEvent = (element, methodKeyup, parameter="") => {
  element.addEventListener("keyup", () => {
    if(parameter !== "") methodKeyup(parameter);
    else methodKeyup();
  });
};
const loadChangeEvent = (element, methodChange, parameter="") => {
  element.addEventListener("change", (event) => {
    if(parameter !== "") methodChange(parameter, event);
    else methodChange();
  });
};
const loadClickEvent = (element, methodClick, parameter="") => {
  element.addEventListener("click", () => {
    if(parameter !== "") methodClick(parameter);
    else methodClick();
  });
};
const loadInputEvent = (element, methodInput, parameter="") => {
  element.addEventListener("input", (event) => {
    if(parameter !== "") methodInput(parameter, event);
    else methodInput();
  });
};

const loadEvent = (element, methodLoad, parameter="") => {
  element.addEventListener("load", () => {
    if(parameter !== "") methodLoad(parameter);
    else methodLoad();
  }, true);
};

export { 
  loadBlurEvent,
  loadKeyupEvent,
  loadChangeEvent,
  loadClickEvent,
  loadInputEvent,
  loadEvent,
};
