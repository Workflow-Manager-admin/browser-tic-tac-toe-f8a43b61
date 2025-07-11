import React, { useState } from "react";
import "./App.css";

// Tic Tac Toe game logic and UI (minimalistic, light style, responsive)
// PUBLIC_INTERFACE
function App() {
  // Game state setup
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Check winning lines
  const getWinner = (squares) => {
    const lines = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // cols
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diags
      [2, 4, 6],
    ];
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
    return null;
  };

  // PUBLIC_INTERFACE
  const handleSquareClick = (idx) => {
    if (board[idx] || gameOver) return; // Already filled or game over
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    const win = getWinner(newBoard);
    setBoard(newBoard);
    if (win) {
      setWinner(win);
      setGameOver(true);
    } else if (newBoard.every((sq) => sq !== null)) {
      setWinner(null);
      setGameOver(true); // Draw
    } else {
      setXIsNext((x) => !x);
    }
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setBoard(emptyBoard);
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  };

  // Status message
  let status;
  if (gameOver) {
    status =
      winner === "X" || winner === "O"
        ? `Player ${winner} wins!`
        : "It's a draw!";
  } else {
    status = `Player ${xIsNext ? "X" : "O"}'s turn`;
  }

  return (
    <div className="ttt-app-bg">
      <div className="ttt-center-content">
        <div className="ttt-game-container">
          <h2 className="ttt-status">{status}</h2>
          <div className="ttt-board">
            {board.map((val, idx) => (
              <button
                key={idx}
                className="ttt-square"
                onClick={() => handleSquareClick(idx)}
                aria-label={`Square ${idx + 1}, ${
                  val ? val : "empty"
                }`}
                tabIndex={0}
              >
                {val}
              </button>
            ))}
          </div>
          <button className="ttt-reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
        <footer className="ttt-footer">
          <span>
            <a
              href="https://reactjs.org/"
              className="ttt-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with React
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
