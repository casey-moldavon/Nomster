// This page is for design based functions and code


    $("#search-button").on("click", function(){

        $("#city-container").fadeIn(2000);
        $("#five-day").toggle(3000);
        // $(".day-container").fadeIn(1000);

        $("").toggle(3000);
        $("#day-2").toggle(3000);
        $("#day-3").toggle(3000);
        $("#day-4").toggle(3000);
        $("#day-5").toggle(3000);
    
    });



    // ========== Self note (Casey): To-Do list: ==========

    // list of actions:

    $("#search-button").on("click", function(){
    // - page 1 to page 2 fade transition (after search button is pressed)
    //     - page 1 becomes visibility: hidden
    $("#page-1").fadeOut(2000);
    //     - page 2 becomes visibility: visible (add fade effect)
    $("#page-2").fadeIn(2000);
    // - Home button becomes visibility: visible
    $("#home-tab").show(1000);
    // - monster (image-display-2) toggles (becomes visibility: visible)
    //     - slow toggle appear (for comedy purposes)
    $("#image-display-2").slideLeft(3000);
    // - speech bubble 1,2,3 appears
    //     - becomes visibility: visible

        $("#bubble-1").delay(5000).fadeIn(1000);
        $("#bubble-2").delay(6000).fadeIn(1000);
        $("#bubble-3").delay(7000).fadeIn(1000);
    });



    // - create event listener for monster (image-display-2)
    //     - on "click" reset back to page 1
