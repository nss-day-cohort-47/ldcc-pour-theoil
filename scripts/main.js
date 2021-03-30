console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, 
	getSnacks, getSingleSnack, getToppingMenu, getSelectSnacks, addSnack, 
	getFlavorsMenu, getSeasonsMenu, getShapesMenu, getTypesMenu,
	addSnackToppings, addNewType, deleteCake, editSnack
} from "./data/apiManager.js";
import {addNewSnack} from "./snacks/addSnack.js"
import { addToppings } from "./snacks/toppings.js";
import { addType } from "./snacks/addType.js"


const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

//add clickevent to add type of snack
applicationElement.addEventListener("click", event => {
	console.log(event.target.id)
	if (event.target.id === "addType") {
		const entryElement = document.querySelector("#mainContent");
		entryElement.innerHTML = addType();
	}
})

let newTypeObj = {};
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newType__submit") {
		newTypeObj = {
			name: document.querySelector("input[name='name']").value
		}
		addNewType(newTypeObj)
		checkForUser();
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "newType__cancel") {
		checkForUser();
		toppingindex = 0;
	}
})

//Add click event for add a snack
applicationElement.addEventListener("click", event => {
	console.log(event.target.id)
	if (event.target.id === "addSnack") {
		const entryElement = document.querySelector("#mainContent");
		entryElement.innerHTML = addNewSnack(event.target.id);
		createTypeList();
		createShapeList();
		createSeasonsList();
		createFlavorsList();
	}
})

let toppingindex = 0;
applicationElement.addEventListener("click", event => {
	console.log(event.target.id)
	if (event.target.id === "addtopping") {
		const entryElement = document.querySelector(".newTopping");
		entryElement.innerHTML += addToppings(toppingindex);
		createToppingsList();
	}
})

// snack listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	
	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
		.then(response => {
			showDetails(response);
		})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("deletecake")) {
		const cakeId = event.target.id.split("__")[1];
		deleteCake(cakeId)
		.then(response => {
			checkForUser();
		})
		
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("toppingdelete")) {
		const toppingdele = event.target.id.split("__")[1];
		const entryElement = document.querySelector(`.ms-${toppingdele}`);
		entryElement.innerHTML = "<div></div>";
	}
})

//Add New snack object
let newSnackObj = {};
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newSnack__addSnack") {
		newSnackObj = {
			name: document.querySelector("input[name='name']").value,
			snackImg: document.querySelector("input[name='snackImg']").value,
			count: document.querySelector("input[name='count']").value,
			typeId: document.querySelector("select[name='snacktype']").value,
			shapeId: document.querySelector("select[name='snackshape']").value,
			inFlavorId: document.querySelector("select[name='snackFlavor']").value,
			seasonId: document.querySelector("select[name='snackSeason']").value,
			description: document.querySelector("textarea[name='snackDescription']").value
		}
		let toppingarray = [];
		for(let i = toppingindex-1; i >=0; i--) {
			toppingarray.push(document.querySelector(`select[name='snackToppings__${i}']`).value)
		}
		console.log(toppingarray)
		let snackid = ""
		addSnack(newSnackObj)
		.then(response => {
			snackid = response.id;
			let newsnacktoppingset = {};
			toppingarray.forEach(snack =>{
				newsnacktoppingset = {
					snackId: snackid,
					toppingId: snack
				}
				addSnackToppings(newsnacktoppingset)
				toppingindex = 0;
			})
		//refresh the page
			checkForUser();
		})
	}
})
applicationElement.addEventListener("click", event =>{
	if (event.target.id === "newSnack__editcake"){
		let newSnackObj = {}
		newSnackObj = {
			id: editsnackId,
			name: document.querySelector("input[name='name']").value,
			snackImg: document.querySelector("input[name='snackImg']").value,
			count: document.querySelector("input[name='count']").value,
			typeId: document.querySelector("select[name='snacktype']").value,
			shapeId: document.querySelector("select[name='snackshape']").value,
			inFlavorId: document.querySelector("select[name='snackFlavor']").value,
			seasonId: document.querySelector("select[name='snackSeason']").value,
			description: document.querySelector("textarea[name='snackDescription']").value
		}
		editSnack(newSnackObj)
		getSingleSnack(newSnackObj.id).then(response => {
			showDetails(response)
		})
		
		
		// checkForUser();
	
		
	}
})
let editsnackId	
applicationElement.addEventListener("click", event => {
	if (event.target.id.startsWith("editcake")) {
		editsnackId = event.target.id.split("__")[1];
		const clicktype = event.target.id.split("__")[0]
		getSingleSnack(editsnackId)
		.then(response =>{
			//create the form 
			const targetobject = response
			const entryElement = document.querySelector("#mainContent");
			entryElement.innerHTML = addNewSnack(clicktype);
			//populate the lists with the previously selected option
			const entryHTMLSelector = document.querySelector("#snacktype");
			getTypesMenu().then(response =>{
				response.forEach((Obj, index) =>{
				entryHTMLSelector.options[index + 1] = new Option(Obj.name, Obj.id)
				})
				const objtype = document.querySelector("#snacktype")
				objtype.options[Number(targetobject.typeId)].selected = true
			})
			const entryHTMLShape = document.querySelector("#snackshape");
			getShapesMenu().then(response =>{
				response.forEach((toppingObj, index) =>{
				entryHTMLShape.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
				})
				const objtype = document.querySelector("#snackshape")
				objtype.options[Number(targetobject.shapeId)].selected = true
			})
			
			const entryHTMFlavor = document.querySelector("#snackFlavor");
			getFlavorsMenu().then(response =>{
				response.forEach((toppingObj, index) =>{
					entryHTMFlavor.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
				})
				const objtype = document.querySelector("#snackFlavor")
				objtype.options[Number(targetobject.inFlavorId)].selected = true
			})
			
			
			const entryHTMLSeason = document.querySelector("#snackSeason");
			getSeasonsMenu().then(response =>{
				response.forEach((toppingObj, index) =>{
					entryHTMLSeason.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
				})
				const objtype = document.querySelector("#snackSeason")
				objtype.options[Number(targetobject.seasonId)].selected = true
			})


			const objname = document.querySelector(".newsnack__name")
			objname.value = response.name
			const objimage = document.querySelector(".newsnack__image")
			objimage.value = response.snackImg
			const objcount = document.querySelector(".newsnack__count")
			objcount.value = response.count
		
			// inFlavorId: document.querySelector("select[name='snackFlavor']").value,
			// seasonId: document.querySelector("select[name='snackSeason']").value,
			const objdescription = document.querySelector(".newPost__description")
			objdescription.value = response.description
		})
	}
})



