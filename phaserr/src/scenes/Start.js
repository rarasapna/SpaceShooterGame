import Phaser from '../lib/phaser.js'

export default class Start extends Phaser.Scene{

    constructor()
	{
		super('start')
        // challenge 2.1 meeting 5
        this.playButton = undefined
        // end of challenge 2.1 meeting 5
    }
    
    preload()
    {
        // challange 1.1 meeting 5
        this.load.image('bg','assets/background_space.jpg')
        this.load.image('player','assets/player_6.png')
        this.load.image('title','assets/title.png')
        this.load.image('start','assets/start-button2.png')
        // end of challenge 1.1 meeting 5

    }

    create()
    {
        this.add.image(240,320,'bg')
        this.add.image(240,300,'title').setScale(0.5)
        this.add.text(150,350,'Created by Mr. Rara')  
        this.add.image(240,220,'player')
        this.playButton = this.add.image(240,450,'start')
        .setInteractive()
        this.playButton.on('pointerdown', ()=> {
         this.scene.start('shooter-space')
        }, this)
    }
}