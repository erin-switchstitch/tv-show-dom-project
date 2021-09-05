const selectBox = document.getElementById("selectBoxID");
const targetBoxes = document.getElementsByClassName("box");

const moveLeft = window.innerWidth / (targetBoxes.length);
const moveDown = "10vh"; 
const move1speed = 500;
const move2speed = 1000;
const switchDelay = 100;

let alreadyMoved = false;
let currentMovedIndex = -1; 




for (let i=0; i < targetBoxes.length; i++){
    const currentBox = targetBoxes[i];

    currentBox.addEventListener("click", function(){
        cl(currentBox);
        cl(currentMovedIndex);

        // First box clicked
        if ((alreadyMoved === false) && (currentMovedIndex <0)) {
            cl("First box clicked");
            newBoxClicked(currentBox, i, move1speed, move2speed);
            // showSelectBox(move2speed);
            alreadyMoved = true; 
            currentMovedIndex = i ; 

        // Same box returned
        } else if ((alreadyMoved === true) && (currentMovedIndex === i)) {
            cl("Same box returned");
            sameBoxReturn(currentBox, currentMovedIndex, move1speed, move2speed);
            alreadyMoved = false; 
            currentMovedIndex = -1 ;

        // Different Boxes Switch > Greater
        } else if ((alreadyMoved === true) && ( i > currentMovedIndex)) {
            cl("Diff Box Switch > Greater");
            cl(currentBox);
            sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move1speed);
            
            setTimeout(function(){
                newBoxClicked(currentBox, i, move1speed, move2speed);
            }, (switchDelay));
            
            alreadyMoved = true; 
            currentMovedIndex = i ; 

        // Different boxes switch < Less Than 
        } else if (((alreadyMoved === true) && ( i < currentMovedIndex) && (i != -1))){
            cl("Diff Box Switch < LessThan");
            cl(currentBox);
            sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move2speed);
            
            setTimeout(function(){
                newBoxClicked(currentBox, i, move1speed, move2speed);
            }, (switchDelay));
            
            alreadyMoved = true; 
            currentMovedIndex = i ; 
        }    

        cl(currentMovedIndex);
        cl(alreadyMoved)
    });
};



function showSelectBox(speed){
    selectBox.classList.remove("Hidden");
    selectBox.style.transitionDuration = "500ms";
    selectBox.classList.add("Show");
}

function hideSelectBox(speed){
    selectBox.classList.remove("Show");
    selectBox.classList.add("Hidden");
}

function newBoxClicked(currentBox, index, fasterSpeed, lowerSpeed){
    
    let currentBoxTranslateX = `${moveLeft * index}`;
   
    // When the first box is clicked the transition duration is set to the fast
    // speed and moves the box down in 0.5s.  
    if (index === 0){
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;
        
        setTimeout(function(){
            cl("Select Across")
            showSelectBox();
        }, (fasterSpeed));

    // When a new box is clicked and is not the first box
    } else if (index !== 0) {
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${lowerSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;
        console.log("Box Down")
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;

        setTimeout(function(){
            console.log("Box Across")
            currentBox.style.transform = `translateY(${moveDown}) translateX(-${currentBoxTranslateX}px)`;
            
            setTimeout(function(){
                cl("Select Across")
                showSelectBox();
            }, (switchDelay));

        }, (fasterSpeed));
        
    } 
};

function sameBoxReturn(currentBox, index, fasterSpeed, lowerSpeed){
    
    if (index != 0){
        currentBox.classList.remove("moved");
        hideSelectBox(fasterSpeed);
        currentBox.style.transform = `translateX(0px) translateY(${moveDown})`;
        
        setTimeout(function(){
            currentBox.style.transform = `translateY(0)`;
        }, (fasterSpeed));

    } else {
        hideSelectBox(fasterSpeed);

        setTimeout(function(){
            currentBox.style.transitionDuration = `${fasterSpeed}ms`;
            currentBox.style.transform = `translateY(0)`;
            currentBox.classList.remove("moved");
        }, (fasterSpeed));
    }
};
