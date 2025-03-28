const gridContainer =document.querySelector('#grid-container');
const  clearButton = document.querySelector('#clear');
const  resizeButton = document.querySelector('#resize');
const  modeButtons  = document.querySelectorAll(".mode");

let currentMode ='black';

//Create a div container for the grid

function createGrid(gridSize) {
    gridContainer.innerHTML= "";
    gridContainer.style.display ="flex";
    gridContainer.style.flexWrap = "wrap";
    gridContainer.style.width = "450px";
    gridContainer.style.height = "450px";

    let squareSize = 450 / gridSize;

for(let i= 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
   div.style.width = `${squareSize}px`;
   div.style.height = `${squareSize}px`;
   div.style.border = '1px solid #fff';
   div.style.backgroundColor='#f5f4e9';
   div.dataset.shade  = 0;

//add event listeners to the divs
    div.addEventListener('mouseover', () => {
         applyColor(div);
});
    gridContainer.appendChild(div);

}
}
//function to select color based on mode
function applyColor(div) {
    if (currentMode === "rainbow") {
        div.style.backgroundColor = getRandomColor();
    } else if (currentMode === "grayscale") {
        console.log("Grayscale activated");
        let shade = parseInt(div.dataset.shade) || 0;

        if (shade < 10){
            shade += 1;
            div.dataset.shade = shade;
            let grayValue = shade * 50;
            div.style.backgroundColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
            } 
        } 
        else if (currentMode === "black") {
                div.style.backgroundColor ='black';
            }
        }

//get random color function
function getRandomColor(){
    const hue = Math.floor(Math.random() * 360);  // 0 to 360 (full color spectrum)
    return `hsl(${hue}, 100%, 50%)`;
}

modeButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentMode = button.dataset.mode; // Change mode
    });
});

//clear button event listener
clearButton.addEventListener('click',() =>{
    document.querySelectorAll(".grid-item").forEach(item =>{
        item.style.backgroundColor ="";
        item.dataset.shade = 0 

    });
});

//resize button event listener
resizeButton.addEventListener('click',() =>{
    let newSize = prompt("Enter new grid size (max 100): ");
    if (newSize > 0 && newSize <= 100){
        createGrid(newSize);
    } else{
        alert("Please enter a valid number bewttween 1 and 100");
    }
});

createGrid(16);