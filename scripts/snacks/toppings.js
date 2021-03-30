export const addToppings = (id) => {
    return `
    <li class="nav-item ms-${id}">
        <select name="snackToppings__${id}" id="snackToppings__${id}" class="form-select form-select btn-info" aria-label="Select A Topping">
        <option selected>Select A Topping</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>
    <button type="button" class="deletetopping"  id="toppingdelete__${id}">Delete</button></div>
</li>
`
}