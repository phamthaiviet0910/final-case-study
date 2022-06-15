let inputName = document.getElementById('input-name')
let inputPrice = document.getElementById('input-price')
let inputBrand = document.getElementById('input-brand')
let inputImage1 = document.getElementById('input-image-1')
let inputImage2 = document.getElementById('input-image-2')
let buttonAdd = document.querySelector('.button-add')
let buttonEdit = document.querySelector('.button-edit')
let buttonCancelEdit = document.querySelector('.button-cancel-edit')
let productAmount = document.querySelector('.product-amount')
let bodyBoxProduct = document.querySelector('.body-box')

class Product {
    name
    price
    brand
    firstImage
    secondImage

    constructor(name, price, brand, firstImage, secondImage) {
        this.name = name
        this.price = price
        this.brand = brand
        this.firstImage = firstImage
        this.secondImage = secondImage
    }
}

let manUtd1 = new Product('Manchester United Home Shirt 2021-22', 25, 'Adidas', '../images/manchester-united-home-shirt-202.jpg', '../images/manchester-united-home-shirt-202-2.jpg')
let manUtd2 = new Product('Manchester United Away Shirt 2021-22', 25, 'Adidas', '../images/manchester-united-away-shirt-202.jpg', '../images/manchester-united-away-shirt-202-2.jpg')
let manUtd3 = new Product('Manchester United Away Shirt 2021-22', 25, 'Adidas', '../images/manchester-united-third-shirt-20.jpg', '../images/manchester-united-third-shirt-20-2.jpg')
let realMdr1 = new Product('Real Madrid Home Authentic Shirt 2022-23', 110, 'Adidas', '../images/real-madrid-home-authentic-shirt.jpg', '../images/real-madrid-home-authentic-shirt-2.jpg')
let realMdr2 = new Product('Real Madrid Third Authentic Shirt 2021-22', 39, 'Adidas', '../images/real-madrid-third-authentic-shirt.jpg', '../images/real-madrid-third-authentic-shirt-2.jpg')
let juven1 = new Product('Juventus Home Shirt 2021-22', 15, 'Adidas', '../images/juventus-home-shirt-2021-22.jpg', '../images/juventus-home-shirt-2021-22-2.jpg')
let juven2 = new Product('Juventus Third Shirt 2021-22', 30, 'Adidas', '../images/juventus-third-shirt-2021-22_ss4.jpg', '../images/juventus-third-shirt-2021-22_ss4-2.jpg')
let bayern1 = new Product('FC Bayern Home Shirt 2022-23', 70, 'Adidas', '../images/fc-bayern-home-shirt-2022-23_ss4.jpg', '../images/fc-bayern-home-shirt-2022-23_ss4-2.jpg')
let arsenal1 = new Product('Arsenal Home Shirt 2022-23', 70, 'Adidas', '../images/arsenal-home-shirt-2022-23_ss4_p.jpg', '../images/arsenal-home-shirt-2022-23_ss4_p-2.jpg')
let arsenal2 = new Product('Arsenal Away Shirt 2021-22', 30, 'Adidas', '../images/arsenal-away-shirt-2021-22.jpg', '../images/arsenal-away-shirt-2021-22-2.jpg')
let westham1 = new Product('West Ham United Home Shirt 2022-23', 65, 'Umbro', '../images/west-ham-united-home-shirt-2022.jpg', '../images/west-ham-united-home-shirt-2022-2.jpg')
let aston1 = new Product('Aston Villa Away Shirt 2021-22', 15, 'Kappa', '../images/aston-villa-away-shirt-2021-22_s.jpg', '../images/aston-villa-away-shirt-2021-22_s-2.jpg')
let products = [manUtd1, manUtd2, manUtd3, realMdr1, realMdr2, juven1, juven2, bayern1, arsenal1, arsenal2, westham1, aston1]

//Function render product info to HTML page admin
function insertProduct() {
    let productList = '<li class="admin-product-item"><div>Order</div><div class="admin-product-name">Name</div><div>Price</div><div>Brand</div><div>Image 1</div><div>Image 2</div><div>Edit</div><div>Delete</div></li>'
    for (i = 0; i < products.length; i++) {
        productList += '<li class="admin-product-item">' + '<div class="order-col">' + (i + 1) + '</div>' +
            '<div class="admin-product-name">' + products[i].name + '</div>' +
            '<div class="admin-product-price">' + products[i].price + '</div>' +
            '<div class="admin-product-brand">' + products[i].brand + '</div>' +
            '<div class="admin-product-image"><img src="' + products[i].firstImage + '" width = "60px"></div>' +
            '<div class="admin-product-image"><img src="' + products[i].secondImage + '" width = "60px"></div>' +
            '<div class="edit-button">' + '<button class="btn" onclick="editProduct(' + (`${i}`) + ')">Edit</button></div>' +
            '<div class="delete-button">' + '<button class="btn" onclick="deleteProduct(' + (`${i}`) + ')">Delete</button></div>' + '</li>'
    }
    bodyBoxProduct.innerHTML = productList
    productAmount.innerHTML = products.length + ' products'
}

insertProduct()

//Function add new product
function addProduct() {
    buttonAdd.addEventListener('click', function() {
        if (inputName.value != '') {
            let newProduct = new Product(inputName.value, inputPrice.value, inputBrand.value, inputImage1.value, inputImage2.value)
            products.push(newProduct)
            insertProduct()
            inputName.value = ''
            inputPrice.value = ''
            inputBrand.value = ''
        }
    })
}

addProduct()

//Function delete product
function deleteProduct(item) {
    if (confirm('Do you want delete "' + products[item].name + '" ?')) {
        alert('Delete "' + products[item].name + '" successfully!')
        products.splice(item, 1)
        insertProduct()
    } else {
        alert('You cancelled')
    }
}

//Function change button Add to button Edit
function removeHide() {
    buttonEdit.classList.remove('hide')
    buttonCancelEdit.classList.remove('hide')
    buttonAdd.classList.add('hide')
}

//Function change button Edit to button Add
function addHide() {
    buttonEdit.classList.add('hide')
    buttonCancelEdit.classList.add('hide')
    buttonAdd.classList.remove('hide')
}

//Function edit product
function editProduct(item) {
    inputName.focus()
    removeHide()
    inputName.value = products[item].name
    inputPrice.value = products[item].price
    inputBrand.value = products[item].brand
    inputImage1.value = products[item].firstImage
    inputImage2.value = products[item].secondImage
    buttonEdit.setAttribute('onclick', 'editProductConfirm(' + `${item}` + ')');
}

//Function re-render product info after edit
function editProductConfirm(item) {
    products[item].name = inputName.value
    products[item].price = inputPrice.value
    products[item].brand = inputBrand.value
    products[item].firstImage = inputImage1.value
    products[item].secondImage = inputImage2.value
    insertProduct()
    addHide()
    inputName.value = ''
    inputPrice.value = ''
    inputBrand.value = ''
    inputImage1.value = ''
    inputImage2.value = ''
}

//Function cancel edit action
function cancelEdit() {
    buttonCancelEdit.addEventListener('click', function() {
        inputName.value = ''
        inputPrice.value = ''
        inputBrand.value = ''
        inputImage1.value = ''
        inputImage2.value = ''
        inputName.focus()
        addHide()
    })
}

cancelEdit()