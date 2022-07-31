var jwtDecode = require('jwt-decode')

module.exports = function tokenExpired(token) {
    const decoded = jwtDecode(token)

    if(decoded.exp < Date.now()/1000) {
        return true
    }
    else {
        return false
    }
}