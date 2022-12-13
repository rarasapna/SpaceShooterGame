import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene{
    constructor()
	{
        super('game-over')
        this.replay=undefined
    }

    preload()
    {
        this.load.image('background','assets/background_space.jpg')
        this.load.image('gameover','assets/gameover.png')
        this.load.image('replay','assets/replay_button1.png')
    }
    
    create(){
       this.add.image(240,320,'background')
       this.add.image(240,300,'gameover').setScale(0.5)
       this.replay = this.add.image(240,400,'replay')
       .setScale(0.2)
       .setInteractive()
       this.replay.on('pointerdown', ()=> {
        this.scene.start('shooter-space')
       }, this)

    }
}