let inputName = document.getElementById('input-name');
let inputPrice = document.getElementById('input-price');
let inputBrand = document.getElementById('input-brand');
let inputImage1 = document.getElementById('input-image-1');
let inputImage2 = document.getElementById('input-image-2');
let buttonAdd = document.querySelector('.button-add');
let buttonEdit = document.querySelector('.button-edit');
let buttonCancelEdit = document.querySelector('.button-cancel-edit');
let productAmount = document.querySelector('.product-amount');
let bodyBoxProduct = document.querySelector('.body-box');
let collectionItem = document.querySelector('#product-list .container');

class Product {
    name;
    price;
    brand;
    firstImage;
    secondImage;

    constructor(name, price, brand, firstImage, secondImage) {
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.firstImage = firstImage;
        this.secondImage = secondImage;
    }
}

let productsStorage = JSON.parse(localStorage.getItem("products") || "[]");
let productData = productsStorage[productsStorage.length - 1];

let manUtd1 = new Product('Manchester United Home Shirt 2021-22', 25, 'Adidas', '../images/manchester-united-home-shirt-202.jpg', '../images/manchester-united-home-shirt-202-2.jpg');
let manUtd2 = new Product('Manchester United Away Shirt 2021-22', 25, 'Adidas', '../images/manchester-united-away-shirt-202.jpg', '../images/manchester-united-away-shirt-202-2.jpg');
let manUtd3 = new Product('Manchester United Third Shirt 2021-22', 25, 'Adidas', '../images/manchester-united-third-shirt-20.jpg', '../images/manchester-united-third-shirt-20-2.jpg');
let realMdr1 = new Product('Real Madrid Home Authentic Shirt 2022-23', 110, 'Adidas', '../images/real-madrid-home-authentic-shirt.jpg', '../images/real-madrid-home-authentic-shirt-2.jpg');
let realMdr2 = new Product('Real Madrid Third Authentic Shirt 2021-22', 39, 'Adidas', '../images/real-madrid-third-authentic-shirt.jpg', '../images/real-madrid-third-authentic-shirt-2.jpg');
let juven1 = new Product('Juventus Home Shirt 2021-22', 15, 'Adidas', '../images/juventus-home-shirt-2021-22.jpg', '../images/juventus-home-shirt-2021-22-2.jpg');
let juven2 = new Product('Juventus Third Shirt 2021-22', 30, 'Adidas', '../images/juventus-third-shirt-2021-22_ss4.jpg', '../images/juventus-third-shirt-2021-22_ss4-2.jpg');
let bayern1 = new Product('FC Bayern Home Shirt 2022-23', 70, 'Adidas', '../images/fc-bayern-home-shirt-2022-23_ss4.jpg', '../images/fc-bayern-home-shirt-2022-23_ss4-2.jpg');
let arsenal1 = new Product('Arsenal Home Shirt 2022-23', 70, 'Adidas', '../images/arsenal-home-shirt-2022-23_ss4_p.jpg', '../images/arsenal-home-shirt-2022-23_ss4_p-2.jpg');
let arsenal2 = new Product('Arsenal Away Shirt 2021-22', 30, 'Adidas', '../images/arsenal-away-shirt-2021-22.jpg', '../images/arsenal-away-shirt-2021-22-2.jpg');
let westham1 = new Product('West Ham United Home Shirt 2022-23', 65, 'Umbro', '../images/west-ham-united-home-shirt-2022.jpg', '../images/west-ham-united-home-shirt-2022-2.jpg');
let aston1 = new Product('Aston Villa Away Shirt 2021-22', 15, 'Kappa', '../images/aston-villa-away-shirt-2021-22_s.jpg', '../images/aston-villa-away-shirt-2021-22_s-2.jpg');
let products = [manUtd1, manUtd2, manUtd3, realMdr1, realMdr2, juven1, juven2, bayern1, arsenal1, arsenal2, westham1, aston1];

if (productsStorage.length == 0) {
    productsStorage.push(products);
}

function setStorage() {
    localStorage.setItem("products", JSON.stringify(productsStorage));
}

setStorage();

