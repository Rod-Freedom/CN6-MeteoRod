const landingBox = document.querySelector("#startDiv");
const btnGo = document.querySelector("#btnGo");
const header = document.querySelector("header");
const earth = document.querySelector("#earth");
const selectedLoc = document.querySelector("#selectedLoc");
const selectedLoc2 = document.querySelector("#selectedLoc2");
const cardBox = document.querySelector("#cardBox");
const cardBoxCont = document.querySelector("#cardBoxCont");
const btnNoLoc = document.querySelector("#btnNoLoc");
const noLocMsg = document.querySelector("#locationError");
const arrow = document.querySelectorAll("#arrow");
const daySelectorBox = document.querySelector("#daySelectorBox");
const daySelector = document.querySelector("#daySelector");
const dayId = document.querySelectorAll("#day");
const btnScrollCard = document.querySelectorAll("#btnScrollCard");
const autoCompDiv = document.querySelector("#autoComp");
const inputCity = document.querySelector("#city");
const newLocBox = document.querySelector("#newLocBox");
const locDiv = document.querySelector("#locDiv");

const key = "ffedf07a2c975f4051af21f7767f019d";
let counter = 0;
let weatherArray = [];
let citiesHistory = [];
const citiesArray = ["Aba", "Abidjan", "Abomey-Calavi", "Abu Dhabi", "Abuja", "Acapulco de Juarez", "Accra", "Ad-Dammam", "Adana", "Addis Ababa", "Adelaide", "Aden", "Agadir", "Agra", "Aguascalientes", "Ahmedabad", "Ahvaz", "Aleppo", "Alexandria", "Algiers", "Aligarh", "Allahabad", "Almaty", "Amman", "Amravati", "Amritsar", "Amsterdam", "Ankara", "Anqing", "Anqiu", "Ansan", "Anshan", "Antalya", "Antananarivo", "Antipolo", "Antwerp", "Anyang", "Ar-Rayyan", "Aracaju", "Arequipa", "Asansol", "Ashgabat", "Asmara", "Astana", "Asuncion", "Athens", "Auckland", "Aurangabad", "Austin", "Baghdad", "Bahawalpur", "Baishan", "Baixada Santista", "Baku", "Bamako", "Bandar Lampung", "Bandung", "Bangalore", "Banghazi", "Bangkok", "Bangui", "Banjarmasin", "Baoding", "Baoji", "Baotou", "Barcelona", "Barcelona-Puerto La Cruz", "Bareilly", "Barquisimeto", "Barranquilla", "Basra", "Batam", "Bazhong", "Beijing", "Beirut", "Bekasi", "Belem", "Belgaum", "Belgrade", "Belo Horizonte", "Bengbu", "Benguela", "Benin City", "Benxi", "Bergamo", "Berlin", "Bhiwandi", "Bhopal", "Bhubaneswar", "Bien Hoa", "Bikaner", "Binzhou", "Birmingham", "Bishkek", "Blantyre-Limbe", "Bobo-Dioulasso", "Bogor", "Bogota", "Bogra", "Bologna", "Bordeaux", "Bozhou", "Brasilia", "Brazzaville", "Brisbane", "Brussels", "Bucaramanga", "Bucharest", "Bucheon", "Budapest", "Buenos Aires", "Bujumbura", "Bukavu", "Bunia", "Bur Sa'id", "Bursa", "Busan", "Cabinda", "Cagayan de Oro City", "Cairo", "Calgary", "Cali", "Campinas", "Campo Grande", "Can Tho", "Cancun", "Cape Town", "Caracas", "Cartagena", "Casablanca", "Cebu City", "Chandigarh", "Changchun", "Changde", "Changsha", "Changshu", "Changwon", "Changzhi", "Changzhou", "Chaozhou", "Charlotte", "Chelyabinsk", "Chengde", "Chengdu", "Chennai", "Chenzhou", "Cherthala", "Chiang Mai", "Chicago", "Chifeng", "Chihuahua", "Chittagong", "Chon Buri", "Chongqing", "Ciudad Guayana", "Ciudad Juarez", "Cixi", "Cochabamba", "Coimbatore", "Cologne", "Columbus", "Conakry", "Concepcion", "Copenhagen", "Cordoba", "Cucuta", "Cuernavaca", "Culiacan", "Curitiba", "Cuttack", "Da Nang", "Daegu", "Daejon", "Dakar", "Dalian", "Dallas", "Damascus", "Dandong", "Danyang", "Daqing", "Dar es Salaam", "Dasmarinas", "Datong", "Davao City", "Dehradun", "Delhi", "Dengzhou", "Denpasar", "Depok", "Deyang", "Dezhou", "Dhaka", "Dhanbad", "Diyarbakir", "Dnipro", "Donetsk", "Dongguan", "Dongying", "Douala", "Dubai", "Dublin", "Durban", "Durg-Bhilainagar", "Dushanbe", "Edmonton", "Ekurhuleni", "Enugu", "Erbil", "Erduosi-Ordoss", "Esfahan", "Eskisehir", "Faisalabad", "Fes", "Firozabad", "Florianopolis", "Fort Worth", "Fortaleza", "Foshan", "Frankfurt", "Freetown", "Fukuoka", "Fushun Liaoning", "Fuxin", "Fuyang", "Fuzhou Fujian", "Fuzhou Jiangxi", "Ganzhou", "Gaomi", "Gaoxiong", "Gaza", "Gaziantep", "Gebze", "Glasgow", "Goiania", "Gorakhpur", "Goyang", "Grande Sao Luis", "Grande Vitoria", "Guadalajara", "Guangzhou", "Guatemala City", "Guayaquil", "Guigang", "Guilin", "Guiping", "Guiyang", "Gujranwala", "Guntur", "Guwahati", "Gwalior", "Gwangju", "Haerbin", "Hai Phong", "Haicheng", "Haifa", "Haikou", "Hamah", "Hamburg", "Hamilton", "Hanchuan", "Handan", "Hangzhou", "Hanoi", "Harare", "Hargeysa", "Havana", "Hefei", "Helsinki", "Hengshui", "Hengyang", "Hermosillo", "Heze", "Hiroshima", "Ho Chi Minh City", "Hohhot", "Homs", "Hong Kong", "Houston", "Huaian", "Huaibei", "Huaihua", "Huainan", "Huangshi", "Hubli-Dharwad", "Hufuf-Mubarraz", "Huizhou", "Huludao", "Huzhou", "Hyderabad", "Hyderabad", "Ibadan", "Ibb", "Ikorodu", "Ilorin", "Incheon", "Indianapolis", "Indore", "Ipoh", "Islamabad", "Istanbul", "Izmir", "Jabalpur", "Jacksonville", "Jaipur", "Jakarta", "Jalandhar", "Jamshedpur", "Jerusalem", "Ji-nan Shandong", "Jiangmen", "Jiangyin", "Jiaozuo", "Jiaxing", "Jiddah", "Jieyang", "Jilin", "Jincheng", "Jingzhou Hubei", "Jinhua", "Jining Shandong", "Jinzhou", "Jiujiang", "Jixi Heilongjiang", "Joao Pessoa", "Jodhpur", "Johannesburg", "Johor Bahru", "Joinville", "Jos", "Kabul", "Kaduna", "Kaifeng", "Kampala", "Kananga", "Kannur", "Kano", "Kanpur", "Karachi", "Karaj", "Kathmandu", "Kayamkulam", "Kayseri", "Kazan", "Kermanshah", "Kharkiv", "Khartoum", "Khulna", "Kiev", "Kigali", "Kinshasa", "Kirkuk", "Kisangani", "Kitwe", "Kochi", "Kolkata", "Kollam", "Konya", "Kota", "Kottayam", "Kozhikode", "Krakow", "Krasnodar", "Krasnoyarsk", "Kuala Lumpur", "Kuerle", "Kumasi", "Kunming", "Kunshan", "Kuwait City", "La Laguna", "La Paz", "La Plata", "Lagos", "Lahore", "Laiwu", "Langfang", "Lanzhou", "Leiyang", "Leon de los Aldamas", "Leshan", "Lianyungang", "Liaocheng", "Liaoyang", "Libreville", "Liling", "Lille", "Lilongwe", "Lima", "Linfen", "Linhai", "Linyi Shandong", "Lisbon", "Liuan", "Liupanshui", "Liuyang", "Liuzhou", "Liverpool", "Lokoja", "Lome", "London", "Londrina", "Los Angeles", "Luanda", "Lubango", "Lubumbashi", "Lucknow", "Ludhiana", "Luohe", "Luoyang", "Lusaka", "Luzhou", "Lyon", "Ma'anshan", "Maceio", "Madrid", "Madurai", "Maiduguri", "Makassar", "Malang", "Malanje", "Malappuram", "Malegaon", "Managua", "Manaus", "Manchester", "Mandalay", "Manila", "Maoming", "Maputo", "Maracaibo", "Maracay", "Marrakech", "Marseille", "Mashhad", "Matola", "Maturin", "Mbuji-Mayi", "Mecca", "Medan", "Medellin", "Medina", "Meerut", "Meishan", "Melbourne", "Mendoza", "Merca", "Merida", "Mersin", "Mexicali", "Mexico City", "Mianyang Sichuan", "Milan", "Minsk", "Misratah", "Mogadishu", "Mombasa", "Monrovia", "Monterrey", "Montevideo", "Montreal", "Moradabad", "Morelia", "Moscow", "Mosul", "Mudanjiang", "Multan", "Mumbai", "Munich", "Muscat", "Muzaffarnagar", "Mwanza", "Mysore", "N-Djamena", "Nagoya", "Nagpur", "Nairobi", "Najaf", "Nakhon Ratchasima", "Nampula", "Nanchang", "Nanchong", "Nanjing", "Nanning", "Nantong", "Nanyang Henan", "Naples", "Nashik", "Natal", "Nellore", "New Taipei", "New York City", "Newcastle upon Tyne", "Niamey", "Nice", "Niigata", "Ningbo", "Nizhniy Novgorod", "Nnewi", "Nonthaburi", "Nottingham", "Nouakchott", "Novosibirsk", "Nyala", "Odesa", "Omsk", "Onitsha", "Oran", "Orumiyeh", "Osaka", "Oshogbo", "Oslo", "Ottawa", "Ouagadougou", "Owerri", "Padang", "Palembang", "Palermo", "Panama City", "Panjin", "Paris", "Pathum Thani", "Patna", "Pekan Baru", "Perm", "Perth", "Peshawar", "Philadelphia", "Phnom Penh", "Phoenix", "Pingdingshan Henan", "Pingxiang Jiangxi", "Pizhou", "Pointe-Noire", "Port Elizabeth", "Port Harcourt", "Port-au-Prince", "Porto", "Porto Alegre", "Prague", "Pretoria", "Puducherry", "Puebla", "Pune", "Puning", "Putian", "Pyongyang", "Qingdao", "Qingyuan", "Qinhuangdao", "Qiqihaer", "Qom", "Quanzhou", "Quebec City", "Queretaro", "Quetta", "Quito", "Qujing", "Quzhou", "Rabat", "Raipur", "Rajkot", "Rajshahi", "Ranchi", "Rawalpindi", "Recife", "Reynosa", "Rio de Janeiro", "Riyadh", "Rizhao", "Rome", "Rosario", "Rostov-on-Don", "Rotterdam", "Ruian", "Saharanpur", "Saint Petersburg", "Salem", "Saltillo", "Salvador", "Samara", "Samarinda", "Samut Prakan", "San Antonio", "San Diego", "San Jose", "San Jose", "San Juan", "San Luis Potosi", "San Miguel de Tucuman", "San Pedro Sula", "San Salvador", "Sanaa", "Santa Cruz", "Santiago", "Santo Domingo", "Sao Paulo", "Sapporo", "Saratov", "Sekondi Takoradi", "Semarang", "Sendai", "Seongnam", "Seoul", "Shanghai", "Shangqiu", "Shangrao", "Shantou", "Shaoguan", "Shaoxing", "Shaoyang", "Sharjah", "Shenyang", "Shenzhen", "Shijiazhuang", "Shimkent", "Shiraz", "Shiyan", "Shizuoka", "Sialkot", "Siliguri", "Singapore", "Sofia", "Solapur", "Songkhla", "Sorocaba", "Soshanguve", "Southampton", "Srinagar", "Stockholm", "Suining Sichuan", "Sulaimaniya", "Suqian", "Surabaya", "Surat", "Suweon", "Suzhou", "Suzhou", "Sydney", "Sylhet", "Tabriz", "Taian Shandong", "Tainan", "Taipei", "Taixing", "Taiyuan Shanxi", "Taiz", "Taizhong", "Taizhou Jiangsu", "Taizhou Zhejiang", "Tampico", "Tanger", "Tangerang", "Tangshan Hebei", "Taoyuan", "Tashkent", "Tasikmalaya", "Tbilisi", "Tegucigalpa", "Tehran", "Tel Aviv", "Tengzhou", "Teresina", "Thessaloniki", "Thiruvananthapuram", "Thrissur", "Tianjin", "Tianmen", "Tianshui", "Tijuana", "Tiruchirappalli", "Tirupati", "Tiruppur", "Tokyo", "Toluca de Lerdo", "Tongliao", "Tongling", "Toronto", "Toulouse", "Tripoli", "Trujillo", "Tshikapa", "Tunis", "Turin", "Tuxtla Gutierrez", "Tyumen", "Ufa", "Ulaanbaatar", "Ulsan", "Umuahia", "Urumqi", "Uyo", "Vadodara", "Valencia", "Valencia", "Valparaiso", "Vancouver", "Varanasi", "Veracruz", "Vereeniging", "Vienna", "Vijayawada", "Villahermosa", "Visakhapatnam", "Volgograd", "Voronezh", "Warangal", "Warri", "Warsaw", "Weifang", "Weihai", "Wenling", "Wenzhou", "West Rand", "West Yorkshire", "Winnipeg", "Wuhan", "Wuhu Anhui", "Wuxi", "Wuzhou", "Xalapa", "Xi-an Shaanxi", "Xiamen", "Xiangtan Hunan", "Xiangyang", "Xiaogan", "Xinghua", "Xingtai", "Xining", "Xintai", "Xinxiang", "Xinyang", "Xinyu", "Xiongan", "Xuchang", "Xuzhou", "Yan'an", "Yancheng Jiangsu", "Yangjiang", "Yangon", "Yangquan", "Yangzhou", "Yanji", "Yantai", "Yaounde", "Yekaterinburg", "Yerevan", "Yibin", "Yichang", "Yichun Jiangxi", "Yinchuan", "Yingkou", "Yiwu", "Yongin", "Yongzhou", "Yueqing", "Yueyang", "Yuncheng", "Yuxi", "Zamboanga City", "Zanzibar", "Zaozhuang", "Zaria", "Zhangjiakou", "Zhangzhou", "Zhanjiang", "Zhaoqing", "Zhengzhou", "Zhenjiang Jiangsu", "Zhongshan", "Zhucheng", "Zhuhai", "Zhuji", "Zhumadian", "Zhuzhou", "Zibo", "Zigong", "Zunyi", "Zurich"]

