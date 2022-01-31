//variable required
var latitude;
var longitude;
var city = $('#city');
var city_history = $('#search-history'); // looks for the div id search history.
var search_history_array = [];
const api_key = '8af4c9157472ac0e5568eb69c460c7f4';
var search_button = document.getElementById('city-search-btn');
var city_curr_title = $('#city-card-name');
var city_curr_wx_body = $('#city-card-body');
// var future_wx_cards = $('#future_wx_cards');

function initializePage() {
    // debugger;
    //initializes the page showing past search history and the WX for the most recently searched city
    let temp_search_array = JSON.parse(localStorage.getItem('searchhistoryarray'));
    search_history_array = temp_search_array || [];
    //rebuild the search history buttons
    buildCityCards(search_history_array);
}

search_button.addEventListener('click', function (event) {
    //add a city searched button to the city history buttons list. 
    event.preventDefault();
    console.log("i clicked on the damn search button");
    // debugger;
    //first add the city to the search_history)array.  The city always becomes the first in the array, the array is limited to 10 cities, so it
    //pops the last element in the array if the array length ===10.

    //grab the DOM element to create the buttons.

    //assign the cityname val to a variable so it can be used in the search_history_array below.  Make first letters capital.
    var temp_cityname = city.val();
    var cityname = temp_cityname.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    //see:  https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city for explanation of new function in ES5 and beyond

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
    buildCityCards(search_history_array);

    //call the build weather card but only with the city name entered in the search box and not the entire search_history_array.
    buildWeatherCards(cityname);
})

function buildCityCards(s_history_array) {
    for (i = 0; i < s_history_array.length; i++) {
        city_history.append('<button class="button btn-custom m-1" id="' + s_history_array[i] + '">' + s_history_array[i] + '</button>');
    }
}

function buildWeatherCards(c_name) {
    // debugger;
    //clear out old cards and info
    city_curr_wx_body.empty();
    city_curr_title.empty();


    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + c_name + '&units=imperial&appid=' + api_key;
    
    //executes a fetch from openweathermap.org.  API key is sdseney508 key and is stored as a const
    fetch(url, {
        cache: 'reload',
    })
        //make sure the response wasnt a 404
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //build current wx card title
            // console.log(data.list.0.dt);
            city_curr_title.append('<h3 id="' + c_name + '">' + c_name + '  (' + Date(data.list[0].dt) 
            + ')<img src="http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon
             + '@2x.png" alt="WX Icon" class="weather-icon"></h3>');
            //build a for loop to extract the data for the current day (list item 0) and the next 5 days, list 1-5.
            for(i=0; i<6; i++){
                var wx_date = Date(data.list[i].dt);
                var temp = data.list[i].main.temp;
                var winds = data.list[i].wind.speed;
                var humidity = data.list[i].main.humidity;

                if (i===0){
                    city_curr_wx_body.append('<h5>Temp: ' + temp + '</h5>');
                    city_curr_wx_body.append('<h5>Wind: ' + winds + ' MPH</h5>');
                    city_curr_wx_body.append('<h5>Humidity: ' + humidity + ' %</h5>');
                }
                else {
                    let day_id = i;
                    let future_wx_cards = $('#day-' + i);
                    future_wx_cards.append('<div>'+ wx_date+ '</div>');
                    future_wx_cards.append('<div><img src="http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon
                    + '@2x.png" alt="WX Icon" class="weather-icon"></div>');
                    future_wx_cards.append('<div>Temp: ' + temp + '</div>');
                    future_wx_cards.append('<div>Wind: ' + winds + '</div>');
                    future_wx_cards.append('<div>Humidity: ' + humidity + ' %</div>');
                }
            }


//   
            //build current wx card body

            //build future wx cards
            console.log(data.list);
            console.log("wind is: " + data.list[0].weather[0].icon);
        });
}

initializePage();