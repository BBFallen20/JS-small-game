let $button = document.querySelector('#start')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $game = document.querySelector('#game')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

let score = 0
let gameStarted = false

function show($element) {
    $element.classList.remove('hide')
}

function hide($element) {
    $element.classList.add('hide')
}

function setHigh() {
    if(Number(localStorage.getItem('UserHighScore'))<score){
        localStorage.setItem('UserHighScore', score.toString())
        localStorage.setItem('UserHighTime', $gameTime.value)
    }
}

function getHigh() {
    document.querySelector('#high-score').textContent = localStorage.getItem('UserHighScore')
    document.querySelector('#high-time').textContent = localStorage.getItem('UserHighTime')
}

function endGame() {
    gameStarted = false
    $game.innerHTML = ''
    show($button)
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    setScore()
    setHigh()
    getHigh()
}

function setScore() {
    $result.textContent = score.toString()
}

function setTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function startGame(){
    score = 0
    setTime()

    gameStarted = true
    hide($button)
    $game.style.backgroundColor = '#fff'
    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if(time<=0){
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    spawnEntity()
}

function spawnEntity(){
    $game.innerHTML = ''
    let boxSize = getRandomNumber(30, 100)

    let gameSize = $game.getBoundingClientRect()

    let maxTop = gameSize.height - boxSize

    let maxLeft = gameSize.width - boxSize

    let box = document.createElement('div')

    box.style.height = box.style.width = `${boxSize}px`
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = `${getRandomNumber(0, maxTop)}px`
    box.style.left = `${getRandomNumber(0, maxLeft)}px`
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min)
}

$button.addEventListener('click', startGame)
$game.addEventListener('click', function (event) {
    if(gameStarted===false){
        return
    }
    if(event.target.dataset.box){
        spawnEntity()
        score++
    }
})
$gameTime.addEventListener('input', function () {
    if(gameStarted===false){
        setTime()
    }
})
document.addEventListener('DOMContentLoaded', getHigh)