const beginFunc = () => {
    landingBox.classList.add('opacity-0');
    landingBox.classList.add('opacity-100');
    header.classList.remove('opacity-0');
    header.classList.add('opacity-100');
    earth.classList.add('earth-contracted');
    earth.classList.remove('earth-full');
    
    setTimeout(() => {
        landingBox.classList.remove('flex');
        landingBox.classList.add('hidden');
        daySelectorBox.classList.remove('hidden');
        daySelectorBox.classList.add('flex');
        cardBoxCont.classList.remove('hidden');
        cardBoxCont.classList.add('flex');
        renderCardsFunc();
    }, 1000);
    
    setTimeout(() => {
        daySelectorBox.classList.remove('opacity-0');
        daySelectorBox.classList.add('opacity-100');
        cardBoxCont.classList.remove('opacity-0');
        cardBoxCont.classList.add('opacity-100');
    }, 2000);

    locDiv.addEventListener("click", changeLocFunc);
    arrow.forEach(icon => { icon.addEventListener("click", dayScroller) });
};

const dayScroller = (e) => {
    let event = e.target;
    const scrollLeng = dayId[0].clientWidth + 16;
    arrow.forEach(icon => { icon.removeEventListener("click", dayScroller); });

    if (event.dataset.arrow == "left" && counter > 0) {
        daySelector.scrollLeft -= scrollLeng;
        counter --;

        dayId[counter].style.opacity = "100%";
        if (counter > 0) { dayId[counter - 1].style.opacity = "50%" };
        dayId[counter + 1].style.opacity = "50%";
        if (counter < 3) { dayId[counter + 2].style.opacity = "0%" };
        changeDay();

    } else if (event.dataset.arrow == "right" && counter < 4) {
        daySelector.scrollLeft += scrollLeng;
        counter ++;
        
        dayId[counter].style.opacity = "100%";
        if (counter < 4) { dayId[counter + 1].style.opacity = "50%" };
        dayId[counter - 1].style.opacity = "50%";
        if (counter > 1) { dayId[counter - 2].style.opacity = "0%" };
        changeDay();
    } else {
        setTimeout(addEventDayScroller, 1000);
    }
};

