import {loadImage} from './loadImage.js'

export default class Weapon{
    constructor(){
        this.playerImage = new Image()
        this.x = 400
        this.y = 250
        loadImage('/boss/weapon.png').then(image =>{
            this.playerImage = image
            
        })
    }

    setPos(x,y){
        this.x = x
        this.y = y    
    }

    draw(context){
        context.drawImage(this.playerImage,this.x ,this.y,50,50)
    }
}