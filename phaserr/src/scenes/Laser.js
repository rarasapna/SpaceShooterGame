import Phaser from '../lib/phaser.js'

export default class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super (scene,x,y,texture)
        // explore 2 meeting 2
        this.setScale(1)
        // end explore 2 meeting 2

    }

    fire (x,y){
        this.setPosition(x,y-60)
        this.setActive(true)
        this.setVisible(true)
        
    }

    die(){
       this.destroy()
    }

    update(time){
        //explore 3 meeting 2
        this.setVelocityY(-100)
        //end explore 3 meeting 2
        if(this.y<-10) {
            this.die()
        }
       
    }
}