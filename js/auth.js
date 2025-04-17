function getUsers() {
    let data = localStorage.getItem("users")
    return data ? JSON.parse(data) : []
}

function addUserAccount(nameIn, emailIn, passIn) {

    let name = nameIn.value;
    let email = emailIn.value;
    let password = passIn.value;

    let usersObj = { "name": name, "email": email, "password": password }

    let users = getUsers()
    // if (isUserExists(email, password)) {
    //     document.getElementsByClassName("error-register")[0].innerText = "user already exists"
    //     document.getElementById("submit").setAttribute("onclick", `${(event) => event.target.preventDefault()}`)
    //     console.log("user Exists")
    // }
    users.push(usersObj)


    localStorage.setItem("users", JSON.stringify(users))

}

function isUserExists(email, password) {
    let users = getUsers()
    let userExists = users.find((user) => {
        return user.email === email && user.password === password
    })
    return userExists !== undefined
}
export { getUsers, addUserAccount, isUserExists }