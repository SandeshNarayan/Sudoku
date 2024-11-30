const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Render Sudoku Grid
function renderGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = ''; // Clear the grid
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3); // Determine 3x3 box index
            cell.classList.add(`box-${boxIndex}`); // Add box class based on 3x3 index
            
            if (puzzle[i][j] === 0) {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.id = `cell-${i}-${j}`;
                cell.appendChild(input);
            } else {
                cell.textContent = puzzle[i][j];
            }
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}


// Check if the Sudoku is solved
function checkWin() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = document.getElementById(`cell-${i}-${j}`)?.value || puzzle[i][j];
            if (!isValid(value, i, j)) {
                alert("The solution is incorrect!");
                return;
            }
        }
    }
    alert("Congratulations, you've solved it!");
}

// Check if a value is valid in its row, column, and 3x3 block
function isValid(value, row, col) {
    // Check the row
    for (let j = 0; j < 9; j++) {
        if (j !== col && value == (document.getElementById(`cell-${row}-${j}`)?.value || puzzle[row][j])) {
            return false;
        }
    }
    // Check the column
    for (let i = 0; i < 9; i++) {
        if (i !== row && value == (document.getElementById(`cell-${i}-${col}`)?.value || puzzle[i][col])) {
            return false;
        }
    }
    // Check the 3x3 block
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if ((i !== row || j !== col) && value == (document.getElementById(`cell-${i}-${j}`)?.value || puzzle[i][j])) {
                return false;
            }
        }
    }
    return true;
}

// Initial render
renderGrid();
