//global vars
let totalColors = 0;
let initialNumberOfColors = 8;
let canvasSize = 3;
let selectedColor = undefined;
let canvas = [];

window.onload = function() {
    init();
    //this is the modal used for providing info when the user first opens the website.
    document.getElementById('myModal').style.display = "block";
};
window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
       modal.style.display = "none";
    }
};

//initializing function, which creates the colors and canvas.
function init() {
    createColors(initialNumberOfColors);
    createCanvas();
    displayCanvasSize();
}

function createCanvas() {
    adjustCanvas(canvasSize);
}

function adjustCanvas(size) {
    let columnsStyling = "";
    document.getElementById("canvas").innerText = "";
    for (let i = 0; i < size; i++) {
        columnsStyling += 'auto ';
        for (let j = 0; j < size; j++) {
                document.getElementById("canvas").innerHTML +=
                    `<div  onclick="colorCanvas('${i},${j}')" id = "${i},${j}" class="grid-item">${i},${j}</div>`;
                document.getElementById(`${i},${j}`).style.order = `${i}${j}`;
        }
        document.getElementById("canvas").style.gridTemplateColumns = columnsStyling;
    }
}

function addEraser() {
    document.getElementById("box").innerHTML +=
        `<div onclick="changeColor('eraser')" id = "eraser" class="grid-item colorHeight">Eraser</div>`;
    document.getElementById('eraser').style.backgroundColor = 'White';
}

function createColors(numberOfColors) {
    addEraser();
    for(let i = 0 ; i < numberOfColors ; i++){
        addColor();
    }
}

function addColor() {
    document.getElementById("box").innerHTML +=
        `<div onclick="changeColor('Color${totalColors}')" id = "Color${totalColors}" 
                                class="grid-item colorHeight">${totalColors}</div>`;
    styleWithRandomColor("Color"+totalColors);
    totalColors++;
}

function styleWithRandomColor(id) {
    document.getElementById(id).style.backgroundColor =
        'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256))
        + ',' + (Math.floor(Math.random() * 256)) + ')';
}

function changeColor(id) {
    selectedColor = document.getElementById(id).style.backgroundColor;
    displaySelectedColor(id);
}

function displaySelectedColor(id) {
    document.getElementById('colorSelected').innerHTML = `<p>Color Selected = ${id} (${selectedColor})</p>`
}

function colorCanvas(id) {
    if(selectedColor) {
        canvas[id] = selectedColor;
        document.getElementById(id).style.backgroundColor = selectedColor;
    }
}

function addCanvas() {
    canvasSize++;
    displayCanvasSize();
    let columnsStyling = "";
    for(let i = 0; i < canvasSize; i++){
        columnsStyling += 'auto ';
        document.getElementById("canvas").innerHTML += `<div  onclick="colorCanvas('${i},${canvasSize - 1}')" id
                                    = "${i},${canvasSize - 1}" class="grid-item">${i},${canvasSize - 1}</div>`;
        document.getElementById(`${i},${canvasSize - 1}`).style.order = `${i}${canvasSize - 1}`;
        if(i < canvasSize - 1){
            document.getElementById("canvas").innerHTML += `<div  onclick="colorCanvas('${canvasSize - 1},${i}')" id 
                                            = "${canvasSize - 1},${i}" class="grid-item">${canvasSize - 1},${i}</div>`;
            document.getElementById(`${canvasSize - 1},${i}`).style.order = `${canvasSize - 1}${i}`;
            document.getElementById(`${canvasSize - 1},${i}`).style.backgroundColor = canvas[`${canvasSize - 1},${i}`];
            document.getElementById(`${canvasSize - 1},${i}`).style.order = `${canvasSize - 1}${i}`;
        }
        document.getElementById(`${i},${canvasSize - 1}`).style.backgroundColor = canvas[`${i},${canvasSize - 1}`];
        document.getElementById(`${i},${canvasSize - 1}`).style.order = `${i}${canvasSize - 1}`;

    }
    document.getElementById("canvas").style.gridTemplateColumns = columnsStyling;
}

function displayCanvasSize() {
    document.getElementById('canvasSize').innerHTML = `<h3>Canvas Size = ${canvasSize} X ${canvasSize} </h3>`
}

function decCanvasSize() {
    if(canvasSize <= 0 ) return;
    canvasSize--;
    clearCanvasState();
    displayCanvasSize();
}

function clearCanvasState() {
    let columnsStyling = "";
    for(let i = 0; i < canvasSize; i++){
        columnsStyling += 'auto ';
        document.getElementById(`${i},${canvasSize}`).remove();
        document.getElementById(`${canvasSize },${i}`).remove();
        canvas[`${i},${canvasSize}`] = undefined;
        canvas[`${canvasSize},${i}`] = undefined;
    }
    document.getElementById(`${canvasSize},${canvasSize}`).remove();
    canvas[`${canvasSize},${canvasSize}`] = undefined;
    document.getElementById("canvas").style.gridTemplateColumns = columnsStyling;
}

function refreshColors() {
    for(let i = 0 ; i < totalColors; i++){
        styleWithRandomColor(`Color${i}`);
    }
}
