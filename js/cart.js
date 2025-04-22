import { addToCartById, getCartProducts, removeFromCartById } from "../js/helper.js"
let cart_container = document.querySelector('.cart-container');

function buildCartProducts() {


    let cart_products = getCartProducts()
    cart_products.forEach(cart_product => {
        let cart_product_section = document.createElement("div")
        // console.log(cart_product_section)
        // console.log(cart_products)

        console.log(cart_product.title)
        cart_product_section.innerHTML = `
     <div id="${cart_product.id}" class="d-flex mt-5 ms-5  align-items-center  w-50 cart-product">

            <div class=" col-6 d-flex align-items-center ">
                <span class="ms-4 name  ">${cart_product.title} </span>
                <span class="m-4 price ">${cart_product.price * cart_product.number_in_cart} </span>
                
            </div>
            <div class="col-6 d-flex flex-row-reverse  align-items-center ">
                <span class="me-4 plus-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg> </span>
                <span class="count">${cart_product.number_in_cart}</span>
                <span class="minus-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="11" width="16" height="2" fill="currentColor"/>
</svg> </span>
            </div>
        </div>
    `


        cart_container.append(cart_product_section);
    });
}
buildCartProducts()
function addPlusFunctioanlity() {
    let plus_btns = document.querySelectorAll(".plus-icon")
    plus_btns.forEach(plus_btn => {

        // console.log("plus_btn:", plus_btn)
        plus_btn.addEventListener("click", (e) => {
            console.log(e.target)
            console.log(e.target.closest(".cart-product"))
            console.log(e.target.closest(".cart-product").id)
            addToCartById(e.target.closest(".cart-product").id)
            // buildCartProducts()
        })
    });
}
addPlusFunctioanlity()

function addMinusFunctioanlity() {
    let minus_btns = document.querySelectorAll(".minus-icon")

    minus_btns.forEach(plus_btn => {

        // console.log("plus_btn:", plus_btn)
        plus_btn.addEventListener("click", (e) => {

            console.log(e.target)
            console.log(e.target.closest(".cart-product"))
            console.log(e.target.closest(".cart-product").id)
            removeFromCartById(e.target.closest(".cart-product").id)

        })
    });
}
addMinusFunctioanlity()