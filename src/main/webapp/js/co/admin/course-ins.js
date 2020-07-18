/* eslint-disable no-mixed-spaces-and-tabs */
import emptyObject from "../../obj/courseObject.js";
import { request } from "../../request.js";
	const course_template = document.createElement("div");
//	course_template.style.cssText = 'display:flex;';
//	course_template.style.cssText = 'display:flex;';
course_template.innerHTML = /*html*/ `

	<div  id="course" class="container-two-space" >
		<div class="container-one" >
			<form class="container-one">
					<input type="text" id="inputSearch"  placeholder="search" class="input__search3"/>
					<button style="" type="submit" class="success" id="btnSearch">Search</button>

			</form>

			<div id ="courseList" class="container-one" style="" >
				<button style=""
				v-for="(object,index) in objects" list-data="objects"
						 key="index" >{{object.cname}}</button>
			</div>
			<button class="info"  id="btnNext">Next</button> <!--style=""-->
			<button class="info" id="btnPrevious">previous</button>
		</div>

		<div class="container-one">
			<button  type="button" id="btnAdd" class="info" ></button>
			<form  id="objectForm" class="container-one" >
				<div >
					<label for="cid">course Id</label>
					<input  id="cid" name="cid" type="text" title="course Id"  >
					<small>Error message</small>
				</div>
				<div>
					<label for = "cname" >course Name</label>
					<input  type="text" id="cname" name="cname" title="course Name" >
					<small>Error message</small>
				</div>
				<div>
					<label for = "cnotes">Group</label>
					<input  type="text" id="cnotes" name="cnotes" title="cnotes"  >
					<small>Error message</small>
				</div>
				<button type="submit" class="success" id="btnSave">Save</button>
				<button   id="btnDelete" class="danger">Delete</button>
				<small style="">Error message</small>

			</form>
		</div>
	</div>
`;
export class CourseIns extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.index = null;
		this.id = "cid";
		this.objName = "";
		this.searchValInt = 0;
		this.searchVal = "";
		this.editedEl = "";
		// console.log(emptyObject);
		// if (Helper.language=="en-US") {document.body.style.direction == "ltr"; }

		this.object = JSON.parse(JSON.stringify(emptyObject));
		this.offset = 1;
		this.password = "password";
		this.noOfElementsPerPage = 5;
		this.noOfNextpreviousBtnClickes = 0;
		this.objects = [];
		this.firstName = "";
