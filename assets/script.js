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
const cityHistoryDiv = document.querySelector("#cityHistory");
const btnClose = document.querySelector("#btnClose");

const key = "ffedf07a2c975f4051af21f7767f019d"; // This key will be used for both APIs: location and weather.

let counter = 0; // This counter serves for the day number that will be rendered when the user hits "GO".
let weatherArray = []; // This array is set up as a global variable and it will store the fetched weather data so it can be accessed easily.
let citiesHistory = []; // This array is for the saved cities to be stored later in the local storage.

// The list of cities to serve for the autocomplete function when looking for a location. Still, if the city is not in this array, it can be looked for to fetch the weather.
const citiesArray = ["Aba", "Abidjan", "Abomey-Calavi", "Abu Dhabi", "Abuja", "Acapulco de Juarez", "Accra", "Ad-Dammam", "Adana", "Addis Ababa", "Adelaide", "Aden", "Agadir", "Agra", "Aguascalientes", "Ahmedabad", "Ahvaz", "Aleppo", "Alexandria", "Algiers", "Aligarh", "Allahabad", "Almaty", "Amman", "Amravati", "Amritsar", "Amsterdam", "Ankara", "Anqing", "Anqiu", "Ansan", "Anshan", "Antalya", "Antananarivo", "Antipolo", "Antwerp", "Anyang", "Ar-Rayyan", "Aracaju", "Arequipa", "Asansol", "Ashgabat", "Asmara", "Astana", "Asuncion", "Athens", "Auckland", "Aurangabad", "Austin", "Baghdad", "Bahawalpur", "Baishan", "Baixada Santista", "Baku", "Bamako", "Bandar Lampung", "Bandung", "Bangalore", "Banghazi", "Bangkok", "Bangui", "Banjarmasin", "Baoding", "Baoji", "Baotou", "Barcelona", "Barcelona-Puerto La Cruz", "Bareilly", "Barquisimeto", "Barranquilla", "Basra", "Batam", "Bazhong", "Beijing", "Beirut", "Bekasi", "Belem", "Belgaum", "Belgrade", "Belo Horizonte", "Bengbu", "Benguela", "Benin City", "Benxi", "Bergamo", "Berlin", "Bhiwandi", "Bhopal", "Bhubaneswar", "Bien Hoa", "Bikaner", "Binzhou", "Birmingham", "Bishkek", "Blantyre-Limbe", "Bobo-Dioulasso", "Bogor", "Bogota", "Bogra", "Bologna", "Bordeaux", "Boston", "Bozhou", "Brasilia", "Brazzaville", "Brisbane", "Brussels", "Bucaramanga", "Bucharest", "Bucheon", "Budapest", "Buenos Aires", "Bujumbura", "Bukavu", "Bunia", "Bur Sa'id", "Bursa", "Busan", "Cabinda", "Cagayan de Oro City", "Cairo", "Calgary", "Cali", "Campinas", "Campo Grande", "Can Tho", "Cancun", "Cape Town", "Caracas", "Cartagena", "Casablanca", "Cebu City", "Chandigarh", "Changchun", "Changde", "Changsha", "Changshu", "Changwon", "Changzhi", "Changzhou", "Chaozhou", "Charlotte", "Chelyabinsk", "Chengde", "Chengdu", "Chennai", "Chenzhou", "Cherthala", "Chiang Mai", "Chicago", "Chifeng", "Chihuahua", "Chittagong", "Chon Buri", "Chongqing", "Ciudad Guayana", "Ciudad Juarez", "Cixi", "Cochabamba", "Coimbatore", "Cologne", "Columbus", "Conakry", "Concepcion", "Copenhagen", "Cordoba", "Cucuta", "Cuernavaca", "Culiacan", "Curitiba", "Cuttack", "Da Nang", "Daegu", "Daejon", "Dakar", "Dalian", "Dallas", "Damascus", "Dandong", "Danyang", "Daqing", "Dar es Salaam", "Dasmarinas", "Datong", "Davao City", "Dehradun", "Delhi", "Dengzhou", "Denpasar", "Depok", "Deyang", "Dezhou", "Dhaka", "Dhanbad", "Diyarbakir", "Dnipro", "Donetsk", "Dongguan", "Dongying", "Douala", "Dubai", "Dublin", "Durban", "Durg-Bhilainagar", "Dushanbe", "Edmonton", "Ekurhuleni", "Enugu", "Erbil", "Erduosi-Ordoss", "Esfahan", "Eskisehir", "Faisalabad", "Fes", "Firozabad", "Florianopolis", "Fort Worth", "Fortaleza", "Foshan", "Frankfurt", "Freetown", "Fukuoka", "Fushun Liaoning", "Fuxin", "Fuyang", "Fuzhou Fujian", "Fuzhou Jiangxi", "Ganzhou", "Gaomi", "Gaoxiong", "Gaza", "Gaziantep", "Gebze", "Glasgow", "Goiania", "Gorakhpur", "Goyang", "Grande Sao Luis", "Grande Vitoria", "Guadalajara", "Guangzhou", "Guatemala City", "Guayaquil", "Guigang", "Guilin", "Guiping", "Guiyang", "Gujranwala", "Guntur", "Guwahati", "Gwalior", "Gwangju", "Haerbin", "Hai Phong", "Haicheng", "Haifa", "Haikou", "Hamah", "Hamburg", "Hamilton", "Hanchuan", "Handan", "Hangzhou", "Hanoi", "Harare", "Hargeysa", "Havana", "Hawaii", "Hefei", "Helsinki", "Hengshui", "Hengyang", "Hermosillo", "Heze", "Hiroshima", "Ho Chi Minh City", "Hohhot", "Homs", "Hong Kong", "Honolulu","Houston", "Huaian", "Huaibei", "Huaihua", "Huainan", "Huangshi", "Hubli-Dharwad", "Hufuf-Mubarraz", "Huizhou", "Huludao", "Huzhou", "Hyderabad", "Hyderabad", "Ibadan", "Ibb", "Ikorodu", "Ilorin", "Incheon", "Indianapolis", "Indore", "Ipoh", "Islamabad", "Istanbul", "Izmir", "Jabalpur", "Jacksonville", "Jaipur", "Jakarta", "Jalandhar", "Jamshedpur", "Jerusalem", "Ji-nan Shandong", "Jiangmen", "Jiangyin", "Jiaozuo", "Jiaxing", "Jiddah", "Jieyang", "Jilin", "Jincheng", "Jingzhou Hubei", "Jinhua", "Jining Shandong", "Jinzhou", "Jiujiang", "Jixi Heilongjiang", "Joao Pessoa", "Jodhpur", "Johannesburg", "Johor Bahru", "Joinville", "Jos", "Kabul", "Kaduna", "Kaifeng", "Kampala", "Kananga", "Kannur", "Kano", "Kanpur", "Karachi", "Karaj", "Kathmandu", "Kayamkulam", "Kayseri", "Kazan", "Kermanshah", "Kharkiv", "Khartoum", "Khulna", "Kiev", "Kigali", "Kinshasa", "Kirkuk", "Kisangani", "Kitwe", "Kochi", "Kolkata", "Kollam", "Konya", "Kota", "Kottayam", "Kozhikode", "Krakow", "Krasnodar", "Krasnoyarsk", "Kuala Lumpur", "Kuerle", "Kumasi", "Kunming", "Kunshan", "Kuwait City", "La Laguna", "La Paz", "La Plata", "Lagos", "Lahore", "Laiwu", "Langfang", "Lanzhou", "Leiyang", "Leon de los Aldamas", "Leshan", "Lianyungang", "Liaocheng", "Liaoyang", "Libreville", "Liling", "Lille", "Lilongwe", "Lima", "Linfen", "Linhai", "Linyi Shandong", "Lisbon", "Liuan", "Liupanshui", "Liuyang", "Liuzhou", "Liverpool", "Lokoja", "Lome", "London", "Londrina", "Los Angeles", "Luanda", "Lubango", "Lubumbashi", "Lucknow", "Ludhiana", "Luohe", "Luoyang", "Lusaka", "Luzhou", "Lyon", "Ma'anshan", "Maceio", "Madrid", "Madurai", "Maiduguri", "Makassar", "Malang", "Malanje", "Malappuram", "Malegaon", "Managua", "Manaus", "Manchester", "Mandalay", "Manila", "Maoming", "Maputo", "Maracaibo", "Maracay", "Marrakech", "Marseille", "Mashhad", "Matola", "Maturin", "Mbuji-Mayi", "Mecca", "Medan", "Medellin", "Medina", "Meerut", "Meishan", "Melbourne", "Mendoza", "Merca", "Merida", "Mersin", "Mexicali", "Mexico City", "Mianyang Sichuan", "Milan", "Minsk", "Misratah", "Mogadishu", "Mombasa", "Monrovia", "Monterrey", "Montevideo", "Montreal", "Moradabad", "Morelia", "Moscow", "Mosul", "Mudanjiang", "Multan", "Mumbai", "Munich", "Muscat", "Muzaffarnagar", "Mwanza", "Mysore", "N-Djamena", "Nagoya", "Nagpur", "Nairobi", "Najaf", "Nakhon Ratchasima", "Nampula", "Nanchang", "Nanchong", "Nanjing", "Nanning", "Nantong", "Nanyang Henan", "Naples", "Nashik", "Natal", "Nellore", "New Taipei", "New York City", "Newcastle upon Tyne", "Niamey", "Nice", "Niigata", "Ningbo", "Nizhniy Novgorod", "Nnewi", "Nonthaburi", "Nottingham", "Nouakchott", "Novosibirsk", "Nyala", "Odesa", "Omsk", "Onitsha", "Oran", "Orumiyeh", "Osaka", "Oshogbo", "Oslo", "Ottawa", "Ouagadougou", "Owerri", "Padang", "Palembang", "Palermo", "Panama City", "Panjin", "Paris", "Pathum Thani", "Patna", "Pekan Baru", "Perm", "Perth", "Peshawar", "Philadelphia", "Phnom Penh", "Phoenix", "Pingdingshan Henan", "Pingxiang Jiangxi", "Pizhou", "Pointe-Noire", "Port Elizabeth", "Port Harcourt", "Port-au-Prince", "Porto", "Porto Alegre", "Prague", "Pretoria", "Puducherry", "Puebla", "Pune", "Puning", "Putian", "Pyongyang", "Qingdao", "Qingyuan", "Qinhuangdao", "Qiqihaer", "Qom", "Quanzhou", "Quebec City", "Queretaro", "Quetta", "Quito", "Qujing", "Quzhou", "Rabat", "Raipur", "Rajkot", "Rajshahi", "Ranchi", "Rawalpindi", "Recife", "Reynosa", "Rio de Janeiro", "Riyadh", "Rizhao", "Rome", "Rosario", "Rostov-on-Don", "Rotterdam", "Ruian", "Saharanpur", "Saint Petersburg", "Salem", "Saltillo", "Salvador", "Samara", "Samarinda", "Samut Prakan", "San Antonio", "San Diego", "San Jose", "San Jose", "San Juan", "San Luis Potosi", "San Miguel de Tucuman", "San Pedro Sula", "San Salvador", "Sanaa", "Santa Cruz", "Santiago", "Santo Domingo", "Sao Paulo", "Sapporo", "Saratov", "Sekondi Takoradi", "Semarang", "Sendai", "Seongnam", "Seoul", "Shanghai", "Shangqiu", "Shangrao", "Shantou", "Shaoguan", "Shaoxing", "Shaoyang", "Sharjah", "Shenyang", "Shenzhen", "Shijiazhuang", "Shimkent", "Shiraz", "Shiyan", "Shizuoka", "Sialkot", "Siliguri", "Singapore", "Sofia", "Solapur", "Songkhla", "Sorocaba", "Soshanguve", "Southampton", "Srinagar", "Stockholm", "Suining Sichuan", "Sulaimaniya", "Suqian", "Surabaya", "Surat", "Suweon", "Suzhou", "Suzhou", "Sydney", "Sylhet", "Tabriz", "Taian Shandong", "Tainan", "Taipei", "Taixing", "Taiyuan Shanxi", "Taiz", "Taizhong", "Taizhou Jiangsu", "Taizhou Zhejiang", "Tampico", "Tanger", "Tangerang", "Tangshan Hebei", "Taoyuan", "Tashkent", "Tasikmalaya", "Tbilisi", "Tegucigalpa", "Tehran", "Tel Aviv", "Tengzhou", "Teresina", "Thessaloniki", "Thiruvananthapuram", "Thrissur", "Tianjin", "Tianmen", "Tianshui", "Tijuana", "Tiruchirappalli", "Tirupati", "Tiruppur", "Tokyo", "Toluca de Lerdo", "Tongliao", "Tongling", "Toronto", "Toulouse", "Tripoli", "Trujillo", "Tshikapa", "Tunis", "Turin", "Tuxtla Gutierrez", "Tyumen", "Ufa", "Ulaanbaatar", "Ulsan", "Umuahia", "Urumqi", "Uyo", "Vadodara", "Valencia", "Valencia", "Valparaiso", "Vancouver", "Varanasi", "Veracruz", "Vereeniging", "Vienna", "Vijayawada", "Villahermosa", "Visakhapatnam", "Volgograd", "Voronezh", "Warangal", "Warri", "Warsaw", "Weifang", "Weihai", "Wenling", "Wenzhou", "West Rand", "West Yorkshire", "Winnipeg", "Wuhan", "Wuhu Anhui", "Wuxi", "Wuzhou", "Xalapa", "Xi-an Shaanxi", "Xiamen", "Xiangtan Hunan", "Xiangyang", "Xiaogan", "Xinghua", "Xingtai", "Xining", "Xintai", "Xinxiang", "Xinyang", "Xinyu", "Xiongan", "Xuchang", "Xuzhou", "Yan'an", "Yancheng Jiangsu", "Yangjiang", "Yangon", "Yangquan", "Yangzhou", "Yanji", "Yantai", "Yaounde", "Yekaterinburg", "Yerevan", "Yibin", "Yichang", "Yichun Jiangxi", "Yinchuan", "Yingkou", "Yiwu", "Yongin", "Yongzhou", "Yueqing", "Yueyang", "Yuncheng", "Yuxi", "Zamboanga City", "Zanzibar", "Zaozhuang", "Zaria", "Zhangjiakou", "Zhangzhou", "Zhanjiang", "Zhaoqing", "Zhengzhou", "Zhenjiang Jiangsu", "Zhongshan", "Zhucheng", "Zhuhai", "Zhuji", "Zhumadian", "Zhuzhou", "Zibo", "Zigong", "Zunyi", "Zurich"];

