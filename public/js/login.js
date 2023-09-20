const loginForm = document.getElementById('login-form');
const signUpForm = document.getElementById('signup-form')
const signUpBtn = document.getElementById('sign-up-btn');
const loginBtn = document.getElementById('login-btn');
const signUpDiv = document.getElementById('signup-div');
const loginDiv = document.getElementById('login-div');

//This logs the user in
async function login(event){
    event.preventDefault();
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;
    if(loginUsername && loginPassword) {
        const loginResponse = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username: loginUsername, password: loginPassword}),
            headers: { 'Content-Type': 'application/json'}
        });
        if(loginResponse.ok){
            document.location.replace('/dashboard');
        } else {
            document.getElementById('password-warning').style.color = 'red';
           document.getElementById('password-warning').textContent = "Wrong Username or Password! Please try again.";
        }
    }
};

//This creates a new user
async function signUp(event){
    event.preventDefault();
    const newUsername = document.getElementById('signup-username').value;
    const newPassword = document.getElementById('signup-password').value;
    const confirmedPassword = document.getElementById('confirm-password').value;
    const passwordWarning = document.getElementById('signup-password-warning');

   if(newPassword !== confirmedPassword){
        passwordWarning.textContent = "Passwords must be matching!"
        return;
   }

   if(newPassword.length < 8) {
        passwordWarning.textContent = "Password must be longer than 8 characters"
        return;
   }

   if(newPassword === confirmedPassword){
        const signUpResponse = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username: newUsername, password: newPassword}),
            headers: { 'Content-Type': 'application/json'}
        });
        if(signUpResponse.ok){
            document.location.replace('/dashboard');
        } else {
            alert('Oops, something went wrong. Please try again');
        }
   }

}
//This shows/hides the forms on the login page
function changeForm(hide, show) {
    hide.style.display = 'none'
    show.style.display = 'block'
}

//This checks to see if passwords match when signing up. 
function check() {
    const signupPassword = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmedPasswordWarning = document.getElementById('confirm-password-warning');
    if(signupPassword === confirmPassword) {
        confirmedPasswordWarning.style.color = 'green';
        confirmedPasswordWarning.textContent = 'Matching passwords';
    } else {
        confirmedPasswordWarning.style.color = 'red';
        confirmedPasswordWarning.textContent = 'Passwords do not match';
    }
}



signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    changeForm(loginDiv, signUpDiv)
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    changeForm(signUpDiv, loginDiv)
})

loginForm.addEventListener('submit', login)

signUpForm.addEventListener('submit', signUp)
