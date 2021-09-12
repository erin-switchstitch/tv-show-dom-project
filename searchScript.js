/*------------------ Search Logic - select episode/series ---------------------------------------------- */

// EPISODES - <option><select>
document.getElementsByTagName('select')[0].onchange = function() {
  var index = this.selectedIndex;
  console.log(index -1);
  resetEpisodesHTML()
  fetchEpisodesBySeries(index-1);
  displayEpisodes(allEpisodesIndexArray,index -1,index);
}

// SERIES - <option><select>
document.getElementsByTagName('select')[1].onchange = function() {
  var seriesIndex = this.selectedIndex;
  var seriesIdAtIndex = allSeriesIndexArray[seriesIndex-1]
  console.log(seriesIndex -1);
  cl(seriesIdAtIndex);
  fetchEpisodesBySeries(seriesIdAtIndex)
//   cl(allEpisodes)
  resetEpisodesHTML()
//   displayEpisodes(allEpisodes,0,seriesIndex);
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