// To be called each time we need to update the local storage.
const storeData = () => {
    // The following 'if', sets a limit of 10 cities to be stored locally. It will keep the 10 latest searches.
    if (citiesHistory.length > 10) {
        const eraseCities = citiesHistory.length - 10; // To find out the excedent of cities saved.
        citiesHistory.splice(0, eraseCities); // To erase the oldest searches.
    };

    localStorage.setItem("myCities", JSON.stringify(citiesHistory)); // The local storage is updated by the citiesHistory global array.
};

// To access the local storage.
const getData = () => {
    citiesHistory = JSON.parse(localStorage.getItem("myCities")); // The local storage is saved into the citiesHistory global array to be easily managed by other functions.
    renderSavedCities(); // This func is called to render the cities in the latest searches when changing location.
};

// A function to be called to render the saved cities.
const renderSavedCities = () => {
    cityHistoryDiv.innerHTML = ""; // To reset the saved cities div.
    
    // A function to create each city icon from the stored cities.
    const renderCityFunc = (city) => {
        cityHistoryDiv.innerHTML += `<p class="bg-purple-500/70 hover:bg-purple-400/80 px-2 rounded-md font-normal pointerLink" data-city="${city}">${city}</p>`;
        cityHistoryDiv.addEventListener("click", selectCity);
    };

    citiesHistory.forEach(renderCityFunc); // A loop to create an icon for each element in the array, previously set by the local storage.
}

