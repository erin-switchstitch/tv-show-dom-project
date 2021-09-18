/*------------------------------------- Global Variables --------------------------------------- */

const cl = console.log;
const flexOuterContainer = document.querySelector(".flexOuterContainer");
const loadMoreID = document.getElementById("loadMoreID");
const episodesSelectBox = document.getElementById("selectBoxID");
const seriesSelectBox = document.getElementById("seriesSelectBoxID");
const seasonsSelectBox = document.getElementById("seasonsSelectBoxID")
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
let allEpisodesSeasonNumArray =[];
let allSeriesIndexArray = [];
let searchIndexArray =[];



/*--------------------------- Step 0 : Page Load (setup function) -------------------------------------------*/

const getAllSeries = getAllShows();
cl(getAllSeries)
let allSeries = getAllSeries;
let allEpisodes;

function setup() {
  // pullAllSeriesFromFunction(allSeries);
  createAllSeriesIDArray(allSeries); /* <---- need to enter parameter */

  if (allSeries.length > episodeLimitVariable) {
    displaySeries (allSeries, initialLimitLower, initialLimitUpper) 
    createLoadMoreButton("allSeries");
  } else {
    displaySeries (allSeries, 0, seriesArray.length)
  }
}

window.onload = setup;



/*--------------------------------- Webpage functionality / logic code -----------------------------------*/


function createLoadMoreButton(sourceName){
    if (sourceName === "allSeries") {
        loadMoreID.innerHTML = `
        <div class="loadMoreContainer">
          <button class="loadMoreButton" onclick="loadMoreFunction(allSeries,displaySeries)">Load More Episodes</button>
        </div>`;
    }
}

function removeLoadMoreButton (){
  // cl("before remove : " + loadMoreID.innerHTML)
  loadMoreID.innerHTML = ``;
  // cl("after remove : " + loadMoreID.innerHTML)
}


