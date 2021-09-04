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


var $seriesHeading = document.querySelectorAll("#cracked_heading_throwaway");
var $episodeContainer = document.querySelectorAll(".flexEpisodeContainer");



document.addEventListener('scroll', function(e) {
    var scrollTop = window.scrollY;
    
    
    for(i=0; i<($seriesHeading.length) ; i++) {
    
        console.log(($seriesHeading[i]));
        var elementHeight = getPosition($seriesHeading[i]);
        console.log("Element Height : " + elementHeight);
        var currentIndex = document.getElementById('cracked_heading_throwaway').selectedIndex = [i];
        var currentHeading = $seriesHeading[currentIndex];
        var height_offset = 350;

        var episodeHeight = getPosition($episodeContainer[0]);
        cl($episodeContainer[0])
        cl("Episode Height : " + episodeHeight)
        var sidePanel_opacity =  (episodeHeight - scrollTop) / 400;


        if (scrollTop > (episodeHeight - 400)){
            cl("SUCCESS")
            $seriesHeading[i].className = 'cracked_li';
            cl($seriesHeading.className)
            //$('#side_panel_heading').css({opacity:sidePanel_opacity});  
        }   else if ($seriesHeading[i].classList.contains("cracked_li")){
            //  $('.cracked_li').eq([i]).css({opacity:'1'});  
            $seriesHeading[i].classList.remove("cracked_li");
            $seriesHeading[i].classList.add("uncrackedSeriesHeadingText");
        }  
        

        // if (scrollTop > (elementHeight - height_offset)) {
        //     //console.log($ul_li[i])
        //     //console.log("scroll :" + scrollTop);
        //     //console.log("elementHeight :" + elementHeight);
        //     /*console.log("ST - EH" + $ul_li[i] + (scrollTop - elementHeight));*/
            
        //     // var li_opacity =  (elementHeight - scrollTop) / height_offset;
    
        //     // $seriesHeading.className = 'cracked_li';
        //     // cl($seriesHeading.className)
            
        //     //$('.cracked_li').eq([i]).css({opacity:li_opacity});  
        
        // } 
    
    }
});














/*

let h1 = document.querySelector('h1');

var viewportOffset = h1.getBoundingClientRect();
// these are relative to the viewport
var top = viewportOffset.top;
var left = viewportOffset.left;

console.log(top);





*/