// To access or set the local storage.
const getCitiesHistory = () => {
    if (localStorage.getItem("myCities") === null) {
        storeData();
    } else {
        getData();
    };
};

// The following function runs after hitting the GO button.
const beginFunc = () => {
    // Hiddes the landing box, and retracts the earth image.
    landingBox.classList.add('opacity-0');
    landingBox.classList.add('opacity-100');
    header.classList.remove('opacity-0');
    header.classList.add('opacity-100');
    earth.classList.add('earth-contracted');
    earth.classList.remove('earth-full');
    
    // After a second, this renders the weather cards.
    setTimeout(() => {
        landingBox.classList.remove('flex');
        landingBox.classList.add('hidden');
        daySelectorBox.classList.remove('hidden');
        daySelectorBox.classList.add('flex');
        cardBoxCont.classList.remove('hidden');
        cardBoxCont.classList.add('flex');
        renderCardsFunc();
    }, 1000);
    
    // Displays the day selector at the top of the weather cards.
    setTimeout(() => {
        daySelectorBox.classList.remove('opacity-0');
        daySelectorBox.classList.add('opacity-100');
        cardBoxCont.classList.remove('opacity-0');
        cardBoxCont.classList.add('opacity-100');
    }, 2000);

    // Activates event listeners, one to open the change location box, and the other to activate the arrows of the day selector.
    locDiv.addEventListener("click", changeLocFunc);
    arrow.forEach(icon => { icon.addEventListener("click", dayScroller) });
};

