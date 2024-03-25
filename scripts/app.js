let selectedCity = document.getElementById("selectedCity");
let cityName = document.getElementById("cityName");
let currentTemp = document.getElementById("currentTemp");
let feels = document.getElementById("feels");
let currentDayOfWeek = document.getElementById("currentDayOfWeek");
let currentMonth = document.getElementById("currentMonth");
let currentDate = document.getElementById("currentDate");
let weatherDesc = document.getElementById("weatherDesc");
let weatherIcon = document.getElementById("weatherIcon");

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

let saveBtn = document.getElementById("saveBtn").addEventListener("click", function(){
    // Grabbing text from user search to put into function for getting weather
    let userCity = selectedCity.value;
    getWeather(userCity);
    // Setting text on screen to city selected by user
    cityName.innerText = selectedCity.value;
});

let savedWeather = [];
let defaultCity = "Stockton";

// getWeather(defaultCity);


async function getWeather(cityName){
    // Fetching info from GeoApi for latitude and longitude of given user city to input into next api for weather information
    let geoApi = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=8dd8d33b147a163bd7a914bc8bb66f58`).then(Response => Response.json());
    // Saving users lat and lon from the api to give to next api
    console.log(geoApi);
    let lat = Math.round((geoApi["0"].lat) * 100) / 100;
    console.log(`lat is ${lat}`);
    let lon = Math.round((geoApi["0"].lon) * 100) / 100;    
    console.log(`lon is ${lon}`);

    // Fetching weather info using the previous api response providing lat and lon
    let weatherApi = await fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8dd8d33b147a163bd7a914bc8bb66f58&units=imperial`).then(Response => Response.json());
    console.log(weatherApi);
    // Saving the info into another variable for easier access once user searches for different city
    savedWeather = weatherApi;
    console.log(`Saved weather is : ${savedWeather}`);

    // --------DATE AND TIME STRUCTURING-----------
    {
        // Creating new time variable for current full date
        let time = new Date();
        // Current day of the week
        let dayofWeek = time.getDay();
        // Current Month
        let month = time.getMonth();
        // Current Day
        let curDay = time.getDate();

    // Array of months used for picking current month from month variable
    let months = [`January` , `February` , `March` , `April` , `May` , `June` , `July` , `August` , `September` , `October` , `November` , `December`];
    let curMonth = months[month];
    console.log(`Current month is ${curMonth}`);
    // Array of days for picking up name from dayofWeek variable
    let weekDays = [`Sunday` , `Monday` , `Tuesday` , `Wednesday` , `Thursday` , `Friday` , `Saturday`];
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
    day1Week.innerText = weekDays[dayofWeek + 1];
    day2Week.innerText = weekDays[dayofWeek + 2];
    day3Week.innerText = weekDays[dayofWeek + 3];
    day4Week.innerText = weekDays[dayofWeek + 4];
    day5Week.innerText = weekDays[dayofWeek + 5];

    // Future dates day
    day1Date.innerText = `${curMonth} ${(curDay + 1)}`;
    day2Date.innerText = `${curMonth} ${(curDay + 2)}`;
    day3Date.innerText = `${curMonth} ${(curDay + 3)}`;
    day4Date.innerText = `${curMonth} ${(curDay + 4)}`;
    day5Date.innerText = `${curMonth} ${(curDay + 5)}`;
    }



    // -------------WEATHER LISTINGS----------------------
    {
        // CURRENT DAY TEMPS
        // Weather description
        let weatherDes = weatherApi.list["0"].weather["0"].main;
        weatherDescription.innerText = weatherDes;

        // Weather icon
        // let weatherIc = weatherApi.list["0"].weather["0"].icon;
        // weatherIcon.src = weatherIc;

        // Feels like Temperature
        let feelsTemp  = Math.floor(weatherApi.list["0"].main.feels_like);
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
        
    }

        //------------------CONSOLE LOG EXAMPLE RULES/TESTING---------------
    {
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

}

