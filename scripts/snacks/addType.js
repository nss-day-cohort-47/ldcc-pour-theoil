export const addType = () => {
    return`
    <form class="newType">
        <div>
            <input value=""
                   name="name"
                   class="newPost__input"
                   type="text"
                   placeholder="New type name..." />
        </div>
        <button id="newType__submit">Save</button>
        <button id="newType__cancel">Cancel</button>
    </form>
    `
}