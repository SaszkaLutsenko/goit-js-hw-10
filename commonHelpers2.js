import"./assets/styles-2caccfe1.js";import{i as t}from"./assets/vendor-bfb47a51.js";t.settings({position:"topRight",timeout:3e3,resetOnHover:!0,transitionIn:"flipInX",transitionOut:"flipOutX"});let o=!1;const s=document.querySelector(".form");s.addEventListener("submit",l);function l(n){n.preventDefault();const i=s.elements.delay.value,r=s.elements.state.value;o||(o=!0,t.info({message:"Form will reset in 10 sec"}),setTimeout(()=>{t.info({message:"Form reset..."}),s.reset(),o=!1},1e4)),new Promise((e,m)=>{setTimeout(()=>{r==="fulfilled"&&e(i),m(i)},i)}).then(e=>t.success({message:`Fulfilled promise in ${e}ms`})).catch(e=>t.error({message:`Rejected promise in ${e}ms`}))}
//# sourceMappingURL=commonHelpers2.js.map