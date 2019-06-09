import Timer from './Timer.js'
import Audio from './Audio.js'
import StatsBar from './StatsBar.js'
import Player from './player.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

const audio = new Audio(document)

//audio.playBGAudio()
const statsBar = new StatsBar(100,100,100)
statsBar.setPlayerName("Maplenix")
statsBar.setPlayerLevel(1)
statsBar.generateBoss(context,50)
statsBar.generatePlayer(context,50,50)

const player = new Player()
player.draw(context) 


const timer = new Timer(1/60);
timer.update = function update(deltaTime){
    player.draw(context) 
    
}

const buttonAttack = document.getElementById('attack')
buttonAttack.addEventListener('click',()=>{
    const bossImg = document.getElementById('bossImg')
    bossImg.style = "margin-left:75px; width:225px ; height: 250px;"
    bossImg.src = "/boss/bossAttack.gif"
    audio.playBGAudio()
})



timer.start()

