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

async function getProducts() {
    products = await fetch("https://fakestoreapi.com/products")
    if (!products)
        return `No products Found!`;
    products = await ((products.json()))
    console.log(products)
    return products
}

// ================= Cards ===============

async function displayProducts(filterdProducts) {
    let products_section = document.getElementsByClassName("products-section")[0]
    products_section.innerHTML = ""
    let products = filterdProducts


    products.forEach(prod => {
        let product_section = document.createElement("div")
        product_section.innerHTML = `
            <div class="col">
                <div class="card">
                <img src="${prod.image}" class="card-img-top" alt="...">
                <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        </div>
                </div>
                </div>

                `
        products_section.append(product_section)
    })
}

// displayProducts()

/***
 * 
 * click checkbox
 * 
 */


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
        // console.log("index of :", categories.indexOf(prod.category))
        return (categories.indexOf(prod.category) !== -1)

    })
    console.log("filterdProducts: ", filterdProducts)
    displayProducts(filterdProducts)
    return filterdProducts;
}



