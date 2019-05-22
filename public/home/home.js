
function upgradeHP(){
    $.ajax({
        url: "/stats/upgrade",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({type:"HP"}),
        type: "POST",
        success: function(data,status) {  
            location.reload();          
        }      
    });
}

function upgradeINT(){
    $.ajax({
        url: "/stats/upgrade",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({type:"INT"}),
        type: "POST",
        success: function(data,status) {  
            location.reload();          
        }      
    });
}

function upgradeSTR(){
    $.ajax({
        url: "/stats/upgrade",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({type:"STR"}),
        type: "POST",
        success: function(data,status) {  
            location.reload();          
        }      
    });
}


