
// =========== Validation ==========
function validateName(nameIn, errName) {

    let reg = /^[a-z A-Z]{3,}$/

    if (!reg.test(nameIn.value) || nameIn.value.length === 0) {
        errName.style.display = "block"
        return false
    } else {
        errName.style.display = "none"
        return true
    }

}

function validateEmail(emailIn, errEmail) {
    let reg = /^\w{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,3}$/

    if (!reg.test(emailIn.value) || emailIn.value.length == 0) {
        errEmail.style.display = "block"
        return false
    } else {
        errEmail.style.display = "none"
        return true
    }
}

function validatePassword(passIn, errPass) {
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

        errPass.style.display = "block"
        errPass.innerHTML = "please enter valid password, password must contain special charcter, capital characetr, number, small characters & at least 8 characters"
        return false
    } else {
        errPass.style.display = "none"
        return true

    }

}

function validateConfirmPassword(passIn, confirmPassIn, errConf_Pass) {
    if (passIn.value != confirmPassIn.value) {
        errConf_Pass.style.display = "block"
        errConf_Pass.innerText = "Confirm password must be the same as password"
        return false
    } else {
        errConf_Pass.style.display = "none"
        return true
    }
}

export { validateConfirmPassword, validateName, validateEmail, validatePassword }

// khYTE%3das