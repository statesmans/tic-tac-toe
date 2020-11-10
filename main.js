'use strict'


class ticTacToe {
    constructor(boardSize, squareSize){
        this.boardSize = boardSize,
        this.squareSize = squareSize,
        this.boardArray = [],
        this.figureFlag = true
    }

    createBoardArray() {
        let boardArr = []
    
        for(let i = 0; i < this.boardSize; i++) {
    
            boardArr[i] = []
            for(let j = 0; j < this.boardSize; j++) {
    
                boardArr[i][j] = []
                boardArr[i][j].push('')
            } 
        }

        this.boardArray = boardArr
    }


    renderBoard() {
        let ticToeCanvas = document.getElementById('ticTacToeField')
        let ctx = ticToeCanvas.getContext('2d')
    
        ticToeCanvas.width = Number(`${this.boardSize * this.squareSize}`)
        ticToeCanvas.height = Number(`${this.boardSize * this.squareSize}`)
    
        let axisX = 0
        let axisY = 0
        
        for(let Y = 0; Y < this.boardSize; Y++) {
            for(let X = 0; X < this.boardSize; X++) {
    
                axisX = X * this.squareSize;
                axisY = Y * this.squareSize;
    
                ctx.beginPath();
                ctx.rect(axisX, axisY, this.squareSize, this.squareSize);
                ctx.closePath();
                ctx.fillStyle = "#000";
                ctx.strokeStyle = "#fcdb00";
                ctx.fill();
                ctx.stroke();
    
                if(this.boardArray[Y][X] === 'X') {
                    ctx.strokeStyle = "white"; 
                    ctx.beginPath(); 
                    ctx.moveTo(axisX + 5, axisY + 5); 
                    ctx.lineTo(axisX + 25, axisY + 25); 
                    ctx.moveTo(axisX + 25, axisY + 5); 
                    ctx.lineTo(axisX + 5, axisY + 25);
                    ctx.stroke()
    
                }
                if(this.boardArray[Y][X] === 'O') {
                    ctx.strokeStyle = "white"; 
                    ctx.beginPath();
                    ctx.arc(axisX + 15,axisY + 15, 10, 0, Math.PI*2)
                    ctx.stroke()
                }
            }
        }

        
    }

    checkWin(X, Y, fig) {

        let xCount = 0
        let yCount = 0
        let leftDiagonalCount = 0
        let rightDiagonalCount = 0

        // Check horizontal win
        for(let j = 0; j < this.boardSize; j++) {

            if(this.boardArray[Y][j] == fig ) {
                xCount++
            } else if (xCount !== 5) {
                xCount = 0
            }

        }

        // Check vertical win
        for(let j = 0; j < this.boardSize; j++) {

            if(this.boardArray[j][X] == fig ) {
                yCount++
            } else if (yCount !== 5) {
                yCount = 0
            }

        }

        // Check left diagonal win
        let topLeftXStart = 0
        let topLeftYStart = 0

        if(X > Y)  {

            topLeftYStart = Y - Y 
            topLeftXStart = X - Y
        } else {

            topLeftYStart = Y - X
            topLeftXStart = X - X
        }

        for(let i = topLeftYStart; i < this.boardSize - topLeftYStart; i++) {

            for(let j = topLeftXStart; j === topLeftXStart;) {

                if(this.boardArray[i][j] == fig ) {
                    leftDiagonalCount++
                } else if (leftDiagonalCount !== 5) {
                    leftDiagonalCount = 0
                }

                topLeftXStart++
            }
            
        }

        // Check right diagonal
        let topRightXStart = 0
        let topRightYStart = 0

        if(X > Y)  {

            topRightYStart = Y - Y 
            topRightXStart = X + Y
        } else {

            topRightYStart = Y - Y
            topRightXStart = X + Y
        }

        if(fig === 'X') {
            console.log('top' ,topRightYStart, topRightXStart)
        }

        for(let i = topRightYStart; i < this.boardSize - topRightYStart; i++) {

            for(let j = topRightXStart; j === topRightXStart;) {

                if(this.boardArray[i][j] == fig ) {
                    rightDiagonalCount++
                } else if (rightDiagonalCount !== 5) {
                    rightDiagonalCount = 0
                }

                topRightXStart--
            }
        }

        if(xCount === 5 || yCount === 5 || leftDiagonalCount === 5 || rightDiagonalCount === 5) {
            document.getElementById('winnerWindow').classList.remove('over-window--disable')
            document.getElementById('winnerWindow').classList.add('over-window--active')
            document.getElementById('overTitle').innerText = `Winner (${fig})`
        }
    }


}

