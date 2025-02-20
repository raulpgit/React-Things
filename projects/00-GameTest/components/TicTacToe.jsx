import { useEffect } from "react"
import { useState } from "react"
import { checkBlankBoard, checkDraw, checkWinnerRecursive } from "../services/tikTakToeLogic"

// eslint-disable-next-line react/prop-types
const Cell = ({ updateBoard, row,col, children }) => {
    return (
        <span style={styles.cell} onClick={() => updateBoard(row,col)}>
            {children}
        </span>
    )
}

// eslint-disable-next-line react/prop-types
export default function TicTacToe({boardXSize,boardYSize, numberToWin, Gravity, TURNS}) {
    const [player, setPlayer] = useState(TURNS.X)
    const [board, setBoard] = useState(Array(boardYSize).fill().map(() => Array(boardXSize).fill(null)))
    const [winner, setWinner] = useState(null)
    const [lastMove, setLastMove] = useState([null,null])

    const updateBoard = (row,col) => {
        if(board[row][col] !== null || winner) return;
        const newBoard = [...board]
        if(Gravity){
            for(let i = newBoard.length-1; i >= 0; i--){
                if(newBoard[i][col] === null){
                    newBoard[i][col] = player
                    setLastMove([i,col])
                    break;
                }
            }
        }
        else{
            newBoard[row][col] = player
            setLastMove([row,col])
        }
        setBoard(newBoard)
        
    }

    const handleResetGame = () =>{
        setPlayer(TURNS.X)
        setBoard(Array(3).fill().map(() => Array(3).fill(null)))
        setWinner(null)
    }

    //CHECK WINNER AND CHANGE TURN
    useEffect(() => {
        // const winner = checkWinner(board)
        const winner = checkWinnerRecursive(board,lastMove[0],lastMove[1],null,0,numberToWin)
        console.log("winner "+winner)
        if(winner !== null && winner !== undefined) {
            setWinner(winner)
        }
        else if(checkDraw(board)) 
            setWinner(false)

        if(!checkBlankBoard(board)){setPlayer(player === TURNS.X ? TURNS.O : TURNS.X)}
    },[board])

    return (
        <>
        <h4>{winner !== null ? winner === false ? `Draw` : `Winner is ${winner}` : `Player ${player}'s turn`}</h4>
        <div style={board.length > 3 ? styles.board4 : styles.boardTTT}>
            {board.map((_,row) => (
                board[row].map((_,col) => (
                    <Cell key={row+"|"+col} row={row} col={col} updateBoard={updateBoard}>{board[row][col] ? board[row][col] : <br/>}</Cell>
                ))
            ))}
        </div>
        <br/>
        <button onClick={handleResetGame}>Reset Game</button>
        </>
    )
    }

const styles = {
    boardTTT: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: 1,
        
    },
    board4: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        gap: 1,
        
    },
    cell: {
        // background: 'white',
        border: '1px solid black',
        fontSize: 24,
        cursor: 'pointer',
    },
}