const addEventDayScroller = () => {
    arrow.forEach(icon => { icon.addEventListener("click", dayScroller) });
};

const changeDay = () => {
    cardBox.innerHTML = "";
    
    renderCardsFunc();
    setTimeout(addEventDayScroller, 1000);
};

const autocompFunc = (e) => {
    const event = e.key.toLowerCase();
    autoCompDiv.classList.remove('hidden');
    autoCompDiv.classList.add('flex');
    let abcChar = 'abcdefghijklmnopqrstuvwxyz '.split('');
    abcChar.push("backspace");
    let rows = 0;
    
    if (abcChar.includes(event)) {
        autoCompDiv.addEventListener("click", selectCity);
        autoCompDiv.innerHTML = "";

        for (i = 0; i < citiesArray.length; i++) {
            let hit = citiesArray[i].toLowerCase().search(inputCity.value.toLowerCase())
            if (rows < 5) {
                if (hit > -1) {
                    rows ++;
                    autoCompDiv.innerHTML += `<p class="hover:bg-slate-600 px-2 rounded-md font-normal" data-city="${citiesArray[i]}">${citiesArray[i]}</p>`;
                };
            } else {
                return;
            };
        };
    };
};

const selectCity = (e) => {
    let event = e.target;
    const city = event.dataset.city

    inputCity.value = event.dataset.city;
    autoCompDiv.innerHTML = "";
    autoCompDiv.classList.add('hidden');
    autoCompDiv.classList.remove('flex');
    newLocBox.classList.add('hidden');
    newLocBox.classList.remove('flex');
    cardBox.innerHTML = "";

    autoCompDiv.removeEventListener("click", selectCity);
    inputCity.removeEventListener("keyup", autocompFunc);
    newLocFunc(city);
    setTimeout(renderCardsFunc, 1000);
};