// The following func, activates the day scroller, to change the weather's day broadcast.
const dayScroller = (e) => {
    let event = e.target;
    // The scroll length is the day's display links widths.
    const scrollLeng = dayId[0].clientWidth;
    arrow.forEach(icon => { icon.removeEventListener("click", dayScroller); }); // This is to prevent consecutive clicking to jam the scroller and give the code time to execute. 
    
    // This will only execute if the day selector isn't fully scrolled to the left.
    if (event.dataset.arrow == "left" && counter > 0) {
        daySelector.scrollLeft -= scrollLeng;
        counter --; // This counter allows the code to recognize the selected day.

        // The following, set the opacities for the day links, to highlight the current day.
        dayId[counter].style.opacity = "100%";
        if (counter > 0) { dayId[counter - 1].style.opacity = "50%" };
        dayId[counter + 1].style.opacity = "50%";
        if (counter < 3) { dayId[counter + 2].style.opacity = "0%" };
        changeDay();

      // This will only execute if the day selector isn't fully scrolled to the right.
    } else if (event.dataset.arrow == "right" && counter < 4) {
        daySelector.scrollLeft += scrollLeng;
        counter ++; // This counter allows the code to recognize the selected day.
        
        // The following, set the opacities for the day links, to highlight the current day.
        dayId[counter].style.opacity = "100%";
        if (counter < 4) { dayId[counter + 1].style.opacity = "50%" };
        dayId[counter - 1].style.opacity = "50%";
        if (counter > 1) { dayId[counter - 2].style.opacity = "0%" };
        changeDay();
    }
    
    // To activate the scroller a second after the last click to prevent consecutive clicking to jam the scroller and give the code time to execute.
    setTimeout(addEventDayScroller, 1000);
};

