
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
    //cl((imageOpacity + 2)/10)
    headerImage.style.opacity = ((imageOpacity + 2)/10);
    
});