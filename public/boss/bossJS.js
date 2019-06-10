import Timer from './Timer.js'
import Audio from './Audio.js'
import StatsBar from './StatsBar.js'
import Player from './player.js'
import Weapon from './Weapon.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

const audio = new Audio(document)

//audio.playBGAudio()

let weaponVisible = false
let attackString = ""

const username = document.getElementById("username").innerHTML
const playerLevel = document.getElementById("playerLevel").innerHTML
const playerHP = document.getElementById("playerHpLevel").innerHTML
const playerInt = document.getElementById("playerIntLevel").innerHTML
const playerStr = document.getElementById("playerStrLevel").innerHTML
const playerSkillLevel = document.getElementById("playerSkillLevel").innerHTML
const bossLevel = document.getElementById("bossLevel").innerHTML

const player = new Player()
const weapon = new Weapon()
const statsBar = new StatsBar(bossLevel,playerHP,playerInt)

statsBar.setPlayerName(username)
statsBar.setPlayerLevel(playerLevel)
statsBar.setPlayerHp(playerHP*100)
statsBar.setPlayerMana(playerInt*100)
statsBar.setPlayerStr(playerStr*100)



let isGameEnd = false


drawAll()
context.fillStyle = "white"
context.fillText('Press ENTER to Start',325,250)

const timer = new Timer(1/60);

let isPlaying = false;

timer.update = function update(deltaTime){

    if(!isPlaying){
        isPlaying = true
        runAnimation()
    }
    
    if(!isGameEnd){
        drawAll()
    }
    
}

async function runAnimation(){
    await delay(300)
    setBossAttackAnimation()
    await delay(400)
    runPlayerGetAttackAnimation()
    await delay(100)
    playerGetDamage()    
    await delay(300)
    playerGetDamage()
    await delay(300)
    playerGetDamage()
    await delay(300)
    playerGetDamage()
    await delay(500)
    setBossNormalAnimation()
    if(isGameEnd){
        gameEnd('boss')
    }else{
        await delay(800)
        setAttackString()
        weaponVisible = true
        await delay(500)
        playWeaponAnimation()
        await delay(500)
        if(isGameEnd){
            gameEnd('player')
        }else{
            isPlaying = false;
        }
    }
      
}


function setAttackString(){
    let manaCost = Math.pow(playerSkillLevel,2)
    if(statsBar.playerMana - manaCost > 0 ){
        attackString = "Magic Pan Attack!"
    }else{
        attackString = "Normal Pan Attack!"
    }
}

async function playWeaponAnimation(){
    for(let y=1 ; y < 10 ; y ++){
        await delay(30)
        weapon.y -= y*10
    }
    bossGetDamage()
    await delay(300)
    weaponVisible = false
    weapon.y = 250
}

function bossGetDamage(){
    let damage = (playerStr*100) 

    let manaCost = Math.pow(playerSkillLevel,2)
    if(statsBar.playerMana - manaCost > 0 ){
        damage += Math.pow(playerSkillLevel,3)
        statsBar.setPlayerMana(statsBar.playerMana - manaCost)
    }


    if( statsBar.bossHP - damage > 0 ){
        statsBar.setBossHp(statsBar.bossHP -= damage)
    }else{
        isGameEnd = true
        statsBar.bossHP= 0
        weapon.weaponVisible = false
        drawAll()
    }
}   

function playerGetDamage(){
    if( statsBar.playerHP-(statsBar.bossAttackDamange/4) > 0 ){
        statsBar.setPlayerHp(statsBar.playerHP -= statsBar.bossAttackDamange/4)
    }else{
        isGameEnd = true
        statsBar.playerHP= 0
    }
}



async function runPlayerGetAttackAnimation(){
    for(let y=1 ; y < 4 ; y ++){
        await delay(30)
        player.y += y*5
    }
    await delay(200)
    for(let y=1 ; y < 5 ; y ++){
        await delay(20)
        player.y -= y*18
    }
    await delay(200)
    for(let y=1 ; y < 5 ; y ++){
        await delay(20)
        player.y += y*18
    }
    await delay(200)
    for(let x=1 ; x < 5 ; x ++){
        await delay(20)
        player.x += x*20
    }

    await delay(500)
    for(let x=1 ; x < 5 ; x ++){
        player.x -= x*20
    }
    for(let y=1 ; y < 4 ; y ++){
        player.y -= y*5
    }
}

function drawAll(){
    context.fillStyle = "black"
    context.fillRect(0,0,canvas.width-10,canvas.height)
    statsBar.update(context)
    player.draw(context) 
    if(weaponVisible){
        weapon.draw(context)
        context.fillStyle = "white"
        context.font = "30px monospace";
        context.fillText(attackString,550,275)
    }

    
}

let started = false;

window.onkeydown = (e)=>{
    if(e.keyCode == 13 && started==false){
        started = true
        timer.start()    
        audio.playBGAudio()
    }
    
}


function setBossAttackAnimation(){
    const bossImg = document.getElementById('bossImg')
    bossImg.style = "margin-left:70px; padding-top: 5px; width:220px ; height: 250px;"
    bossImg.src = "/boss/bossAttack.gif"
}

function setBossNormalAnimation(){
    const bossImg = document.getElementById('bossImg')
    bossImg.style = "width:150px ; height: 250px;"
    bossImg.src = "/boss/boss.gif"
}

function delay(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, time);
    });
  }

function gameEnd(whoWin){
    drawAll()
    if(whoWin == 'boss'){
        context.fillStyle = "white"
        context.font = "50px monospace";
        context.fillText('DEFEAT',415,200)
    }else{
        context.fillStyle = "white"
        context.font = "50px monospace";
        context.fillText('VICTORY',410,200)

        $.ajax({
            type: "PATCH",
            contentType: "application/json",
            url: '/api/users/bossLevel', 
            data: JSON.stringify(),
            dataType: "json",
            success: function(data,status) { 
                
            },
            error:function(e){
               Swal.fire({
                type: 'error',
                title: 'Please Try Again',
              })
            },        
          });
    }
}




