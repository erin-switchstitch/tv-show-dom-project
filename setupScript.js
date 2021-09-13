/*------------------------------------- Global Variables --------------------------------------- */

const cl = console.log;
let allEpisodes;
const allShows = getAllShows();
const flexOuterContainer = document.querySelector(".flexOuterContainer");
const loadMoreID = document.getElementById("loadMoreID");
const selectBox = document.getElementById("selectBoxID");
const seriesSelectBox = document.getElementById("seriesSelectBoxID");
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
let allSeriesIndexArray = [];
let searchIndexArray =[];


/*--------------------------------------- API code --------------------------------------- */


let selectedSeriesIndex = 82;

// I will also need to create a fetchEpisodeBySeason function !!!
// actually may not have to. It may be more efficient to filter 
// the episodes raw data by season then display that 
// seriesDisplay has specific data, so does seasonsDisplay and episodesDisplay- all 
// of them need to access specific data from fetch requests / from shows.js function
function fetchEpisodesBySeries(seriesID){
  fetch(`https://api.tvmaze.com/shows/${seriesID}/episodes`)
  .then(response => response.json())
  .then((data) => {
    cl("fetchEpisodesBySeries function run")
    allSeriesIndexArray = [];
    resetLimitValues();
    removeLoadMoreButton();
    createAllSeriesIDArray(allShows);
    // console.log(allEpisodes)
    allEpisodes = data; 
    // console.log(allEpisodes)
    createAllEpisodesIndexArray(allEpisodes);
    // cl(allSeriesIndexArray);
    setup()
  });
}
fetchEpisodesBySeries(selectedSeriesIndex);




/*------------ Code creates an array of indexes for the allEpisodes function --------------------
  ------------   This array is then passed to main displayEpisodes function  --------------------*/


function createAllSeriesIDArray(arrayToCovert){
// cl(arrayToCovert);
  for (let index = 0; index < arrayToCovert.length; index++) {
      // This creates an array with all the index positions of the full series list
      allSeriesIndexArray.push(arrayToCovert[index].id);
      
      // Below populates the <option><select> list for the series header button
      let currentSeries = arrayToCovert[index];
      let formatSeriesName = currentSeries.name;
      seriesSelectBox.innerHTML += `
            <option value=${index}><h3 class="episodeNumberElement"><span class="seasonNum">${arrayToCovert[index].id}</span><span
                class="episodeNum"></span> - ${formatSeriesName}</h3></option>
      `
    }
}

//allEpisodes[allEpisodesIndexArray}

