import React, { useState, useCallback } from "react";

// Types for the Square component props
interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

// Types for the game state
interface GameState {
  squares: (string | null)[];
  xIsNext: boolean;
  history: { squares: (string | null)[] }[];
  stepNumber: number;
  winner: {
    player: string | null;
    line: number[] | null;
  } | null;
  boardSize: number;
  isGameStarted: boolean;
}

/**
 * Calculates if there's a winner in the current game state
 * @param squares - Current state of the game board
 * @param boardSize - Size of the game board
 * @returns Object containing winner player and winning line, or null if no winner
 */
const calculateWinner = (
  squares: (string | null)[],
  boardSize: number
): { player: string; line: number[] } | null => {
  const lines: number[][] = [];

  // Add rows
  for (let i = 0; i < boardSize; i++) {
    const row = Array.from({ length: boardSize }, (_, j) => i * boardSize + j);
    lines.push(row);
  }

  // Add columns
  for (let i = 0; i < boardSize; i++) {
    const col = Array.from({ length: boardSize }, (_, j) => i + j * boardSize);
    lines.push(col);
  }

  // Add diagonals
  const diagonal1 = Array.from({ length: boardSize }, (_, i) => i * boardSize + i);
  const diagonal2 = Array.from({ length: boardSize }, (_, i) => (i + 1) * boardSize - (i + 1));
  lines.push(diagonal1, diagonal2);

  // Check each winning combination
  for (const line of lines) {
    const firstSquare = squares[line[0]];
    if (!firstSquare) continue;
    
    if (line.every(index => squares[index] === firstSquare)) {
      return { player: firstSquare, line };
    }
  }
  return null;
};

/**
 * Individual square button component
 * Renders a single square in the game board with proper styling and accessibility
 */
const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => (
  <button
    className={`w-16 h-16 border border-gray-400 text-2xl font-bold 
      ${
        isWinningSquare
          ? "bg-green-200 dark:bg-green-700"
          : "bg-white dark:bg-gray-800"
      } 
      hover:bg-gray-100 dark:hover:bg-gray-700 
      focus:outline-none focus:ring-2 focus:ring-blue-500 
      transition-colors duration-200 ease-in-out
      dark:text-white`}
    onClick={onClick}
    aria-label={value ? `Square with ${value}` : "Empty square"}
  >
    {value}
  </button>
);

/**
 * Size selector component
 */
const SizeSelector: React.FC<{
  onSizeSelect: (size: number) => void;
  defaultSize: number;
}> = ({ onSizeSelect, defaultSize }) => {
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize.toString());

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedSize(value);
  };

  const handleSubmit = () => {
    const size = Math.min(8, Math.max(3, parseInt(selectedSize) || 3));
    setSelectedSize(size.toString());
    onSizeSelect(size);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold dark:text-white">Select Board Size</h2>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="3"
          max="8"
          value={selectedSize}
          onChange={handleSizeChange}
          onBlur={() => {
            const size = Math.min(8, Math.max(3, parseInt(selectedSize) || 3));
            setSelectedSize(size.toString());
          }}
          className="w-20 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Start Game
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Choose a size between 3 and 8
      </p>
    </div>
  );
};

/**
 * Main Tic-Tac-Toe game component
 * Manages game state, move history, and renders the game board
 */
const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    squares: Array(9).fill(null),
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    winner: null,
    boardSize: 3,
    isGameStarted: false,
  });

  const handleSizeSelect = (size: number) => {
    const squares = Array(size * size).fill(null);
    setGameState({
      squares,
      xIsNext: true,
      history: [{ squares }],
      stepNumber: 0,
      winner: null,
      boardSize: size,
      isGameStarted: true,
    });
  };

  const handleClick = (i: number) => {
    const history = gameState.history.slice(0, gameState.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares, gameState.boardSize) || squares[i]) {
      return;
    }

    squares[i] = gameState.xIsNext ? "X" : "O";
    const winner = calculateWinner(squares, gameState.boardSize);

    setGameState({
      ...gameState,
      squares,
      xIsNext: !gameState.xIsNext,
      history: [...history, { squares }],
      stepNumber: history.length,
      winner,
    });
  };

  const jumpTo = (step: number) => {
    const history = gameState.history.slice(0, step + 1);
    const current = history[step];
    const winner = calculateWinner(current.squares, gameState.boardSize);

    setGameState({
      ...gameState,
      squares: current.squares,
      xIsNext: step % 2 === 0,
      history,
      stepNumber: step,
      winner,
    });
  };

  const resetGame = useCallback(() => {
    setGameState({
      squares: Array(gameState.boardSize * gameState.boardSize).fill(null),
      xIsNext: true,
      history: [{ squares: Array(gameState.boardSize * gameState.boardSize).fill(null) }],
      stepNumber: 0,
      winner: null,
      boardSize: gameState.boardSize,
      isGameStarted: true,
    });
  }, [gameState.boardSize]);

  const startNewGame = () => {
    setGameState({
      ...gameState,
      isGameStarted: false,
    });
  };

  const status = gameState.winner
    ? `Winner: ${gameState.winner.player}`
    : gameState.squares.every((square) => square)
    ? "Game is a draw!"
    : `Next player: ${gameState.xIsNext ? "X" : "O"}`;

  if (!gameState.isGameStarted) {
    return (
      <div className="flex flex-col items-center dark:bg-gray-900 min-h-screen pt-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Tic Tac Toe</h1>
        <SizeSelector onSizeSelect={handleSizeSelect} defaultSize={3} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Tic Tac Toe ({gameState.boardSize}x{gameState.boardSize})
      </h1>

      {/* Main game container */}
      <div className="flex gap-8 items-start">
        {/* Center - Game board and controls */}
        <div className="flex flex-col items-center">
          <div className="w-48 mb-2">
            <div
              className={`text-xl font-semibold ${
                gameState.winner
                  ? "text-green-600 dark:text-green-400"
                  : gameState.squares.every((square) => square)
                  ? "text-red-600 dark:text-red-400"
                  : "dark:text-white"
              }`}
              role="status"
              aria-live="polite"
            >
              {status}
            </div>
          </div>

          {/* Game board */}
          <div 
            className="grid gap-1 mb-4" 
            style={{ 
              gridTemplateColumns: `repeat(${gameState.boardSize}, minmax(0, 1fr))` 
            }} 
            role="grid"
          >
            {gameState.squares.map((square, i) => (
              <Square
                key={i}
                value={square}
                onClick={() => handleClick(i)}
                isWinningSquare={gameState.winner?.line?.includes(i) ?? false}
              />
            ))}
          </div>

          {/* Game controls */}
          <div className="mt-4 space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                dark:bg-blue-700 dark:hover:bg-blue-600"
              onClick={resetGame}
            >
              Reset Game
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={startNewGame}
            >
              New Size
            </button>
          </div>
        </div>

        {/* Right side - Move history */}
        <div>
          <h2 className="text-xl font-bold mb-2 dark:text-white">
            Move History
          </h2>
          <div className="space-y-2">
            {gameState.history.map((_, move) => (
              <button
                key={move}
                className="block w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 
                  rounded dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => jumpTo(move)}
              >
                {move === 0 ? "Go to game start" : `Go to move #${move}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
