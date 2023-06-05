const gameBoard = document.getElementById('gameBoard')
const context =   gameBoard.getContext('2d');
const scoreText = document.getElementById('scorevalue')

const WIDTH = gameBoard.width
const HEIGHT = gameBoard.height

const UNIT = 20
let foodX;
let foodY;
let xvel = 20
let yvel = 0
let score = 0
let active =true
let started =false

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
]
window.addEventListener('keydown',keyPress)


startGame();

function startGame(){
     context.fillStyle = '#212121'
     context.fillRect(0,0,WIDTH,HEIGHT)
        createFood()
        displayFood()
        // drawSnake()
        // moveSnake()
        // clearBoard()
        drawSnake()
       

}

function clearBoard(){
    context.fillStyle = '#212121'
    context.fillRect(0,0,WIDTH,HEIGHT)

}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT


}

function displayFood(){
    context.fillStyle = 'green'
    context.fillRect(foodX,foodY,UNIT,UNIT)

}

function drawSnake(){
    context.fillStyle ='darkgrey'
    context.strokeStyle ='#212121'
    snake.forEach((snakepart) =>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xvel,
                   y:snake[0].y+yvel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score +=5
        scoreText.textContent = score
        createFood()
    } 
    else

    snake.pop()               
}

function nextTick(){
    if(active)
    setTimeout(() => {
        clearBoard()
        displayFood()
        moveSnake()
        drawSnake()
        checkGameOver()
        nextTick()

    },200);

else{
    clearBoard()
    context.font = "bold 40px serif"
    context.fillStyle = "white"
    context.textAlign = "centre"
    context.fillText("Game Over!!",WIDTH/4,HEIGHT/4)
}
}
 function keyPress(event){
    if(!started){
        started = true
        nextTick() 
    }
    active=true
     const LEFT = 37 
     const UP = 38
     const RIGHT = 39
     const DOWN = 40

    switch(true){
        // left key pressed and not going right
          case(event.keyCode==LEFT  && xvel!=UNIT):
              xvel=-UNIT
              yvel=0
              break;
        // right key pressed and not going left      
          case(event.keyCode==RIGHT  && xvel!=-UNIT):
              xvel=UNIT
              yvel=0
              break;
        // up key pressed and not going down      
          case(event.keyCode==UP  && yvel!=UNIT):
              xvel=0
              yvel=-UNIT
              break;
        // down key pressed and not going up      
          case(event.keyCode==DOWN  && yvel!=-UNIT ):
              xvel=0
              yvel=UNIT
              break;
         
    }

}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
           active=false
           break
    }
}