export default class statsBar{
    

    constructor(bossMaxHp,playerMaxHp,playerMaxMana){
        this.playerBarX = 0
        this.playerBarY = 330
        this.offset = 175
        this.bossMaxHp = bossMaxHp
        this.playerMaxHp = playerMaxHp
        this.playerMaxMana = playerMaxMana
    }

    setPlayerBarPos(x,y){
        this.playerBarX = x
        this.playerBarY = y
    }

    setPlayerName(name){
        this.playerName = name
    }

    setPlayerLevel(lv){
        this.playerLevel = lv
    }
    
    update(context){

    }

    generateBoss(context,bossHP){
        context.fillStyle = "white"
        context.fillRect(this.offset,0,640, 100)

        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`Boss LV 1     HP ${bossHP}/${this.bossMaxHp} `,this.offset + 20,30)
        
        let bossPercentage = (bossHP/this.bossMaxHp) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,50,600,30)
        context.fillStyle = "#d63737"
        context.fillRect(this.offset + 20,50,bossPercentage,30)
        
    }


    
    generatePlayer(context,playerHP,playerMana){
        //HP
        context.fillStyle = "white"
        context.fillRect(this.offset,this.playerBarY,640, 250)

        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`${this.playerName}  LV ${this.playerLevel}`,this.offset + 20, this.playerBarY + 30)
        context.fillText(`HP ${playerHP}/${this.playerMaxHp} `,this.offset + 20, this.playerBarY + 80)
        
        let playerHPercentage = (playerHP/this.playerMaxHp) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,this.playerBarY + 90,600,30)
        context.fillStyle = "#d63737"
        context.fillRect(this.offset + 20, this.playerBarY + 90,playerHPercentage,30)


        //Mana
        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`MANA ${playerMana}/${this.playerMaxMana} `,this.offset + 20, this.playerBarY + 170)
        
        let playerManaPercentage = (playerMana/this.playerMaxMana) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,this.playerBarY + 190,600,30)
        context.fillStyle = "#4286f4"
        context.fillRect(this.offset + 20, this.playerBarY + 190,playerManaPercentage,30)
        
    }





}