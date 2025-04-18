
export async function getProducts() {
    let products = await fetch("https://fakestoreapi.com/products")
    if (!products)
        return `No products Found!`;
    products = await ((products.json()))
    console.log(products)

    storeInLocalStorgae("allProducts", products)

    return products
}

function storeInLocalStorgae(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromLocalStorage(key) {

    return JSON.parse(localStorage.getItem(key))
}

function getProductById(prodId) {
    let products = getFromLocalStorage("allProducts")
    let myProduct = products.filter(prod => {
        return prod.id == prodId;
    })
    return myProduct
}

function addToCartById(productId) {
    let product = getProductById(productId)
    if (getFromLocalStorage("cartProducts")) {
        let cartProducts = JSON.parse(getFromLocalStorage("cartProducts"))
        cartProducts.push(product)
        storeInLocalStorgae("cartProducts", JSON.stringify(cartProducts))

    }
    console.log(JSON.parse(getFromLocalStorage("cartProducts")))

}
// addToCartById()
export { storeInLocalStorgae, addToCartById, getProductById, getFromLocalStorage }