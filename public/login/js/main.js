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
        document.getElementById('loginButton').innerHTML = '<i class="fas fa-spinner"></i>'
        var data = {
            email:emailStr,
            password:passwordStr
        };
        
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: '/api/users/login', 
            data: JSON.stringify(data),
            dataType: "json",
            success: function(data,status) { 
                location.replace("/home");
            },
            error:function(e){
                document.getElementById('loginButton').innerHTML = 'Login'
                document.getElementById("password").classList.add('alert-validate');
                document.getElementById("password").setAttribute("data-validate", "Wrong Password or Email");
            },        
         });
        
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





