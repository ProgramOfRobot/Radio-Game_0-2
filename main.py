def connect():
    global wasConnected
    while not wasConnected:
        radio.send_string("Connect Plz!")

def on_received_string(receivedString):
    global wasConnected
    if not wasConnected:
        wasConnected = True
        basic.show_leds("""
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        """)
        basic.pause(2500)
        basic.clear_screen()
        flushPos()
radio.on_received_string(on_received_string)

def flushPos():
    radio.send_value("FlushPosX", ourPos[0])
    radio.send_value("FlushPosY", ourPos[1])

def on_button_pressed_a():
    temp = ourSprite.get(LedSpriteProperty.X) - 1
    ourSprite.set(LedSpriteProperty.X, temp)
    radio.send_value("Enemy-XMove", temp)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    temp2 = ourSprite.get(LedSpriteProperty.X) + 1
    ourSprite.set(LedSpriteProperty.X, temp2)
    radio.send_value("Enemy+XMove", temp2)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    if name == "FlushPosX":
        enemyPos[0] = value
    elif name == "FlushPosY":
        enemyPos[1] = value
    elif name == "Enemy-XMove":
        temp3 = enemySprite.get(LedSpriteProperty.X) - 1
        enemySprite.set(LedSpriteProperty.X, temp3)
    elif name == "Enemy+XMove":
        temp4 = enemySprite.get(LedSpriteProperty.X) + 1
        enemySprite.set(LedSpriteProperty.X, temp4)
radio.on_received_value(on_received_value)

def init():
    global wasConnected, ourSprite, ourPos, enemySprite, enemyPos
    radio.set_group(114514)
    wasConnected = False
    ourSprite = game.create_sprite(4, 4)
    ourPos = [ourSprite.get(LedSpriteProperty.X),
        ourSprite.get(LedSpriteProperty.Y)]
    enemySprite = game.create_sprite(0, 0)
    enemyPos = [enemySprite.get(LedSpriteProperty.X),
        enemySprite.get(LedSpriteProperty.Y)]
    connect()
# Trash
def runloopOfGame():
    pass
def main():
    init()
    runloopOfGame()
main()