//		this.sh_r = this.attachShadow({
//			"mode": "open"
//		});
//		this.sh_r.appendChild(course_template.content.cloneNode(true));
//		this.sh_r.appendChild(course_template.content.cloneNode(true));
	this.sh_r = this.appendChild(course_template.cloneNode(true));
		this._forEl = this.sh_r.querySelectorAll("[v-for]")[0];
		this._forElParent = this._forEl.parentNode;
		this._forElmain = this._forEl.cloneNode(true);
		this._forValue = this._forEl.getAttribute("v-for");
		this._forEl.removeAttribute("v-for");
		this._forEl.remove();
		console.log(getComputedStyle(this._forElParent).getPropertyValue("direction"));
		if (getComputedStyle(this._forElParent).getPropertyValue("direction") == "rtl") {
			console.log(getComputedStyle(this._forElParent).getPropertyValue("direction"));
			this.sh_r.querySelector("#btnSearch").innerHTML = "بحث";
			this.sh_r.querySelector("#btnNext").innerHTML = "التالي";
			this.sh_r.querySelector("#btnPrevious").innerHTML = "السابق";
			this.sh_r.querySelector("#btnAdd").innerHTML = "اضافة دورة جديدة";
			this.sh_r.querySelector("[for='cid']").innerHTML = "معرف الدورة";
			this.sh_r.querySelector("[for='cname']").innerHTML = "اسم الدورة";
			this.sh_r.querySelector("[for='cnotes']").innerHTML = "ملاحظات";
			this.sh_r.querySelector("#btnSave").innerHTML = "حفظ";
			this.sh_r.querySelector("#btnDelete").innerHTML = "حذف";

		} else if (getComputedStyle(this._forElParent).getPropertyValue("direction") == "ltr"){ 
			this.sh_r.querySelector("#btnSearch").innerHTML = "Search";
			this.sh_r.querySelector("#btnNext").innerHTML = "Next";
			this.sh_r.querySelector("#btnPrevious").innerHTML = "previous";
			this.sh_r.querySelector("#btnAdd").innerHTML = "New course";
			this.sh_r.querySelector("[for='cid']").innerHTML = "course Id";
			this.sh_r.querySelector("[for='cname']").innerHTML = "course Name";
			this.sh_r.querySelector("[for='cnotes']").innerHTML = "notes";
			this.sh_r.querySelector("#btnSave").innerHTML = "Save";
			this.sh_r.querySelector("#btnDelete").innerHTML = "Delete";
		}
		this.cname = this.sh_r.querySelector("#cname");
		this.cnotes = this.sh_r.querySelector("#cnotes");
		// const password = document.getElementById("password");
		// const password2 = document.getElementById("password2");
		this.getobjects();
		this.sh_r.querySelector("#objectForm").addEventListener("submit", e => {
			e.preventDefault();
			this.submite(e);
		});
		this.sh_r.querySelector("#btnDelete").addEventListener("click", e => {
			e.preventDefault();
			this.objectDelete(e);
		});
		this.sh_r.querySelector("#btnAdd").addEventListener("click", e => {
			e.preventDefault();
			this.objectNew(e);
		});
		this.sh_r.querySelector("#btnSearch").addEventListener("click", e => {
			e.preventDefault();
			this.objectSearch(e);
		});
		this.sh_r.querySelector("#btnNext").addEventListener("click", e => {
			e.preventDefault();
			this.nextPage(e);
		});
		this.sh_r.querySelector("#btnPrevious").addEventListener("click", e => {
			e.preventDefault();
			this.previousPage(e);
		});
		// console.log(emptyObject);
	}
	//remove
	disconnectedCallback() {
		this.sh_r.querySelector("#objectForm").removeEventListener("submit", e => {
			e.preventDefault();
			this.submite(e);
		});
		this.sh_r.querySelector("#btnDelete").removeEventListener("click", e => {
			e.preventDefault();
			this.objectDelete(e);
		});
		this.sh_r.querySelector("#btnAdd").removeEventListener("click", e => {
			e.preventDefault();
			this.objectNew(e);
		});
		this.sh_r.querySelector("#btnSearch").removeEventListener("click", e => {
			e.preventDefault();
			this.objectSearch(e);
		});
		this.sh_r.querySelector("#inputSearch").removeEventListener("keydown", e => {
			e.preventDefault();
			e.keyCode === 13 ? this.objectSearch(e) : e.keyCode;
		});
		this.sh_r.querySelector("#btnNext").removeEventListener("click", e => {
			e.preventDefault();
			this.nextPage(e);
		});
		this.sh_r.querySelector("#btnPrevious").removeEventListener("click", e => {
			e.preventDefault();
			this.previousPage(e);
		});
	}
	async getobjects() {
		try {
			const result = await request("get", "course?offset=" + this.offset + "&limit=" + this
				.noOfElementsPerPage);
			this.objects = result.data;
			this.updateView();
		} catch (error) {
			console.log(error);
		}
		// console.log(emptyObject);
	}
	objectSearch() {
		// console.log("emptyObject", emptyObject);
		this.setFildesEmpty(emptyObject);
		this.searchVal = this.sh_r.querySelector("#inputSearch").value.replace(/[^A-Z0-9\s-]/gi, "");
		this.searchValInt = parseInt(this.sh_r.querySelector("#inputSearch").value.replace(/[^A-Z0-9]/gi, ""));
		// console.log(this.sh_r.querySelector("#inputSearch").value); //replace(/[^A-Z0-9\s]/ig, "")
		// console.log("this.searchVal", this.searchVal);
		// console.log("this.searchValInt", this.searchValInt);
		// console.log("search");
		if (this.searchValInt != null && this.searchValInt == this.searchValInt) {
			//if numper find by id
			return request("get", "course/" + this.searchValInt).then(result => {
				this.objects = result.data;
				this.updateView();
			}).catch(function(error) {
				console.log(error);
			});
		} //if
		else {
			//if char
			return request("get", "course/search/" + this.searchVal).then(result => {
				this.objects = result.data;
				this.updateView();
			}).catch(function(error) {
				console.log(error);
			});
		} //else
	}
	updateView() {
		// console.log("emptyObject", emptyObject);
		this._forElParent.innerHTML = "";
		if (!Array.isArray(this.objects)) {
			this.objects = [this.objects];
		}
		this.objects.forEach((objValue, i) => {
			this._forElcopy = this._forElmain.cloneNode(true);
			this._forElcopy.setAttribute("key", i);
			this._forEl.innerHTML.match(/{{.*}}/gim).forEach((element) => {
				var property = element.slice(2, -2).match(/\w*$/gim)[0];
				this.objName = property;
				property = property.replace(/.*/, objValue[property]);
				this._forElcopy.innerHTML = this._forElcopy.innerHTML.replace(/{{.*}}/im, property);
			});
			this._forElcopy.addEventListener("click", e => {
				e.preventDefault();
				this.objectEdit(e);
			});
			this._forElParent.appendChild(this._forElcopy);
		});
		// console.log("emptyObject", emptyObject);
	}
	submite() {

		if(this.checkRequired([this.cname, this.cnotes])
		&& this.checkLength(this.cnotes, 6, 45)
		&& this.checkLength(this.cname, 3, 45)
		){

			// this.checkEmail(email);
			// this.checkPasswordsMatch(password, password2);
			Object.entries(this.object).forEach(([name, val], i, obj) => {
				// console.log("name", name, "val", val, "i", i, "obj", obj);
				var hashName;
				if (this.index === null) {
					//when new object
					hashName = "#" + name;
					this.object[name] =this.cleanVal(this.sh_r.querySelector(hashName).value);
					// console.log("this.index == null");
				} else {
					// console.log("this.objName", this.objName);
					hashName = "#" + name;
					this.object[name] = this.objects[this.index][name] = this.cleanVal(this.sh_r.querySelector(hashName).value);
					if (this.objName == name) {
						// // console.log("this.editedEl.innerHTML", this.editedEl.innerHTML);
						// console.log("this.sh_r.querySelector(hashName).value", this.sh_r.querySelector(hashName).value);
						this.editedEl.innerHTML = this.cleanVal(this.sh_r.querySelector(hashName).value);
					}
				}
			});
			// console.log("send object=", this.cleanObject(this.object));
			return request("post", "course", this.cleanObject(this.object)).then(result => {
				this.showSuccessAll(emptyObject);
				console.log(this.sh_r.querySelector("form small"));
				this.sh_r.querySelector("form > small").innerText = "Success";
				this.sh_r.querySelector("form > small").style.visibility = "visible";
				console.log("result.data", result.data);
			}).catch(function(error) {
				this.sh_r.querySelector("form > small").innerText = "error";

				console.log(error);
			});
		}
	}
	objectDelete() {
		// console.log("emptyObject", emptyObject);
		// console.log("del id", this.object[this.id]);
		//            this.object.sid
		return request("delete", "course/" + this.object[this.id]).then(result => {
			console.log("result=", result.data);
			console.log("index=", this.index);
			this.objects.splice(this.index, 1);
			this.editedEl.innerHTML = "";
			this.index = null;
		}).catch(function(error) {
			console.log(error);
		});
	}
	objectNew() {
		// console.log("emptyObject", emptyObject);
		this.index = null;
		this.setFildesEmpty(emptyObject);
	}
	objectEdit(e) {
		// console.log("emptyObject", emptyObject);
		console.log("Edit=", e.target.getAttribute("key"));
		this.index = e.target.getAttribute("key");
		this.editedEl = e.currentTarget;
		// console.log("object=",this.object);
		this.object = Object.assign(this.object, this.objects[this.index]);
		//emptyfileds avoid leve old values
		Object.entries(emptyObject).forEach(([name, val]) => {
			name = "#" + name;
			this.sh_r.querySelector(name).value = val;
		});
		//fill fileds with existing values
		Object.entries(this.object).forEach(([name, val]) => {
			name = "#" + name;
			this.sh_r.querySelector(name).value = val;
		});
		console.log("object=", this.object);
	}
	nextPage() {
		// console.log("emptyObject", emptyObject);
		this.noOfNextpreviousBtnClickes = this.noOfNextpreviousBtnClickes + 1;
		if (this.noOfNextpreviousBtnClickes >= 0) {
			this.offset = this.noOfElementsPerPage * this.noOfNextpreviousBtnClickes;
			this.getobjects();
		}
		console.log(this.noOfNextpreviousBtnClickes, this.offset, this.noOfNextpreviousBtnClickes);
	}
	previousPage() {
		this.noOfNextpreviousBtnClickes = this.noOfNextpreviousBtnClickes - 1;
		if (this.noOfNextpreviousBtnClickes >= 0) {
			this.offset = this.noOfElementsPerPage * this.noOfNextpreviousBtnClickes;
			this.getobjects();
		} else {
			this.noOfNextpreviousBtnClickes = 0;
		}
		console.log(this.noOfNextpreviousBtnClickes, this.offset, this.noOfNextpreviousBtnClickes);
	}
	cleanObject(obj) {
		Object.keys(obj).forEach(k =>
			(obj[k] && typeof obj[k] === "object") && this.cleanObject(obj[k]) ||
	(!obj[k] && obj[k] !== undefined) && delete obj[k]);
		return obj;
	}
	showSuccessAll(emptyObject) {
		Object.entries(emptyObject).forEach(([name]) => {
			name = "#" + name;
			this.sh_r.querySelector(name).parentElement.classList.add("valid");
		});
	}
	setFildesEmpty(emptyObject) {
		//emptyfileds avoid leve old values
		// Object.entries(JSON.stringify(emptyObject)).forEach(([name, val], i, obj) => {
		Object.entries(emptyObject).forEach(([name, val]) => {
			name = "#" + name;
			this.sh_r.querySelector(name).value = val;
		});
	}
	showError(input, message) {
		const formControl = input.parentElement;
		formControl.className = "error";
		const small = formControl.querySelector("small");
		small.innerText = message;
		return 0;
	}
	cleanVal(val){return val.replace(/[^A-Z0-9\s-@]/gi, ""); }
	// Show success outline
	showSuccess(input) {
		const formControl = input.parentElement;
		formControl.className = "valid";
		return 1;
	}
	// Check email is valid
	checkEmail(input) {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(input.value.trim())) {
			this.showSuccess(input);
			return 1;
		} else {
			this.showError(input, "Email is not valid");
			return 0;
		}
	}
	// Check required fields
	checkRequired(inputArr) {
		let err = 0;
		inputArr.forEach((input) => {
			if (input.value.trim() === "") {
				this.showError(input, `${this.getFieldName(input)} is required`);
				err = 1 + err;
			} else {
				this.showSuccess(input);

			}
		});
		if(err){return 0;} else{return 1;}
	}
	// Check input length
	checkLength(input, min, max) {
		if (input.value.length < min) {
			this.showError(input, `${this.getFieldName(input)} must be at least ${min} characters`);
			return 0;
		} else if (input.value.length > max) {
			this.showError(input, `${this.getFieldName(input)} must be less than ${max} characters`);
			return 0;
		} else {
			this.showSuccess(input);
			return 1;
		}
	}
	// Check passwords match
	checkPasswordsMatch(input1, input2) {
		if (input1.value !== input2.value) {
			this.showError(input2, "Passwords do not match");
			return 0;
		}
		return 1;
	}
	// Get fieldname
	getFieldName(input) {
		return input.id.charAt(0).toUpperCase() + input.id.slice(1);
	}
}
export default CourseIns;
//window.customElements.define("course-ins", CourseIns);