let favCities = [];
let savedWeather = [];
let savedGeo = [];
let selectedCity = document.getElementById("selectedCity");
let cityName = document.getElementById("cityName");
let currentTemp = document.getElementById("currentTemp");
let feels = document.getElementById("feels");
let currentDayOfWeek = document.getElementById("currentDayOfWeek");
let currentMonth = document.getElementById("currentMonth");
let currentDate = document.getElementById("currentDate");
let weatherDesc = document.getElementById("weatherDesc");
let weatherIcon = document.getElementById("weatherIcon");
let heartIcon = document.getElementById("heartIcon");
let insertFavorites = document.getElementById("insertFavorites");



let topTemp = document.getElementById("topTemp");
let lowTemp = document.getElementById("lowTemp");
let humid = document.getElementById("humid");

let day1Week = document.getElementById("day1Week");
let day2Week = document.getElementById("day2Week");
let day3Week = document.getElementById("day3Week");
let day4Week = document.getElementById("day4Week");
let day5Week = document.getElementById("day5Week");

let day1Date = document.getElementById("day1Date");
let day2Date = document.getElementById("day2Date");
let day3Date = document.getElementById("day3Date");
let day4Date = document.getElementById("day4Date");
let day5Date = document.getElementById("day5Date");

let day1Temperature = document.getElementById("day1Temperature");
let day2Temperature = document.getElementById("day2Temperature");
let day3Temperature = document.getElementById("day3Temperature");
let day4Temperature = document.getElementById("day4Temperature");
let day5Temperature = document.getElementById("day5Temperature");

let searchBtn = document.getElementById("searchBtn").addEventListener("click", function () {
    // Grabbing text from user search to put into function for getting weather
    getWeather(selectedCity.value);
    // Setting text on screen to city selected by user
    cityName.innerText = selectedCity.value;
});
let saveBtn = document.getElementById("saveBtn").addEventListener("click", function () {

    if (heartIcon.src.includes("media/fullHeart.png")) {
        heartIcon.src = "media/clearHeart.png";

        for (let i = 0; i < favCities.length; i++) {
            if (favCities[i].cityName.toLowerCase(favCities[i].cityName).includes(selectedCity.value.toLowerCase(selectedCity.value))) {
                console.log(`IT WAS IN THE FAVORITES`);
                console.log(favCities);
                favCities.splice(i, 1);
                console.log(favCities);
                let newBtn = insertFavorites.getElementsByClassName("favoriteCityBar")[i];
                insertFavorites.removeChild(newBtn);
            };
            localStorage.setItem("favoriteCities", JSON.stringify(favCities));
        };
    }
    else {
        heartIcon.src = "media/fullHeart.png";
        console.log(`Saved weather is : ${savedWeather.city.name}`);
        console.log(`Saved weather is : ${savedWeather.city.country}`);
        // Saving city name to local api that can be recalled at any time if user wants
        let obj = {
            "cityName": savedWeather.city.name + ", " + savedWeather.city.country
        };

        console.log(`This is the obj : ${obj}`);
        // Push it into our array for easier access
        favCities.push(obj);
        console.log(favCities);
        // Saving values into localStorage with the json formatted into strings
        localStorage.setItem("favoriteCities", JSON.stringify(favCities));
        console.log(localStorage);

        // PROCESS OF CREATING ELEMENT OF THE BUTTON IN OUR FAVORITES TAB
        // First creating the button to house the h2 and img in
        let newBtn = document.createElement("button");
        newBtn.classList = `favoriteCityBar mb-5 d-flex justify-content-between`;
        newBtn.id = `favCityBtn`;
        // h2 tag that goes into button containing name of city and state
        let h2Tag = document.createElement("h2");
        h2Tag.classList = `ms-3 mt-2`;
        h2Tag.innerText = `${savedGeo[0].name}, ${savedGeo[0].state}`;
        // Creating img tag for heart image on side
        let newImgTag = document.createElement("img");
        newImgTag.classList = `heartIcon mt-1`;
        newImgTag.src = `media/fullHEart.png`;

        // Telling the elements where to go on our html
        newBtn.appendChild(h2Tag);
        newBtn.appendChild(newImgTag);
        insertFavorites.appendChild(newBtn);

    };


});

let favData = JSON.parse(localStorage.getItem("favoriteCities"));
console.log(JSON.parse(localStorage.favoriteCities));

