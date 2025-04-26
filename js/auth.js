function getUsers() {
    let data = localStorage.getItem("users")
    return data ? JSON.parse(data) : []
}
function getUserByEmail(email) {
    let myUser = getUsers().find(user => {
        let res = user.email == email
        return res
    })
    return myUser ? myUser : {}
}

function addUserAccount(nameIn, emailIn, passIn) {

    let name = nameIn.value;
    let email = emailIn.value;
    let password = passIn.value;

    let usersObj = { "name": name, "email": email, "password": password }

    let users = getUsers()
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

function logout() {
    localStorage.setItem("cartProducts", [])
    location.replace("../html/login.html")
}


export { getUsers, getUserByEmail, logout, addUserAccount, isUserExists }