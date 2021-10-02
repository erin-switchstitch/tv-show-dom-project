/*------------------ Select Logic - select episode/series ---------------------------------------------- */

function onSelectReturnThenNewBox(newBoxIndex){
     sameBoxReturn(targetBoxes[currentMovedIndex], currentMovedIndex, move1speed, move1speed);
     
    //  for (let i=0; i < targetBoxes.length; i++){
        const currentBox = targetBoxes[newBoxIndex];
        setTimeout(function(){
            newBoxClicked(currentBox, newBoxIndex, move1speed, move2speed);
        }, (switchDelay));
        
        alreadyMoved = true; 
        currentMovedIndex = newBoxIndex; 
    // }
};


// SERIES - <option><select>
document.getElementsByTagName('select')[0].onchange = function() {
  var seriesIndex = this.selectedIndex;
  console.log(seriesIndex);
  var seriesIdAtIndex = allSeriesIndexArray[seriesIndex-1]
  cl(seriesIdAtIndex)

subSearchTwo.classList.remove("noSelect");

  if (seriesIndex === 0) {
    // Here I will need to run the series setup function when it is written ...
    cl("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    hideShowingHeaders()
    sameBoxReturn(targetBoxes[0], currentMovedIndex, move1speed, move2speed);
    resetEpisodesHTML()
    // populateEpisodeHeaderSelect(allEpisodes, 0, 0, allEpisodes.length)


    if (allSeries.length > episodeLimitVariable) {
        displaySeries (allSeries, initialLimitLower, initialLimitUpper) 
        createLoadMoreButton("allSeries");
    } else {
        displaySeries (allSeries, 0, seriesArray.length)
    }

    insertHeadingTextHere.innerText= "SHOWING ALL SERIES";
    crackedHeadingID.dataset.text = "SHOWING ALL SERIES";
    headerImage.src = `https://i.pinimg.com/originals/9c/29/00/9c2900a182571a32964f758b691aea0e.gif`; 
    alreadyMoved === false
    pullUpSeriesText();
  } else {
    resetEpisodesHTML()
    cl(allSeries[seriesIdAtIndex]);
    
    insertHeadingTextHere.innerText= `${allSeries[seriesIndex -1].name.toUpperCase()}`;
    crackedHeadingID.dataset.text = `${allSeries[seriesIndex -1].name.toUpperCase()}`; 
    headerImage.src = `${allSeries[seriesIndex -1].image.original}`;

    cl("seriesID : " + seriesIdAtIndex)
    fetchSeasonsBySeries(seriesIdAtIndex)
    fetchEpisodesBySeries(seriesIdAtIndex)
    cl("about to run : populateSeasonHeaderSelect")
    cl(allSeasons)
    showHiddenHeaders();
    onSelectReturnThenNewBox(1);

  }
}


// SEASONS - <option><select>
let seasonLimitArray =[];

document.getElementsByTagName('select')[1].onchange = function() {
    var seasonIndex = this.value;
    console.log("seasonIndex : " + seasonIndex);
    console.log(typeof(seasonIndex));
    createAllEpisodesIndexArray(allEpisodes)
    cl(allEpisodesSeasonNumArray)


    if(seasonIndex === "0") {
        // Here I will need to run the series setup function when it is written ...
        cl("0 index run")
        resetEpisodesHTML()
        // populateEpisodeHeaderSelect(allEpisodes, 0, 0, allEpisodes.length)
        displaySeasons(allSeasons,0, allSeasons.length)
    } else {

        seasonLimitArray =[];
        for (let index = 0; index < allEpisodesSeasonNumArray.length; index++) {
            let currentEpisode = allEpisodesSeasonNumArray[index];
            //cl(index);
            //cl(currentEpisode)
            if (currentEpisode == seasonIndex) {
                seasonLimitArray.push(index)
            }
            //cl(seasonLimitArray);
        }
        cl(seasonLimitArray);
        let episodeBySeasonLowerLimit = seasonLimitArray[0];
        let episodeBySeasonUpperLimit = seasonLimitArray[seasonLimitArray.length-1];
        //cl(episodeBySeasonUpperLimit)
        resetEpisodesHTML()
        //cl(allEpisodes)
        displayEpisodes(allEpisodes,episodeBySeasonLowerLimit,episodeBySeasonUpperLimit);
        populateEpisodeHeaderSelect(allEpisodes,seasonIndex, episodeBySeasonLowerLimit,episodeBySeasonUpperLimit)
        // fetchSeasonsBySeries(seriesIdAtIndex)
        onSelectReturnThenNewBox(2);
    }    
}


// EPISODES - <option><select>
document.getElementsByTagName('select')[2].onchange = function() {
  var index = this.selectedIndex;

  
  if(index === 1) {
      cl(allEpisodesIndexArray)
      cl(this.value);
      resetEpisodesHTML()

        if (this.value > 0){
            let episodeBySeasonLowerLimit = seasonLimitArray[0];
            let episodeBySeasonUpperLimit = seasonLimitArray[seasonLimitArray.length-1];
            displayEpisodes(allEpisodes,episodeBySeasonLowerLimit,episodeBySeasonUpperLimit)
        } else {
            displayEpisodes(allEpisodes,0,allEpisodes.length + 1)
        }

  } else if (index > 1){
    console.log(index -1);
    resetEpisodesHTML()
    //   fetchEpisodesBySeries(index);
    displayEpisodes(allEpisodes,index -2,index-1);
  }
  

}






/*------------------ Search Logic - search function ---------------------------------------------- */

// let searchBySeriesToggle = true; 
// let searchByEpisodesToggle = false; 

function subSearchToggleFunction(subSearchIdName){

    cl("TOGGLE CLICKING RUN")
    const subSearchClicked = document.getElementById(subSearchIdName)
    cl(subSearchClicked)

    const episodesHeaderBox = document.getElementById("thirdBox");
        subSearchInputBoxToggle();

    if (subSearchClicked.id === "subSearchOne") {
        cl("Series Search")
    //         if (searchByEpisodesToggle === false) {
    //     subSearchTwo.classList.add("noSelect");
    // }   

        if (searchBySeriesToggle === true){
            searchBySeriesToggle = false;
            const subSearchOne = document.getElementById("subSearchOne")
            subSearchOne.classList.remove("Clicked")
                subSearchInputBoxToggle();
        } else {
            searchBySeriesToggle = true; 
            searchByEpisodesToggle = false; 
            subSearchClicked.classList.add("Clicked");
            const subSearchTwo = document.getElementById("subSearchTwo")
            subSearchTwo.classList.remove("Clicked")
                subSearchInputBoxToggle();
        }


    } else if ((subSearchClicked.id === "subSearchTwo") && (episodesHeaderBox.classList.contains("showing"))){
        cl("Episode Search")
        
         if (searchByEpisodesToggle === true){
            searchByEpisodesToggle = false;
            subSearchClicked.classList.remove("Clicked");
                subSearchInputBoxToggle();
        } else {
            searchBySeriesToggle = false; 
            searchByEpisodesToggle = true; 
            subSearchClicked.classList.add("Clicked");
            const subSearchOne = document.getElementById("subSearchOne")
            subSearchOne.classList.remove("Clicked")
                subSearchInputBoxToggle();
        }    
    } 
   
    subSearchInputBoxToggle();
    
}

function subSearchInputBoxToggle (){
    cl("subSearchInputBoxToggle Function RUN !!!!")
    cl(searchBySeriesToggle)
    cl(searchByEpisodesToggle)
    const subSearchOne = document.getElementById("subSearchOne");
    const subSearchTwo = document.getElementById("subSearchTwo");


            


    if ((searchBySeriesToggle === true)||(searchByEpisodesToggle === true)) {
        cl("input box change one is true..")
        inputBox.readOnly = false;
        inputBox.classList.remove("Hidden")
        inputBox.classList.remove("readOnlyClass")
        inputBox.classList.add("Show")

        if (searchBySeriesToggle === true) {
            subSearchOne.classList.remove("noSelect");
        } else if (searchByEpisodesToggle === true) {
            subSearchTwo.classList.remove("noSelect");
        }   
        
    } else {
        inputBox.readOnly = true;
        inputBox.classList.remove("Show")
        inputBox.classList.add("readOnlyClass")
    }
}



function searchFunction(){
    cl("search function run")
    cl("searchBySeriesToggle :" + searchBySeriesToggle)
    cl("searchByEpisodesToggle :" + searchByEpisodesToggle)
    let searchInput = document.getElementById("inputBoxID").value;
    searchIndexArray =[];
    let arrayToDisplay;
    let checkArrayByID =[];
    cl(searchIndexArray.length)


    if ((searchBySeriesToggle === true) || (searchByEpisodesToggle === true)){
        if (searchByEpisodesToggle === true) {
            arrayToDisplay = allEpisodes;
            displayFunctionInput = displayEpisodes;
        } else if (searchBySeriesToggle === true) {
            arrayToDisplay = allSeries;
            displayFunctionInput = displaySeries;
        }


        if ((searchInput != "<empty string>") && (searchInput.length > 0) && (searchInput.length<50)) {

        for (let index = 0; index < arrayToDisplay.length; index++) {
            const currentEpisode = arrayToDisplay[index];
            const currentValuesArray = Object.values(currentEpisode);
            cl(currentValuesArray)
            
            for (let j = 0; j < currentValuesArray.length; j++) {
                
                let currentValue = currentValuesArray[j];
                //cl(typeof(currentValue));
                
                if (typeof(currentValue) === "number"){
                    currentValue = currentValue.toString();
                }
                //cl(currentValue)
                if (typeof(currentValue) === "string") {
                    if(currentValue.includes(searchInput)){
                        
                        if(checkArrayByID.includes(currentEpisode.id) === false){
                            checkArrayByID.push(currentEpisode.id);
                            searchIndexArray.push(index);
                        }
                    }
                }
            }
        }

        resetEpisodesHTML();
        cl(searchIndexArray)

        let filteredSearchObject = [];

        function convertIndexArrayToObjectForDisplay(initialIndexArray) {
            for (let index = 0; index < initialIndexArray.length; index++) {
                const indexToPass = initialIndexArray[index]
                const currentArray = arrayToDisplay[indexToPass];
                filteredSearchObject.push(currentArray);
            }
        }

        convertIndexArrayToObjectForDisplay(searchIndexArray);
        cl(filteredSearchObject);        

        if (filteredSearchObject.length > episodeLimitVariable) {
            displayFunctionInput(filteredSearchObject,0,episodeLimitVariable);
            createLoadMoreButton("loadFromSearch");
        } else {
            removeLoadMoreButton();
            displayFunctionInput(filteredSearchObject,0,searchIndexArray.length);
        }

        // populateEpisodeButton(searchIndexArray);

        } else if ((searchInput.length>50) || (searchInput === "<empty string>")){
            window.alert("Search input is not valid or is too long");
            document.getElementById("inputBoxID").value = "";
        } else if (searchInput.length === 0){
            cl("Search = 0")
            resetEpisodesHTML();
            setup();
        }
    }
    
}
