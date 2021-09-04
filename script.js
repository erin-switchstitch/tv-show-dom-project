//const { doc } = require("prettier");

//You can edit ALL of the code here
const cl = console.log;

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const episodesNum = document.getElementById("HeaderEpisodesNum");
  episodesNum.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;


// This function works by taking a variable which is the index from the
// for loop below which sets out the new innerHTML. It uses this variable 
// to pull the corresponding button ID. It then adds the "show" class which 
// is then targeted in the CSS
function popUpFunctionIdSpecific(variable) {
  cl(variable)
  const popup = document.getElementById(`myPopupIndex${variable}`);
  popup.classList.toggle("show");
}



const flexOuterContainer = document.querySelector(".flexOuterContainer");
const allEpisodes = getAllEpisodes();
const oneShow = getOneShow();


// This for loop goes through the episodes.js function and pulls the object and all the data for the episodes. It loops through the object
// and inserts the new html for each episode
for (let index = 0; index < allEpisodes.length; index++) {
  const currentEpisode = allEpisodes[index];

  // This code converts data to display season and date info e.g. S1E1 --> S01E01  
  let formatEpisodeNum = currentEpisode.number;
  let formatSeasonNum = currentEpisode.season;
  
  if (formatEpisodeNum < 10){
    formatEpisodeNum = `0${formatEpisodeNum}`;
    cl(formatEpisodeNum)
  }
  if (formatSeasonNum < 10){
    formatSeasonNum = `0${formatSeasonNum}`;
    cl(formatEpisodeNum)
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