const closeNewLocBoxFunc = (e) => {
    let event = !newLocBox.contains(e.target);

    if (event) {
        newLocBox.classList.add('hidden');
        document.removeEventListener("click", closeNewLocBoxFunc);
    }
}

const changeLocFunc = () => {
    newLocBox.classList.remove('hidden');
    inputCity.addEventListener("keyup", autocompFunc);
    // setTimeout(document.addEventListener("click", closeNewLocBoxFunc), 1000);
};

const cardScroller = (e) => {
    let event = e.target;
    let scrollLeng = "";

    if (document.body.clientWidth > 768) {
        scrollLeng = 288 + 80;
        console.log(scrollLeng)
    } else {
        scrollLeng = 288 + 40;
    };
    
    btnScrollCard.forEach(icon => { icon.removeEventListener("click", cardScroller); });

    if (event.dataset.arrow == "left") {
        cardBox.scrollLeft -= scrollLeng;
        console.log("left")

        setTimeout(addEventCardScroller, 1000);

    } else if (event.dataset.arrow == "right") {
        cardBox.scrollLeft += scrollLeng;
        console.log("right")

        setTimeout(addEventCardScroller, 1000);
    } else {
        setTimeout(addEventCardScroller, 1000);
    };
};

const addCardScrollers = () => {
    const cards = document.querySelectorAll("#weatherCard");
    const cardsWidth = cards.length * 368
    
    if (cardBoxCont.clientWidth < cardsWidth) {
        btnScrollCard.forEach(icon => { icon.addEventListener("click", cardScroller); });
        btnScrollCard.forEach(icon => { 
            icon.classList.remove('hidden'); 
            icon.classList.add('flex');
        });
    };
};

