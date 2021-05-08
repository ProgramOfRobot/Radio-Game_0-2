let ourSprite: game.LedSprite
let enemySprite: game.LedSprite
let wasConnected: boolean

// 临时用数据
let tmpNum: number

// 防止双方位置不相同 用于刷新敌方的位置
function initFlushEnemyPos() {
    // TODO
}

// 请求Device A,B互相连接
function connect () {
    while (!(wasConnected)) {
        radio.sendString("Connect plz")
    }
}
// 接收互相连接的String 并且显示出来
radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "Connect plz") {
        // 防止重复执行
        wasConnected = true

        // 提示
        basic.showIcon(IconNames.Happy)
        basic.pause(3000)
        basic.clearScreen()

        // 防止双方位置不相同 刷新一下敌方的位置
        initFlushEnemyPos()
    }
    else if (receivedString == "Give Pos") {
        // TODO
    }
})

// 如果玩家按下A按钮 向左走一步并告诉对方 向左走了一步
input.onButtonPressed(Button.A, function () {
    tmpNum = ourSprite.get(LedSpriteProperty.X) - 1
    ourSprite.set(LedSpriteProperty.X, tmpNum)
    radio.sendValue("MoveLeft", -1)
})

// 如果玩家按下B按钮 向右走一步并告诉对方 向右走了一步
input.onButtonPressed(Button.B, function () {
    tmpNum = ourSprite.get(LedSpriteProperty.X) + 1
    ourSprite.set(LedSpriteProperty.X, tmpNum)
    radio.sendValue("MoveRight", 1)
})

// 接收数据
radio.onReceivedValue(function (name: string, value: number) {
    if (name == "MoveLeft" || name == "MoveRight") {
        enemySprite.set(LedSpriteProperty.X, value)
    }
})

// 初始化函数
function init() {
    wasConnected = false

    // 互相连接
    connect()

    ourSprite = game.createSprite(4, 4)
    enemySprite = game.createSprite(0, 0)
}

function runloopOfGame() {
    // trash
}

function main() {
    init()
    runloopOfGame()
}

main()