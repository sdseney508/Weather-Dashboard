//variable required
var latitude;
var longitude;
var city = $('#city');
var city_history = $('#search-history'); // looks for the div id search history.
var search_history_array = [];
// search_history_array[0] = ['-'];
var search_button = document.getElementById('city-search-btn');

function initializePage() {
    //initializes the page showing past search history and the WX for the most recently searched city
    let temp_search_array = JSON.parse(localStorage.getItem('searchhistoryarray'));

    search_history_array = temp_search_array || [];
    //rebuild the search history buttons
    if (search_history_array != null) {
        for (i = 0; i < search_history_array.length; i++) {
            city.append('<button class="button btn-custom m-1" id="' + search_history_array[i] + '">' + search_history_array[i] + '</button>');
        }
    }
}

search_button.addEventListener('click', function (event) {
    //add a city searched button to the city history buttons list. 
    event.preventDefault();
    console.log("i clicked on the damn search button");
    debugger;
    //first add the city to the search_history)array.  The city always becomes the first in the array, the array is limited to 10 cities, so it
    //pops the last element in the array if the array length ===10.

    //grab the DOM element to create the buttons.

    //assign the cityname val to a variable so it can be used in the search_history_array below.
    var cityname = city.val();
    let poss_check = false;

    //first check to see if the city name is already in the array, if it is, still pull up the search, but dont add it to the array.
    for (t = 0; t < search_history_array.length; t++) {
        if (search_history_array[t] == cityname) {
            poss_check = true;
        }
    }
    //ignore adding it to the array if it's already there
    if (poss_check == false) {
        if (search_history_array != null) {
            if (search_history_array.length === 10) {
                search_history_array.unshift(cityname);
                search_history_array.pop();
            }
            else {
                search_history_array.unshift(cityname);
            }
        }
        // this else is here to just add the cityname to the current null array.
        else {
            search_history_array.push(cityname);
        }
        //reset the local storage for the search_history_array
        localStorage.setItem('searchhistoryarray', JSON.stringify(search_history_array));
    
    }
    
    //now we build the buttons.  First we need to clear the search history area before we do the append. 
    city_history.empty();

    //now cycle through the search_history_array and create a research button for each prior searched city name.
    for (i = 0; i < search_history_array.length; i++) {
        city_history.append(`<button class="button btn-custom m-1" id="${search_history_array[i]}">${search_history_array[i]}</button>`);
    }

    buildWeatherCards(cityname);
})

function buildWeatherCards(cityn){


}
initializePage();