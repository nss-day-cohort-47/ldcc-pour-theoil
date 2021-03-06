export const addNewSnack = (type) => {
    return `
    <form class="newSnack">
        <div>
            <input value=""
                   name="name"
                   class="newsnack__name"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value=""
                   name="snackImg"
                   class="newsnack__image"
                   type="text"
                   placeholder="URL of Image" />
        </div>

        <div>
            <input value=""
                   name="count"
                   class="newsnack__count"
                   type="text"
                   placeholder="Count of Snack" />
        </div>

        <li class="nav-item ms-1">
			<select name="snacktype" id="snacktype" class="form-select form-select btn-info" aria-label="Select A Topping">
				<option selected>Select A Type</option>
			</select>
		</li>

        <li class="nav-item ms-1">
			<select name="snackshape" id="snackshape" class="form-select form-select btn-info" aria-label="Select A Topping">
				<option selected>Select A Shape</option>
			</select>
		</li>

        <li class="nav-item ms-1">
			<select name="snackFlavor" id="snackFlavor" class="form-select form-select btn-info" aria-label="Select A Topping">
				<option selected>Select A Flavor</option>
			</select>
		</li>

        <li class="nav-item ms-1">
            <select name='snackSeason' id="snackSeason" class="form-select form-select btn-info" aria-label="Select A Topping">
                <option selected>Select A Season</option>
            </select>
        </li>
        
        <textarea name="snackDescription"
            class="newPost__input newPost__description"
            placeholder="Description of your snack"></textarea>

        <div class="newTopping"></div>
        
        <div>
        <button id="addtopping">Addtopping</button>
        </div>
        <button id="newSnack__${type}">${type}</button>
        <button id="newSnack__cancel">Cancel</button>
    </form>
    `
}