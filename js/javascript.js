const grid = document.getElementById('gridContainer')
const box = document.getElementById('box');
const resizebtn = document.getElementById('resize')
const gridCallout = document.getElementById('gridCallout');
const shadebtn = document.getElementById('shade');
const magic = document.getElementById('magic');

resizebtn.addEventListener('click', resize);
shadebtn.addEventListener('click', shadeMode);
magic.addEventListener('click', magicToggle);

let mode = 'normal';
let magicMode = 'off';
let fillColor = 'rgba(51, 51, 51,';
let colors = [
    'rgba(249, 200, 14,'  /*'#F9C80E' yellow*/,
    'rgba(255, 153, 204,'  /*'#FF99CC' pink*/,
    'rgba(34, 111, 84,'  /*'#226F54' green*/, 
    'rgba(67, 188, 205,'  /*'#43BCCD' blue*/,
    'rgba(102, 46, 155,'  /*'#662E9B' purple*/,
    'rgba(248, 102, 36,'  /*'#F86624' orange*/,
    'rgba(234, 53, 70,'  /*'#EA3546' red*/
    ];
let aValue = ' 1.0)'

function magicText() {
    const letters = document.querySelectorAll('#magic > span');
    let i = 0;
    magic.style.textShadow = "0 0 8px pink";

    letters.forEach((span) => {
        let color = colors[i];
        const letter = span;
        letter.style.color = color + aValue;
        i++;
    });
}

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
    } else {
        for (let i = 0; i < 256; i++) {
            gridBox();
        }
    }
}

function shadeMode(){
    if (mode === 'normal') {
        mode = 'shading';
        shadebtn.classList.add('active-btn')
    } else if (mode === 'shading'){
        mode = 'normal'
        shadebtn.classList.remove('active-btn')
    }
}

function magicToggle(){
    if (magicMode === 'off') {
        magicMode = 'on';
        magicText();
    } else if (magicMode === 'on'){
        magicMode = 'off';
        magic.style.textShadow = "none";
        fillColor = 'rgba(51, 51, 51,';
        const letters = document.querySelectorAll('#magic > span');
        letters.forEach((span) => {
            const letter = span;
            letter.style.color = '#FFF';
        });
    }
}

function resize() {
    const entry = prompt('New Grid: How many sqaures on each side? (max 100)', '');
    if (entry > 100 || entry <= 1) {
        alert('Please enter a number between 1 and 100.')
    } else if (entry <= 100) {
        console.log(entry);
        let rows = entry * entry;
        fillGrid(rows);
        clear();
        gridCallout.innerText = `${entry}x${entry}`;
    } else if (typeof entry == 'string') {
        alert('Please enter a number between 1 and 100.')
    }
}

function draw(){
    const gridSquares = document.querySelectorAll('#gridContainer > div');

    gridSquares.forEach((square) => {
        const gridSquare = square;
        gridSquare.count = 1;
        gridSquare.addEventListener('mouseover', (e) => {
            if (mode === 'normal') {
                if (magicMode === 'on') {
                    const randomColor = Math.floor(Math.random() * colors.length);
                    fillColor = colors[randomColor];
                }
                e.target.style.backgroundColor = fillColor + aValue;
                //e.target.style.borderColor = 'rgba(200, 200, 200, .5';
            } else if (mode === 'shading'){
                if (magicMode === 'on') {
                    const randomColor = Math.floor(Math.random() * colors.length);
                    fillColor = colors[randomColor];
                }
                let shadeFactor = 0.10 * e.target.count;
                //let lightenFactor = 1 - shadeFactor + 0.25;
                let shadeValue = shadeFactor.toString() + ')';
                //let lightenValue = lightenFactor.toString() + ')';
                e.target.style.backgroundColor = fillColor + shadeValue;
                //e.target.style.borderColor = 'rgba(200, 200, 200,' + lightenValue;
                e.target.count++;
            } 
        })
    });
}

function clear() {
    const gridSquares = document.querySelectorAll('#gridContainer > div');
    gridSquares.forEach((square) => {
        const gridSquare = square;
        gridSquare.style.backgroundColor = '#FFF';
        //gridSquare.style.borderColor = 'rgba(200, 200, 200, 1.0)'
        gridSquare.count = 0.5;
        gridSquare.shadeFactor = 0.1;
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