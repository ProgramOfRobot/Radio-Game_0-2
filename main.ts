let ourSprite: game.LedSprite
let enemySprite: game.LedSprite
let ourPos: number[]
let enemyPos: number[]
let wasConnected: boolean

function connect() {
    while (!wasConnected) {
        radio.sendString("Connect Plz!")
    }
}
radio.onReceivedString(function (receivedString: string) {
    if (!wasConnected) {
        wasConnected = true
        basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
        basic.pause(2500)
        basic.clearScreen()

        flushPos()
    }
})

function flushPos() {
    radio.sendValue("FlushPosX", ourPos[0])
    radio.sendValue("FlushPosY", ourPos[1])
}

input.onButtonPressed(Button.A, function () {
    let temp = ourSprite.get(LedSpriteProperty.X) - 1
    ourSprite.set(LedSpriteProperty.X, temp)
    radio.sendValue("Enemy-XMove", temp)
})
input.onButtonPressed(Button.B, function () {
    let temp = ourSprite.get(LedSpriteProperty.X) + 1
    ourSprite.set(LedSpriteProperty.X, temp)
    radio.sendValue("Enemy+XMove", temp)
})

radio.onReceivedValue(function (name: string, value: number) {
    if (name == "FlushPosX") {
        enemyPos[0] = value
    }
    else if (name == "FlushPosY") {
        enemyPos[1] = value
    }
    else if (name == "Enemy-XMove") {
        let temp = enemySprite.get(LedSpriteProperty.X) - 1
        enemySprite.set(LedSpriteProperty.X, temp)
    }
    else if (name == "Enemy+XMove") {
        let temp = enemySprite.get(LedSpriteProperty.X) + 1
        enemySprite.set(LedSpriteProperty.X, temp)
    }
})

function init() {
    radio.setGroup(114514)

    wasConnected = false
    ourSprite = game.createSprite(4, 4)
    ourPos = [
        ourSprite.get(LedSpriteProperty.X), 
        ourSprite.get(LedSpriteProperty.Y)
        ]
    enemySprite = game.createSprite(0, 0)
    enemyPos = [
        enemySprite.get(LedSpriteProperty.X),
        enemySprite.get(LedSpriteProperty.Y)
    ]

    connect()
}

// Trash
function runloopOfGame() {
}

function main() {
    init()
    runloopOfGame()
}

main()