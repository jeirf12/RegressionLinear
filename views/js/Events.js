const addParam = (method, parameter) => { return parameter !== "" ? () => method(parameter) : method };

const addBlurEvent = (element, methodBlur, parameter="") => {
  element.addEventListener("blur", addParam(methodBlur, parameter));
};
const addKeyupEvent = (element, methodKeyup, parameter="") => {
  element.addEventListener("keyup", addParam(methodKeyup, parameter));
};
const addKeyDownEvent = (element, methodKeyDown, parameter="") => {
  element.addEventListener("keydown", addParam(methodKeyDown, parameter));
};
const addChangeEvent = (element, methodChange, parameter="") => {
  element.addEventListener("change", addParam(methodChange, parameter));
};
const addClickEvent = (element, methodClick, parameter="") => {
  element.addEventListener("click", addParam(methodClick, parameter));
};
const addDBClickEvent = (element, methodDBClick, parameter="") => {
  element.addEventListener("dblclick", addParam(methodDBClick, parameter));
};
const addInputEvent = (element, methodInput, parameter="") => {
  element.addEventListener("input", parameter !== "" ? (event) => methodInput(parameter, event) : methodInput);
};
const addLoadEvent = (element, methodLoad, parameter="") => {
  element.addEventListener("load", addParam(methodLoad, parameter), true);
};

export { 
  addBlurEvent,
  addKeyupEvent,
  addKeyDownEvent,
  addChangeEvent,
  addClickEvent,
  addDBClickEvent,
  addInputEvent,
  addLoadEvent,
};