const addEventCardScroller = () => {
    btnScrollCard.forEach(icon => { icon.addEventListener("click", cardScroller) });
};

const bgImgGen = (weather) => {
    
    if (weather.search("thunderstorm") > -1) {
        return "storm";
    } else if (weather.search("light rain") > -1 || weather.search("moderate rain") > -1) {
        return "light_rain";
    } else if (weather.search("rain") > -1 || weather.search("drizzle") > -1) {
        return "shower_rain";
    } else if (weather.search("overcast clouds") > -1) {
        return "overcast_clouds";
    } else if (weather.search("broken clouds") > -1) {
        return "clouds";
    } else if (weather.search("clouds") > -1) {
        return "few_clouds";
    } else if (weather.search("clear") > -1) {
        return "clear_sky";
    } else if (weather.search("shower snow") > -1 || weather.search("heavy snow") > -1) {
        return "shower_snow";
    } else if (weather.search("snow") > -1) {
        return "snow";
    }
};

const renderCardsFunc = () => {
    const date = dayId[counter].dataset.date;
    const day = dayId[counter].dataset.day;

    renderCards(date, day);
};

const renderCards = (date, day) => {
    for (i = 0; i < weatherArray.list.length; i++) {
        const dateFormated = dayjs.unix(weatherArray.list[i].dt).format("DD-MM-YYYY");

        if (dateFormated == date) {
            const hour = dayjs.unix(weatherArray.list[i].dt).format("HH:mm");
            const temp = weatherArray.list[i].main.temp;
            const weather = weatherArray.list[i].weather[0].description;
            const windSp = weatherArray.list[i].wind.speed;
            const windSpKmhr = windSp * 3600 * .001;
            const icon = weatherArray.list[i].weather[0].icon;
            const humidity = weatherArray.list[i].main.humidity;
            
            cardReactor(day, hour, temp, weather, windSpKmhr, icon, humidity);

        } else if (dateFormated > date) {
            addCardScrollers();
            return;
        }
    };
};

