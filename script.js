// Owl carousel option
$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
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
let cartMiniButton = document.querySelector('.cart-mini-button')
let cartMini = document.querySelector('.cart-mini')
let cartMiniItem = document.querySelector('.cart-mini-body')
let cartMiniTotal = document.querySelector('.cart-mini-total')
let closeButton = document.querySelector('.cart-mini-header-right')
let cartData = JSON.parse(localStorage.getItem("cart data") || "[]")
let cartCount = document.querySelector('.cart-count')
let totalPrice = document.querySelector('.total-price')

//Function open cart when click to icon mini cart
function toggleMiniCart() {
    cartMiniButton.addEventListener('click', function() {
        cartMini.classList.toggle('active')
    })
    closeButton.addEventListener('click', function() {
        cartMini.classList.remove('active')
    })
}

toggleMiniCart()

//Function display cart data
function displayCartData() {
    data = ''
    let totalPriceCount = 0
    for (i = 0; i < cartData.length; i++) {
        let priceFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(cartData[i].price);
        data += `<div class="cart-mini-item">
            <div class="cart-mini-image">
                <img src="${cartData[i].firstImage}" alt="">
            </div>
            <div class="cart-mini-info">
                <div class="cart-mini-name">${cartData[i].name}</div>
                <div class="cart-mini-price">${priceFormat}</div>
            </div>
        </div>`

        totalPriceCount += cartData[i].price
    }

    if (cartData.length > 0) {
        cartMiniItem.innerHTML = data
        cartMiniTotal.classList.remove('hide')
    } else {
        cartMiniTotal.classList.add('hide')
        cartMiniItem.innerHTML = '<span class="empty-cart-noti">Your Shopping Cart Is Empty</span>'
    }

    cartCount.innerHTML = cartData.length
    totalPrice.innerHTML = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(totalPriceCount)
}
displayCartData()

//Function add to cart when click to button Add to cart
function addToCart(index) {
    if (!cartMini.classList.contains('active')) {
        cartMini.classList.add('active')
    }

    if (productData == undefined) {
        cartData.push(products[index])
    } else {
        cartData.push(productData[index])
    }
    displayCartData()
    localStorage.setItem("cart data", JSON.stringify(cartData));
}


//Declare variable for account data
let accountContainer = document.querySelector('#account .container')
let userName = document.querySelector('.signup input[name="name"]')
let phone = document.querySelector('.signup input[name="phone"]')
let email = document.querySelector('.signup input[name="email"]')
let password = document.querySelector('.signup input[name="password"]')

//Function check register
function submitForm() {
    accountContainer.innerHTML = '<div class="congratulation-noti"><p>Congratulations, you have successfully registered!</p><p>Click<span> <a href="/signin.html">here</a>  </span>to sign in.</p></div>'
    userName.value = ''
    phone.value = ''
    email.value = ''
    password.value = ''
}

//Function set account data to local
class Account {
    userName
    phone
    email
    password

    constructor(userName, phone, email, password) {
        this.userName = userName
        this.phone = phone
        this.email = email
        this.password = password
    }

}

let accountData = JSON.parse(localStorage.getItem("account data") || "[]");

function setLocal() {
    let newUser = new Account(userName.value, phone.value, email.value, password.value)
    accountData.push(newUser)
    localStorage.setItem("account data", JSON.stringify(accountData));
}