// A func to activate the day scroller.
const addEventDayScroller = () => {
    arrow.forEach(icon => { icon.addEventListener("click", dayScroller) });
};

// Called each time another day is selected.
const changeDay = () => {
    // To reset the card box for new cards to be displayed.
    cardBox.innerHTML = "";
    
    // Calls for the render cards function with the new set day.
    renderCardsFunc();
    // To activate the scroller a second after the last click to prevent consecutive clicking to jam the scroller and give the code time to execute.
    setTimeout(addEventDayScroller, 1000);
};

// After being called by clicking anywhere outside the autocomplete div, it closes it.
const closeAutocomp = (e) => {
    let event = !autoCompDiv.contains(e.target); // A click outside the div.

    if (event) {
        autoCompDiv.classList.remove('flex');
        autoCompDiv.classList.add('hidden');
        document.removeEventListener("click", closeAutocomp);
    };
};

// The following is called when opening the change location box under a "key-up" event, and it will show an autocomplete feature when looking for a city.
const autocompFunc = (e) => {
    // These next lines, detect if the key released is a letter, space, or backspace.
    const event = e.key.toLowerCase();
    autoCompDiv.classList.add('hidden'); // The suggestions div will be hidden until any suggestion pops out.
    autoCompDiv.classList.remove('flex');
    let abcChar = 'abcdefghijklmnopqrstuvwxyz '.split('');
    abcChar.push("backspace");
    let rows = 0; // A row counter to limit the number of autocomplete options on display.
    
    if (abcChar.includes(event)) {
        autoCompDiv.addEventListener("click", selectCity); // If the user selects a suggestion, the site will load the weather.
        document.addEventListener("click", closeAutocomp); // An event to close suggestions by clicking anywhere but the suggestions.
        autoCompDiv.innerHTML = ""; // To reset the autocomplete options each time a key is released.

        // A loop to append each suggestion.
        for (i = 0; i < citiesArray.length; i++) {
            let hit = citiesArray[i].toLowerCase().search(inputCity.value.toLowerCase()); // Search for the input text in the cities array. 
            if (rows < 5) {
                // If the input text is found in the cities array, this will execute.
                if (hit > -1) {
                    rows ++;
                    autoCompDiv.innerHTML += `<p class="hover:bg-slate-600 px-2 rounded-md font-normal pointerLink" data-city="${citiesArray[i]}">${citiesArray[i]}</p>`; // The data attribute is necessary for the event listener.
                    autoCompDiv.classList.remove('hidden'); // To show suggestions.
                    autoCompDiv.classList.add('flex');
                };
            } else {
                return; // To stop the loop when 5 suggestions are appended.
            };
        };       
    } else if (event == "enter") {
        enterCity(); // To set the new location when hitting enter.
    };
};

