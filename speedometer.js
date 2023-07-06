// pegar velocidade 
// armazenar velocidade
// lista das corridas
// lista detalhada da corrida

const speed = document.querySelector("#speed");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");

let watchID = null;
let currentRide = null;

start.addEventListener('click', () => {
    if (watchID)
    return;

    function locationSuccess(position) {
        console.log(position)
       addPosition(currentRide , position)
        speed.innerText = position.coords.speed ? (position.coords.speed * 3, 6).toFixed(2) : 0
    }

    function locationError(error) {
        console.log(error)
    }

    const options = { enableHighAccuracy: true };
    currentRide = createNewRide();
    watchID = navigator.geolocation.watchPosition(locationSuccess, locationError, options)
    

    start.classList.add('d-none')
    stop.classList.remove('d-none')
})

stop.addEventListener('click', () => {
    if (!watchID)
        return;

    navigator.geolocation.clearWatch(watchID)
    watchID = null;
    updateStopTime(currentRide)
    currentRide = null
    start.classList.remove('d-none')
    stop.classList.add('d-none')
    window.location.href = "./index.html"
})

