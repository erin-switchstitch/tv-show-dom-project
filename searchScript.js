
function resetEpisodesHTML() {
  flexOuterContainer.innerHTML = "";
}


function searchFunction(){
    cl("search function run")
    
    let searchInput = document.getElementById("inputBoxID").value;
    let exportArray =[];
    let checkArrayByID =[];
    //cl(searchInput)
    cl(exportArray.length)

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
                            exportArray.push(index);
                        }
                        //cl(`Season ${currentEpisode.season} - Episode ${currentEpisode.number}`)
                      
                        // cl(checkArrayByID);
                        cl(exportArray)
                        // cl(checkArrayByID.includes(4952));

                      

                    }

                }
            }
              resetEpisodesHTML();
              displayEpisodes(exportArray,0,exportArray.length);
              makePageForEpisodes(exportArray);
        }
    } else if ((searchInput.length>50) || (searchInput === "<empty string>")){
        window.alert("Search input is not valid or is too long");
        document.getElementById("inputBoxID").value = "";
    } else if (searchInput.length === 0){
        displayEpisodes(allEpisodes);
    }
}
