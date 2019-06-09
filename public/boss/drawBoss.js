import {loadImage} from './loadImage.js'

export function drawBoss(context){

    loadImage('/boss/boss.png').then(image =>{
        context.drawImage(image,300,50,200,300)
    })
}