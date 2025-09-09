const container = document.querySelector(".container");

const search = document.querySelector(".search-box button");


const weatherBox = document.querySelector(".weather-box");


const weatherDetails = document.querySelector(".weather-details");


const error404 = document.querySelector(".not-found");


const cityHide = document.querySelector(".city-hide");


search.addEventListener("click", () => {


    const APIKey = "e3693853d41a30eb70923bac12096f4f";

    const city = document.querySelector(".search-box input").value;


    if (city == "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${APIKey}`
    )

        .then((response) => response.json())

        .then((json) => {
            if (json.cod == "404") {

                cityHide.textContent = city;

                container.style.height = "400px";


                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");

                error404.classList.add("active");


                return;
            }

            const image = document.querySelector(".weather-box img");

            const temperature = document.querySelector(".weather-box .temperature");


            const description = document.querySelector(".weather-box .description");


            const humidity = document.querySelector(".weather-details .humidity span");


            const wind = document.querySelector(".weather-details .wind span");


            if (cityHide.textContent == city) {
                return;

            } else {
                cityHide.textContent = city;


                container.style.height = "555px";


                container.classList.add("active");
                weatherBox.classList.add("active");
                weatherDetails.classList.add("active");


                error404.classList.remove("active");


                setTimeout(() => {
                    container.classList.remove("active");

                }, 2500);

                switch (json.weather[0].main) {
                    case "Acik":
                        image.src = "Assets/Images/clear.png";
                        break;

                    case "Bulutlu":
                        image.src = "Assets/Images/cloud.png";
                        break;

                    case "Yagmurlu":
                        image.src = "Assets/Images/rain.png";
                        break;

                    case "Karli":
                        image.src = "Assets/Images/snow.png";
                        break;

                    case "Sis":
                    case "Pus":
                        image.src = "Assets/Images/mist.png";
                        break;

                    default:
                        image.src = "Assets/Images/cloud.png";
                        break;
                }


                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;


                const infoWeather = document.querySelector(".info-weather");
                const infoHumidity = document.querySelector(".info-humidity");
                const infoWind = document.querySelector(".info-wind");

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);


                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoWind.id = 'clone-info-wind';


                elCloneInfoWeather.classList.add('active-clone');
                elCloneInfoHumidity.classList.add('active-clone');
                elCloneInfoWind.classList.add('active-clone');


                setTimeout(() => {
                    infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
                    infoWind.insertAdjacentElement('afterend', elCloneInfoWind);

                }, 2200);

                const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');


                const cloneInfoWeatherfirst = cloneInfoWeather[0];
                const cloneInfoHumidityfirst = cloneInfoHumidity[0];
                const cloneInfoWindfirst = cloneInfoWind[0];


                if (cloneInfoWeather.length > 0) {
                    cloneInfoWeatherfirst.classList.remove('active-clone');
                    cloneInfoHumidityfirst.classList.remove('active-clone');
                    cloneInfoWindfirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherfirst.remove();
                        cloneInfoHumidityfirst.remove();
                        cloneInfoWindfirst.remove();

                    }, 2200);
                }
            }

            
        });
});

// LINKS MODAL MODULE
document.addEventListener('DOMContentLoaded', function () {
    var linksModal = document.getElementById('links-modal');
    var linksNav = document.querySelector('.nav-links a[href="#links"]');
    var v2Modal = document.getElementById('v2-modal');
    var v2Nav = document.querySelector('.nav-links a[href="#v2"]');
    if (linksModal && linksNav) {
        linksNav.addEventListener('click', function (e) {
            e.preventDefault();
            linksModal.classList.add('active');
            document.documentElement.style.overflow = 'hidden';
        });
        linksModal.addEventListener('click', function (e) {
            if (e.target.hasAttribute('data-close')) {
                linksModal.classList.remove('active');
                document.documentElement.style.overflow = '';
            }
        });
    }
    if (v2Modal && v2Nav) {
        v2Nav.addEventListener('click', function (e) {
            e.preventDefault();
            v2Modal.classList.add('active');
            document.documentElement.style.overflow = 'hidden';
        });
        v2Modal.addEventListener('click', function (e) {
            if (e.target.hasAttribute('data-close')) {
                v2Modal.classList.remove('active');
                document.documentElement.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (linksModal && linksModal.classList.contains('active')) {
                linksModal.classList.remove('active');
            }
            if (v2Modal && v2Modal.classList.contains('active')) {
                v2Modal.classList.remove('active');
            }
            document.documentElement.style.overflow = '';
        }
    });

    // predefined anchors already have href; no JS needed to compute URL
});

// Sağ tık ve bazı geliştirici kısayollarını engelle (caydırıcı)
//document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
//document.addEventListener('keydown', function (e) {
   // var key = (e.key || '').toLowerCase();
    //if (
      //  key === 'f12' ||
       // (e.ctrlKey && key === 'u') ||
        //(e.ctrlKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
    //) {
      //  e.preventDefault();
        //e.stopPropagation();
    //}
//});

