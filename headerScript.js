// const selectBox = document.getElementById("selectBoxID");
// const inputBox = document.getElementById("inputBoxID");
// const targetBoxes = document.getElementsByClassName("box");
// const seriesContainer = document.getElementsByClassName("seriesContainer")[0];
// const seriesTextContainer = document.getElementsByClassName("seriesTextContainer")[0];

/* -----------------------UPDATE MOVE LEFT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ----------------------- */

const moveDown = "10vh"; 
const move1speed = 500;
const move2speed = 1000;
const switchDelay = 100;

let alreadyMoved = false;
let currentMovedIndex = -1; 


for (let i=0; i < targetBoxes.length; i++){
    const currentBox = targetBoxes[i];

    
    window.onresize = function(){
        if(currentMovedIndex >= 0){
            cl("currentMovedIndex : " + currentMovedIndex)
            console.log("resize");
            cl("currentBox : " + currentBox)
            sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move2speed);
            alreadyMoved = false; 
            currentMovedIndex = -1 ;
        }
    }
    


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


function showSelectBox(index, innerBoxSize){
    cl("innerBoxSize : "+ innerBoxSize)
    if (index === 3){
        cl(inputBox.classList);
        // inputBox.style.display = "flex";
        inputBox.classList.remove("Hidden");
        inputBox.style.transitionDuration = "500ms";
        inputBox.style.marginLeft = `${(innerBoxSize)}px`;
        inputBox.classList.add("Show");

    } else if (index === 1){
        episodeNumBoxID.classList.remove("Hidden");
        episodeNumBoxID.style.transitionDuration = "500ms";
        episodeNumBoxID.style.marginLeft = `${(innerBoxSize)}px`;
        episodeNumBoxID.classList.add("Show");
    } else if (index === 2){
        selectBox.classList.remove("Hidden");
        selectBox.style.transitionDuration = "500ms";
        selectBox.style.marginLeft = `${(innerBoxSize)}px`;
        selectBox.classList.add("Show");
    } else if (index === 0){
        seriesSelectBox.classList.remove("Hidden");
        seriesSelectBox.style.transitionDuration = "500ms";
        seriesSelectBox.style.marginLeft = `${(innerBoxSize)}px`;
        seriesSelectBox.classList.add("Show");
    }

}

function hideSelectBox(index, innerBoxSize){
    
    if (index === 3){
        cl(inputBox.classList);
        inputBox.classList.remove("Show");
        inputBox.style.transitionDuration = "500ms";
        inputBox.style.marginLeft = `-${(innerBoxSize*3)}px`;
        inputBox.classList.add("Hidden");

    } else if (index==1){
        episodeNumBoxID.classList.remove("Show");
        episodeNumBoxID.style.transitionDuration = "500ms";
        episodeNumBoxID.style.marginLeft = `-${(innerBoxSize*3)}px`;
        episodeNumBoxID.classList.add("Hidden");

    } else if (index === 2){
        selectBox.classList.remove("Show");
        selectBox.style.transitionDuration = "500ms";
        selectBox.style.marginLeft = `-${(innerBoxSize*3)}px`;
        selectBox.classList.add("Hidden");
    } else if (index === 0){
        seriesSelectBox.classList.remove("Show");
        seriesSelectBox.style.transitionDuration = "500ms";
        seriesSelectBox.style.marginLeft = `-${(innerBoxSize*3)}px`;
        seriesSelectBox.classList.add("Hidden");
    }
}

function showSeriesText(){
    if (alreadyMoved === false){
        
        // setTimeout(function(){
        //     subHeaderContainer.style.zIndex = "5";
        // }, (2000));

        seriesTextContainer.animate([
            // keyframes
            { opacity: '0' },
            { opacity: '1' }
            ], {
            // timing options
            duration: 1500,
            });
        subHeaderContainer.animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0' }
            ], {
            // timing options
            duration: 1000,
            }); 
        subHeaderContainer.style.opacity = "0";
        seriesTextContainer.style.opacity = "1";    
        seriesContainer.style.zIndex = "6";
        // subHeaderContainer.style.zIndex = "5";
        
        cl("check below .........")
        cl(seriesContainer);
        
    }

}

function hideSeriesText(){
    seriesTextContainer.animate([
        // keyframes
        { opacity: '1' },
        { opacity: '0' }
        ], {
        // timing options
        duration: 1000,
        });
    seriesTextContainer.style.opacity = "0";
    seriesContainer.style.zIndex = "-1";
    subHeaderContainer.style.zIndex = "9";
    subHeaderContainer.style.opacity = "1";
    cl("check below .........")
    cl(seriesContainer);
}


function newBoxClicked(currentBox, index, fasterSpeed, lowerSpeed){
    cl(headerTag)
    cl(headerTag.offsetWidth);
    let moveLeft = headerTag.offsetWidth / (targetBoxes.length);
    let currentBoxTranslateX = `${moveLeft * index}`;
   
    // When the first box is clicked the transition duration is set to the fast
    // speed and moves the box down in 0.5s.  
    if (index === 0){
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;
        hideSeriesText();

        
        setTimeout(function(){
            cl("Select Across")

            showSelectBox(index, moveLeft);
        }, (fasterSpeed));

    // When a new box is clicked and is not the first box
    } else if (index !== 0) {
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${lowerSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;
        console.log("Box Down")
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;
        hideSeriesText();
        
        setTimeout(function(){
            console.log("Box Across")
            currentBox.style.transform = `translateY(${moveDown}) translateX(-${currentBoxTranslateX}px)`;
            
            setTimeout(function(){
                cl("Select Across")

                showSelectBox(index, moveLeft);
            }, (switchDelay));

        }, (fasterSpeed));
        
    } 
};

function sameBoxReturn(currentBox, index, fasterSpeed, lowerSpeed){

    let moveLeft = headerTag.offsetWidth / (targetBoxes.length);

    if (index != 0){
        currentBox.classList.remove("moved");
        hideSelectBox(index, moveLeft);
        currentBox.style.transform = `translateX(0px) translateY(${moveDown})`;
        
        setTimeout(function(){
            currentBox.style.transform = `translateY(0)`;

            setTimeout(function(){            
                showSeriesText();
            }, (fasterSpeed));

        }, (fasterSpeed));

    } else {
        hideSelectBox(index, moveLeft);

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


