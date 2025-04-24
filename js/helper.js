
export async function getProducts() {
    // let products = await fetch("https://fakestoreapi.com/products")
    let products = await fetch("https://dummyjson.com/products")

    if (!products)
        return `No products Found!`;
    products = await ((products.json()))
    products = products.products
    console.log(products)
    products.forEach(product => {
        product.number_in_cart = 0
    });
    storeInLocalStorage("allProducts", products)
    return products
}

function storeInLocalStorage(key, value) {
    console.log("storinnng", key, value)
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
    console.log(getFromLocalStorage("cartProducts"))
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


function getTotalCost() {
    let cartProds = getFromLocalStorage("cartProducts")
    console.log("from gettotatl cost: ", cartProds)
    let sum = 0;
    cartProds.forEach(prod => {
        sum += prod.number_in_cart * prod.price;
    })
    return sum.toFixed(2);
}
function removeFromCartById(prodId) {
    console.log("from remove funciton")
    let cartProducts = getFromLocalStorage("cartProducts")

    let index = cartProducts.findIndex((cart_prod) => {

        return cart_prod.id === Number(prodId);
    })
    console.log("index: ", index)
    if (index === -1) {
        console.log(`product not found`)
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

// addToCartById()
export { storeInLocalStorage, emptyCart, getTotalCost, getCartProducts, removeFromCartById, addToCartById, getProductById, getFromLocalStorage }