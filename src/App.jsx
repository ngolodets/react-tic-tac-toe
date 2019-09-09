import React, {useState} from 'react';
import './App.css';
import Board from './Board';

/*
Display the location for each move in the format (col, row) in the move history list.
Bold the currently selected item in the move list.
Rewrite Board to use two loops to make the squares instead of hardcoding them.
Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win.
When no one wins, display a message about the result being a draw.
*/

function App() {
  const initialHistory = [
    {squares: Array(9).fill(null)}
  ];
  const [history, setHistory] = useState(initialHistory);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const currentStep = history[stepNumber];
  const winner = calculateWinner(currentStep.squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function calculateWinner(squares) {
    /* Squares indexes as they appear in UI:
    0 1 2
    3 4 5
    6 7 8
    */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]; // shows all of the winning combinations ("lines")
  
    // Iterate over all the winning line combinations to see if the 
    // input squares array has one of the with all 'X's or all 'O's.
    // If it does, return 'X' or 'O'.
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    // If none of the winning line combinations is contained in 
    // input squares array, return null...
    return null;
  }

  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const finalStepInSlicedHistory = slicedHistory[slicedHistory.length - 1];
    const newSquares = [...finalStepInSlicedHistory.squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareAlreadyFilled = Boolean(newSquares[i]);

    if (winnerDeclared || squareAlreadyFilled) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    const newStep = {squares: newSquares};
    // make a copy of the array and add newStep to the end of it
    const newHistory = [...slicedHistory, newStep];

    setHistory(newHistory);
    setXIsNext(!xIsNext);
    setStepNumber(slicedHistory.length);
  }

  const jumpTo = step => {
    setStepNumber(step);

    const isEvenStepNumber = step % 2 === 0;
    setXIsNext(isEvenStepNumber);
  }

  const moves = history.map((step, move) => {
    const description = Boolean(move) ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentStep.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
