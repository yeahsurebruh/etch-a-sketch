const container = document.querySelector(".container");

const row_len = 16;
const column_len = 16;

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

function boxCreate(contianer, boxId){
    const box = document.createElement("div");
    box.classList.toggle("box");
    box.id = boxId;
    contianer.appendChild(box);
    return box;
}

function gridCreate(container){
    for(let i=0; i<row_len; i++){
        rows[i] = rowCreate(container, i);
        for(let j=0; j<column_len; j++){
            boxes[i][j] = boxCreate(rows[i], (i.toString()+","+j.toString()));
        }
    }
}

gridCreate(container);