function loadMoreFunction(array, displayFunction){
  cl("LOOK HERE ....")
  cl(array)
  cl(initialLimitUpper);

  if ((initialLimitUpper === array.length) || (initialLimitUpper >array.length)) {
    window.alert("No more episodes to load");

  } else if (initialLimitUpper > (array.length-episodeLimitVariable)){
    cl("Less than 20 left")
    initialLimitLower += episodeLimitVariable; 
    initialLimitUpper = array.length;
    displayFunction(array,initialLimitLower,initialLimitUpper);
    updateLimitValues();

  } else {
    cl("Over 20 left")
    updateLimitValues();
    displayFunction(array,initialLimitLower,initialLimitUpper);
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



function popUpFunctionIdSpecific(variable) {
// This function works by taking a variable which is the index from the for loop 
// below which sets out the new innerHTML. It uses this variable to pull the corresponding
// button ID. It then adds the "show" class which is then targeted in the CSS
  const popup = document.getElementById(`myPopupIndex${variable}`);
  popup.classList.toggle("show");
}

function resetEpisodesHTML() {
  flexOuterContainer.innerHTML = "";
}




/*---------------------------- Step 1 : Create and push SERIES data --------------------------------------- */

var throwawaySeriesID = 82;
var allSeasons = [];

function pullAllSeriesFromFunction(rawData){
  cl(rawData);
  resetLimitValues();
  removeLoadMoreButton();
  allSeasons = rawData; 
  // createAllSeriesIndexArray(allShows);
  // createAllEpisodesIndexArray(allEpisodes);
  // console.log(allEpisodes)
  cl(allSeasons)
  cl(allSeriesIndexArray);
  resetEpisodesHTML();
  displaySeasons(allSeasons,0,allSeasons.length)
  // setup()
}
// fetchSeasonsBySeries(throwawaySeriesID);


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


// I need to pass displaySeasons an array of objects [{},{}]
function displaySeries (seriesArray, lowerLimit, upperLimit) {
  cl("displaySeries run ...")
  cl(seriesArray)
  for (let index = lowerLimit; index < upperLimit; index++) {

    let currentSeries = seriesArray[index]; 

    let seriesName = currentSeries.name;
    let seriesLanguage = currentSeries.language;
    let seriesImage = currentSeries.image.medium;
    let seriesSummary = currentSeries.summary /*<-- not all episodes have summaries*/
    let seriesStatus = currentSeries.status;
    let startDate = currentSeries.premiered;
    let endDate = currentSeries.endDate;
    let tvMazeLink = currentSeries.url;

    let multipleSeries;
    if (seriesArray.length > 1){
      multipleSeries = `s`;
    }
    

    // This code below including the while loops, removes all <p></p> and <br> tags. Some of the summaries have these 
    // tags in the middle of the summary. This solution should remove all of the tags whether at start/middle/end
    var summaryStr = seriesSummary;

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
          <h2 class="episodeTitle">${seriesName}</h2>
          <h3 class="episodeNumberElement"><span class="seasonNum">Status : </span><span
              class="episodeNum">${seriesStatus}</span></h3>

          <div class="episodeImageContainer">
            <img class="episodeImage" src=${seriesImage}
              alt="${seriesName} Banner Image">
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





/*---------------------------- Step 2 : Create and push SEASON data --------------------------------------- */


var throwawaySeriesID = 82;
var allSeasons = [];

function fetchSeasonsBySeries(seriesID){
  fetch(`https://api.tvmaze.com/shows/${seriesID}/seasons`)
  .then(response => response.json())
  .then((data) => {
    allSeasons = [];
    resetLimitValues();
    removeLoadMoreButton();
    allSeasons = data; 
    // createAllSeriesIndexArray(allShows);
    // createAllEpisodesIndexArray(allEpisodes);
    // console.log(allEpisodes)
    cl(allSeasons)

    resetEpisodesHTML();
    displaySeasons(allSeasons,0,allSeasons.length)
        populateSeasonHeaderSelect(allSeasons)
  });
}


function populateSeasonHeaderSelect(arrayToCovert){
  cl("populateSeasonHeaderSelect run....")
  cl(arrayToCovert)

  seasonsSelectBox.innerHTML =`<option value="0" selected>Show All Seasons</option>`;

  for (let index = 0; index < arrayToCovert.length; index++) {
      let currentSeason = arrayToCovert[index];
      cl(currentSeason)

      seasonsSelectBox.innerHTML += `
            <option value=${currentSeason.number}><h3 class="episodeNumberElement"><span class="seasonNum"></span><span
                class="episodeNum"></span>Season ${currentSeason.number}</h3></option>
      `
    }
}


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
    let summary = currentSeason.summary /*<-- not all episodes have summaries*/
    let startDate = currentSeason.premiereDate;
    let endDate = currentSeason.endDate;
    let tvMazeLink = currentSeason.url;

    let multipleEpisodes;
    if (seasonArray.length > 1){
      multipleEpisodes = `s`;
    }
    let imageLink = "";
    if (currentSeason.image!= null){
      imageLink = currentSeason.image.medium;
    }
    cl(currentSeason.image)
    

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






/*---------------------------- Step 3a : Create EPISODE data --------------------------------------- */



let selectedSeriesIndex = 82;

function fetchEpisodesBySeries(seriesID){
  fetch(`https://api.tvmaze.com/shows/${seriesID}/episodes`)
  .then(response => response.json())
  .then((data) => {
    cl("fetchEpisodesBySeries function run")
    // allSeriesIndexArray = [];
    allEpisodes = data;
    createAllEpisodesIndexArray(allEpisodes);
    cl(allEpisodes)
  });
}




//allEpisodes[allEpisodesIndexArray}]

function createAllEpisodesIndexArray(arrayToCovert){
  allEpisodesIndexArray =[];
  allEpisodesSeasonNumArray=[];
  episodesSelectBox.innerHTML = `<option value="" selected>Show All Episodes</option>`;

  for (let index = 0; index < arrayToCovert.length; index++) {  
    // This creates an array with all the index positions of the full episode list
    allEpisodesIndexArray.push(index);
    allEpisodesSeasonNumArray.push(arrayToCovert[index].season)
    
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
    episodesSelectBox.innerHTML += `
          <option value=${index}><h3 class="episodeNumberElement">S<span class="seasonNum">${formatSeasonNum}</span>E<span
              class="episodeNum">${formatEpisodeNum}</span> - ${currentEpisode.name}</h3></option>
    `
  }
}

function populateEpisodeHeaderSelect(episodeList, seasonNum, lowerLimit, upperLimit) {
  cl(episodeList)
  cl(lowerLimit)
  cl(upperLimit)
  
  const episodesNum = document.getElementById("searchHeaderOverlay");
  episodesNum.textContent = `${episodeList.length} / ${episodeList.length}`;

  if (seasonNum > 0) {
    episodesSelectBox.innerHTML = `<option value="${seasonNum}" selected>Show All Episodes For Season ${seasonNum}</option>`;
  } else if (seasonNum === 0) {
    episodesSelectBox.innerHTML = `<option value="0" selected>Show All Episodes${seasonNum}</option>`;
  }
  for (let index = lowerLimit; index < upperLimit; index++) {  
    // // This creates an array with all the index positions of the full episode list
    // allEpisodesIndexArray.push(index);
    // allEpisodesSeasonNumArray.push(arrayToCovert[index].season)
    
    // Below populates the select list for the episode header button
    let currentEpisode = episodeList[index];
    let formatEpisodeNum = currentEpisode.number;
    let formatSeasonNum = currentEpisode.season;
    
    if (formatEpisodeNum < 10){
      formatEpisodeNum = `0${formatEpisodeNum}`;
    }
    if (formatSeasonNum < 10){
      formatSeasonNum = `0${formatSeasonNum}`;
    }
    episodesSelectBox.innerHTML += `
          <option value=${index}><h3 class="episodeNumberElement">S<span class="seasonNum">${formatSeasonNum}</span>E<span
              class="episodeNum">${formatEpisodeNum}</span> - ${currentEpisode.name}</h3></option>
    `
  }
  // const subHeaderEpisodesNum = document.getElementById("subHeaderEpisodesNum");
  // subHeaderEpisodesNum.textContent = ` ${episodeList.length} of ${episodeList.length} `;
}


function populateSearchButtonOverlay(episodeList) {
  const episodesNum = document.getElementById("searchHeaderOverlay");
  episodesNum.textContent = `${episodeList.length} / ${episodeList.length}`;

  // const subHeaderEpisodesNum = document.getElementById("subHeaderEpisodesNum");
  // subHeaderEpisodesNum.textContent = ` ${episodeList.length} of ${episodeList.length} `;
}

populateSearchButtonOverlay(allSeries);


/*--------------------------------- Step 3b : Display EPISODE data --------------------------------------- */



// I need to pass displayEpisodes an array of objects [{},{}]
function displayEpisodes (episodeArray, lowerLimit, upperLimit) {
  cl(episodeArray);
  // This for loop goes through the episodes.js function and pulls the object and all the data for the episodes. It loops through the object
  // and inserts the new html for each episode
  for (let index = lowerLimit; index < upperLimit; index++) {
    //cl(allEpisodes[72])
    //cl(episodeArray[index])
    const currentEpisode = episodeArray[index] ; 
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
              <a class="imbdLink" href=${currentEpisode._links.self.href} target="_blank">Official Site Link</a>
            </span>
          </button>

        </div>
    `;
  }
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