// Function called after hitting enter when writing a city.
const enterCity = () => {
    const city = inputCity.value;
    newLocFunc(city); // To set a new location for the weather.
    counter = 0; // Resets the counter, so that the day on display is the earliest after changing city.
    const daysWidth = dayId.length * dayId[0].clientWidth; // To measure the width of all the days from the day scroller.
    daySelector.scrollLeft -= daysWidth; // To return to default position.
    setOpacities(); // Set opacities to default in the day scroller.
    
    closeNewLocBoxFunc(); // To close the location box after each search.
    cardBox.innerHTML = ""; // To rest the card box.

    autoCompDiv.removeEventListener("click", selectCity);
    inputCity.removeEventListener("keyup", autocompFunc);
    setTimeout(renderCardsFunc, 1000); // To give the code time to execute before rendering the cards.
};

// Same as the previous func, but this one listens to a click event and uses the data from the "data-city" of the event.
const selectCity = (e) => {
    let event = e.target;
    const city = event.dataset.city;
    newLocFunc(city);
    counter = 0;
    const daysWidth = dayId.length * dayId[0].clientWidth;
    daySelector.scrollLeft -= daysWidth;
    setOpacities();

    closeNewLocBoxFunc();
    cardBox.innerHTML = "";

    autoCompDiv.removeEventListener("click", selectCity);
    inputCity.removeEventListener("keyup", autocompFunc);
    setTimeout(renderCardsFunc, 1000);
};

// For when clicking the "close" button.
const closeNewLocBoxFunc = () => {

    inputCity.value = "";
    autoCompDiv.innerHTML = "";
    autoCompDiv.classList.add('hidden');
    autoCompDiv.classList.remove('flex');
    newLocBox.classList.add('hidden');
    newLocBox.classList.remove('flex');

    btnClose.removeEventListener("click", closeNewLocBoxFunc);
};

// For when clicking on the location at the header.
const changeLocFunc = () => {
    newLocBox.classList.remove('hidden');
    newLocBox.classList.add('flex');
    inputCity.addEventListener("keyup", autocompFunc);
    btnClose.addEventListener("click", closeNewLocBoxFunc);
};

// The following function activates the card scrollers' functions.
const cardScroller = (e) => {
    let event = e.target;
    let scrollLeng = "";

    if (document.body.clientWidth > 768) { // The scroll length changes depending on the document size.
        scrollLeng = 368; // The exact card size for over 768px window width.
    } else {
        scrollLeng = 328; // The exact card size for under 768px window width.
    };
    
    btnScrollCard.forEach(icon => { icon.removeEventListener("click", cardScroller); }); // The event is removed to prevent consecutive clicking from jamming the scroller.

    if (event.dataset.arrow == "left") { // Arrow orientation is saved as a data attribute.
        cardBox.scrollLeft -= scrollLeng;
    } else if (event.dataset.arrow == "right") {
        cardBox.scrollLeft += scrollLeng;
    }

    setTimeout(addEventCardScroller, 1000); // The event is added a second later to prevent consecutive clicking from jamming the scroller.
};

// This func displays the card scrollers when needed.
const addCardScrollers = () => {
    const cards = document.querySelectorAll("#cardDiv");
    const cardsWidth = cards.length * cards[0].clientWidth;
    
    if (cardBoxCont.clientWidth < cardsWidth) {
        btnScrollCard.forEach(icon => { icon.addEventListener("click", cardScroller); });
        btnScrollCard.forEach(icon => { 
            icon.classList.remove('hidden'); 
            icon.classList.add('flex');
        });
    } else {
        btnScrollCard.forEach(icon => { 
            icon.classList.add('hidden'); 
            icon.classList.remove('flex');
        });
    }
};

