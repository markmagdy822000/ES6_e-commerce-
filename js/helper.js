export async function getProducts() {
    let products = await fetch("https://fakestoreapi.com/products")
    if (!products)
        return `No products Found!`;
    products = await ((products.json()))
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
    let product = getProductById(productId)[0]
    let cartProducts = getFromLocalStorage("cartProducts") || []
    let exists = false;
    cartProducts.map(prod => {
        if (prod.id === product.id) {
            prod.number_in_cart += 1
            exists = true
        }
    })

    exists ? "" : cartProducts.push(product);

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
// addToCartById()
export { storeInLocalStorage, getCartProducts, addToCartById, getProductById, getFromLocalStorage }