console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { getSnackToppings, SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser,
	getSnacks, getSingleSnack, getToppingMenu, getSelectSnacks, addSnack, 
	getFlavorsMenu, getSeasonsMenu, getShapesMenu, getTypesMenu
} from "./data/apiManager.js";
import {addNewSnack} from "./snacks/addSnack.js"
import { addToppings } from "./snacks/toppings.js";


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


//Add click event for add a type
applicationElement.addEventListener("click", event => {
	console.log(event.target.id)
	if (event.target.id === "addType") {
		const entryElement = document.querySelector(".mainContainer");
		entryElement.innerHTML = addNewSnack();
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
	if (event.target.id === "newSnack__cancel") {
		checkForUser();
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