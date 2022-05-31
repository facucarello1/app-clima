const API_KEY = '34d8c35bb7c076f229709812a6b7ef96';

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setClimaData(data))
}

const setClimaData = data => {
    console.log(data);
    const climaData = {
        ubicacion: data.name,
        descripcion: data.weather[0].main,
        humedad: data.main.humidity,
        presion: data.main.pressure,
        temperatura: data.main.temp,
        fecha: getDate()
    }

        Object.keys(climaData).forEach(key => {
            document.getElementById(key).textContent = climaData[key];
        });

        cleanUp();
}

const cleanUp = () => {
    let contenedor = document.getElementById('contenedor');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    contenedor.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ( '0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}