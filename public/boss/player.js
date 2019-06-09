import {loadImage} from './loadImage.js'

export default class Player{
    constructor(){
        this.playerImage = new Image()
        this.x = 475
        this.y = 250
        loadImage('/boss/hero.png').then(image =>{
            this.playerImage = image
            
        })
    }

    setPos(x,y){
        this.x = x
        this.y = y    
    }

    draw(context){
        context.drawImage(this.playerImage,this.x ,this.y,40,40)
    }
}