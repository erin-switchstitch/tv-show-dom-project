//const { doc } = require("prettier");

//You can edit ALL of the code here
const cl = console.log;
const allEpisodes = getAllEpisodes();
const oneShow = getOneShow();
const flexOuterContainer = document.querySelector(".flexOuterContainer");
const loadMoreID = document.getElementById("loadMoreID");
const selectBox = document.getElementById("selectBoxID");
const inputBox = document.getElementById("inputBoxID");
const targetBoxes = document.getElementsByClassName("box");
const seriesContainer = document.getElementsByClassName("seriesContainer")[0];
const seriesTextContainer = document.getElementsByClassName("seriesTextContainer")[0];



const episodeLimitVariable = 20;
let initialLimitLower = 0;
let initialLimitUpper = episodeLimitVariable;
let allEpisodesIndexArray =[];

function createAllEpisodesIndexArray(arrayToCovert){
  for (let index = 0; index < arrayToCovert.length; index++) {
    // This creates an array with all the index positions of the full episode list
    allEpisodesIndexArray.push(index);
    
    // Below populates the select list for the epsiode header button
    let currentEpisode = arrayToCovert[index];
    let formatEpisodeNum = currentEpisode.number;
    let formatSeasonNum = currentEpisode.season;
    
    if (formatEpisodeNum < 10){
      formatEpisodeNum = `0${formatEpisodeNum}`;
    }
    if (formatSeasonNum < 10){
      formatSeasonNum = `0${formatSeasonNum}`;
    }
    selectBox.innerHTML += `
          <option><h3 class="episodeNumberElement">S<span class="seasonNum">${formatSeasonNum}</span>E<span
              class="episodeNum">${formatEpisodeNum}</span> - ${currentEpisode.name}</h3></option>
    `
  }
}
createAllEpisodesIndexArray(allEpisodes);
  cl(allEpisodesIndexArray);

function loadMoreFunction(){
  if (initialLimitUpper === allEpisodes.length){
    window.alert("No more episodes to load");

  } else if (initialLimitUpper > (allEpisodes.length-episodeLimitVariable)){
    initialLimitLower += episodeLimitVariable; 
    initialLimitUpper = allEpisodes.length;
    displayEpisodes(allEpisodesIndexArray,initialLimitLower,initialLimitUpper);

  } else {
      updateLimitValues();
      displayEpisodes(allEpisodesIndexArray,initialLimitLower,initialLimitUpper);
  }
}




// I would proberly be best to rewrite all this loadMore function to accomidate the 
// search results and loading for more of them. If not I'll be doubling up alot of 
// my code. Actually double check that - i may not have to since changing the 
// array input for the main displayEpisodes function as it's no longer done 
// by passing full arrayobject info - it's done on index numbers 




function loadMoreSearchFunction(searchLowerLimit){
  if (initialLimitUpper === allEpisodes.length){
    window.alert("No more episodes to load");

  } else if (initialLimitUpper > (allEpisodes.length-episodeLimitVariable)){
    initialLimitLower += episodeLimitVariable; 
    initialLimitUpper = allEpisodes.length;
    displayEpisodes(allEpisodesIndexArray,initialLimitLower,initialLimitUpper);

  } else {
      updateLimitValues();
      displayEpisodes(allEpisodesIndexArray,initialLimitLower,initialLimitUpper);
  }
}


function updateLimitValues () {
  // cl(initialLimitLower += episodeLimitVariable);
  // cl(initialLimitUpper += episodeLimitVariable);
  initialLimitLower += episodeLimitVariable;
  initialLimitUpper += episodeLimitVariable;
}

function createLoadMoreButton(source){
  if (source === "loadFromSearch") {
    loadMoreID.innerHTML = `
        <div class="loadMoreContainer">
          <button class="loadMoreButton" onclick="loadMoreSearchFunction()">Load More Episodes</button>
        </div> 
      `;
  } else {
      loadMoreID.innerHTML = `
        <div class="loadMoreContainer">
          <button class="loadMoreButton" onclick="loadMoreFunction()">Load More Episodes</button>
        </div> 
      `;
  }
}

function makePageForEpisodes(episodeList) {
  const episodesNum = document.getElementById("HeaderEpisodesNum");
  episodesNum.textContent = `${episodeList.length} / ${allEpisodes.length}`;
}

