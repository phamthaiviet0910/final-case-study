// Owl carousel option
$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
});

//Declare variable for cart
let cartMiniButton = document.querySelector('.cart-mini-button');
let cartMini = document.querySelector('.cart-mini');
let cartMiniItem = document.querySelector('.cart-mini-body');
let cartMiniTotal = document.querySelector('.cart-mini-total');
let closeButton = document.querySelector('.cart-mini-header-right');
let cartCount = document.querySelector('.cart-count');
let totalPrice = document.querySelector('.total-price');

let cartData = JSON.parse(localStorage.getItem("cart data") || "[]");

//Function open cart when click to icon mini cart
function toggleMiniCart() {
    cartMiniButton.addEventListener('click', function() {
        cartMini.classList.toggle('active')
    });
    closeButton.addEventListener('click', function() {
        cartMini.classList.remove('active')
    });
}

toggleMiniCart()

//Function display cart data
function displayCartData() {
    data = '';
    let totalPriceCount = 0;
    let cartCountItem = 0;
    for (i = 0; i < cartData.length; i++) {
        let priceFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(cartData[i].priceItem * cartData[i].quantityItem);
        data += `<div class="cart-mini-item">
            <div class="cart-mini-image">
                <img src="${cartData[i].imageItem}" alt="">
            </div>
            <div class="cart-mini-info">
                <div class="cart-mini-name">${cartData[i].nameItem}</div>
                <div class="cart-mini-quantity-and-price">
                <div class="cart-mini-quantity"><span>qty:</span> ${cartData[i].quantityItem}</div> - 
                <div class="cart-mini-price"><span>price:</span> ${priceFormat}</div>
                </div>
            </div>
        </div>`;

        totalPriceCount += (cartData[i].priceItem * cartData[i].quantityItem); //Calculate total price in cart

        cartCountItem += cartData[i].quantityItem; //Calculate quantity products added to cart
    }

    if (cartData.length > 0) {
        cartMiniItem.innerHTML = data;
        cartMiniTotal.classList.remove('hide');
    } else {
        cartMiniTotal.classList.add('hide');
        cartMiniItem.innerHTML = '<span class="empty-cart-noti">Your Shopping Cart Is Empty</span>';
    }

    totalPrice.innerHTML = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(totalPriceCount); //Display total price in cart

    cartCount.innerHTML = cartCountItem; //Display quantity products added to cart
}
displayCartData()

//Function add to cart when click to button Add to cart
class Cart {
    nameItem
    priceItem
    imageItem
    quantityItem

    constructor(nameItem, priceItem, imageItem, quantityItem) {
        this.nameItem = nameItem
        this.priceItem = priceItem
        this.imageItem = imageItem
        this.quantityItem = quantityItem
    }

    getQuantity() {
        return this.quantityItem
    }

    setQuantity(quantityItem) {
        this.quantityItem = quantityItem
    }
}

function addToCart(index) {
    if (!cartMini.classList.contains('active')) {
        cartMini.classList.add('active');
    }

    let quantityAdd = document.querySelector('#quantity-' + `${index}` + '')

    if (productData == undefined) {
        let itemAdd = new Cart(products[index].name, products[index].price, products[index].firstImage, +quantityAdd.value);
        if (cartData.length > 0) {
            let flag = false;
            let indexCart;
            for (i = 0; i < cartData.length; i++) {
                if (products[index].name == cartData[i].nameItem) {
                    flag = true;
                    indexCart = i;
                }
            }
            if (flag) {
                cartData[indexCart].quantityItem += +quantityAdd.value
            } else {
                cartData.push(itemAdd);
            }
        } else {
            cartData.push(itemAdd);
        }
    } else {
        let itemAdd = new Cart(productData[index].name, productData[index].price, productData[index].firstImage, +quantityAdd.value);
        if (cartData.length > 0) {
            let flag = false;
            let indexCart;
            for (i = 0; i < cartData.length; i++) {
                if (productData[index].name == cartData[i].nameItem) {
                    flag = true;
                    indexCart = i;
                }
            }
            if (flag) {
                cartData[indexCart].quantityItem += +quantityAdd.value
            } else {
                cartData.push(itemAdd);
            }
        } else {
            cartData.push(itemAdd);
        }
    }
    quantityAdd.value = 1;
    displayCartData();
    localStorage.setItem("cart data", JSON.stringify(cartData));
}

//Declare variable for account data
let accountContainer = document.querySelector('#account .container');
let userName = document.querySelector('.signup input[name="name"]');
let phone = document.querySelector('.signup input[name="phone"]');
let email = document.querySelector('.signup input[name="email"]');
let password = document.querySelector('.signup input[name="password"]');
let emailLogin = document.querySelector('.signin input[name="email"]');
let passwordLogin = document.querySelector('.signin input[name="password"]');
let errorNoti = document.querySelector('.error-noti');

//Function check register
function submitForm() {
    accountContainer.innerHTML = '<div class="congratulation-noti"><p>Congratulations, you have successfully registered!</p><p>Click<span> <a href="/signin.html">here</a>  </span>to sign in.</p></div>';
    userName.value = '';
    phone.value = '';
    email.value = '';
    password.value = '';
}

//Function set account data to local
class Account {
    userName;
    phone;
    email;
    password;

    constructor(userName, phone, email, password) {
        this.userName = userName;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

}

let accountData = JSON.parse(localStorage.getItem("account data") || "[]");

function setLocal() {
    let newUser = new Account(userName.value, phone.value, email.value, password.value);
    accountData.push(newUser);
    localStorage.setItem("account data", JSON.stringify(accountData));
}

//Check sign in account
let accountLogin = JSON.parse(localStorage.getItem("account login") || "[]");

function submitLogin(event) {
    if (accountData.length > 0) {
        for (i = 0; i < accountData.length; i++) {
            if (accountData[i].email == emailLogin.value && accountData[i].password == passwordLogin.value) {
                accountContainer.innerHTML = '<div class="congratulation-noti"><p>Congratulations, you have successfully logged in!</p><p>Click<span> <a href="/collection.html">here</a>  </span>to continue shopping.</p></div>';
                accountLogin.push(emailLogin.value)
                accountHeader.innerHTML = `Hi, ${accountData[i].email} - <a onclick = "logout()" href="/index.html">Log out</a>`
                localStorage.setItem("account login", JSON.stringify(accountLogin));
                return true;
            } else {
                errorNoti.classList.remove('hide');
                event.preventDefault()
            }
        }
    } else {
        errorNoti.classList.remove('hide');
        event.preventDefault()
    }

}

//Check sign in account or not
let accountHeader = document.querySelector('.account-header')

function checkAccount() {
    if (accountLogin.length != 0) {
        for (i = 0; i < accountLogin.length; i++) {
            accountHeader.innerHTML = `Hi, ${accountLogin[i]} - <a onclick = "logout()" href="/index.html">Log out</a>`
        }
        if (accountContainer) {
            accountContainer.innerHTML = '<div class="congratulation-noti"><p>Congratulations, you have successfully logged in!</p><p>Click<span> <a href="/collection.html">here</a>  </span>to continue shopping.</p></div>';
        }
    }
}

//Function log out account
function logout() {
    localStorage.removeItem("account login")
    localStorage.removeItem("cart data")
}