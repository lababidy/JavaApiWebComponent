// #idValue .classValue elName.classValue elName[attributeName] [attributeName] 
import Helper from "./js/helper.js";

// import {Router} from "./js/lib/vaadin-router.min-1.7.1.js"
// import { LoginIns } from "./js/co/auth/login-ins.js";
// import { SignupIns } from "./js/co/auth/signup-ins.js";
import { FooterIns } from "./js/co/footer-ins.js";
import { NavIns } from "./js/co/nav-ins.js";
// import {ForgetpassIns} from "./js/co/auth/forgetpass-ins.js";
// import {PassrestIns} from "./js/co/auth/passrest-ins.js";
// import staffObject from "./js/obj/StaffObj.js";
// import { StaffIns } from "./js/co/admin/staff-ins.js";
import { CourseIns } from "./js/co/admin/course-ins.js";
import { request } from "./js/request.js";
//import customEle from "./js/native-shim.js";
//if(! window.customElements) {
//	customElements = customEle;
//}


// customElements.define('login-ins', LoginIns);
// customElements.define('staff-ins', StaffIns);
customElements.define('footer-ins', FooterIns);
customElements.define('course-ins', CourseIns);
// customElements.define("forgetpass-ins", ForgetpassIns);
// customElements.define("passrest-ins", PassrestIns);
// customElements.define("signup-ins", SignupIns);
customElements.define("nav-ins", NavIns);

export var BaseEl = Helper.setBaseEl();
export var base_api = Helper.getBaseApi();
console.log(Helper.language);
if (Helper.language=="en-US") {document.body.style.direction = "ltr"; }
// //vaadin router
// const rootEl = document.getElementById('root');
// const router = new Router(rootEl);
// router.setRoutes([
//   { path: '/', component: 'course-ins' },
//   { path: '/login', component: 'login-ins' },
//   { path: '/b', component: 'course-ins' },
//   {
//     path: '/nav',
//     component: 'hello-nav',
//     children: [
//       { path: '/a', component: 'hello-a' },
//       { path: '/b', component: 'hello-b' },
//       { path: '(.*)', component: 'hello-not-found' },
//     ],
//   },
//   { path: '/fruit/:id', component: 'hello-fruit' },
//   { path: '(.*)', component: 'hello-not-found' },
// ]);
// //vaadin router end

var canvas_el = document.createElement("CANVAS");
canvas_el.hidden = true;
canvas_el.height = 10;
canvas_el.width = 10;
var ctx = canvas_el.getContext("2d");
// Text with lowercase/uppercase/punctuation symbols
var txt = "BrowserLeaks";
ctx.textBaseline = "top";
// The most common type
ctx.font = "14px 'Arial'";
ctx.textBaseline = "alphabetic";
ctx.fillStyle = "#f60";
ctx.fillRect(125, 1, 62, 20);
// Some tricks for color mixing to increase the difference in rendering
ctx.fillStyle = "#069";
ctx.fillText(txt, 2, 15);
ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
ctx.fillText(txt, 4, 17);
document.getElementsByTagName("body")[0].appendChild(canvas_el);
console.log(canvas_el);
window.token = "test";
