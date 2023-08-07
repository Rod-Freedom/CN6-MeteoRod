const landingBox = document.querySelector("#startDiv");
const btnGo = document.querySelector("#btnGo");
const header = document.querySelector("header");
const earth = document.querySelector("#earth");
const selectedLoc = document.querySelector("#selectedLoc");
const cardBox = document.querySelector("#cardBox");
const btnNoLoc = document.querySelector("#btnNoLoc");
const noLocMsg = document.querySelector("#locationError");

const key = "ffedf07a2c975f4051af21f7767f019d";

const beginFunc = () => {
    landingBox.classList.add('opacity-0');
    header.classList.remove('opacity-0');
    header.classList.add('opacity-100');
    earth.classList.add('earth-contracted');
    earth.classList.remove('earth-full');


    setTimeout(landingBox.classList.add('hidden'), 1000);
}

const bgImgGen = (weather) => {
    
    if (weather.search("thunderstorm") > 0) {
        return "storm";
    } else if (weather.search("light rain") > 0 || weather.search("moderate rain") > 0) {
        return "light_rain";
    } else if (weather.search("rain") > 0 || weather.search("drizzle") > 0) {
        return "shower_rain";
    } else if (weather.search("overcast clouds") > 0) {
        return "overcast_clouds";
    } else if (weather.search("broken clouds") > 0) {
        return "clouds";
    } else if (weather.search("clouds") > 0) {
        return "few_clouds";
    } else if (weather.search("clear") > 0) {
        return "clear_sky";
    } else if (weather.search("shower snow") > 0 || weather.search("heavy snow") > 0) {
        return "shower_snow";
    } else if (weather.search("snow") > 0) {
        return "snow";
    }
}

const cardReactor = (cardNum, date, temp, weather, icon, humidity) => {
    
    let dayD = "";
    let hourD = dayjs.unix(date).format("HH:mm");
    const bgImg = bgImgGen(weather);
    const roundTemp = temp.toFixed();

    if (dayjs.unix(date).format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")) {
        dayD = "today";
    } else if (dayjs.unix(dayD+86400).format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")) {
        dayD = "tomorrow";
    } else {
        dayD = dayjs.unix(dayD).format("DD-MMM")
    }
    
    newCard = `
        <div id="weatherCard-${cardNum}" class="w-1/6 m-1/60 h-4/5 flex flex-col justify-between p-4 items-center bg-black/50 rounded-2xl border-4 drop-shadow-xl" style="background: url(./assets/img/${bgImg}.gif) no-repeat; background-size: cover;">
            <div id="topSq" class="flex flex-col items-center justify-center w-full p-4 rounded-xl bg-slate-500/50 text-center">
                <h3 class="font-brand font-thin text-base mb-4">${dayD}<br><span class="text-2xl font-normal">${hourD}</span></h3>
                <h1 class="font-brand font-semibold text-7xl">&nbsp;${roundTemp}<span class="font-thin">°</span></h1>
                <h4 class="font-brand font-thin text-xl">${weather}</h4>
                <span class="w-16 h-16 bg-cover" style="background-image: url(https://openweathermap.org/img/wn/${icon}@2x.png);"></span>
            </div>

            <div id="bttmSq" class="flex flex-col w-full items-center justify-center p-4 rounded-xl bg-slate-500/50 text-center"> 
                <h4 class="font-brand font-thin text-lg mb-2"><i class="fa-light fa-wind text-white"></i>&nbsp;Wind speed:<br><span>${windSp}km/h</span></h4>
                <h4 class="font-brand font-thin text-lg"><i class="fa-sharp fa-light fa-droplet-percent text-white"></i>&nbsp;Humidity:<br><span>${humidity}%</span></h4>
            </div>
        </div>
    `;
}



console.log(dayjs.unix(1691377200+86400).format("DD-MM HH:mm"))


const getMeteo = `api.openweathermap.org/data/2.5/forecast?lat=19.43&lon=99.13&appid=${key}`;

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=19.4326296&lon=-99.1331785&units=metric&appid=ffedf07a2c975f4051af21f7767f019d')
//     .then((res) => {
//     return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })


const setLocFunc = () => {

    const latitude = selectedLoc.dataset.lat;
    const longitude = selectedLoc.dataset.lon;
    const getLocation = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(getLocation);

    fetch(getLocation)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            selectedLoc.innerHTML = data[0].name;
        })
};

const located = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    selectedLoc.dataset.lat = latitude;
    selectedLoc.dataset.lon = longitude;

    setLocFunc();
    btnGo.classList.remove('opacity-0');
    btnGo.addEventListener("click", beginFunc);
};

const locatedFalse = () => {
    const refreshSite = () => {
        location.reload();
    };
    
    noLocMsg.classList.add('flex');
    noLocMsg.classList.remove('hidden');
    btnNoLoc.addEventListener("click", refreshSite);
};

const readyFunc = () => {
    navigator.geolocation.getCurrentPosition(located, locatedFalse);
};

window.onload = readyFunc();
