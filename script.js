
function change_name () {
    let username = document.getElementById('username').value;
    let status = document.getElementById('status').value;
    let name = document.getElementById('profile_name');
    let job = document.getElementById('profile_status')
    name.innerHTML = username;
    job.innerHTML = status;
}
document.getElementById('form_save-button').addEventListener('click', change_name);