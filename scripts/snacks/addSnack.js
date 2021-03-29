export const addNewSnack = () => {
    return `
    <form class="newSnack">
        <div>
            <input value=""
                   name="name"
                   class="newPost__input"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value=""
                   name="snackImg"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of Image" />
        </div>

        <div>
            <input value=""
                   name="count"
                   class="newPost__input"
                   type="text"
                   placeholder="Count of Snack" />
        </div>

        <li class="nav-item ms-1">
			<select id="snacktype" class="form-select form-select btn-info" aria-label="Select A Topping">
				<option selected>Select A Type</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</li>

        <li class="nav-item ms-1">
			<select id="snackshape" class="form-select form-select btn-info" aria-label="Select A Topping">
				<option selected>Select A Shape</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</li>

        <li class="nav-item ms-1">
			<select id="snackFlavor" class="form-select form-select btn-info" aria-label="Select A Topping">
				<option selected>Select A Flavor</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</li>

        <li class="nav-item ms-1">
            <select id="snackSeason" class="form-select form-select btn-info" aria-label="Select A Topping">
                <option selected>Select A Season</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </li>
        
        

        <textarea name="snackDescription"
            class="newPost__input newPost__description"
            placeholder="Description of your snack">
        </textarea>

        <div class="newTopping"></div>
        
        <div>
        <button id="addtopping">Addtopping</button>
        </div>
        <button id="newSnack__submit">Save</button>
        <button id="newSnack__cancel">Cancel</button>
    </form>
    `
}