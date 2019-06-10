export default class statsBar{
    

    constructor(bossLevel,playerHPLevel,playerIntLevel){
        this.playerBarX = 0
        this.playerBarY = 330
        this.offset = 175
        this.bossLevel = bossLevel
        this.bossAttackDamange =  Math.pow(parseInt(bossLevel)*20,1.05).toFixed(0) 
        this.bossHP = Math.pow(parseInt(bossLevel)*2000,1.05).toFixed(0) 
        this.bossMaxHp = Math.pow(parseInt(bossLevel)*2000,1.05).toFixed(0) 
        this.playerMaxHp = parseInt(playerHPLevel)*100
        this.playerMaxMana = parseInt(playerIntLevel)*100
    }

    setPlayerBarPos(x,y){
        this.playerBarX = x
        this.playerBarY = y
    }

    setBossHp(hp){
        this.bossHP = hp
    }

    setPlayerName(name){
        this.playerName = name
    }

    setPlayerLevel(lv){
        this.playerLevel = lv
    }

    setPlayerHp(hp){
        this.playerHP = parseInt(hp)
    }

    setPlayerMana(mana){
        this.playerMana = parseInt(mana)
    }

    setPlayerStr(str){
        this.playerStr = parseInt(str)
    }
    
    update(context){
        this.drawPlayerStats(context)
        this.drawBossStats(context)
    }

    drawBossStats(context){
        context.fillStyle = "white"
        context.fillRect(this.offset,0,640, 100)

        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`Boss LV ${this.bossLevel}     HP ${this.bossHP}/${this.bossMaxHp} `,this.offset + 20,30)
        
        let bossPercentage = (this.bossHP/this.bossMaxHp) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,50,600,30)
        context.fillStyle = "#d63737"
        context.fillRect(this.offset + 20,50,bossPercentage,30)
        
    }


    
    drawPlayerStats(context){
        //HP
        context.fillStyle = "white"
        context.fillRect(this.offset,this.playerBarY,640, 250)

        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`${this.playerName}  LV ${this.playerLevel}`,this.offset + 20, this.playerBarY + 30)
        context.fillText(`HP ${this.playerHP}/${this.playerMaxHp} `,this.offset + 20, this.playerBarY + 80)
        
        let playerHPercentage = (this.playerHP/this.playerMaxHp) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,this.playerBarY + 90,600,30)
        context.fillStyle = "#d63737"
        context.fillRect(this.offset + 20, this.playerBarY + 90,playerHPercentage,30)


        //Mana
        context.fillStyle = "black"
        context.font = "30px monospace";
        context.fillText(`MANA ${this.playerMana}/${this.playerMaxMana} `,this.offset + 20, this.playerBarY + 170)
        
        let playerManaPercentage = (this.playerMana/this.playerMaxMana) * 600

        context.fillStyle = "black"
        context.fillRect(this.offset + 20,this.playerBarY + 190,600,30)
        context.fillStyle = "#4286f4"
        context.fillRect(this.offset + 20, this.playerBarY + 190,playerManaPercentage,30)
        
    }





}