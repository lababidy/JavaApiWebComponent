import Helper from "../helper.js";

const nav_template = document.createElement("div");
nav_template.innerHTML = /*html*/ `

<div class="topnav" id="myTopnav">
  <a href="/" class="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <div class="dropdown">
    <button class="dropbtn">Dropdown
    ${/* <i class="down_icon"></i>*/""}
    </button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a  link="staff-ins" id="staff-ins" href="" >Staff com</a>
      <a  link="course-ins" id="course-ins" href="" >course com</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
  <a  href="" id="login-ins" link="login-ins" >Login</a>
  <a  href="" id="signup-ins" link="signup-ins">Signup</a>
  <div class="dropdown">
  <button class="dropbtn">Lang
  </button>
  <div class="dropdown-content">
    <a link="en-lang">English</a>
    <a link="ar-lang">عربي</a>
  </div>
</div> 
  <a href="" style="font-size:15px;align:center" class="icon menu_icon"></a>
</div>
`;
export class NavIns extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		// this.sh_r = this.attachShadow({ 'mode': 'open' });
		// this.sh_r.appendChild(nav_template.content.cloneNode(true));
		this.sh_r = this.appendChild(nav_template.cloneNode(true));
		this.sh_r.querySelector("#myTopnav").addEventListener("click", e => {
			e.preventDefault();
			this.myFunction(e);
		});
		this.sh_r.querySelector("[link='staff-ins']").addEventListener("click", e => {
			e.preventDefault();
			this.route(e);
		});
		this.sh_r.querySelector("[link='course-ins']").addEventListener("click", e => {
			e.preventDefault();
			this.route(e);
		});
		this.sh_r.querySelector("[link='en-lang']").addEventListener("click", e => {
			e.preventDefault();
			this.lang(e);
		});
		this.sh_r.querySelector("[link='ar-lang']").addEventListener("click", e => {
			e.preventDefault();
			this.lang(e);
		});
		this.sh_r.querySelector("#login-ins").addEventListener("click", e => {
			e.preventDefault();
			this.route(e);
		});
		this.sh_r.querySelector("#signup-ins").addEventListener("click", e => {
			e.preventDefault();
			this.route(e);
		});
		// this.sh_r.addEventListener("popstate", e => {
		// 	e.preventDefault();
		// 	this.locationHashChanged(e);
    // },false);
    window.addEventListener("replacestate", e => {
	e.preventDefault();
	pushState(e);
});
if(Helper.getRout()){
  console.log("Helper.getRout",Helper.getRout());
  this.onloadRout(Helper.getRout());
}
  }
   pushState(e) {
    // e.preventDefault();
      if (location.hash === 'login') {
        console.log("pushState");
        console.log(location.hash);
        console.log(e);
      }else{
    console.log("else ");
    console.log("pushState");
  
      console.log(location.hash);
      console.log(e);
      }
    }
  
  //  locationHashChanged(e) {
  //   if (location.hash === 'login') {
  //     console.log("You're visiting a cool feature!");
  //     console.log(location.hash);
  //   }else{
  //   console.log("else ");
  //     console.log(location.hash);
  //   }
  // }
	route(e) {
		var parentRouterEl = e.target.getRootNode().querySelector("#router");
		console.log("parentRouterEl", parentRouterEl);
		// console.log("rout", rout);
		var selectedElId = e.target.attributes.link.value; //link id = new element name
		console.log("e.target.attributes.link", e.target.attributes.link.value);
		console.log("selectedElId", selectedElId);
		var newRouterEl = document.createElement(selectedElId);
		console.log("newRouterEl", newRouterEl);
		var oldRouterEl = parentRouterEl.childNodes[1];
		console.log("oldRouterEl", oldRouterEl);
    parentRouterEl.replaceChild(newRouterEl, oldRouterEl);
    window.history.pushState({}, selectedElId, selectedElId.substr(0,selectedElId.length -4));
   
    console.log(Helper.getRout());
	}
	onloadRout(rout) {
		var parentRouterEl = this.sh_r.getRootNode().querySelector("#router");
		console.log("parentRouterEl", parentRouterEl);
		console.log("rout", rout);
		// var selectedElId = e.target.attributes.link.value; //link id = new element name
		var selectedElId = rout+"-ins"; //link id = new element name
		// console.log("e.target.attributes.link", e.target.attributes.link.value);
		console.log("selectedElId", selectedElId);
		var newRouterEl = document.createElement(selectedElId);
		console.log("newRouterEl", newRouterEl);
		var oldRouterEl = parentRouterEl.childNodes[1];
		console.log("oldRouterEl", oldRouterEl);
    parentRouterEl.replaceChild(newRouterEl, oldRouterEl);
    window.history.pushState({}, selectedElId, selectedElId.substr(0,selectedElId.length -4));
   
    // console.log(Helper.getRout());
	}
	lang(e) {
		var selectedEllang = e.target.attributes.link.value; //link id = new element name
		if (selectedEllang == "en-lang") { document.body.style.direction = "ltr"; }
		if (selectedEllang == "ar-lang") { document.body.style.direction = "rtl"; }
		var parentRouterEl = e.target.getRootNode().querySelector("#router");
		var selectedElId = parentRouterEl.childNodes[1].localName;
		var newRouterEl = document.createElement(selectedElId);
		console.log("newRouterEl", newRouterEl);
		var oldRouterEl = parentRouterEl.childNodes[1];
		console.log("oldRouterEl", oldRouterEl);
		parentRouterEl.replaceChild(newRouterEl, oldRouterEl);
	}
	myFunction(e) {
		var x = this.sh_r.querySelector("#myTopnav");
		if (x.className === "topnav") {
			x.className += " responsive";
		} else {
			x.className = "topnav";
		}
	}
}
export default NavIns;
//window.customElements.define("nav-ins", NavIns);