applicationElement.addEventListener("change", event => {
	//pulls the id of what ever the user pulled out of the drop down
    if (event.target.id === "navlist") {
		//set attractionSelector to the value selected'
        let snackSelector = event.target.value
		getSelectSnacks(snackSelector)
		.then(response => {
			let snackarray =[];
			response.forEach(topping =>{
				snackarray.push(topping.snack)
			})
			const listElement = document.querySelector("#mainContent")
			listElement.innerHTML = SnackList(snackarray);
		})
		
    }
})

const showDetails = (snackObj) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj);
	
}
//end snack listeners

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	
	showNavBar();
	applicationElement.innerHTML += `<div id="mainContent"></div>`;
	showSnackList();
	showFooter();
	createToppingList();
	
}

//add all of the topping options
const createToppingList = () => {
	const entryHTMLSelector = document.querySelector(".form-select");
	getToppingMenu().then(response =>{
		response.forEach((toppingObj, index) =>{
			entryHTMLSelector.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
		})
	})
}
const createTypeList = () => {
	const entryHTMLSelector = document.querySelector("#snacktype");
	getTypesMenu().then(response =>{
		response.forEach((Obj, index) =>{
			entryHTMLSelector.options[index + 1] = new Option(Obj.name, Obj.id)
		})
	})
}
const createShapeList = () => {
	const entryHTMLSelector = document.querySelector("#snackshape");
	getShapesMenu().then(response =>{
		response.forEach((toppingObj, index) =>{
			entryHTMLSelector.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
		})
	})
}

const createSeasonsList = () => {
	const entryHTMLSelector = document.querySelector("#snackSeason");
	getSeasonsMenu().then(response =>{
		response.forEach((toppingObj, index) =>{
			entryHTMLSelector.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
		})
	})
}

const createFlavorsList = () => {
	const entryHTMLSelector = document.querySelector("#snackFlavor");
	getFlavorsMenu().then(response =>{
		response.forEach((toppingObj, index) =>{
			entryHTMLSelector.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
		})
	})
}

const createToppingsList = () => {
	const entryHTMLSelector = document.querySelector(`#snackToppings__${toppingindex}`);
	getToppingMenu().then(response =>{
		response.forEach((toppingObj, index) =>{
			entryHTMLSelector.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
		})
		toppingindex ++;
	})
}

checkForUser();