// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restart");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    let currentPlayer = "X";
    let board = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const checkWinner = () => {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(null) ? null : "Draw";
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (!board[index]) {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            e.target.classList.add("taken");

            const winner = checkWinner();
            if (winner) {
                message.textContent = winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
                cells.forEach(cell => cell.removeEventListener("click", handleClick));
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s Turn`;
        }
    };

    const restartGame = () => {
        board.fill(null);
        currentPlayer = "X";
        message.textContent = "Player X's Turn";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
            cell.addEventListener("click", handleClick);
        });
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartBtn.addEventListener("click", restartGame);
    darkModeToggle.addEventListener("click", toggleDarkMode);

    message.textContent = "Player X's Turn";
});
