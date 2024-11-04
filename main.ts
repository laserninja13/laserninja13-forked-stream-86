namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const WavyProjectile = SpriteKind.create()
    export const SpiralProjectile = SpriteKind.create()
    export const homingprojectile = SpriteKind.create()
    export const lazerprojectile = SpriteKind.create()
}
/**
 * TODO
 */
/**
 * IDEAS:
 * 
 * - Change ship look w/ weapon
 * 
 * - wavey
 * 
 * - spiral
 * 
 * - bombs
 * 
 * - lazer
 * 
 * - homing missile
 * 
 * -
 */
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    nextWeapon()
    thePlayer.say(weapon_names[currentWeapon], 500)
})
function fire () {
    currWeaponName = weapon_names[currentWeapon]
    ammoConsumed = 0
    ammo = weapon_ammos[currentWeapon]
    ammoConsumed = fireWeapon()
    ammo += 0 - ammoConsumed
    if (ammo <= 0) {
        weapon_ammos.removeAt(currentWeapon)
        weapon_names.removeAt(currentWeapon)
        currentWeapon = 0
    } else {
        weapon_ammos[currentWeapon] = ammo
    }
}
sprites.onOverlap(SpriteKind.WavyProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fire()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    otherSprite.destroy()
    addWeapon()
})
sprites.onOverlap(SpriteKind.homingprojectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
function addWeapon () {
    newWeapon = randint(1, 5)
    if (newWeapon == 1) {
        weapon_names.push("cone")
        weapon_ammos.push(50)
    } else if (newWeapon == 2) {
        weapon_names.push("wavy")
        weapon_ammos.push(20)
    } else if (newWeapon == 3) {
        weapon_names.push("spiral")
        weapon_ammos.push(10)
    } else if (newWeapon == 4) {
        weapon_names.push("homing")
        weapon_ammos.push(5)
    } else if (newWeapon == 5) {
        weapon_names.push("lazer")
        weapon_ammos.push(30)
    } else {
    	
    }
}
function fireWeapon () {
    if (currWeaponName == "basic") {
        projectile = sprites.createProjectileFromSprite(img`
            4 4 
            4 4 
            `, thePlayer, 200, 0)
    } else if (currWeaponName == "cone") {
        projectile = sprites.createProjectileFromSprite(img`
            4 4 
            4 4 
            `, thePlayer, 200, -50)
        projectile = sprites.createProjectileFromSprite(img`
            4 4 
            4 4 
            `, thePlayer, 200, 0)
        projectile = sprites.createProjectileFromSprite(img`
            4 4 
            4 4 
            `, thePlayer, 200, 50)
        return 3
    } else if (currWeaponName == "wavy") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . 
            . . 4 4 . . 
            . 4 4 4 4 . 
            . 4 4 4 4 . 
            . . 4 4 . . 
            . . . . . . 
            `, thePlayer, 100, 0)
        projectile.setKind(SpriteKind.WavyProjectile)
        projectile.lifespan = 2000
        return 1
    } else if (currWeaponName == "spiral") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . 
            . . 4 4 . . 
            . 4 4 4 4 . 
            . 4 4 4 4 . 
            . . 4 4 . . 
            . . . . . . 
            `, thePlayer, 50, 0)
        projectile.setKind(SpriteKind.SpiralProjectile)
        projectile.lifespan = 2000
        return 1
    } else if (currWeaponName == "homing") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . 
            . . 4 4 . . 
            . 4 4 4 4 . 
            . 4 4 4 4 . 
            . . 4 4 . . 
            . . . . . . 
            `, thePlayer, 50, 0)
        projectile.setKind(SpriteKind.homingprojectile)
        projectile.lifespan = 2000
        projectile.follow(enemyShip, 100)
    } else if (currWeaponName == "lazer") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . 
            4 4 4 4 4 4 
            4 4 4 4 4 4 
            4 4 4 4 4 4 
            4 4 4 4 4 4 
            . . . . . . 
            `, thePlayer, 300, 0)
        projectile.setKind(SpriteKind.Projectile)
        projectile.lifespan = 2000
    } else {
    	
    }
    return 0
}
function nextWeapon () {
    currentWeapon = (currentWeapon + 1) % weapon_names.length
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (Math.percentChance(100)) {
        pu = sprites.create(img`
            5 . . . . . . . 
            . 5 . 5 5 . 5 . 
            . . 5 . . 5 . . 
            . 5 . 5 5 . 5 . 
            . 5 . 5 5 . 5 . 
            . . 5 . . 5 . . 
            . 5 . 5 5 . 5 . 
            5 . . . . . . 5 
            `, SpriteKind.PowerUp)
        pu.x = sprite.x
        pu.y = sprite.y
    }
})
function enemyHit (enemy: Sprite) {
    enemy.destroy()
    info.changeScoreBy(1)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.SpiralProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    enemyHit(otherSprite)
})
let pu: Sprite = null
let enemyShip: Sprite = null
let projectile: Sprite = null
let newWeapon = 0
let ammo = 0
let ammoConsumed = 0
let currWeaponName = ""
let currentWeapon = 0
let weapon_ammos: number[] = []
let weapon_names: string[] = []
let thePlayer: Sprite = null
let scoregoal = 15
thePlayer = sprites.create(img`
    6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 
    `, SpriteKind.Player)
controller.moveSprite(thePlayer)
let enemySpawnRate = 2000
let enemySpeed = 50
thePlayer.setFlag(SpriteFlag.StayInScreen, true)
weapon_names = ["basic", "spiral"]
weapon_ammos = [1, 5]
currentWeapon = 0
game.onUpdate(function () {
    if (scoregoal == info.score()) {
        addWeapon()
        scoregoal += 15
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.WavyProjectile)) {
        value.y += Math.sin(value.lifespan * 0.01) * 5
    }
    for (let value of sprites.allOfKind(SpriteKind.SpiralProjectile)) {
        value.y += Math.sin(value.lifespan * 0.01) * 5
        value.x += Math.cos(value.lifespan * 0.01) * 5
    }
})
game.onUpdateInterval(5000, function () {
    enemySpeed += 5
    enemySpeed = Math.min(enemySpeed, 400)
    enemySpawnRate += -100
    enemySpawnRate = Math.max(enemySpawnRate, 50)
})
forever(function () {
    pause(enemySpawnRate)
    enemyShip = sprites.createProjectileFromSide(img`
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        a a a a a a a a 
        `, 0 - enemySpeed, 0)
    enemyShip.y = randint(4, scene.screenHeight() - 4)
    enemyShip.setKind(SpriteKind.Enemy)
})