// Checking if favData is existing and is it not null
if (favData && favData != null) {
    // Save our data captured from the favlist and store it into our array containing favorite cities
    favCities = favData;
    console.log(favCities);

    for (let i = 0; i < favCities.length; i++) {
        // PROCESS OF CREATING ELEMENT OF THE BUTTON IN OUR FAVORITES TAB
        // First creating the button to house the h2 and img in
        let newBtn = document.createElement("button");
        newBtn.classList = `favoriteCityBar mb-5 d-flex justify-content-between`;
        newBtn.id = `favCityBtn`;
        // h2 tag that goes into button containing name of city and state
        let h2Tag = document.createElement("h2");
        h2Tag.classList = `ms-3 mt-2`;
        h2Tag.innerText = favCities[i].cityName;
        // Creating img tag for heart image on side
        let newImgTag = document.createElement("img");
        newImgTag.classList = `heartIcon mt-1`;
        newImgTag.src = `media/fullHEart.png`;

        // Telling the elements where to go on our html
        newBtn.appendChild(h2Tag);
        newBtn.appendChild(newImgTag);
        insertFavorites.appendChild(newBtn);
        h2Tag.addEventListener("click", async function () {
            getWeather(h2Tag.innerText);
            let splitTxt = h2Tag.innerText.split(",");
            console.log(`THIS IS THE SLICE ${splitTxt}`);
            // cityName.innerText = h2Tag.innerText.slice()
        });
    }
};




// let defaultCity = "Stockton";
// getWeather(defaultCity);


