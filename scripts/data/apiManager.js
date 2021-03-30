const apiURL = "http://localhost:8088";

//// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}


///// snack functions

let snackCollection = [];

export const useSnackCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //the spread operator makes quick work
  const snackCollectionCopy = [...snackCollection]
  return snackCollectionCopy;
}

export const getSnacks = () => {
	return fetch(`${apiURL}/snacks`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
			return parsedResponse;
		})
}

export const getToppingMenu = () => {
	return fetch(`${apiURL}/toppings`)
		.then(response => response.json())
		.then(parsedResponse => {
			return parsedResponse;
		})
} 

export const getFlavorsMenu = () => {
	return fetch(`${apiURL}/inflavors`)
		.then(response => response.json())
		.then(parsedResponse => {
			return parsedResponse;
		})
}

export const getTypesMenu = () => {
	return fetch(`${apiURL}/types`)
		.then(response => response.json())
		.then(parsedResponse => {
			return parsedResponse;
		})
}

export const getSeasonsMenu = () => {
	return fetch(`${apiURL}/seasons`)
		.then(response => response.json())
		.then(parsedResponse => {
			return parsedResponse;
		})
} 

export const getShapesMenu = () => {
	return fetch(`${apiURL}/shapes`)
		.then(response => response.json())
		.then(parsedResponse => {
			return parsedResponse;
		})
} 

export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}?_expand=inFlavor&_expand=season&_expand=type&_expand=shape`)
	.then(response => response.json())
}

export const getToppings = (snackId) => {
	return fetch(`http://localhost:8088/snackToppings?snackId=${snackId}&_expand=topping`)
	  .then(response => response.json())
	  .then(parsedResponse => {
        return parsedResponse;  
	   })
	  
}

export const getSelectSnacks = (toppingId) => {
	return fetch(`http://localhost:8088/snackToppings?toppingId=${toppingId}&_expand=snack`)
	  .then(response => response.json())
	  .then(parsedResponse => {
        return parsedResponse;  
	   })
	  
}

export const addSnack = snackObject => {
	return fetch(`${apiURL}/snacks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(snackObject)
	})	
		.then(response => response.json())
		.then(getSnacks)
}

export const getNewSnackId = snackName => {
	return fetch(`${apiURL}/snacks/?name=${snackName}`)
	.then(response => response.json())
}

export const addSnackToppings = snackObject => {
	return fetch(`${apiURL}/snackToppings`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(snackObject)
	})	
		.then(response => response.json())
}

export const addNewType = snackObject => {
	return fetch(`${apiURL}/types`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(snackObject)
	})	
		.then(response => response.json())
}

export const deleteCake = snackid => {
	return fetch(`http://localhost:8088/snacks/${snackid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
  
    })
        .then(response => response.json())
        .then(getSnacks)
}