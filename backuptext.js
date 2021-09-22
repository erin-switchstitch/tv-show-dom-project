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

      // displayEpisodes(allEpisodes,0,seriesIndex);

  if (seriesIndex === 0) {
    // Here I will need to run the series setup function when it is written ...
    hideShowingHeaders()
    sameBoxReturn(targetBoxes[0], currentMovedIndex, move1speed, move2speed);
    resetEpisodesHTML()

    if (allSeries.length > episodeLimitVariable) {
        displaySeries (allSeries, initialLimitLower, initialLimitUpper) 
        createLoadMoreButton("allSeries");
    } else {
        displaySeries (allSeries, 0, seriesArray.length)
    } 
    
  } else {
    resetEpisodesHTML()
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
  
  if(index === 0) {
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

  } else {
    console.log(index -1);
    resetEpisodesHTML()
    //   fetchEpisodesBySeries(index);
    displayEpisodes(allEpisodes,index -1,index);
  }
  

}






/*------------------ Search Logic - search function ---------------------------------------------- */

function searchFunction(){
    cl("search function run")
    
    let searchInput = document.getElementById("inputBoxID").value;
    searchIndexArray =[];
    let checkArrayByID =[];
    //cl(searchInput)
    cl(searchIndexArray.length)

    if ((searchInput != "<empty string>") && (searchInput.length > 0) && (searchInput.length<50)) {

        for (let index = 0; index < allEpisodes.length; index++) {
            const currentEpisode = allEpisodes[index];
            const currentValuesArray = Object.values(currentEpisode);
            //cl(currentValuesArray)
            
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
    if (searchIndexArray.length > episodeLimitVariable) {
        displayEpisodes(searchIndexArray,0,episodeLimitVariable);
        createLoadMoreButton("loadFromSearch");
    } else {
        removeLoadMoreButton();
        displayEpisodes(searchIndexArray,0,searchIndexArray.length);
    }

    populateEpisodeButton(searchIndexArray);

    } else if ((searchInput.length>50) || (searchInput === "<empty string>")){
        window.alert("Search input is not valid or is too long");
        document.getElementById("inputBoxID").value = "";
    } else if (searchInput.length === 0){
        cl("Search = 0")
        resetEpisodesHTML();
        setup();
    }
}
