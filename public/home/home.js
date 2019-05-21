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
        updateStats(data);
    },
    error:function(data){
        location.replace("/login")
    },
    
});


function updateStats(data){
    $("#username").html(data.username);

    //LEVEL
    $("#cardLevel").html(data.stats.level);
    $("#myBar").css("width", getExpBar(data));
    $("#cardEXP").html("EXP: " + data.stats.exp + "/" + data.stats.maxExp);

    //Upgrade 
    $("#cardUpgradePoint").html("Point: " + data.stats.point);

    //HP
    $("#hpLevel").html("Level: " + data.stats.hp);
    $("#hp").html("HP: " + data.stats.hp * 100);
    //INT
    $("#intLevel").html("Level: " + data.stats.int);
    $("#mana").html("MANA: " + data.stats.int * 100);
    //STR
    $("#strLevel").html("Level: " + data.stats.str);
    $("#atk").html("ATK: " + data.stats.str * 100);

    //Quest 
    setQuestCount();
    $("#questsCompleted").html("QUESTS COMPLETED: " + data.stats.questsCompleted);

    //Skill   
    setSkillLearn();
    $("#totalHours").html("Total Hours: " + data.stats.skillHours);

    //GOLD
    $("#gold").html(data.stats.gold);
    $("#goldTotal").html("Total Earned: " + data.stats.goldTotal);
}

function getExpBar(data){
    const result = (data.stats.exp / data.stats.maxExp) * 100
    return result + "%"
}

function upgradeHP(){
    $.ajax({
        url: "/stats/upgrade",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({type:"HP"}),
        type: "POST",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+token);},
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
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+token);},
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
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+token);},
        success: function(data,status) {  
            location.reload();          
        }      
    });
}

function setQuestCount(){
    $.ajax({
        url: "/quests",
        data: null,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+token);},
        success: function(data,status) { 

            $("#questCount").html(data.length);     
        }      
    });
}

function setSkillLearn(){

}