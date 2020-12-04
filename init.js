function init_loader() {
    navigate('home')
}

init_loader()

window.addEventListener('popstate', (e) => {
    router(location.pathname.slice(1))  
})


const DOMSelectors = {
    nameInput: () => document.getElementById('nameInput'),                               // most likely this will be the input fields from the form
    priceInput: () => document.getElementById('priceInput'),
    imageInput: () => document.getElementById('imageInput'),
    descriptionInput: () => document.getElementById('descriptionInput'),
    brandInput: () => document.getElementById('brandInput'),
    editNameInput: () => document.getElementById('editNameInput'),
    editPriceInput: () => document.getElementById('editPriceInput'),
    editImageInput: () => document.getElementById('editImageInput'),
    editDescriptionInput: () => document.getElementById('editDescriptionInput'),
    editBrandInput: () => document.getElementById('editBrandInput'),
}


// NAVBAR BUTTONS 

function createNewItem(event) {
    event.preventDefault()

    navigate(event.target.href)
}

function homeButton(event) {
    event.preventDefault()

    navigate(event.target.parentElement.href)

}

function logoutButton(event) {
    event.preventDefault()

    localStorage.removeItem('auth')
    setTimeout(function(){navigate('home')}, 700)
}
// LOGIN AND REGISTER BUTTONS

function RegisterNowButton(event) {      // register button click, redirect to register template
    event.preventDefault()

    console.log(event.target.href)

    navigate(event.target.href)
}

function loginNowButton(event) {
    event.preventDefault()

    console.log(event.target.href)

    navigate(event.target.href)
}

function loginSubmitButton(event) {
    event.preventDefault()

    let email = document.getElementById('email-login-input').value;
    let password = document.getElementById('password-login-input').value;

    authServices.loginUser(email, password)
    setTimeout(function() {navigate('home')}, 700)
    
    
}

function registerSubmitButton(event) {
    event.preventDefault()

    let email = document.getElementById('email-register-input').value;
    let password = document.getElementById('password-register-input').value;
    let password2 = document.getElementById('password2-register-input').value;
    
    if (!email || !password || !password2) {
        return;
    }
    if (password.length < 6 || password !== password2) {
        return;
    }

    const data = authServices.registerUser(email, password);
    
    setTimeout(function() {navigate('home')}, 700);
  
}

// ITEMS BUTTONS

function deleteItem(event) {
    event.preventDefault()
    const id = event.target.id;

    itemServices.deleteItemFetch(id)
    console.log('DELETED');
    setTimeout(function() { navigate('/home') }, 700)
}

async function editItemButtonSubmit(event) {
    event.preventDefault()
    const id = event.target.id                                                       // will need to adjust this 
    const name = DOMSelectors.editNameInput().value;
    const price = DOMSelectors.editPriceInput().value;
    const image = DOMSelectors.editImageInput().value;
    const description = DOMSelectors.editDescriptionInput().value;
    const brand = DOMSelectors.editBrandInput().value;

    const isOk = correctInputChecker(name, price, image, description, brand);

    if (isOk) {
    console.log(id, name, price, image, description, brand);
       itemServices.editItemFetch(id, {name, price, image, description, brand})
    
       setTimeout(function() { navigate('/details/' + id) }, 700)
    }

}

function editItem(event) {                      //edit item button 
    event.preventDefault()

    navigate('/edit/' + event.target.id);
}

function buyItem(event) {                       // buy the item button
    event.preventDefault()
    let itemId = event.target.id;
    console.log(event.target.parentElement)
    let user = JSON.parse(localStorage.getItem('auth'))
    let buyer = user.email;
    itemServices.buyShoes(itemId, buyer)        
    setTimeout(function() { navigate('/details/' + itemId) }, 700)    
}

function detailsButton(event) {                          // details button
    event.preventDefault()

    navigate('/details/' + event.target.parentElement.id)
}

function createButton(event) {                      // create item button
    event.preventDefault()

    const name = DOMSelectors.nameInput().value;                            /// need to adjust
    const price = DOMSelectors.priceInput().value;
    const image = DOMSelectors.imageInput().value;
    const description = DOMSelectors.descriptionInput().value;
    const brand = DOMSelectors.brandInput().value;

    const validator = correctInputChecker(name, price, image, description, brand);
    
    if (!validator) {
        return;
    }

    itemServices.createOffer(name, price, image, description, brand)

    DOMSelectors.nameInput().value = '';
    DOMSelectors.priceInput().value = '';
    DOMSelectors.imageInput().value = '';
    DOMSelectors.descriptionInput().value = '';
    DOMSelectors.brandInput().value = '';

    console.log(name, price, image, description, brand)

    setTimeout(function() {navigate('home')}, 700)

}

// correct input form checker

function correctInputChecker(name, price, image, description, brand){

    let isOk = true;

    if (!/[A-z]+$/.test(name)) {
        isOk = false;
        return isOk;
    }
    if (!/(^\d+\.\d+$|^\d+$)/.test(price)) {
        isOk = false;
        return isOk;
    }
    if (!regex.imageUrl.test(image)) {
        isOk = false;
        return isOk;
    }
    if (!/.+/.test(description)) {
        isOk = false;
        return isOk;
    }
    if (!/([A-z0-9])\w+/.test(brand)) {
        isOk = false;
        return isOk;
    }
    return isOk;

}