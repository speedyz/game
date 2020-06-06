let $resultHeader = document.querySelector('#result-header')
let $timeHeader = document.querySelector('#time-header ')
let $gameTime = document.querySelector('#game-time')
let $start =  document.querySelector('#start')
let $result = document.querySelector('#result')
let $game = document.querySelector('#game');
let $time = document.querySelector('#time')
let isGameStarted = false
let score = 0

$start.addEventListener('click', startGame)
$game.addEventListener('click', handlBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0;
    setGameTime()
    $gameTime.setAttribute('disabled', `true`)
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    hide($start)
    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0){
            clearInterval(interval)
            endGame()
        }else{
            $time.textContent = (time - 0.1).toFixed(1)
        }
    },100)
    renderBox();
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
        let time = +$gameTime.value
        $time.textContent = time.toFixed(1)
        show($timeHeader)
        hide($resultHeader)
}

function endGame() {
     isGameStarted = false
    setGameScore()
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($resultHeader)
    show($resultHeader)
    $gameTime.removeAttribute('disabled')
}

function handlBoxClick(event) {
    if (!isGameStarted){
        return
    }
   if (event.target.dataset.box){
       score++
       renderBox()
   }
}

function renderBox() {
    let box  = document.createElement('div')
    let gameSize = $game.getBoundingClientRect()
    let boxColor3 = getRandom(0, 255)
    let boxColor2 = getRandom(0, 255)
    let boxColor = getRandom(0, 255)
    let boxSIze = getRandom(30,100)
    let maxTop = gameSize.height - boxSIze
    let maxLeft = gameSize.width - boxSIze
    $game.innerHTML = ''
    box.style.backgroundColor = 'rgb'+'('+(boxColor2)+','+(boxColor)+','+(boxColor3)+')';
    box.style.height = box.style.width = boxSIze+'px'
    box.style.position = 'absolute'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px '
    box.style.cursor = 'pointer'

    box.style.borderRadius = '50%'
    box.setAttribute('data-box', `true`);
    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor( Math.random() * (max-min) + min)
}