// A loop to be called easier for the scrollers' event listeners.
const addEventCardScroller = () => {
    btnScrollCard.forEach(icon => { icon.addEventListener("click", cardScroller) });
};

// The following function assigns a background image depending on the weather.
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

// Called to initiate the card rendering taking the fetched data.
const renderCardsFunc = () => {
    const date = dayId[counter].dataset.date; // The counter determines the date for the broadcast. (0 for today's date, 1 for tomorrow's date...)
    const day = dayId[counter].dataset.day; // The counter determines the date for the broadcast. (0 for today, 1 for tomorrow...)

    renderCards(date, day);

    const cards = document.querySelectorAll("#cardDiv");
    const cardsWidth = cards.length * cards[0].clientWidth;
    cardBox.scrollLeft -= cardsWidth;
};

// Called by the func above.
const renderCards = (date, day) => {
    // The following loop determines the start date for the broadcast
    for (i = 0; i < weatherArray.list.length; i++) {
        const dateFormated = dayjs.unix(weatherArray.list[i].dt).format("DD-MM-YYYY");

        if (dateFormated == date) {
            // All the variables are set from the fetched data.
            const hour = dayjs.unix(weatherArray.list[i].dt).format("HH:mm"); // In 24 hours format from a unix code.
            const temp = weatherArray.list[i].main.temp;
            const weather = weatherArray.list[i].weather[0].description;
            const windSp = weatherArray.list[i].wind.speed;
            const windSpKmhr = windSp * 3600 * .001; // Conversion from m/s to km/h.
            const icon = weatherArray.list[i].weather[0].icon;
            const humidity = weatherArray.list[i].main.humidity;
            
            cardReactor(day, hour, temp, weather, windSpKmhr, icon, humidity); // Each time the card reactor is called, a single card will be rendered.
            
        } else if (dateFormated > date) { // So that the loop stops after the selected date has been rendered.
            setTimeout(addCardScrollers, 1000); // After rendering all the cards, the scrollers will be added if necessary, with a second delay to give the code time to render the DOM.
            return;
        }
    };
};

// Called each loop by the renderCards function. It will create a single card from the entered data.
const cardReactor = (dayD, hourD, temp, weather, windSp, icon, humidity) => {

    const bgImg = bgImgGen(weather); // A constant that calls for the bgImgGen using the weather description from fetched data. 
    const roundTemp = temp.toFixed(); // Temperature free o decimals.
    const windSpFixed = windSp.toFixed(1); // Wind speed rounded to one decimal.
    
    // The whole HTML to create a single card.
    newCard = `
        <div id="cardDiv" class="w-fit h-fit max-md:py-3 max-md:px-5 p-10">
            <div id="weatherCard" class="flex-none aspect-card w-72 flex flex-col justify-between p-4 items-center bg-black/50 rounded-2xl border-4 drop-shadow-xl backdrop-blur-md" style="background: url(./assets/img/${bgImg}.gif) no-repeat center; background-size: cover;">
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
        <div>
    `;

    cardBox.innerHTML += newCard; // The new card appended.
};

// The function to fetch the weather data from the API.
const getWeathFunc = () => {

    const latitude = selectedLoc.dataset.lat; // The latitude from the selected location must be already saved in a data attribute.
    const longitude = selectedLoc.dataset.lon; // The longitude from the selected location must be already saved in a data attribute.
    const getWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    
    fetch(getWeather)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            weatherArray = data; // The fetched data is saved into the global variable weatherArray to be managed easily by various functions. 
            selectedLoc2.innerHTML = data.city.name; // To set the inner text from the second line location at the top right screen.
        })
        .then(() => {
            setDate();
        })
        .catch(error => console.log("error weather"));
};

// This func will set the location on display, from the live location, or the selected one.
const setLocFunc = () => {

    const latitude = selectedLoc.dataset.lat; // The latitude from the selected location must be already saved in a data attribute.
    const longitude = selectedLoc.dataset.lon; // The longitude from the selected location must be already saved in a data attribute.
    const getLocation = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(getLocation)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const city = data[0].name;
            
            selectedLoc.innerHTML = city; // To set the inner text from the first line location at the top right screen.
            saveCity(city); // To save the search into local storage.
        })
        .catch(error => console.log("error"));
};

