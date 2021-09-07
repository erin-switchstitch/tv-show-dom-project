
function resetEpisodesHTML() {
  flexOuterContainer.innerHTML = "";
}


function searchFunction(){

    let searchInput = document.getElementById("inputBoxID").value;
    let exportArray =[];
    //cl(searchInput)

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
                        exportArray.push(currentEpisode)
                        cl(`Season ${currentEpisode.season} - Episode ${currentEpisode.number}`)
                        resetEpisodesHTML();
                        displayEpisodes(exportArray);
                    }

                }
            }
        }
    } else if ((searchInput.length>50) || (searchInput === "<empty string>")){
        window.alert("Search input is not valid or is too long");
        document.getElementById("inputBoxID").value = "";
    } else if (searchInput.length === 0){
        displayEpisodes(allEpisodes);
    }
}
