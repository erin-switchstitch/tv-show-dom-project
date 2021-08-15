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
cl(flexOuterContainer)
const allEpisodes = getAllEpisodes();
cl(allEpisodes.length)

for (let index = 0; index < allEpisodes.length; index++) {
  const currentEpisode = allEpisodes[index];
  cl(currentEpisode)
  //cl(flexOuterContainer.innerHTML)
  flexOuterContainer.innerHTML += `
   <div class="flexEpisodeContainer">
        <h2 class="episodeTitle">${currentEpisode.name}</h2>
        <h3 class="episodeNumberElement">Season<span class="seasonNum">1 </span> Episode <span
            class="episodeNum">1</span></h3>

        <div class="episodeImageContainer">
          <img class="episodeImage" src="http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg"
            alt="placeholder image">
          <div class="imageOverlayTextContainer">
            <div class="imageOverlayText">
              <h4>Air Date : <span>17-04-2011</span></h4>
              <h4>Air Time : <span>21.00</span></h4>
              <h4>Runtime : <span>60</span> mins</h4>
            </div>
          </div>
        </div>

        <p class="episodeSummary">Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King
          Robert Baratheon, to serve as the
          King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's
          bastard son Jon
          Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to
          reclaim his
          father's throne, usurped by Robert, by selling his sister in marriage.</p>

        <button class="popupButton" onclick="popUpFunctionIdSpecific()">See More Info
          <span id="PLACEHOLDERmyPopup" class="popupButtonText" id="myPopup">
            <a class="tvMazeLink" href="https://www.w3schools.com/" target="_blank">TV Maze Episode Link</a>
            <a class="imbdLink" href="https://www.w3schools.com/" target="_blank">IMBD Episode Link</a>
          </span>
        </button>

      </div>
  `
}