// To save the live or searched location into local storage. 
const saveCity = (city) => {
    const found = citiesHistory.find((c) => c == city); // To find out if the city is already on the local storage.

    if (!found == true) {
        citiesHistory.push(city); // To save the latest search.
        storeData(); // To update the local storage.
        renderSavedCities();  // To update the cities' history at the change location box.
    };
};

// To be called when the user changes the location manually.
const newLocFunc = (city) => {
    // The URL will only fetch the latitude and longitude of the new location set manually by the user.
    const getLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

    fetch(getLocation)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const city = data[0].name;

            selectedLoc.innerHTML = city; // To set the inner text from the first line location at the top right screen.
            selectedLoc.dataset.lat = data[0].lat; // To set the latitude as a data attribute for future use and easy management by other functions.
            selectedLoc.dataset.lon = data[0].lon; // To set the longitude as a data attribute for future use and easy management by other functions.

            saveCity(city); // To save the search into local storage.
            getWeathFunc(); // To fetch the weather from the new location.
        })
        .catch(error => console.log("error"));
};

// When the user's live location is found, this will execute.
const located = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    selectedLoc.dataset.lat = latitude; // To set the latitude as a data attribute for future use and easy management by other functions.
    selectedLoc.dataset.lon = longitude; // To set the longitude as a data attribute for future use and easy management by other functions.

    setLocFunc();
    getWeathFunc();
    landingBox.classList.add('opacity-100');
    btnGo.classList.add('opacity-100');
    btnGo.classList.remove('opacity-0');
    landingBox.classList.remove('opacity-0');
    btnGo.addEventListener("click", beginFunc);
};

// When no live location is found, this will execute.
const locatedFalse = () => {
    const refreshSite = () => { location.reload(); };
    
    noLocMsg.classList.add('flex'); // To show a message indicating the user to activate location services.
    noLocMsg.classList.remove('hidden');
    btnNoLoc.addEventListener("click", refreshSite); // When the user hits ok, the site refreshes.
};

// To determine the date for the broadcast and fill the day scroller.
const setDate = () => {
    const dayMsecs = 86400000; // The number of milliseconds in a day (1000x60x60x24).

    if (dayjs().format("YYYY-MM-DD") < dayjs.unix(weatherArray.list[0].dt).format("YYYY-MM-DD")) { // If the actual time is over 20 hours, the broadcast starts the next day (tomorrow).
        for (i = 0; i < dayId.length; i++) {
            dayId[i].dataset.date = dayjs(dayjs() + dayMsecs + (dayMsecs * i)).format('DD-MM-YYYY'); // Today plus 1 day in milliseconds. Each loop adds a day extra in milliseconds.
            
            // "tomorrow" for tomorrow, and all the consecutive days have normal weekday names.
            if (dayjs(dayjs() + dayMsecs).format('DD-MM-YYYY') == dayId[i].dataset.date) {
                dayId[i].innerHTML = "tomorrow";
                dayId[i].dataset.day = "tomorrow";
            } else {
                dayId[i].innerHTML = dayjs(dayjs() + (dayMsecs * i)).format('dddd');
                dayId[i].dataset.day = dayjs(dayjs() + (dayMsecs * i)).format('dddd');
            };
        };
    } else {
        for (i = 0; i < dayId.length; i++) {
            dayId[i].dataset.date = dayjs(dayjs() + (dayMsecs * i)).format('DD-MM-YYYY'); // Each loop adds a day extra in milliseconds.
            
            // "today" for today, "tomorrow" for tomorrow, and all the consecutive days have normal weekday names.
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

// The opacities of the day scroller are to be returned to default when this function is called.
const setOpacities = () => {
    let opacities = ["100%", "50%", "0%", "0%", "0%"];
    for (i = 0; i < opacities.length; i++) {
        dayId[i].style.opacity = opacities[i];
    };
};

// This func will be called after loading the site.
const readyFunc = () => {
    navigator.geolocation.getCurrentPosition(located, locatedFalse);
    setOpacities();
    getCitiesHistory();
};

window.onload = readyFunc();