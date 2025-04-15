// catch elements
let reg_form = document.getElementById("register-form")

let inputs = reg_form.getElementsByTagName("input")
let nameIn = inputs[0]
let emailIn = inputs[1]
let passIn = inputs[2]
let confirmPassIn = inputs[3]

let errors = reg_form.querySelectorAll("[class|='error']")
let errName = errors[0]
let errEmail = errors[1]
let errPass = errors[2]
let errConf_Pass = errors[3]




// validation
nameIn.addEventListener("input", () => {
    let reg = /^[a-z A-Z]{3,}$/
    console.log("from name")
    console.log(nameIn.value)
    if (!reg.test(nameIn.value)) {
        errName.style.display = "block"
    } else {
        errName.style.display = "none"
    }
})

emailIn.addEventListener("input", () => {
    let reg = /^\w{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,3}$/
    console.log(emailIn.value)
    if (!reg.test(emailIn.value)) {
        errEmail.style.display = "block"
    } else {
        errEmail.style.display = "none"
    }
})

passIn.addEventListener("input", () => {

    let reg = /[\w]/
    let special_reg = /[!@#$%^&*()_-]/
    let reg_capital = /[A-Z]/
    let reg_small = /[a-z]/
    let reg_num = /[0-9]/
    if (
        !reg.test(passIn.value) ||
        !special_reg.test(passIn.value) ||
        !reg_capital.test(passIn.value) ||
        !reg_small.test(passIn.value) ||
        !reg_num.test(passIn.value) ||
        passIn.value.length < 8) {
        console.log("for pass")
        errPass.style.display = "block"
        errPass.innerHTML = "please enter valid password, password must contain special charcter, capital characetr, number, small characters & at least 8 characters"
    } else {
        errPass.style.display = "none"

    }

    // if (passIn.value.length < 8) {
    //     console.log("for pass")
    //     errPass.style.display = "block"
    //     errPass.innerHTML = "password must be at least 8 characters "
    // }
    // if (passIn.value.length > 16) {
    //     errPass.style.display = "block"
    //     errPass.innerHTML = "password can not be more than 16 characters "
    // }
    // let special_reg = /^*[!@#$%^&*()_-]/
    // if (!special_reg.test(passIn.value)) {
    //     errPass.style.display = "block"
    //     errPass.innerHTML = "password must contains special character "
    // }

})

confirmPassIn.addEventListener("input", () => {

    if (passIn.value != confirmPassIn.value) {
        errConf_Pass.style.display = "block"
        errConf_Pass.innerText = "Confirm password must be the same as password"
    } else {
        errConf_Pass.style.display = "none"
    }
})

