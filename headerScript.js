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
            // cl("currentMovedIndex : " + currentMovedIndex)
            console.log("resize");
            // cl("currentBox : " + currentBox)
            sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move2speed);
            alreadyMoved = false; 
            currentMovedIndex = -1 ;
        }
    }
    


    currentBox.addEventListener("click", function(){
        cl(currentBox);
        // cl(currentMovedIndex);

        if (currentBox.classList.contains("showing")) {
            
            // First box clicked
            if ((alreadyMoved === false) && (currentMovedIndex <0)) {
                // cl("First box clicked");
                newBoxClicked(currentBox, i, move1speed, move2speed);
                alreadyMoved = true; 
                currentMovedIndex = i ; 

            // Same box returned
            } else if ((alreadyMoved === true) && (currentMovedIndex === i)) {
                //cl("Same box returned");
                sameBoxReturn(currentBox, currentMovedIndex, move1speed, move2speed);
                alreadyMoved = false; 
                currentMovedIndex = -1 ;


            // Different Boxes Switch > Greater
            } else if ((alreadyMoved === true) && ( i > currentMovedIndex)) {
                //cl("Diff Box Switch > Greater");
                //cl(currentBox);
                sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move1speed);

                setTimeout(function(){
                    newBoxClicked(currentBox, i, move1speed, move2speed);
                }, (switchDelay));

                alreadyMoved = true; 
                currentMovedIndex = i ; 

            // Different boxes switch < Less Than 
            } else if (((alreadyMoved === true) && ( i < currentMovedIndex) && (i != -1))){
                //cl("Diff Box Switch < LessThan");
                //cl(currentBox);
                sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move2speed);

                setTimeout(function(){
                    newBoxClicked(currentBox, i, move1speed, move2speed);
                }, (switchDelay));

                alreadyMoved = true; 
                currentMovedIndex = i ; 
            }    
        }
    });
};


function showSelectBox(index, innerBoxSize){
    //cl("innerBoxSize : "+ innerBoxSize)
    if (index === 0){
        seriesSelectBox.classList.remove("Hidden");
        seriesSelectBox.style.transitionDuration = "500ms";
        seriesSelectBox.style.marginLeft = `${(innerBoxSize)}px`;
        seriesSelectBox.classList.add("Show");
        
    } else if (index === 1){
        seasonsSelectBox.classList.remove("Hidden");
        seasonsSelectBox.style.transitionDuration = "500ms";
        seasonsSelectBox.style.marginLeft = `${(innerBoxSize)}px`;
        seasonsSelectBox.classList.add("Show");

    } else if (index === 2){
        episodesSelectBox.classList.remove("Hidden");
        episodesSelectBox.style.transitionDuration = "500ms";
        episodesSelectBox.style.marginLeft = `${(innerBoxSize)}px`;
        episodesSelectBox.classList.add("Show");

    } else if (index === 3){
        cl("showSelectBox Search run")

        // subSearchInputBoxToggle ();
        subSearchToggleFunction("subSearchOne");

        for (let i = 0; i < inputBoxes.length; i++) {
            cl("input run")    
            const currentInputBox = inputBoxes[i];
            cl(currentInputBox)
            currentInputBox.classList.remove("Hidden");
            cl(currentInputBox.classList.remove("Hidden"))
            currentInputBox.style.transitionDuration = "500ms";
            // inputBoxesContainer[0].style.marginLeft = `${(innerBoxSize)}px`;
            currentInputBox.classList.add("Show");
        }
    }

}

function hideSelectBox(index, innerBoxSize){
    
    if (index === 0){
        seriesSelectBox.classList.remove("Show");
        seriesSelectBox.style.transitionDuration = "500ms";
        seriesSelectBox.style.marginLeft = `-${(innerBoxSize*3)}px`;
        seriesSelectBox.classList.add("Hidden");
    } else if (index==1){
        seasonsSelectBox.classList.remove("Show");
        seasonsSelectBox.style.transitionDuration = "500ms";
        seasonsSelectBox.style.marginLeft = `-${(innerBoxSize*3)}px`;
        seasonsSelectBox.classList.add("Hidden");

    } else if (index === 2){
        episodesSelectBox.classList.remove("Show");
        episodesSelectBox.style.transitionDuration = "500ms";
        episodesSelectBox.style.marginLeft = `-${(innerBoxSize*3)}px`;
        episodesSelectBox.classList.add("Hidden");
    } else if (index === 3){

        subSearchInputBoxToggle ();
        for (let i = 0; i < inputBoxes.length; i++) {
            cl("input run")    
            const currentInputBox = inputBoxes[i];
            cl(currentInputBox)
            inputBoxes[3].classList.remove("readOnlyClass");
            currentInputBox.classList.remove("Show");
            currentInputBox.style.transitionDuration = "500ms";
            // currentInputBox.style.marginLeft = `-${(innerBoxSize)}px`;
            currentInputBox.classList.add("Hidden");
        }
        
    }
}

