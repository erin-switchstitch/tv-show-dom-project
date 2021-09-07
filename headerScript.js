const selectBox = document.getElementById("selectBoxID");
const inputBox = document.getElementById("inputBoxID");
const targetBoxes = document.getElementsByClassName("box");
const seriesContainer = document.getElementsByClassName("seriesContainer")[0];
const seriesTextContainer = document.getElementsByClassName("seriesTextContainer")[0];


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


function showSelectBox(index){
    if (index === 2){
        cl(inputBox.classList);
        // inputBox.style.display = "flex";
        inputBox.classList.remove("Hidden");
        inputBox.style.transitionDuration = "500ms";
        inputBox.classList.add("Show");
    } else {
        selectBox.classList.remove("Hidden");
        selectBox.style.transitionDuration = "500ms";
        selectBox.classList.add("Show");
    }

}

function hideSelectBox(index){
    if (index === 2){
        cl(inputBox.classList);
        inputBox.classList.remove("Show");
        inputBox.style.transitionDuration = "500ms";
        inputBox.classList.add("Hidden");
    } else {
        selectBox.classList.remove("Show");
        selectBox.classList.add("Hidden");
    }
}

function showSeriesText(){
    if (alreadyMoved === false){
        seriesContainer.style.zIndex = "0";
        seriesTextContainer.style.opacity = "1";
        cl("check below .........")
        cl(seriesContainer);
    }

}

function hideSeriesText(){
    seriesTextContainer.style.opacity = "0.2";
    seriesContainer.style.zIndex = "-1";
    cl("check below .........")
    cl(seriesContainer);
}


function newBoxClicked(currentBox, index, fasterSpeed, lowerSpeed){
    
    hideSeriesText();
    let currentBoxTranslateX = `${moveLeft * index}`;
   
    // When the first box is clicked the transition duration is set to the fast
    // speed and moves the box down in 0.5s.  
    if (index === 0){
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;


        
        setTimeout(function(){
            cl("Select Across")
            showSelectBox(index);
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
                showSelectBox(index);
            }, (switchDelay));

        }, (fasterSpeed));
        
    } 
};

function sameBoxReturn(currentBox, index, fasterSpeed, lowerSpeed){
    
    if (index != 0){
        currentBox.classList.remove("moved");
        hideSelectBox(index);
        currentBox.style.transform = `translateX(0px) translateY(${moveDown})`;
        
        setTimeout(function(){
            currentBox.style.transform = `translateY(0)`;

            setTimeout(function(){            
                showSeriesText();
            }, (fasterSpeed));

        }, (fasterSpeed));

    } else {
        hideSelectBox(index);

        setTimeout(function(){
            currentBox.style.transitionDuration = `${fasterSpeed}ms`;
            currentBox.style.transform = `translateY(0)`;
            currentBox.classList.remove("moved");
            
            setTimeout(function(){            
                showSeriesText();
            }, (fasterSpeed));

        }, (fasterSpeed));
    }

};
