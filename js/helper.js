
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
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function getProductById(prodId) {
    let products = getFromLocalStorage("allProducts")
    let myProduct = products.filter(prod => {
        return prod.id == prodId;
    })
    return myProduct
}

function addToCartById(productId) {
    let product = getProductById(productId)[0]
    let cartProducts = getFromLocalStorage("cartProducts") || []
    cartProducts.push(product)
    storeInLocalStorgae("cartProducts", cartProducts)
    console.log(getFromLocalStorage("cartProducts"))

}
// addToCartById()
export { storeInLocalStorgae, addToCartById, getProductById, getFromLocalStorage }