async function getWeather(cityName) {

    for (let i = 0; i < favCities.length; i++) {
        if (favCities[i].cityName.toLowerCase(favCities[i].cityName).includes(cityName.toLowerCase(cityName))) {
            heartIcon.src = "media/fullHeart.png";
        }
        else {
            heartIcon.src = "media/clearHeart.png";
        };
    };

    // Fetching info from GeoApi for latitude and longitude of given user city to input into next api for weather information
    let geoApi = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=8dd8d33b147a163bd7a914bc8bb66f58`).then(Response => Response.json());
    // Saving users lat and lon from the api to give to next api
    console.log(geoApi);
    let lat = Math.round((geoApi["0"].lat) * 100) / 100;
    console.log(`lat is ${lat}`);
    let lon = Math.round((geoApi["0"].lon) * 100) / 100;
    console.log(`lon is ${lon}`);
    savedGeo = geoApi;

    // Fetching weather info using the previous api response providing lat and lon
    let weatherApi = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8dd8d33b147a163bd7a914bc8bb66f58&units=imperial`).then(Response => Response.json());
    console.log(weatherApi);
    // Saving the info into another variable for easier access once user searches for different city
    savedWeather = weatherApi;
    console.log(`Saved weather is : ${savedWeather}`);



    // --------DATE AND TIME STRUCTURING-----------

    // Creating new time variable for current full date
    let time = new Date();
    // Current day of the week
    let dayofWeek = time.getDay();
    // Current Month
    let month = time.getMonth();
    // Current Day
    let curDay = time.getDate();

    // Array of months used for picking current month from month variable
    let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    let curMonth = months[month];
    console.log(`Current month is ${curMonth}`);
    // Array of days for picking up name from dayofWeek variable
    let weekDays = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
    // Grabbing current weekday from the array we've created using the dayofWeek variable from date
    let curWeekDay = weekDays[dayofWeek];
    console.log(`Current day is ${curWeekDay}`);

    // Changing text on screen to match current date
    // currentDayOfWeek.innerText = curWeekDay;
    // currentMonth.innerText = curMonth;
    // currentDay.innerText = curDay;

    let currDate = `${curWeekDay}, ${curMonth} ${curDay}`;
    currentDate.innerText = currDate;

    // Future dates days of week
    day1Week.innerText = weekDays[(dayofWeek + 1) % weekDays.length];
    day2Week.innerText = weekDays[(dayofWeek + 2) % weekDays.length];
    day3Week.innerText = weekDays[(dayofWeek + 3) % weekDays.length];
    day4Week.innerText = weekDays[(dayofWeek + 4) % weekDays.length];
    day5Week.innerText = weekDays[(dayofWeek + 5) % weekDays.length];

    // Future dates day
    // Inspiration from NEOS CODE for ending of days
    day1Date.innerText = `${curMonth} ${(curDay + 1)}`;
    day2Date.innerText = `${curMonth} ${(curDay + 2)}`;
    day3Date.innerText = `${curMonth} ${(curDay + 3)}`;
    day4Date.innerText = `${curMonth} ${(curDay + 4)}`;
    day5Date.innerText = `${curMonth} ${(curDay + 5)}`;




    // -------------WEATHER LISTINGS----------------------

    // CURRENT DAY TEMPS
    // Weather description
    let weatherDes = weatherApi.list["0"].weather["0"].main;
    weatherDescription.innerText = weatherDes;

    // Weather icon
    // let weatherIc = weatherApi.list["0"].weather["0"].icon;
    // weatherIcon.src = weatherIc;

    // Feels like Temperature
    let feelsTemp = Math.floor(weatherApi.list["0"].main.feels_like);
    feels.innerText = feelsTemp + "°";

    // Max temp for current day
    let maxTemp = Math.floor(weatherApi.list["0"].main.temp_max);
    topTemp.innerText = maxTemp + "°";
    // Min temp for current day
    let minTemp = Math.floor(weatherApi.list["0"].main.temp_min);
    lowTemp.innerText = minTemp + "°";
    // Current temp for the day
    let curTemp = Math.floor(weatherApi.list["0"].main.temp);
    currentTemp.innerText = curTemp + "°";
    // Current humidity for the day
    let humidity = weatherApi.list["0"].main.humidity;
    humid.innerText = humidity + "%";

    // FUTURE DAY TEMPS, day 1 - 5
    let day1Temp = Math.floor(weatherApi.list["6"].main.temp);
    day1Temperature.innerText = day1Temp + "°";
    let day2Temp = Math.floor(weatherApi.list["14"].main.temp);
    day2Temperature.innerText = day2Temp + "°";
    let day3Temp = Math.floor(weatherApi.list["23"].main.temp);
    day3Temperature.innerText = day3Temp + "°";
    let day4Temp = Math.floor(weatherApi.list["31"].main.temp);
    day4Temperature.innerText = day4Temp + "°";
    let day5Temp = Math.floor(weatherApi.list["39"].main.temp);
    day5Temperature.innerText = day5Temp + "°";



    //------------------CONSOLE LOG EXAMPLE RULES/TESTING---------------

    // CURRENT WEATHER TEMP

    // weatherApi.list["0"].dt_txt for date
    console.log(`today's date ${weatherApi.list["0"].dt_txt}`)
    // weatherApi.list["0"].weather["0"].main for weather description
    console.log(`weather desc ${weatherApi.list["0"].weather["0"].main}`)
    // weatherApi.list["0"].weather["0"].icon for weather icon
    console.log(`weather icon ${weatherApi.list["0"].weather["0"].icon}`)
    // weatherApi.list["0"].main.feels_like for feels like temp
    console.log(`feels like ${Math.floor(weatherApi.list["0"].main.feels_like)}`)
    // weatherApi.list["0"].main.temp_max for max
    console.log(`max temp ${Math.floor(weatherApi.list["0"].main.temp_max)}`)
    // weatherApi.list["0"].main.temp_min for min
    console.log(`min temp ${Math.floor(weatherApi.list["0"].main.temp_min)}`)
    // weatherApi.list["0"].main.temp for current temp
    console.log(`current temp ${Math.floor(weatherApi.list["0"].main.temp)}`)
    // weatherApi.list["0"].main.humidity for humidity
    console.log(`humidity is ${weatherApi.list["0"].main.humidity}`)

    // DAY 1 TEMP
    console.log(`day 1 temp is ${Math.floor(weatherApi.list["6"].main.temp)}`)
    // DAY 2 TEMP
    console.log(`day 2 temp is ${Math.floor(weatherApi.list["14"].main.temp)}`)
    // DAY 3 TEMP
    console.log(`day 3 temp is ${Math.floor(weatherApi.list["23"].main.temp)}`)
    // DAY 4 TEMP
    console.log(`day 4 temp is ${Math.floor(weatherApi.list["31"].main.temp)}`)
    // DAY 5 TEMP
    console.log(`day 5 temp is ${Math.floor(weatherApi.list["39"].main.temp)}`)

}