const cardReactor = (dayD, hourD, temp, weather, windSp, icon, humidity) => {

    const bgImg = bgImgGen(weather);
    const roundTemp = temp.toFixed();
    const windSpFixed = windSp.toFixed(1);
    
    newCard = `
        <div id="weatherCard" class="flex-none aspect-card max-md:my-3 max-md:mx-5 m-10 w-72 flex flex-col justify-between p-4 items-center bg-black/50 rounded-2xl border-4 drop-shadow-xl backdrop-blur-md" style="background: url(./assets/img/${bgImg}.gif) no-repeat center; background-size: cover;">
            <div id="topSq" class="flex flex-col items-center justify-center w-full p-4 rounded-xl bg-slate-500/50 text-center">
                <h3 class="font-brand font-thin max-md:text-sm text-base mb-4">${dayD}<br><span class="text-2xl font-normal">${hourD}</span></h3>
                <h1 class="font-brand font-semibold max-md:text-6xl text-7xl">&nbsp;${roundTemp}<span class="font-thin">°</span></h1>
                <h4 class="font-brand font-thin text-xl">${weather}</h4>
                <span class="w-16 h-16 bg-cover" style="background-image: url(https://openweathermap.org/img/wn/${icon}@2x.png);"></span>
            </div>

            <div id="bttmSq" class="flex flex-col w-full items-center justify-center p-4 rounded-xl bg-slate-500/50 text-center"> 
                <h4 class="font-brand font-thin text-lg mb-2"><i class="fa-light fa-wind text-white"></i>&nbsp;Wind speed:<br><span>${windSpFixed}km/h</span></h4>
                <h4 class="font-brand font-thin text-lg"><i class="fa-sharp fa-light fa-droplet-percent text-white"></i>&nbsp;Humidity:<br><span>${humidity}%</span></h4>
            </div>
        </div>
    `;

    cardBox.innerHTML += newCard;
};