let ticTac = ''




// Clear start window on press enter
window.addEventListener('keypress', (e) => {
    let boardSizeInput = document.getElementById('boardSizeInput')
    
    if(e.keyCode == 13) {

        if(boardSizeInput.value >= 5 && boardSizeInput.value <= 20) {

            ticTac =  new ticTacToe(Number(boardSizeInput.value), 30)

            document.getElementById('startWindow').classList.remove('start-window--active')
            document.getElementById('startWindow').classList.add('start-window--disable')

            document.getElementById('burgerBtn').classList.remove('burger-btn--disable')
            document.getElementById('burgerBtn').classList.add('burger-btn--active')
            
            ticTac.createBoardArray()
            ticTac.renderBoard()
        }
    }
})

// Clear start window on press button
document.getElementById('buttonInput').addEventListener('click', () => {

    if(boardSizeInput.value >= 3 && boardSizeInput.value <= 20) {

        ticTac = new ticTacToe(Number(boardSizeInput.value), 30)

        document.getElementById('startWindow').classList.remove('start-window--active')
        document.getElementById('startWindow').classList.add('start-window--disable')

        document.getElementById('burgerBtn').classList.remove('burger-btn--disable')
        document.getElementById('burgerBtn').classList.add('burger-btn--active')

        ticTac.createBoardArray()
        ticTac.renderBoard()
    }
})

// add figure onclick
document.getElementById('ticTacToeField').addEventListener('click', (e) => {

    let clickFigure = ''
    let clickAxisX = 0
    let clickAxisY = 0

    if(e.offsetX > ticTac.squareSize) {
        clickAxisX = Math.floor(e.offsetX / ticTac.squareSize) 
    }

    if(e.offsetY > ticTac.squareSize) {
        clickAxisY = Math.floor(e.offsetY / ticTac.squareSize) 
    }


    if(ticTac.boardArray[clickAxisY][clickAxisX] == '') {

        if(ticTac.figureFlag) {

            clickFigure = 'X'
            ticTac.boardArray[clickAxisY][clickAxisX] = 'X'
            ticTac.figureFlag = !ticTac.figureFlag
        } else {
    
            clickFigure = 'O'
            ticTac.boardArray[clickAxisY][clickAxisX] = 'O'
            ticTac.figureFlag = !ticTac.figureFlag
        }
    
    }



    ticTac.renderBoard()
    ticTac.checkWin(clickAxisX, clickAxisY, clickFigure)
})


document.getElementById('tryAgainBtn').addEventListener('click', () => {

    let changeSizeInput = Number(document.getElementById('changeSizeInput').value)
    let winnerWindow = document.getElementById('winnerWindow')
    if(changeSizeInput >=5 && changeSizeInput <= 20) {
        ticTac = new ticTacToe(changeSizeInput, 30)
        console.log('rjtnoer')
    } else {
        console.log('gbrojekrvp')
        ticTac = new ticTacToe(ticTac.boardSize, 30)
    }

    winnerWindow.classList.remove('over-window--active')
    winnerWindow.classList.add('over-window--disable')

    ticTac.createBoardArray()
    ticTac.renderBoard()
})

document.getElementById('burgerBtn').addEventListener('click', () => {
    
    let burger = document.getElementById('burgerMenu')

    if(!burger.classList.contains('burger-menu--active')) {

        burger.classList.remove('burger-menu--disable')
        burger.classList.add('burger-menu--active')
    } else {
        burger.classList.add('burger-menu--disable')
        burger.classList.remove('burger-menu--active')
    }

})

document.getElementById('interraptGame').addEventListener('click', () => {

    document.getElementById('burgerBtn').classList.add('burger-btn--disable')
    document.getElementById('burgerBtn').classList.remove('burger-btn--active')    

    document.getElementById('burgerMenu').classList.add('burger-menu--disable')
    document.getElementById('burgerMenu').classList.remove('burger-menu--active')

    document.getElementById('startWindow').classList.remove('start-window--disable')
    document.getElementById('startWindow').classList.add('start-window--active')

    let canvas = document.getElementById('ticTacToeField')
    let canvasCtx = document.getElementById('ticTacToeField').getContext('2d')

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

})

document.getElementById('reloadGame').addEventListener('click', () => {

    ticTac.createBoardArray()
    ticTac.renderBoard()

    document.getElementById('burgerMenu').classList.remove('burger-menu--active')
    document.getElementById('burgerMenu').classList.add('burger-menu--disable')
})