function setup() {
  makePageForEpisodes(allEpisodes);

  cl(allEpisodes.length > episodeLimitVariable);

  if (allEpisodes.length > episodeLimitVariable) {
    cl("working")
    displayEpisodes(allEpisodesIndexArray,initialLimitLower,initialLimitUpper);
    createLoadMoreButton();
  } else {
    displayEpisodes(allEpisodesIndexArray,0,allEpisodesIndexArray.length);
  }
}

window.onload = setup;




// This function works by taking a variable which is the index from the for loop 
// below which sets out the new innerHTML. It uses this variable to pull the corresponding
// button ID. It then adds the "show" class which is then targeted in the CSS
function popUpFunctionIdSpecific(variable) {
  const popup = document.getElementById(`myPopupIndex${variable}`);
  popup.classList.toggle("show");
}



// I need to pass displayEpisodes an array of objects [{},{}]
function displayEpisodes (episodeArray, lowerLimit, upperLimit) {

  // This for loop goes through the episodes.js function and pulls the object and all the data for the episodes. It loops through the object
  // and inserts the new html for each episode
  for (let index = lowerLimit; index < upperLimit; index++) {
    //cl(allEpisodes[72])
    //cl(episodeArray[index])
    let currentEpisodeIndex = episodeArray[index] ; 
    const currentEpisode = allEpisodes[currentEpisodeIndex];
    //cl(currentEpisode)
    // This code converts data to display season and date info e.g. S1E1 --> S01E01  
    let formatEpisodeNum = currentEpisode.number;
    let formatSeasonNum = currentEpisode.season;
    
    if (formatEpisodeNum < 10){
      formatEpisodeNum = `0${formatEpisodeNum}`;
      //cl(formatEpisodeNum)
    }
    if (formatSeasonNum < 10){
      formatSeasonNum = `0${formatSeasonNum}`;
      //cl(formatEpisodeNum)
    }

    // This code below including the while loops, removes all <p></p> and <br> tags. Some of the summaries have these 
    // tags in the middle of the summary. This solution should remove all of the tags whether at start/middle/end
    var summaryStr = currentEpisode.summary;

    while (summaryStr.indexOf("<p>") >= 0) {
      summaryStr = summaryStr.slice(0,(summaryStr.indexOf("<p>"))) + summaryStr.slice((summaryStr.indexOf("<p>"))+3, summaryStr.length); 
    }
    
    while (summaryStr.indexOf("</p>") >= 0) {
      summaryStr = summaryStr.slice(0,(summaryStr.indexOf("</p>"))) + summaryStr.slice((summaryStr.indexOf("</p>"))+4, summaryStr.length);
    }
      while (summaryStr.indexOf("<br>") >= 0) {
      summaryStr = summaryStr.slice(0,(summaryStr.indexOf("<br>"))) + summaryStr.slice((summaryStr.indexOf("<br>"))+4, summaryStr.length); 
    }


    flexOuterContainer.innerHTML += `
    <div class="flexEpisodeContainer">
          <h2 class="episodeTitle">${currentEpisode.name}</h2>
          <h3 class="episodeNumberElement">S<span class="seasonNum">${formatSeasonNum}</span>E<span
              class="episodeNum">${formatEpisodeNum}</span></h3>

          <div class="episodeImageContainer">
            <img class="episodeImage" src=${currentEpisode.image.medium}
              alt="Season ${currentEpisode.season}, Episode ${currentEpisode.number} Image">
            <div class="imageOverlayTextContainer">
              <div class="imageOverlayText">
                <h4>Air Date : <span>${currentEpisode.airdate}</span></h4>
                <h4>Air Time : <span>${currentEpisode.airtime}</span></h4>
                <h4>Runtime : <span>${currentEpisode.runtime}</span> mins</h4>
              </div>
            </div>
          </div>

          <p class="episodeSummary">${summaryStr}</p>

          <button class="popupButton" onclick="popUpFunctionIdSpecific(${index})">See More Info
            <span id="myPopupIndex${index}" class="popupButtonText" id="myPopup">
              <a class="tvMazeLink" href=${currentEpisode._links.self.href} target="_blank">TV Maze Episode Link</a>
              <br>
              <a class="imbdLink" href=${oneShow.officialSite} target="_blank">Official Site Link</a>
            </span>
          </button>

        </div>
    `;
  }
}