//Function render product info to HTML page admin
function insertProduct() {
    if (bodyBoxProduct != null) {
        if (productData == undefined) {
            let productList = '<li class="admin-product-item"><div>Order</div><div class="admin-product-name">Name</div><div>Price</div><div>Brand</div><div>Image 1</div><div>Image 2</div><div>Edit</div><div>Delete</div></li>';
            for (i = 0; i < products.length; i++) {
                let priceFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(products[i].price);
                productList += '<li class="admin-product-item">' + '<div class="order-col">' + (i + 1) + '</div>' +
                    '<div class="admin-product-name">' + products[i].name + '</div>' +
                    '<div class="admin-product-price">' + priceFormat + '</div>' +
                    '<div class="admin-product-brand">' + products[i].brand + '</div>' +
                    '<div class="admin-product-image"><img src="' + products[i].firstImage + '" width = "60px"></div>' +
                    '<div class="admin-product-image"><img src="' + products[i].secondImage + '" width = "60px"></div>' +
                    '<div class="edit-button">' + '<button class="btn" onclick="editProduct(' + (`${i}`) + ')">Edit</button></div>' +
                    '<div class="delete-button">' + '<button class="btn" onclick="deleteProduct(' + (`${i}`) + ')">Delete</button></div>' + '</li>'
            };
            bodyBoxProduct.innerHTML = productList;
            productAmount.innerHTML = products.length + ' products';
        } else {
            let productListStorage = '<li class="admin-product-item"><div>Order</div><div class="admin-product-name">Name</div><div>Price</div><div>Brand</div><div>Image 1</div><div>Image 2</div><div>Edit</div><div>Delete</div></li>';
            for (i = 0; i < productData.length; i++) {
                let priceFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(productData[i].price);
                productListStorage += '<li class="admin-product-item">' + '<div class="order-col">' + (i + 1) + '</div>' +
                    '<div class="admin-product-name">' + productData[i].name + '</div>' +
                    '<div class="admin-product-price">' + priceFormat + '</div>' +
                    '<div class="admin-product-brand">' + productData[i].brand + '</div>' +
                    '<div class="admin-product-image"><img src="' + productData[i].firstImage + '" width = "60px"></div>' +
                    '<div class="admin-product-image"><img src="' + productData[i].secondImage + '" width = "60px"></div>' +
                    '<div class="edit-button">' + '<button class="btn" onclick="editProduct(' + (`${i}`) + ')">Edit</button></div>' +
                    '<div class="delete-button">' + '<button class="btn" onclick="deleteProduct(' + (`${i}`) + ')">Delete</button></div>' + '</li>'
            };
            bodyBoxProduct.innerHTML = productListStorage;
            productAmount.innerHTML = productData.length + ' products';
        }
    }
}

insertProduct();

//Function render product info to HTML page collection
function insertProductCollection() {
    if (collectionItem != null) {
        if (productData == undefined) {
            let productListCollection = '';
            for (i = 0; i < products.length; i++) {
                let priceFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(products[i].price);
                productListCollection += '<div class="product-item">' +
                    '<div class="product-image"><a href="' + products[i].firstImage + '" data-fancybox="gallery-1"><img src="' + products[i].firstImage + '" alt=""></a><a href="' + products[i].secondImage + '" data-fancybox="gallery-1"><img src="' + products[i].secondImage + '" alt=""></a></div>' +
                    '<div class="product-price"><span>Price: </span><div class="original-price">' + priceFormat + '</div></div>' +
                    '<div class="product-brand">' + products[i].brand + '</div>' +
                    '<div class="product-name"><a href="">' + products[i].name + '</a></div>' +
                    '<div class="add-to-cart"><input type="number" id="quantity-' + `${i}` + '" name="quantity" min="1" value="1"><button <button onclick="addToCart(' + (`${i}`) + ')"                                                                                                                                                                                                                                                                                                            >ADD TO CART</button></div>' +
                    '</div>'
            };
            collectionItem.innerHTML = productListCollection;
        } else {
            let productListCollectionStorage = '';
            for (i = 0; i < productData.length; i++) {
                let priceFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(productData[i].price);
                productListCollectionStorage += '<div class="product-item">' +
                    '<div class="product-image"><a href="' + productData[i].firstImage + '" data-fancybox="gallery-1"><img src="' + productData[i].firstImage + '" alt=""></a><a href="' + productData[i].secondImage + '" data-fancybox="gallery-1"><img src="' + productData[i].secondImage + '" alt=""></a></div>' +
                    '<div class="product-price"><span>Price: </span><div class="original-price">' + priceFormat + '</div></div>' +
                    '<div class="product-brand">' + productData[i].brand + '</div>' +
                    '<div class="product-name"><a href="">' + productData[i].name + '</a></div>' +
                    '<div class="add-to-cart"><input type="number" id="quantity-' + `${i}` + '" name="quantity" min="1" value="1"><button onclick="addToCart(' + (`${i}`) + ')">ADD TO CART</button></div>' +
                    '</div>'
            };
            collectionItem.innerHTML = productListCollectionStorage;
        }
    }
}

