const container = document.querySelector(".container");

let boxSideLength = 40;
boxSideLength = prompt("Enter desired length for side of the squares (default is 40)");

const boxStyle = document.createElement("style");

function boxLengthUpdate(boxSideLength){
    boxStyle.textContent = `
        .box {
            margin: 1px 1px;
            border: 1px solid black;
            height: ${boxSideLength}px;
            width: ${boxSideLength}px;
        }
    `;
}

boxLengthUpdate(boxSideLength);
document.head.appendChild(boxStyle);

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

let row_len = 16;
let column_len = 16;

const rows = new Array(column_len).fill(null);
const boxes = new Array(column_len);
for(let i=0; i<column_len; i++){
    boxes[i] = new Array(row_len).fill(null);
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

function gridCreate(container, row_len, column_len){
    for(let i=0; i<column_len; i++){
        rows[i] = rowCreate(container, i);
        for(let j=0; j<row_len; j++){
            boxes[i][j] = boxCreate(rows[i], (i.toString()+","+j.toString()));
        }
    }
}

gridCreate(container, row_len, column_len);