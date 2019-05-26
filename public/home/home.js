function upgradeStats(upgradeType){
    
    $.ajax({
        url: "/api/stats/upgrade",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({type:upgradeType}),
        type: "POST",
        success: function(data,status) {  
            location.reload();          
        }      
    });
}



