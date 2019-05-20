// document.getElementById("email").classList.add('alert-validate')

// document.getElementById("email").setAttribute("data-validate", "Puzzy")

// document.getElementById("email").classList.remove('alert-validate')



const loginForm = document.querySelector('form');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const emailStr = document.getElementById('emailTextBox').value;
    const password = document.getElementById('passwordTextBox').value;

    var data = {
        email:emailStr,
        password:password};

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           let data = JSON.parse(this.response);
           localStorage.setItem('authToken',data.token);
           location.replace("/home");
        }
    };
    xhttp.open("POST", "/users/login", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    //xhttp.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UyNTlhN2ZhNTc5MTM5NTRkZmFlYjAiLCJpYXQiOjE1NTgzMzc5NTl9.kYIhTliXvqqPAIIZssAhIOPJKaK6vhr_0lnyFyvNs4I')
    
    xhttp.send(JSON.stringify(data));
    
    
})



