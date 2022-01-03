const api = {
    key: "ae703cd3948c043b20c85b7cb9f6042c",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

// Aqui eu estou transformando os elementos HTML em elementos Javascript
var searchInput = document.getElementsByClassName('search-input')[0];
var city = document.getElementsByClassName('city')[0];
var date = document.getElementsByClassName('date')[0];
var temp = document.getElementsByClassName('temp')[0];
var about = document.getElementsByClassName('weather')[0];
var minMax = document.getElementsByClassName('min-max')[0];


// Quando ENTER(13 no keyCode) for pressionado, a função getResults() será executada
searchInput.addEventListener('keypress', setLocation);
function setLocation(event){
    if (event.keyCode == 13){ 
        getResults(searchInput.value);                         
    }
}

//Coletando dados da API e transformando em .json
function getResults(query){
    fetch(`${api.base}weather?q=${query}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);    
}

//Função principal
function displayResults(weather){
    console.log(weather)

    
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    let desc = weather.weather[0].description;
    about.innerHTML = `${desc.charAt(0).toUpperCase() + desc.slice(1)}`; //Para colocar a primeira letra maiúscula
    minMax.innerHTML = `${Math.round(weather.main.temp_min)}<span>°C</span> / ${Math.round(weather.main.temp_max)}<span>°C</span>`;


    let now = new Date();
    date.innerHTML = dateBuilder(now);

    // mudando background
    hour = now.getHours();
    if(hour > 5 && hour < 18){
        document.getElementsByTagName('Body')[0].style.backgroundImage = 'url(images/day.webp)'
    }
}


//Configurando a data
function dateBuilder(d){
    let days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`
}


