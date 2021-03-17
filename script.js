
/*let formElement = document.querySelector('form');*/



function say_hi() {
    var username = document.getElementById('username').value;
    var status = document.getElementById('status').value;
    document.getElementById('profile_name').innerHTML = username;
    document.getElementById('profile_status').innerHTML = status;
}
document.getElementById('form_save-button').addEventListener('click', say_hi);