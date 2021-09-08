/*

The way I'm going to deal with switching CSS styles when the element 
is high enough is to give them all the same throwaway id. Then through 
this ID i am going to change their styling away from the original class 
and to the cracked styling element. This should then also allow me to remove
this new class and return to the original one. 

Issues with this approach is that the cracked CSS I am pulling from has 
many different CSS styles
*/


function getPosition(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
 
    return yPosition ;
}


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












