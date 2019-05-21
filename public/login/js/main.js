// document.getElementById("email").classList.add('alert-validate')

// document.getElementById("email").setAttribute("data-validate", "Puzzy")

// document.getElementById("email").classList.remove('alert-validate')



const loginForm = document.querySelector('form');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const emailStr = document.getElementById('emailTextBox').value;
    const passwordStr = document.getElementById('passwordTextBox').value;

    //Reset
    document.getElementById("email").classList.remove('alert-validate');
    document.getElementById("password").classList.remove('alert-validate');
    var check = true;

    if(emailStr == ""){
        document.getElementById("email").classList.add('alert-validate');
        document.getElementById("email").setAttribute("data-validate", "Email is required");
        check = false;
    }else if(!ValidateEmail(emailStr)){
        document.getElementById("email").classList.add('alert-validate');
        document.getElementById("email").setAttribute("data-validate", "Valid email is required");
        check = false;
    }

    if(passwordStr == ""){
        document.getElementById("password").classList.add('alert-validate');
        document.getElementById("password").setAttribute("data-validate", "Password is required");
        check = false;
    }


    if(check){
        var data = {
            email:emailStr,
            password:passwordStr
        };
    
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
        
    }
    
    
})


function ValidateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat)){        
        return true;
    }
    else{
        return false;
    }
}




(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);