const getWeathFunc = () => {

    const latitude = selectedLoc.dataset.lat;
    const longitude = selectedLoc.dataset.lon;
    const getWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    
    fetch(getWeather)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            weatherArray = data;
            selectedLoc2.innerHTML = data.city.name;
        })
        .catch(error => console.log("error weather"));
};

const setLocFunc = () => {

    const latitude = selectedLoc.dataset.lat;
    const longitude = selectedLoc.dataset.lon;
    const getLocation = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(getLocation)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            selectedLoc.innerHTML = data[0].name;
        })
        .catch(error => console.log("error"));
};

const newLocFunc = (city) => {
    const getLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

    fetch(getLocation)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            selectedLoc.innerHTML = data[0].name;
            selectedLoc.dataset.lat = data[0].lat;
            selectedLoc.dataset.lon = data[0].lon;

            getWeathFunc();
        })
        .catch(error => console.log("error"));
};

const located = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    selectedLoc.dataset.lat = latitude;
    selectedLoc.dataset.lon = longitude;

    setLocFunc();
    getWeathFunc();
    landingBox.classList.add('opacity-100');
    btnGo.classList.add('opacity-100');
    btnGo.classList.remove('opacity-0');
    landingBox.classList.remove('opacity-0');
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

const setDate = () => {
    const dayMsecs = 86400000;
    
    if (dayjs().format("HH") > 20) {
        for (i = 0; i < dayId.length; i++) {
            dayId[i].dataset.date = dayjs(dayjs() + dayMsecs + (dayMsecs * i)).format('DD-MM-YYYY');
            
            if (dayjs().format('DD-MM-YYYY') == dayId[i].dataset.date) {
                dayId[i].innerHTML = "today";
                dayId[i].dataset.day = "today";
            } else if (dayjs(dayjs() + dayMsecs).format('DD-MM-YYYY') == dayId[i].dataset.date) {
                dayId[i].innerHTML = "tomorrow";
                dayId[i].dataset.day = "tomorrow";
            } else {
                dayId[i].innerHTML = dayjs(dayjs() + (dayMsecs * i)).format('dddd');
                dayId[i].dataset.day = dayjs(dayjs() + (dayMsecs * i)).format('dddd');
            };
        };
    } else {
        for (i = 0; i < dayId.length; i++) {
            dayId[i].dataset.date = dayjs(dayjs() + (dayMsecs * i)).format('DD-MM-YYYY');
            
            if (dayjs().format('DD-MM-YYYY') == dayId[i].dataset.date) {
                dayId[i].innerHTML = "today";
                dayId[i].dataset.day = "today";
            } else if (dayjs(dayjs() + dayMsecs).format('DD-MM-YYYY') == dayId[i].dataset.date) {
                dayId[i].innerHTML = "tomorrow";
                dayId[i].dataset.day = "tomorrow";
            } else {
                dayId[i].innerHTML = dayjs(dayjs() + (dayMsecs * i)).format('dddd');
                dayId[i].dataset.day = dayjs(dayjs() + (dayMsecs * i)).format('dddd');
            };
        };
    };

};

const setOpacities = () => {
    let opacities = ["100%", "50%", "0%", "0%", "0%"];
    for (i = 0; i < opacities.length; i++) {
        dayId[i].style.opacity = opacities[i];
    };
}

const readyFunc = () => {
    navigator.geolocation.getCurrentPosition(located, locatedFalse);
    setOpacities();
    setDate();
};

window.onload = readyFunc();

// console.log(dayjs.unix(1691452800));
// console.log(dayjs().format('dddd'));
// console.log(dayjs().unix());
// console.log(dayjs(dayjs() + (86400000 * 3)).format('DD-MM-YYYY HH:mm'));
// console.log("14-04-1991" < "12-04-1991");
// console.log(dayjs.unix(1691377200+86400).format("DD-MM HH:mm"));