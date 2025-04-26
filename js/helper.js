import { displayProducts } from "../js/home.js"
import { updateCartCount } from "../js/build_components.js"

export async function getProducts() {
    let products = getFromLocalStorage("allProducts")

    if (!products) {
        products = await fetch("https://dummyjson.com/products")
    } else {
        console.log("Products are found NO FETCH IS NEEDED 😃")
    }

    products = await ((products.json()))
    products = products.products
    products.forEach(product => {
        product.number_in_cart = 0
    });
    storeInLocalStorage("allProducts", products)
    return products
}

function storeInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function addToCartById(productId) {
    let addedProduct = getProductById(productId)[0]
    let cartProducts = getFromLocalStorage("cartProducts") || []
    let exists = false;
    cartProducts.map(cart_prod => {
        if (cart_prod.id === addedProduct.id) {
            cart_prod.number_in_cart += 1
            exists = true
        }
    })

    if (!exists) {
        addedProduct.number_in_cart += 1;
        cartProducts.push(addedProduct);
    };

    storeInLocalStorage("cartProducts", cartProducts)
    updateCartCount()
}

function getProductById(prodId) {
    let products = getFromLocalStorage("allProducts")
    let myProduct = products.filter(prod => {
        return prod.id == prodId;
    })
    return myProduct
}

function getCartProducts() {
    let cartProducts = getFromLocalStorage("cartProducts")
    if (!cartProducts) return []
    return cartProducts
}

async function categoryFilter(products, categories) {

    let filterdProducts = products.filter((prod) => {
        return (categories.indexOf(prod.category) !== -1)
    })

    // displayProducts(filterdProducts)
    return filterdProducts;
}

function intialdisplay() {
    let products = getFromLocalStorage("allProducts")
}
function priceFilter(products, from = 0, to = 10000000) {
    let filterdProducts = products.filter((prod) => {
        return prod.price >= from && prod.price <= to;
    })
    return filterdProducts;
}

async function filterProducts(categories, from, to) {

    let products = getFromLocalStorage("allProducts");
    from = from || 0;
    to = to || 10000;
    products = await categoryFilter(products, categories)
    products = await priceFilter(products, from, to)
    displayProducts(await products)

}

function getTotalCost() {
    let cartProds = getFromLocalStorage("cartProducts") || []

    let sum = 0;
    cartProds.forEach(prod => {
        sum += prod.number_in_cart * prod.price;
    })
    return sum.toFixed(2);
}
function removeFromCartById(prodId) {

    let cartProducts = getFromLocalStorage("cartProducts")

    let index = cartProducts.findIndex((cart_prod) => {

        return cart_prod.id === Number(prodId);
    })

    if (index === -1) {

        return false;
    }
    if (cartProducts[index].number_in_cart === 1) {
        cartProducts.splice(index, 1);
        storeInLocalStorage("cartProducts", cartProducts)
        return true;
    }
    cartProducts[index].number_in_cart -= 1;
    storeInLocalStorage("cartProducts", cartProducts)
    return true;

}
function emptyCart() {
    storeInLocalStorage("cartProducts", [])

}


export { storeInLocalStorage, filterProducts, emptyCart, intialdisplay, getTotalCost, getCartProducts, removeFromCartById, addToCartById, getProductById, getFromLocalStorage }