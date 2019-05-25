
// document.getElementById("email").classList.add('alert-validate')

// document.getElementById("email").setAttribute("data-validate", "Puzzy")

// document.getElementById("email").classList.remove('alert-validate')



const loginForm = document.querySelector('form');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();


    const usernameStr = document.getElementById('usernameTextBox').value;
    const emailStr = document.getElementById('emailTextBox').value;
    const passwordStr = document.getElementById('passwordTextBox').value;
    const cPasswordStr = document.getElementById('cPasswordTextBox').value;

    var check = true;


    document.getElementById("username").classList.remove('alert-validate');
    document.getElementById("email").classList.remove('alert-validate');
    document.getElementById("password").classList.remove('alert-validate');
    document.getElementById("cPassword").classList.remove('alert-validate');

    if(usernameStr == ""){
        document.getElementById("username").classList.add('alert-validate');
        document.getElementById("username").setAttribute("data-validate", "Username is required");
        check = false;
    }

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

    if(cPasswordStr == ""){
        document.getElementById("cPassword").classList.add('alert-validate');
        document.getElementById("cPassword").setAttribute("data-validate", "Password is required");
        check = false;
    }else if(passwordStr != cPasswordStr){
        document.getElementById("cPassword").classList.add('alert-validate');
        document.getElementById("cPassword").setAttribute("data-validate", "Password not match");
        check = false;
    }

    if(check){
        var data = {
            username:usernameStr,
            email:emailStr,
            password:passwordStr
        };

        sendRegister(data);
    }

})

function sendRegister(data){

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: '/api/users/register', 
        data: JSON.stringify(data),
        dataType: "json",
        success: function(data,status) { 
            location.replace("/login");
        },
        error:function(e){
           console.log("Register Fail");
        },        
     });
}


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


