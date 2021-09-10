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
const headerContainer = document.getElementsByClassName("headerContainer")[0];
const headerTag = document.getElementsByTagName("header")[0];
const subHeaderContainer = document.getElementsByClassName("subHeader")[0];
const episodeNumBoxID = document.getElementById("episodeNumBoxID");

const episodeLimitVariable = 20;
let initialLimitLower = 0;
let initialLimitUpper = episodeLimitVariable;
let allEpisodesIndexArray =[];
let searchIndexArray =[];



/*------------ Code creates an array of indexes for the allEpisodes function --------------------
  ------------   This array is then passed to main displayEpisodes function  --------------------*/

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
          <option value=${index}><h3 class="episodeNumberElement">S<span class="seasonNum">${formatSeasonNum}</span>E<span
              class="episodeNum">${formatEpisodeNum}</span> - ${currentEpisode.name}</h3></option>
    `
  }
}
createAllEpisodesIndexArray(allEpisodes);
cl(allEpisodesIndexArray);


  

/*------------ Code for the loadMore Button (both from searchInput and fullEpisodeArray) --------------------*/

function createLoadMoreButton(source){
  if (source === "loadFromSearch") {
    loadMoreID.innerHTML = `
        <div class="loadMoreContainer">
          <button class="loadMoreButton" onclick="loadMoreFunction(searchIndexArray)">Load More Episodes</button>
        </div> 
      `;
  } else {
      loadMoreID.innerHTML = `
        <div class="loadMoreContainer">
          <button class="loadMoreButton" onclick="loadMoreFunction(allEpisodesIndexArray)">Load More Episodes</button>
        </div> 
      `;
  }
}


function loadMoreFunction(array){
  if (initialLimitUpper === array.length){
    window.alert("No more episodes to load");

  } else if (initialLimitUpper > (array.length-episodeLimitVariable)){
    initialLimitLower += episodeLimitVariable; 
    initialLimitUpper = array.length;
    displayEpisodes(array,initialLimitLower,initialLimitUpper);

  } else {
      updateLimitValues();
      displayEpisodes(array,initialLimitLower,initialLimitUpper);
  }
}


function updateLimitValues () {
  initialLimitLower += episodeLimitVariable;
  initialLimitUpper += episodeLimitVariable;
}


/*-------- Setup function for the initial page load and the 73/73 button functionality --------------------*/

function makePageForEpisodes(episodeList) {
  const episodesNum = document.getElementById("HeaderEpisodesNum");
  const subHeaderEpisodesNum = document.getElementById("subHeaderEpisodesNum");
  episodesNum.textContent = `${episodeList.length} / ${allEpisodes.length}`;
  subHeaderEpisodesNum.textContent = ` ${episodeList.length} of ${allEpisodes.length} `;
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


function resetEpisodesHTML() {
  flexOuterContainer.innerHTML = "";
}



// This function works by taking a variable which is the index from the for loop 
// below which sets out the new innerHTML. It uses this variable to pull the corresponding
// button ID. It then adds the "show" class which is then targeted in the CSS
function popUpFunctionIdSpecific(variable) {
  const popup = document.getElementById(`myPopupIndex${variable}`);
  popup.classList.toggle("show");
}






/*------------ Main displayEpisodes function that creates the episode containers --------------------*/


// I need to pass displayEpisodes an array of objects [{},{}]
function displayEpisodes (episodeArray, lowerLimit, upperLimit) {
  cl(episodeArray);
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

    let passEpisodeTitle = currentEpisode.name;
    flexOuterContainer.innerHTML += `
    <div class="flexEpisodeContainer">
          <h2 class="episodeTitle">${passEpisodeTitle.toUpperCase()}</h2>
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