function createAllEpisodesIndexArray(arrayToCovert){
  allEpisodesIndexArray =[];
  selectBox.innerHTML = `<option value="" selected>Show All Episodes</option>`;

  for (let index = 0; index < arrayToCovert.length; index++) {  
    // This creates an array with all the index positions of the full episode list
    allEpisodesIndexArray.push(index);
    
    // Below populates the select list for the episode header button
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

/*-------- Setup function for the initial page load and the 73/73 button functionality --------------------*/

function populateEpisodeButton(episodeList) {
  const episodesNum = document.getElementById("HeaderEpisodesNum");
  const subHeaderEpisodesNum = document.getElementById("subHeaderEpisodesNum");
  episodesNum.textContent = `${episodeList.length} / ${allEpisodes.length}`;
  subHeaderEpisodesNum.textContent = ` ${episodeList.length} of ${allEpisodes.length} `;
}

function setup() {
  createAllEpisodesIndexArray(allEpisodes);
  populateEpisodeButton(allEpisodes);

  // cl(allEpisodes);

  if (allEpisodes.length > episodeLimitVariable) {
    // cl("working")
    displayEpisodes(allEpisodesIndexArray,initialLimitLower,initialLimitUpper);
    createLoadMoreButton();
  } else {
    displayEpisodes(allEpisodesIndexArray,0,allEpisodes.length);
  }
}
// window.onload = setup;





function resetEpisodesHTML() {
  flexOuterContainer.innerHTML = "";
}
  
/*------------ Code for the loadMore Button (both from searchInput and fullEpisodeArray) --------------------*/

function createLoadMoreButton(source){
  if (source === "loadFromSearch") {
    loadMoreID.innerHTML = `
        <div class="loadMoreContainer">
          <button class="loadMoreButton" onclick="loadMoreFunction(allEpisodes)">Load More Episodes</button>
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

function removeLoadMoreButton (){
  // cl("before remove : " + loadMoreID.innerHTML)
  loadMoreID.innerHTML = ``;
  // cl("after remove : " + loadMoreID.innerHTML)
}


function loadMoreFunction(array){
  cl("LOOK HERE ....")
  cl(allEpisodes);
  cl(allEpisodesIndexArray)
  cl(initialLimitUpper);
  if ((initialLimitUpper === array.length) || (initialLimitUpper >array.length)) {
    window.alert("No more episodes to load");

  } else if (initialLimitUpper > (array.length-episodeLimitVariable)){
    cl("Less than 20 left")
    initialLimitLower += episodeLimitVariable; 
    initialLimitUpper = array.length;
    displayEpisodes(array,initialLimitLower,initialLimitUpper);
    updateLimitValues();

  } else {
      cl("Over 20 left")
      updateLimitValues();
      displayEpisodes(array,initialLimitLower,initialLimitUpper);
  }
}


function updateLimitValues () {
  initialLimitLower += episodeLimitVariable;
  initialLimitUpper += episodeLimitVariable;
}

function resetLimitValues () {
  initialLimitLower = 0;
  initialLimitUpper = episodeLimitVariable;
}




/*------------ Main displayEpisodes function that creates the episode containers --------------------*/



// I need to pass displayEpisodes an array of objects [{},{}]
function displayEpisodes (episodeArray, lowerLimit, upperLimit) {
  // cl(episodeArray);
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
              <a class="imbdLink" href=${allShows.officialSite} target="_blank">Official Site Link</a>
            </span>
          </button>

        </div>
    `;
  }
}


var throwawaySeriesID = 82;
var allSeasons = [];

function fetchSeasonsBySeries(seriesID){
  fetch(`https://api.tvmaze.com/shows/82/seasons`)
  .then(response => response.json())
  .then((data) => {
    
    resetLimitValues();
    removeLoadMoreButton();
    allSeasons = data; 
    // createAllSeriesIndexArray(allShows);
    // createAllEpisodesIndexArray(allEpisodes);
    // console.log(allEpisodes)
    cl(allSeasons)
    cl(allSeriesIndexArray);

    resetEpisodesHTML();
    displaySeasons(allSeasons,0,allSeasons.length)
    setup()
  });
}
fetchSeasonsBySeries(throwawaySeriesID);


// I need to pass displaySeasons an array of objects [{},{}]
function displaySeasons (seasonArray, lowerLimit, upperLimit) {
  cl(seasonArray)
  cl(lowerLimit)
  cl(upperLimit)
  
  for (let index = lowerLimit; index < upperLimit; index++) {

    let currentSeason = seasonArray[index]; 
    cl(currentSeason)
    let seasonNum = currentSeason.number;
    let numOfEpisodes = currentSeason.episodeOrder;
    let imageLink = currentSeason.image.medium;
    let summary = currentSeason.summary /*<-- not all episodes have summaries*/
    let startDate = currentSeason.premiereDate;
    let endDate = currentSeason.endDate;
    let tvMazeLink = currentSeason.url;

    let multipleEpisodes;
    if (seasonArray.length > 1){
      multipleEpisodes = `s`;
    }
    

    // This code below including the while loops, removes all <p></p> and <br> tags. Some of the summaries have these 
    // tags in the middle of the summary. This solution should remove all of the tags whether at start/middle/end
    var summaryStr = summary;

    if (summaryStr === null){
      summaryStr = " ";
    }


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
          <h2 class="episodeTitle">Season ${seasonNum}</h2>
          <h3 class="episodeNumberElement"><span class="seasonNum">${numOfEpisodes}&nbsp</span><span
              class="episodeNum"> Episode${multipleEpisodes}</span></h3>

          <div class="episodeImageContainer">
            <img class="episodeImage" src=${imageLink}
              alt="Season ${seasonNum} Banner Image">
            <div class="imageOverlayTextContainer">
              <div class="imageOverlayText">
                <h4>Start Date : <span>${startDate}</span></h4>
                <h4>End Date : <span>${endDate}</span></h4>
              </div>
            </div>
          </div>

          <p class="episodeSummary">${summaryStr}</p>

          <button class="popupButton" onclick="popUpFunctionIdSpecific(${index})">See More Info
            <span id="myPopupIndex${index}" class="popupButtonText" id="myPopup">
              <a class="tvMazeLink" href=${tvMazeLink} target="_blank">TV Maze Episode Link</a>
              <br>
            </span>
          </button>

        </div>
    `;
  }
}

var throwawaySeriesID = 82;
var allSeasons = [];










function pullSeries(seriesID){
  fetch(`https://api.tvmaze.com/shows/82/seasons`)
  .then(response => response.json())
  .then((data) => {
    
    resetLimitValues();
    removeLoadMoreButton();
    allSeasons = data; 
    // createAllSeriesIndexArray(allShows);
    // createAllEpisodesIndexArray(allEpisodes);
    // console.log(allEpisodes)
    cl(allSeasons)
    cl(allSeriesIndexArray);

    resetEpisodesHTML();
    displaySeasons(allSeasons,0,allSeasons.length)
    setup()
  });
}
// fetchSeasonsBySeries(throwawaySeriesID);


// I need to pass displaySeasons an array of objects [{},{}]
function displaySeries (seriesArray, lowerLimit, upperLimit) {

  for (let index = lowerLimit; index < upperLimit; index++) {

    let currentSeriesIndex = seriesArray[index] ; 
    const currentSeries = allSeries[currentSeriesIndex];

    let seriesNum = currentSeries.number;
    let numOfSeries = currentSeries.episodeOrder;
    let seriesLink = currentSeries.image.medium;
    let summary = currentSeries.summary /*<-- not all episodes have summaries*/
    let startDate = currentSeries.premiereDate;
    let endDate = currentSeries.endDate;
    let tvMazeLink = currentSeries.url;

    let multipleSeries;
    if (seasonArray.length > 1){
      multipleSeries = `s`;
    }
    

    // This code below including the while loops, removes all <p></p> and <br> tags. Some of the summaries have these 
    // tags in the middle of the summary. This solution should remove all of the tags whether at start/middle/end
    var summaryStr = summary;

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
          <h2 class="episodeTitle">Season ${seasonNum}</h2>
          <h3 class="episodeNumberElement"><span class="seasonNum">${numOfEpisodes}</span><span
              class="episodeNum"> Season${multipleSeasons}</span></h3>

          <div class="episodeImageContainer">
            <img class="episodeImage" src=${imageLink}
              alt="Season ${seasonNum} Banner Image">
            <div class="imageOverlayTextContainer">
              <div class="imageOverlayText">
                <h4>Start Date : <span>${startDate}</span></h4>
                <h4>End Date : <span>${endDate}</span></h4>
              </div>
            </div>
          </div>

          <p class="episodeSummary">${summaryStr}</p>

          <button class="popupButton" onclick="popUpFunctionIdSpecific(${index})">See More Info
            <span id="myPopupIndex${index}" class="popupButtonText" id="myPopup">
              <a class="tvMazeLink" href=${tvMazeLink} target="_blank">TV Maze Episode Link</a>
              <br>
            </span>
          </button>

        </div>
    `;
  }
}

// This function works by taking a variable which is the index from the for loop 
// below which sets out the new innerHTML. It uses this variable to pull the corresponding
// button ID. It then adds the "show" class which is then targeted in the CSS
function popUpFunctionIdSpecific(variable) {
  const popup = document.getElementById(`myPopupIndex${variable}`);
  popup.classList.toggle("show");
}



/*--------------------------- Image opacity based on scroll ------------------------------------------------ */


function getPosition(element) {
    var yPosition = 0;
    
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    //cl("current Height : " + yPosition)
    return yPosition ;
}


const $flexEpisodeContainer = document.querySelectorAll(".flexEpisodeContainer");
//cl($flexEpisodeContainer)
const headerImage = document.getElementById("headerImageID");

//var $ul_li_invisible = document.querySelectorAll("#cracked_li_invisible");
//var $sidePanelHeading = document.getElementById("side_panel_heading");



document.addEventListener('scroll', function(e) {
    var scrollTop = window.scrollY;
    //cl("scrollTop : " + scrollTop )
    let screenHeight = window.innerHeight;
    //cl(screenHeight)    

    let imageOpacity = screenHeight / scrollTop ; 
    let finalOpacity =  ((imageOpacity + 2)/10);
    //cl(finalOpacity)
    headerImage.style.opacity = finalOpacity;

    if (finalOpacity < 0.225) {
        headerImage.style.opacity = 0;
    } else if (finalOpacity < 0.25) {
        headerImage.style.opacity = finalOpacity / 2;
    }
    
    
});



/*------------------------------------- h1 element - crack on scroll --------------------------------------- */


var $seriesHeading = document.getElementById("cracked_heading_throwaway");

document.addEventListener('scroll', function(e) {
    // getPosition returns a fixed numerical result. Use this with scrollTop to work out how far
    // from the top the element will be...
    var scrollTop = window.scrollY;
    var $episodeContainer = document.querySelectorAll(".flexEpisodeContainer");

    var episodeHeight = getPosition($episodeContainer[0]);
    var seriesTextHeight = getPosition($seriesHeading);
    var triggerHeight = (episodeHeight - (seriesTextHeight * 2.5));
    var sidePanel_opacity =  (episodeHeight - scrollTop) / 400;

    // cl(scrollTop + "  : scrollTop");
    // cl(episodeHeight + "  : episodeHeight")
    // cl(seriesTextHeight);

    if (scrollTop > triggerHeight){
        $seriesHeading.className = 'seriesTextCracked';
        //$('#side_panel_heading').css({opacity:sidePanel_opacity});  

    } else if ((scrollTop < triggerHeight) && ($seriesHeading.classList.contains("seriesTextCracked"))){
        $seriesHeading.classList.remove("seriesTextCracked");
        $seriesHeading.classList.add("seriesTextUncracked");
        //  $('.cracked_li').eq([i]).css({opacity:'1'});  
    }  
});












