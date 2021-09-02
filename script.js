//const { doc } = require("prettier");

//You can edit ALL of the code here
const cl = console.log;

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
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
cl(flexOuterContainer);
const allEpisodes = getAllEpisodes();
cl(allEpisodes.length);
const oneShow = getOneShow();


for (let index = 0; index < allEpisodes.length; index++) {
  const currentEpisode = allEpisodes[index];

  //cl(currentEpisode.summary);
  var summaryStr = currentEpisode.summary;
  summaryStr = summaryStr.substring(3, summaryStr.length);
  summaryStr = summaryStr.substring(0, summaryStr.indexOf("</p>"));


  flexOuterContainer.innerHTML += `
   <div class="flexEpisodeContainer">
        <h2 class="episodeTitle">${currentEpisode.name}</h2>
        <h3 class="episodeNumberElement">Season&nbsp<span class="seasonNum">${currentEpisode.season}</span>&nbspEpisode&nbsp<span
            class="episodeNum">${currentEpisode.number}</span></h3>

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