function returnSeriesText(){
    if (alreadyMoved === false){

        seriesContainer.animate([
            // keyframes
            { paddingTop: '10vh' },
            { paddingTop: '0vh' }
            ], {
            // timing options
            duration: 300,
        });
        seriesContainer.style.paddingTop = "0vh";
        seriesContainer.style.zIndex = "6";
        seriesTextContainer.style.background = "linear-gradient(to bottom, #40095e,rgba(32, 32, 32, 0.979),rgba(32, 32, 32, 0.9),rgba(32, 32, 32, 0.8),rgba(32, 32, 32, 0.85),rgba(32, 32, 32, 0.8));"
        
        // setTimeout(function(){
        //     subHeaderContainer.style.zIndex = "5";
        // }, (2000));

        // seriesTextContainer.animate([
        //     // keyframes
        //     { opacity: '0' },
        //     { opacity: '1' }
        //     ], {
        //     // timing options
        //     duration: 1500,
        //     });
        // seriesTextContainer.style.opacity = "1";    

        cl("subHeader Container Opacity Change")
        subHeaderContainer.animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0' }
            ], {
            // timing options
            duration: 1000,
            }); 
        subHeaderContainer.style.opacity = "0";
        subHeaderContainer.style.zIndex = "5";
    
  
        
        //cl("check below .........")
        //cl(seriesContainer);
        
    }

}

function pushSeriesText(){
    seriesContainer.animate([
        // keyframes
        { paddingTop: '0vh' },
        { paddingTop: '10vh' }
        ], {
        // timing options
        duration: 300,
        });

        seriesTextContainer.animate([
            // keyframes
            { opacity: '0.2' },
            { opacity: '1' }
            ], {
            // timing options
        duration: 300,
        });
    // seriesTextContainer.style.opacity = "0";
    // seriesContainer.style.zIndex = "-1";
    seriesContainer.style.paddingTop = "10vh";
    seriesTextContainer.style.background = `linear-gradient(to bottom,rgba(32, 32, 32, 0.8),rgba(32, 32, 32, 0.75),rgba(32, 32, 32, 0.65),rgba(32, 32, 32, 0.55),rgba(32, 32, 32, 0.5))`; 

    subHeaderContainer.style.zIndex = "9";
    subHeaderContainer.style.opacity = "1";
    // cl("check below .........")
    // cl(seriesContainer);
}



function newBoxClicked(currentBox, index, fasterSpeed, lowerSpeed){
    // cl(headerTag)
    // cl(headerTag.offsetWidth);
    let moveLeft = headerTag.offsetWidth / (targetBoxes.length);
    let currentBoxTranslateX = `${moveLeft * index}`;
    let moveLeftPlusPadding = moveLeft + (moveLeft/2);
    
    // When the first box is clicked the transition duration is set to the fast
    // speed and moves the box down in 0.5s.  
    if (index === 0){
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;
         pushSeriesText();

        
        setTimeout(function(){
            // cl("Select Across")
            cl(headerTag.offsetWidth);
            if (window.innerWidth < 600){
                // cl("under 600px screen width run")
                showSelectBox(index, moveLeft);
            } else {
                // cl(moveLeft + (moveLeft/2))
                showSelectBox(index, moveLeftPlusPadding);
            }

        }, (fasterSpeed));
        

    // When a new box is clicked and is not the first box
    } else if (index !== 0) {
        currentBox.classList.add("moved");
        currentBox.style.transitionDuration = `${lowerSpeed}ms`;
        currentBox.style.transform = `translateY(${moveDown})`;
        // console.log("Box Down")
        currentBox.style.transitionDuration = `${fasterSpeed}ms`;
        pushSeriesText();
        
        setTimeout(function(){
            console.log("Box Across")
            currentBox.style.transform = `translateY(${moveDown}) translateX(-${currentBoxTranslateX}px)`;
            
            setTimeout(function(){
                // cl("Select Across")
                showSelectBox(index, moveLeftPlusPadding);

                setTimeout(function(){
                    if (index===3) {
                        const searchHeaderBox = document.getElementById("forthBox");
                        cl(searchHeaderBox)
                        searchHeaderBox.style.opacity = "0";
                    }    
                }, (switchDelay + switchDelay));
            }, (switchDelay));

        }, (fasterSpeed));
                       
    } 
};

function sameBoxReturn(currentBox, index, fasterSpeed, lowerSpeed){

    let moveLeft = headerTag.offsetWidth / (targetBoxes.length);

    if (index != 0){
        if (index===3) {
            const searchHeaderBox = document.getElementById("forthBox");
            cl(searchHeaderBox)
            searchHeaderBox.style.opacity = "1";
        };

        currentBox.classList.remove("moved");
        hideSelectBox(index, moveLeft);
        currentBox.style.transform = `translateX(0px) translateY(${moveDown})`;
        
        setTimeout(function(){
            currentBox.style.transform = `translateY(0)`;

            setTimeout(function(){            
                returnSeriesText();
                
            }, (fasterSpeed));

        }, (fasterSpeed));

    } else {
        hideSelectBox(index, moveLeft);

        setTimeout(function(){
            currentBox.style.transitionDuration = `${fasterSpeed}ms`;
            currentBox.style.transform = `translateY(0)`;
            currentBox.classList.remove("moved");
            returnSeriesText();
            // setTimeout(function(){            
            //     returnSeriesText();
            // }, (fasterSpeed));

        }, (fasterSpeed));
    }

};

function showHiddenHeaders(){
    headersLocked = false;
    for (let index = 0; index < targetBoxes.length; index++) {
        if ((index > 0) && (index < 3)) {
            const currentBox = targetBoxes[index];
            cl(currentBox.classList);
            currentBox.classList.remove("hidden");
            currentBox.classList.add("showing");
        }
    }
}

function hideShowingHeaders(){
    headersLocked = true;
    for (let index = 0; index < targetBoxes.length; index++) {
        if ((index > 0) && (index < 3)) {
            const currentBox = targetBoxes[index];
            cl(currentBox.classList);
            currentBox.classList.remove("showing");
            currentBox.classList.add("hidden");
        }
    }
}
