import Helper from "./helper.js";
import helper from "./helper.js";
//const helper = new Helper();
//console.log(Helper.getBaseApi());
//console.log(Helper.base_api);
var _token = "";
//console.log(Helper.getCookie("rt"));
//console.log(Helper.getCookies());
console.log(document.cookie);
console.log("helper.getBaseApi()", helper.getBaseApi());
//console.log("Helper.getBaseApi()", Helper.getBaseApi());
//console.log("https://mp-institute.herokuapp.com/resources/");

export function request(method, url, data, headers = {}) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
//		xhr.open(method, "https://mp-institute.herokuapp.com/resources/" + url);
		xhr.open(method, Helper.getBaseApi() + url);
		xhr.responseType = "json";
	

		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Authorization", _token);
		if (headers) {
			Object.keys(headers).forEach(key => {
				request.setRequestHeader(key, headers[key]);
			});
		}
		xhr.onload = function() {
			if (this.status >= 200 && this.status < 300) {
				_token=xhr.getResponseHeader("Authorization");
				resolve(xhr.response);
//				console.log("sucsess xhr.response",xhr.response);
			} else {
				console.log("error xhr.response",xhr.response);

				reject({
					status: this.status,
					statusText:  xhr.statusText
				});
			}
			//        resolve(xhr.response);
			//        const data=xhr.response;
			//        console.log(xhr.response);
		};
		xhr.onerror = function () {
			console.log("error net xhr.response",xhr.response);

			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send(JSON.stringify(data));
	}); //promise
	//    return promise;
}




export function requestx(method, url, data, headers = {}) {
	//    return new Promise((resolve,reject)=>{
	const xhr = new XMLHttpRequest();
	xhr.open(method, Helper.getBaseApi() + url);
	xhr.responseType = "json";
	if (data) {
		xhr.setRequestHeader("Content-Type", "application/json");
		Object.keys(headers).forEach(key => {
			request.setRequestHeader(key, headers[key]);
		});
	}
	xhr.onload = function() {
		if (this.status >= 200 && this.status < 300) {
			//        resolve(xhr.response);
			return xhr.response;
		} else {
			//        reject({
			//          status: this.status,
			//          statusText: xhr.statusText
			//        });
			return "status" + this.status + "xhr.statusText" + xhr.statusText;
		}
		//        resolve(xhr.response);
		//        const data=xhr.response;
		//        console.log(xhr.response);
	};
	xhr.onerror = function() {
		//        reject({
		//          status: this.status,
		//          statusText: xhr.statusText
		//        });
		return "status" + this.status + "xhr.statusText" + xhr.statusText;
	};
	xhr.send(JSON.stringify(data));
	//});//promise
	//    return promise;
}