import Phaser from '../lib/phaser.js'
import Laser from './Laser.js'
import Enemy from './Enemy.js'

var score
var life

export default class Game extends Phaser.Scene{
    constructor(){
      super('shooter-space')
    }
    init(){
        this.player = undefined
        this.lasers = undefined
        this.enemies = undefined
        this.repairs = undefined
        this.scoreText = undefined
        this.lifeText = undefined
        this.backsound = undefined
        this.nav_left = false
        this.nav_right = false
        this.shoot = false
    }
    preload(){
        this.load.image('bg','assets/background_space.jpg')
        this.load.image('player','assets/player_1.png')
        this.load.image('leftBtn','assets/button_left3.png')
        this.load.image('rightBtn','assets/button_right3.png')
        this.load.image('shootBtn','assets/shoot_button3.png')
        this.load.image('enemy','assets/enemy_alien_3.png')
        this.load.image('laser','assets/player_laser.png')
        this.load.image('repair','assets/repair_3.png')
        this.load.audio('backsound','assets/backsound.ogg')
        this.load.audio('laser_sfx','assets/laser_sfx.ogg')
        this.load.audio('repair_sfx','assets/repair_sfx.mp3')
        this.load.audio('destroy_sfx','assets/destroy_sfx.mp3')
        this.load.audio('gameover_sfx','assets/gameover_sfx.wav')
    }
    create(){
        this.add.image(240,310,'bg')
        this.player = this.physics.add.sprite(240,450,'player')
        let shoot = this.add.image(430,550,'shootBtn')
        .setInteractive().setDepth(1)
        let nav_left = this.add.image(50,550,'leftBtn')
        .setInteractive().setDepth(1)
        let nav_right = this.add.image(150,550,'rightBtn')
        .setInteractive().setDepth(1)
        this.add.text(250,0,'Created by Ms. Rara')
        nav_left.on('pointerdown', () => {this.nav_left = true }, this)
        nav_left.on('pointerout', () => {this.nav_left = false }, this)
        nav_right.on('pointerdown', () => {this.nav_right = true }, this)
        nav_right.on('pointerout', () => {this.nav_right = false }, this)
        shoot.on('pointerdown', () => {this.shoot = true }, this)
        shoot.on('pointerout', () => {this.shoot = false }, this)
        this.lasers = this.physics.add.group({
          classType:Laser,
          maxSize:1,
          runChildUpdate:true
        })
    
        this.enemies = this.physics.add.group({
          classType:Enemy,
          maxSize:6,
          runChildUpdate:true
        })
        
        this.time.addEvent({
          delay:3000,
          callback: this.spawnEnemy,
          callbackScope: this,
          loop: true
        })
       
        this.repairs = this.physics.add.group({
          classType:Enemy,
          maxSize:1,
          runChildUpdate:true
        })
       
        this.time.addEvent({
          delay:8000,
          callback: this.spawnRepair,
          callbackScope: this,
          loop: true
        })
        
        score = 0
        this.scoreText = this.add.text(10,10, 'Score : 0')
        this.physics.add.overlap(
          this.lasers,
          this.enemies,
          this.hitEnemy,
          null,
          this
        )
       
        this.physics.add.overlap(
          this.player,
          this.enemies,
          this.gameOver,
          null,
          this
        )
        
        life = 3
        this.lifeText = this.add.text(10,30, 'Life : 3')
        this.physics.add.overlap(
          this.player,
          this.repairs,
          this.increaseLife,
          null,
          this
        )
        
        this.backsound = this.sound.add('backsound')
        var soundConfig={
          loop:true,
          volume: 0.5,
        }
        this.backsound.play(soundConfig)

    }
    update(){
      if (this.nav_right){
        this.player.setVelocityX(100)
      } else if (this.nav_left) {
        this.player.setVelocityX(-100)
      } else {
        this.player.setVelocityX(0)
      }
      if(this.shoot) {
        const laser = this.lasers.get(0,0,'laser')
        if(laser) {
            laser.fire(this.player.x, this.player.y)
        }
      }
      this.lifeText.text = `Life: ${life}`
    }

    spawnEnemy(){
        const enemy = this.enemies.get(0,0,'enemy')
        if (enemy) {
          enemy.spawn()
        }  
    }

    spawnRepair(){
      const repair = this.repairs.get(0,0,'repair')
      if (repair) {
        repair.spawn()
      }  
    }

    hitEnemy(laser,enemy) {
      laser.die()
      enemy.die()
      score++
      this.sound.play('destroy_sfx')
      this.scoreText.text = `Score : ${score}`
    }

    gameOver(player,enemy){
      enemy.die()
      --life
      this.sound.play('gameover_sfx')
      if(life == 2) {
        this.player.setTint(0xff0000).setAlpha(1)
      } else if (life == 1) {
        this.player.setTint(0xff0000).setAlpha(0.8)
      } else if (life == 0) {
        this.player.setTint(0xff0000).setAlpha(0.5)
        this.sound.stopAll()
        this.scene.start('game-over')
      }
    }

    increaseLife(player,repair) {
      repair.die()
      ++life
      this.sound.play('repair_sfx')
      if(life == 3) {
        this.player.setTint()
      } else if (life == 2) {
        this.player.setTint(0xff0000).setAlpha(1)
      } else if (life == 1) {
        this.player.setTint(0xff0000).setAlpha(0.8)
      }
    }
}