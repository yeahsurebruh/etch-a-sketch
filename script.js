const container = document.querySelector(".container");

const grayscaleGradient = [
    "#eeeeee", "#dddddd", "#cccccc", "#bbbbbb", "#aaaaaa",
    "#999999", "#888888", "#777777", "#666666", "#555555",
    "#4c4c4c", "#444444", "#3c3c3c", "#343434", "#2c2c2c",
    "#242424", "#1c1c1c", "#181818", "#141414", "#101010",
    "#0c0c0c", "#080808", "#040404", "#020202", "#000000"
  ];  

function randomColorPicker(){
    const id = Math.floor(Math.random()*grayscaleGradient.length);
    return grayscaleGradient[id];
}

function twoDimArrayCreate(row_len, column_len, fillElement){
    const arr = new Array(column_len);
    for(let i=0; i<column_len; i++){
        arr[i] = new Array(row_len).fill(fillElement);
    }
    return arr;
}

let row_len = Math.floor(window.innerWidth/40);
let column_len = Math.floor(window.innerHeight/40);

function lengthUpdate(){
    row_len = Math.floor(window.innerWidth/40);
    column_len = Math.floor(window.innerHeight/40);
}

function rowCreate(container, rowId){
    const row = document.createElement("div");
    row.classList.toggle("row");
    row.id = rowId.toString();
    container.appendChild(row);
    return row;
}

function boxCreate(container, boxId){
    const box = document.createElement("div");
    box.classList.toggle("box");
    box.id = boxId;
    box.addEventListener("mouseover", (e)=>{
        e.target.style.backgroundColor = randomColorPicker();
    });
    container.appendChild(box);
    return box;
}

function gridCreate(container){
    const rows = new Array(column_len).fill(null);
    const boxes = twoDimArrayCreate(row_len, column_len, null);
    for(let i=0; i<column_len; i++){
        rows[i] = rowCreate(container, i);
        for(let j=0; j<row_len; j++){
            boxes[i][j] = boxCreate(rows[i], (i.toString()+","+j.toString()));
        }
    }
    return [rows, boxes];
}

let [oldRows, oldBoxes] = gridCreate(container);

function gridDelete(){
    const boxColors = twoDimArrayCreate(row_len, column_len, null);
    for(let i=0; i<column_len; i++){
        for(let j=0; j<row_len; j++){
            boxColors[i][j] = oldBoxes[i][j].style.backgroundColor;
        }
        oldRows[i].remove();
    }
    return boxColors;
}

function gridUpdate(container){
    const boxColors = gridDelete();
    lengthUpdate();
    [oldRows, oldBoxes] = gridCreate(container);
    for(let i=0; (i<oldBoxes.length && i<boxColors.length); i++){
        for(let j=0; (j<oldBoxes[i].length && j<boxColors[i].length); j++){
            oldBoxes[i][j].style.backgroundColor = boxColors[i][j];
        }
    }
    return [oldRows, oldBoxes];
}

window.addEventListener("resize", ()=>{
    [oldRows, oldBoxes] = gridUpdate(container);
})