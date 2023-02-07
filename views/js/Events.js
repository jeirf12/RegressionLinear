const loadBlurEvent = (element, methodBlur, parameter="") => {
  element.addEventListener("blur", parameter !== "" ? () => methodBlur(parameter) : methodBlur);
};
const loadKeyupEvent = (element, methodKeyup, parameter="") => {
  element.addEventListener("keyup", parameter !== "" ? () => methodKeyup(parameter) : methodKeyup);
};
const loadKeyDownEvent = (element, methodKeyDown, parameter="") => {
  element.addEventListener("keydown", parameter !== "" ? () => methodKeyDown(parameter) : methodKeyDown);
};
const loadChangeEvent = (element, methodChange, parameter="") => {
  element.addEventListener("change", parameter !== "" ? () => methodChange(parameter) : methodChange);
};
const loadClickEvent = (element, methodClick, parameter="") => {
  element.addEventListener("click", parameter !== "" ? () => methodClick(parameter) : methodClick);
};
const loadDBClickEvent = (element, methodDBClick, parameter="") => {
  element.addEventListener("dblclick", parameter !== "" ? () => methodDBClick(parameter) : methodDBClick);
};
const loadInputEvent = (element, methodInput, parameter="") => {
  element.addEventListener("input", parameter !== "" ? (event) => methodInput(parameter, event) : methodInput);
};
const loadEvent = (element, methodLoad, parameter="") => {
  element.addEventListener("load", parameter !== "" ? () => methodLoad(parameter) : methodLoad, true);
};

export { 
  loadBlurEvent,
  loadKeyupEvent,
  loadKeyDownEvent,
  loadChangeEvent,
  loadClickEvent,
  loadDBClickEvent,
  loadInputEvent,
  loadEvent,
};
