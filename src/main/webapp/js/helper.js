export default {
	pathname: window.location.pathname.substring(window.location.pathname.length - 1, window.location.pathname.length),
	sitename: window.location.pathname.substring(0, window.location.pathname.length - 1),
	language: window.navigator.userLanguage || window.navigator.language,
	timeZone: (new Date()).getTimezoneOffset() / 60 * - 1,
//	timeZone: window.Intl.DateTimeFormat().resolvedOptions().timeZone,
	platform: navigator.platform,
	print() {
		console.log("language=", this.language); //works IE/SAFARI/CHROME/FF
		console.log(this.seconds_with_leading_zeros());
		console.log("timeZone", this.timeZone);
		console.log("platform", this.platform);
	},
	setBaseEl() {
		let href = document.getElementsByTagName("base").href;
		if(document.getElementsByTagName("base").href == undefined) {
			// console.log("document.getElementsByTagName(\"base\").href", document.getElementsByTagName("base").href);
			let base = document.createElement("base");
			let att = document.createAttribute("href");
			att.value = document.location.href;
			base.setAttributeNode(att);
			document.getElementsByTagName("head")[0].appendChild(base);
			return document.location.href;
		}
		return href;

	},
	getCountry() {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "https://www.cloudflare.com/cdn-cgi/trace");
		xhr.responseType = "text";
		xhr.send();
		xhr.onload = function() {
			let responseObj = xhr.response;
			let ip = responseObj.match(/^ip=.*/gim)[0].match(/\d.*$/)[0];
			console.log(ip);
			let country = responseObj.match(/^loc=.*/gim)[0].match(/\w\w$/)[0];
			console.log(country);
			return country;
		};
	}, //getCountry
	//    document.body.appendChild(canvas_el); // adds the canvas to the body element
	seconds_with_leading_zeros() {
		return /\((.*)\)/.exec(new Date().toString())[1];
	},
	getBaseApi() {
		let prefix = "api";
		let port = document.location.port;
		let protocol = document.location.protocol;
		let appName = location.pathname.split("/")[1];
		let hostname = document.location.hostname;
		console.log("appName=", appName);

		let _base_api = "";
		if((hostname == "localhost" || hostname == "127.0.0.1")) {
			if(appName.length > 0) {


				console.log("appName=", appName);

					appName = appName + "/";

			}
		} else {
			appName = "";
		}
		if(port.length > 0) {
			port = ":" + port;
		}
		console.log("protocol=", protocol);

		if(protocol == "https") {
			console.log("protocol=", protocol);
			_base_api = "https://mp-institute.herokuapp.com/" + prefix + "/";

		} else if (hostname == "mp-institute.com"){
			port = ":8080" ;
			_base_api = protocol + "//" + hostname + port + "/" + appName + prefix + "/"; //without android
		
		} else {
			_base_api = protocol + "//" + hostname + port + "/" + appName + prefix + "/"; //without android
		}
//		_base_api = "https://mp-institute.herokuapp.com/" + prefix + "/";
//
		console.log("_base_api=", _base_api);

		return _base_api;
	},
	getBaseSite() {
		let prefix = "resources";
		let port = document.location.port;
		let protocol = document.location.protocol;
		let appName = location.pathname.split("/")[1];
		let hostname = document.location.hostname;
		let _base_site = "";
		// console.log(appName.length);
		if(hostname == "localhost" || hostname == "127.0.0.1") {
			if(appName.length > 0) {
				appName = appName + "/";
			}
		} else {
			appName = "";
		}
		if(port.length > 0) {
			port = ":" + port;
		}
		_base_site = protocol + "//" + hostname + port + "/" + appName;
		// _base_api = protocol + "//" + hostname + port + "/" + appName + prefix + "/";
		return _base_site;
	},
	cleanObject(obj) {
		Object.keys(obj).forEach(k => (obj[k] && typeof obj[k] === "object") && this.cleanObject(obj[k]) || (! obj[k] && obj[
				k] !== undefined) && delete obj[k]);
		return obj;
	},
	getRout() {
		let rout1 = location.pathname.split("/")[1];
		let rout2 = location.pathname.split("/")[2];
		let hostname = document.location.hostname;
		let rout = "";
		console.log("rout1",rout1);
		console.log("rout2",rout2);
		if(hostname == "localhost" || hostname == "127.0.0.1") {
			rout = rout2;
		} else {
			rout = rout1;
		}

		return rout;
	},
	// cleanObject(obj) {
	// 	Object.keys(obj).forEach(k => (obj[k] && typeof obj[k] === "object") && this.cleanObject(obj[k]) || (! obj[k] && obj[
	// 			k] !== undefined) && delete obj[k]);
	// 	return obj;
	// },
	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(";");
		for(var i = 0; i < ca.length; i ++) {
			var c = ca[i];
			while(c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if(c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	getCookies(n) {
		//    let a = `; ${axios.response.headers.Set-Cookie}`.match(`;\\s*${n}=([^;]+)`);
		let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
		return a ? a[1] : "";
	},
	parseJwt(token) {
		token = token.replace("Bearer ", "");
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
			return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(- 2);
		}).join(""));
		return JSON.parse(jsonPayload);
	},
};
//Object.freeze(this);
//     console.log(_base_api);
//export let  base_api =_base_api;