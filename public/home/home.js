
let token = localStorage.getItem('authToken')

if(!token){
    location.replace("/login")
}

$.ajax({
    url: "/users/me",
    data: null,
    type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+token);},
    success: function(data,status) { 
        $("#username").html(data.username);
    }
});