insertProductCollection();

//Function add new product
function addProduct() {
    if (buttonAdd != null) {
        buttonAdd.addEventListener('click', function() {
            if (inputName.value != '') {
                let newProduct = new Product(inputName.value, inputPrice.value, inputBrand.value, inputImage1.value, inputImage2.value);
                productData.push(newProduct);
                setStorage();
                insertProduct();
                insertProductCollection();
                inputName.value = '';
                inputPrice.value = '';
                inputBrand.value = '';
            }
        })
    }
}

addProduct();

//Function delete product
function deleteProduct(item) {
    if (productData == undefined) {
        if (confirm('Do you want to delete "' + products[item].name + '" ?')) {
            alert('Delete "' + products[item].name + '" successfully!');
            products.splice(item, 1);
            setStorage();
            insertProduct();
            insertProductCollection();
        } else {
            alert('You cancelled');
        }
    } else {
        if (confirm('Do you want to delete "' + productData[item].name + '" ?')) {
            alert('Delete "' + productData[item].name + '" successfully!');
            productData.splice(item, 1);
            setStorage();
            insertProduct();
            insertProductCollection();
        } else {
            alert('You cancelled');
        }
    }
}

//Function change button Add to button Edit
function removeHide() {
    buttonEdit.classList.remove('hide');
    buttonCancelEdit.classList.remove('hide');
    buttonAdd.classList.add('hide');
}

//Function change button Edit to button Add
function addHide() {
    buttonEdit.classList.add('hide');
    buttonCancelEdit.classList.add('hide');
    buttonAdd.classList.remove('hide');
}

//Function edit product
function editProduct(item) {
    inputName.focus();
    removeHide();
    if (productData == undefined) {
        inputName.value = products[item].name;
        inputPrice.value = products[item].price;
        inputBrand.value = products[item].brand;
        inputImage1.value = products[item].firstImage;
        inputImage2.value = products[item].secondImage;
    } else {
        inputName.value = productData[item].name;
        inputPrice.value = productData[item].price;
        inputBrand.value = productData[item].brand;
        inputImage1.value = productData[item].firstImage;
        inputImage2.value = productData[item].secondImage;
    }
    buttonEdit.setAttribute('onclick', 'editProductConfirm(' + `${item}` + ')');
}

//Function re-render product info after edit
function editProductConfirm(item) {
    if (productData == undefined) {
        products[item].name = inputName.value;
        products[item].price = inputPrice.value;
        products[item].brand = inputBrand.value;
        products[item].firstImage = inputImage1.value;
        products[item].secondImage = inputImage2.value;
    } else {
        productData[item].name = inputName.value;
        productData[item].price = inputPrice.value;
        productData[item].brand = inputBrand.value;
        productData[item].firstImage = inputImage1.value;
        productData[item].secondImage = inputImage2.value;
    }
    setStorage();
    insertProduct();
    insertProductCollection();
    addHide();
    inputName.value = '';
    inputPrice.value = '';
    inputBrand.value = '';
    inputImage1.value = '';
    inputImage2.value = '';
}

//Function cancel edit action
function cancelEdit() {
    if (buttonCancelEdit != null) {
        buttonCancelEdit.addEventListener('click', function() {
            inputName.value = '';
            inputPrice.value = '';
            inputBrand.value = '';
            inputImage1.value = '';
            inputImage2.value = '';
            inputName.focus();
            addHide();
        })
    }
}

cancelEdit();