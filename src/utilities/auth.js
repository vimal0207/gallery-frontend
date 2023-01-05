import keys from './keys'

var get_token = function() {
    return localStorage.getItem(keys.TOKEN)
}

var set_token = function(data){
    let token = data[keys.TOKEN]
    localStorage.setItem(keys.TOKEN, token)
}

var delete_token = function(){
    localStorage.removeItem(keys.TOKEN)
}

const AuthHelper = {
    get_token : get_token,
    set_token : set_token,
    delete_token : delete_token
}
export default AuthHelper