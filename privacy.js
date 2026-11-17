(function(){"use strict";
const app=window.Hisobim,button=document.getElementById("privacyToggle"),key="hisobim-hide-amounts";
const labels={hideAmounts:["Summalarni yashirish","Скрыть суммы"],showAmounts:["Summalarni koʻrsatish","Показать суммы"]};
app.addTranslations(labels);
let hidden=false;try{hidden=localStorage.getItem(key)==="1"}catch(error){}
function render(){document.body.classList.toggle("amounts-hidden",hidden);button.setAttribute("aria-pressed",String(hidden));let label=app.tr(hidden?"showAmounts":"hideAmounts");button.setAttribute("aria-label",label);button.title=label;button.querySelector(".eye-open").hidden=hidden;button.querySelector(".eye-closed").hidden=!hidden}
button.onclick=()=>{hidden=!hidden;try{localStorage.setItem(key,hidden?"1":"0")}catch(error){}render()};
window.HisobimPrivacy={render};render();
})();
