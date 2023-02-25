const grid = document.getElementById('gridContainer')
const box = document.getElementById('box');
const resizebtn = document.getElementById('resize')
const gridCallout = document.getElementById('gridCallout');

resizebtn.addEventListener('click', () => resize());

function gridBox() {
    const makeGrid = document.createElement('div');
    makeGrid.setAttribute('class', 'grid-box');
    makeGrid.setAttribute('id', 'box');
    grid.appendChild(makeGrid);
}


function fillGrid(rows) {
    if (rows) {
        removeGrid();
        for (let i = 0; i < rows; i++) {
            gridBox();
        }
        const grid = document.querySelectorAll('.grid-container>*')
        let value = (100 / (Math.sqrt(rows))).toString() + '%';
        grid.forEach((square) => {
            const gridSquare = square;
            gridSquare.style.flexBasis = value;
        });
        draw();
        console.log('flex' + value);
    } else {
        for (let i = 0; i < 256; i++) {
            gridBox();
        }
        console.log('Default 16x16');
    }
}

function resize() {
    const entry = prompt('New Grid: How many sqaures on each side? (max 100)', '');
    if (entry > 100 || entry <= 1) {
        alert('Please enter a number between 1 and 100.')
    } else if (entry <= 100) {
        console.log(entry);
        let rows = entry * entry;
        //console.log(rows);
        fillGrid(rows);
        clear();
        gridCallout.innerText = `${entry}x${entry}`;
        console.log(rows + ' sqaures');
    } else if (typeof entry == 'string') {
        alert('Please enter a number between 1 and 100.')
    }
}

function draw(){
    const gridSquares = document.querySelectorAll('#gridContainer > div');

    gridSquares.forEach((square) => {
        const gridSquare = square;
            gridSquare.addEventListener('mouseover', (e) => {
                e.target.classList.add('fill');
            });
        }
    );
}

function clear() {
    const gridSquares = document.querySelectorAll('#gridContainer > div');
    gridSquares.forEach((square) => {
        const gridSquare = square;
        gridSquare.classList.remove('fill');
        console.log('cleared');
    });
}

function clearEvent(){
    const clearbtn = document.getElementById('clear');

    clearbtn.addEventListener('click', clear); 
}

function removeGrid() {
    const gridSquares = document.querySelectorAll('#gridContainer > div');
    gridSquares.forEach((square) => {
        const gridSquare = square;
        gridSquare.remove();
    });
}



function play() {
    fillGrid();
    draw();
    clearEvent();
}

play();