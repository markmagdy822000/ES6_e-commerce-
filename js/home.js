
import { build_navbar } from "./build_components.js";
import { addToCartById, getProducts } from "../js/helper.js";

// =========================build_navbar==============

// build_navbar()

/* ============= Carousel ============= */
const next_btn = document.querySelector(".carousel-control-next");
const prev_btn = document.querySelector(".carousel-control-prev");
const carousel_inner = document.querySelector(".carousel-inner");
const items = Array.from(document.querySelectorAll(".carousel-item"));
let index = 0;

items.forEach(item => {
    item.classList.add("active");
})

function updateItem(direction) {
    let prevIndex = index;
    if (direction === "next") {
        index = (index + 1) % items.length;
        items[prevIndex].style.animation = `1s center_left forwards`;
        items[index].style.animation = `1s right_center  forwards`;
    } else {
        index = (index - 1 + items.length) % items.length;
        items[prevIndex].style.animation = `1s  center_right forwards`;
        items[index].style.animation = `1s left_center  forwards`;
    }

}

next_btn.addEventListener("click", () => updateItem("next"));
prev_btn.addEventListener("click", () => updateItem("prev"));

/* ============= Products ============= */



// ================= Cards ===============

async function displayProducts(filterdProducts) {
    let products_section = document.getElementsByClassName("products-section")[0]
    products_section.innerHTML = ""
    let products = filterdProducts


    products.forEach(prod => {
        let product_section = document.createElement("div")
        product_section.innerHTML = `
            <div class="col">
                <div class="card" id="${prod.id}">
                    <img src="${prod.image}"  class="card-img-top" alt="">
                    <div class="card-body">
                        <div class="text-card">
                            <h5 class="truncate card-title">${prod.title}</h5>
                            <span>rating: ${prod.rating.rate}</span><br>
                            <span>views: ${prod.rating.count}</span>
                        </div>
                        <button class="add-btn"> <img src="../images/add.jpeg" class="w-25"> </button>
                    </div>
                </div>
            </div>
        `


        product_section.querySelector(".add-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            addToCartById(prod.id)
        })
        products_section.append(product_section);

    })
}
let listGp = document.querySelectorAll(".list-group input[type='checkbox']");
listGp.forEach((input) => {
    input.addEventListener("change", handleCheckBoxChange)


})

function handleCheckBoxChange() {
    let checkedBoxes = document.querySelectorAll(".list-group input[type='checkbox']:checked");
    let categories = []
    checkedBoxes.forEach(checkedBox => {
        categories.push(checkedBox.value)
    })
    filterProducts(categories)
}

async function filterProducts(categories) {
    let allProducts = await getProducts();

    let filterdProducts = allProducts.filter((prod) => {

        return (categories.indexOf(prod.category) !== -1)

    })
    console.log("filterdProducts: ", filterdProducts)
    displayProducts(filterdProducts)
    return filterdProducts;
}

async function intialdisplay() {
    let proucts = await getProducts()
    displayProducts(proucts)
}


document.addEventListener("DOMContentLoaded", () => {
    const products_section = document.querySelector(".products-section");

    products_section.addEventListener("click", (e) => {
        const clickedCard = e.target.closest(".card");




        if (clickedCard) {
            localStorage.setItem("prodId", clickedCard.id);
            location.assign("../html/details.html");
        }


    });


    // const add_btns = document.querySelectorAll(".add-btn");
    // add_btns.forEach((add_btn) => {
    //     add_btn.addEventListener("click", (e) => {
    //         e.stopPropagation();
    //         const card = add_btn.closest(".card");
    //         const prodId = card.id;
    //         addToCartById(prodId);
    //         console.log("Product added to cart:", add_btn);
    //         console.log("prodId:", prodId);
    //     })
    // })
});

intialdisplay()