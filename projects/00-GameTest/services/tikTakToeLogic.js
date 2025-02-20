export function checkWinner(board) {
    const winningCombos = [
        [{a:0, b:0} ,{a:0, b:1},{a:0, b:2}],
        [{a:1, b:0} ,{a:1, b:1},{a:1, b:2}],
        [{a:2, b:0} ,{a:2, b:1},{a:2, b:2}],
        [{a:0, b:0} ,{a:1, b:0},{a:2, b:0}],
        [{a:0, b:1} ,{a:1, b:1},{a:2, b:1}],
        [{a:0, b:2} ,{a:1, b:2},{a:2, b:2}],
        [{a:0, b:0} ,{a:1, b:1},{a:2, b:2}],
        [{a:0, b:2} ,{a:1, b:1},{a:2, b:0}],
    ]
    for(let i = 0; i < winningCombos.length; i++) {
        const [a,b,c] = winningCombos[i]
        if(board[a.a][a.b] && board[a.a][a.b] === board[b.a][b.b] && board[a.a][a.b] === board[c.a][c.b]) {
            return board[a.a][a.b]
        }
    }
    return null
}
export function checkDraw(board) {
    return board.every((cell) => cell.every((cell) => cell !== null))
}
export function checkBlankBoard(board) {
    return board.every((cell) => cell.every((cell) => cell === null))
}
export function checkWinnerRecursive(board,playerX,playerY,direction,count,countToWin){
    //First React load use this function without playerX and playerY
    if(playerX === null || playerY === null){
        console.log("first null")
        return null
    }
    const player = board[playerX][playerY]

    //In case recusive count is equal to countToWin, we have a winner
    if(count === countToWin){
        console.log("ganador")
        return board[playerX][playerY]
    }

    //TODO: No comprueba todas las casillas correctamente, toma la primera que encuentra
    if(direction === null){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] === player){
                    let winner = null;
                    console.log(player)
                    console.log("buscamos en "+i+" "+j)
                    if(i+1 < board.length && j+1 < board[i].length && board[i+1][j+1] === player){
                        console.log("diagonal abajo")
                        winner = checkWinnerRecursive(board,i,j,[+1,+1],count+1,countToWin)
                        if(winner !== null) return winner
                    }
                    else if(i-1 > 0 && j+1 > 0 && board[i-1][j+1] === player){
                        console.log("diagonal arriba")
                        winner = checkWinnerRecursive(board,i,j,[-1,+1],count+1,countToWin)
                        if(winner !== null) return winner
                    }
                    else if(i+1 < board.length && board[i+1][j] === player){
                        console.log("abajo")
                        winner = checkWinnerRecursive(board,i,j,[+1,0],count+1,countToWin)
                        if(winner !== null) return winner
                    }
                    else if (j+i < board[i].length && board[i][j+1] === player){
                        console.log("derecha")
                        winner = checkWinnerRecursive(board,i,j,[0,+1],count+1,countToWin)
                        if(winner !== null) return winner
                    }
                    else if(winner !== null)return winner;
                }
            }
        }
    }
    else if(playerX+direction[0] < board.length && playerY+direction[1] < board[playerX].length && board[playerX+direction[0]][playerY+direction[1]] === player){
        console.log("avanzamos mas "+count)
        const winner = checkWinnerRecursive(board,playerX+direction[0],playerY+direction[1],direction,count+1,countToWin)
        if(winner !== null) return winner
        else return null;
    }
    else return null;
}
