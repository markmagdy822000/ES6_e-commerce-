
import { build_navbar, goToCart, applyNavbarFunc } from "./build_components.js";
import { addToCartById, getFromLocalStorage, getProducts } from "../js/helper.js";

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
                    <img src="${prod.images[0]}"  class="card-img-top" alt="">
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

// ================ Filter ===========
function buildFilter() {
    let allProducts = getFromLocalStorage("allProducts")
    let allCategories = [];
    allProducts.forEach(prod => {
        allCategories.push(prod.category)
    })
    allCategories = [...new Set(allCategories)]
    let list_group = document.querySelector(".list-group")
    allCategories.forEach(cat => {
        let item = document.createElement("div")
        item.innerHTML = `<li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" checked value="${cat}" id="${cat}">
            <label class="form-check-label" for="${cat}">${cat}</label>
        </li>`
        list_group.append(item)
    })
}
buildFilter()

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
    console.log("from filter: ", categories)

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

});

intialdisplay()
applyNavbarFunc()