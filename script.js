const container = document.querySelector(".container");

let boxSideLength = 40;

const boxStyle = document.createElement("style");

function boxLengthUpdate(){
    boxSL = Number(prompt("Enter desired length for side of the squares (default is 40)"));
    if(boxSL === 0){
        boxSL = boxSideLength;
    }
    else if((!boxSL) || (boxSL < 0)){
        alert("Enter valid positive value");
        boxLengthUpdate();
        return;
    }
    boxSideLength = boxSL;
    boxStyle.textContent = `
        .box {
            margin: 1px 1px;
            border: 1px solid black;
            height: ${boxSideLength}px;
            width: ${boxSideLength}px;
        }
    `;
}

boxLengthUpdate();
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

function twoDimArrayCreate(row_len, column_len, fillElement){
    const arr = new Array(column_len);
    for(let i=0; i<column_len; i++){
        arr[i] = new Array(row_len).fill(fillElement);
    }
    return arr;
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
        const color = randomColorPicker();
        e.target.style.backgroundColor = color;
        e.target.style.borderColor = color;
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

function gridDelete(oldRows){
    for(let i=0; i<column_len; i++){
        oldRows[i].remove();
    }
}

function getUserRowColumn() {
    let rows = Number(prompt("Enter row size (if 0 it will retain previous value)"));
    let columns = Number(prompt("Enter column size (if 0 it will retain previous value)"));
  
    if (rows === 0) {
      rows = row_len; 
    }
    if (columns === 0) {
      columns = column_len;
    }
  
    if (!rows || !columns || rows < 0 || columns < 0) {
      alert("Enter valid positive values.");
      getUserRowColumn();
      return;
    }
  
    row_len = rows;
    column_len = columns;
  }

const editBtn = document.querySelector(".edit-btn");

editBtn.addEventListener("click", (e)=>{
    gridDelete(oldRows);
    boxLengthUpdate();
    getUserRowColumn();
    [oldRows, oldBoxes] = gridCreate(container);
});