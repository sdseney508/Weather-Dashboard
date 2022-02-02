# Weather-Dashboard
![image](https://user-images.githubusercontent.com/62141103/152249277-771b338a-f919-4a5c-80c8-71af8d61c463.png)

## Description
Displays a simple weather display for cities of interest of the user.  The wx displays the following:
    -Current date / time
    
    -Current Temp
    
    -Current Wind
    
    -Current UV index
    
    -5 day forecast for
    
        -Daily hi
        
        -Daily low
        
        -Forecasted winds
        
        -Forecasted wx (sunny, rainy, etc.)
        
        -Forecasted humidty

API Information for the calls can be found at: https://openweathermap.org/api

## Table of Contents
-[Installation](#installation)

-[Usage](#usage)

-[Credits](#credits)

-[License](#license)

-[Badges](#badges)

-[Features](#features)

-[How To Contribute](#how_to_contribute)

-[Tests](#tests)

-[Acknowledgements](#acknowledgements)


## Installation
Run the application from the following URL: https://sdseney508.github.io/Weather-Dashboard/

## Usage
No restrictions on the usage of this calendar tool.  There is a limit of 1000 calls per day from the API_key / account.  This is a restriction on the free account by openweathermap.org.

## Credits
For a good review of formating and descriptions of semantic elements and html and CSS tutorials:  https://www.w3schools.com/

For a good review of formating and descriptions of javascript and tutorials:  https://www.w3schools.com/

For jQuery synatx: https://jQuery.com/

## License
License file located at: https://github.com/sdseney508/weather-dashboard/blob/main/license.txt

## Badges
N/A for this project.

## Features
This project contains several features:

    -jQuery search bar:  Takes in the selected user input for city, capitalizes it, and then checks to see if it has already been searched.  if it has, it searches again but does NOT add a new button to the search history field.
    
    -Search history field:  Creates a button for each of the last ten cities searched to enable easy re-searches without having to retype in the prior city name.  Cities are stored in search order vice alphabetical order.  This could be modified to alphabetical by future users by doing a .sort() on the array.
    
    -Card builder:  Builds the wx cards for the current and future days.



## How_to_contribute
N/A

## Tests
N/A
