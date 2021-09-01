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

function popUpFunctionIdSpecific() {
  var popup = document.getElementById("PLACEHOLDERmyPopup");
  popup.classList.toggle("show");
}

const flexOuterContainer = document.querySelector(".flexOuterContainer");
cl(flexOuterContainer);
const allEpisodes = getAllEpisodes();
cl(allEpisodes.length);

for (let index = 0; index < allEpisodes.length; index++) {
  const currentEpisode = allEpisodes[index];
  cl(currentEpisode);
  //cl(flexOuterContainer.innerHTML)
  flexOuterContainer.innerHTML += `
   <div class="flexEpisodeContainer">
        <h2 class="episodeTitle">${currentEpisode.name}</h2>
        <h3 class="episodeNumberElement">Season<span class="seasonNum"> ${currentEpisode.season}</span> Episode <span
            class="episodeNum"> ${currentEpisode.number}</span></h3>

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

        <p class="episodeSummary">${currentEpisode.summary}</p>

        <button class="popupButton" onclick="popUpFunctionIdSpecific()">See More Info
          <span id="PLACEHOLDERmyPopup" class="popupButtonText" id="myPopup">
            <a class="tvMazeLink" href=${currentEpisode._links.self.href} target="_blank">TV Maze Episode Link</a>
            <a class="imbdLink" href="https://www.w3schools.com/" target="_blank">IMBD Episode Link</a>
          </span>
        </button>

      </div>
  `;
}
