export default class Audio{

    constructor(document){
        this.bgAudio = document.getElementById('bossBGM')
    }

    playBGAudio(){
        this.bgAudio.volume = 0.5
        this.bgAudio.play()
    }

}