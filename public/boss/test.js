export default class statsBar{
    

    constructor(bossMaxHp,playerMaxHp,playerMaxMana){
        this.playerBarX = 0
        this.playerBarY = 300
        this.offset = 175
        this.bossMaxHp = bossMaxHp
        this.playerMaxHp = playerMaxHp
        this.playerMaxMana = playerMaxMana
    }

    setPlayerBarPos(x,y){
        this.playerBarX = x
        this.playerBarY = y
    }
    
    update(context){

    }

    generateBoss(context,bossHP){
        context.fillStyle = "white"
        context.fillRect(this.offset,0,640, 100)

        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`Boss Lv 1     HP ${bossHP}/${this.bossMaxHp} `,this.offset + 20,30)
        
        let bossPercentage = (bossHP/this.bossMaxHp) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,50,600,30)
        context.fillStyle = "#d63737"
        context.fillRect(this.offset + 20,50,bossPercentage,30)
        
    }


    
    generatePlayer(context,playerHP,playerMana){
        context.fillStyle = "white"
        context.fillRect(this.offset,0,640, 100)

        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`Boss Lv 1     HP ${bossHP}/${this.bossMaxHp} `,this.offset + 20,30)
        
        let bossPercentage = (bossHP/this.bossMaxHp) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,50,600,30)
        context.fillStyle = "#d63737"
        context.fillRect(this.offset + 20,50,bossPercentage,30)
        
    }





}