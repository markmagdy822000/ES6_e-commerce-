import { isUserExists } from "./auth.js"

let login_form = document.getElementById("login-form")
console.log(login_form)
let inputs = login_form.getElementsByTagName("input")
let emailIn = inputs[0]
let passIn = inputs[1]

let errrLogin = login_form.getElementsByClassName("error-login")[0]

login_form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("inside login form")
    if (isUserExists(emailIn.value, passIn.value))
        location.assign("./home.html")
    else
        errrLogin.style.display = 'block'
})
