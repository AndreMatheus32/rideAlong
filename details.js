const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

addEventListener('DOMContentLoaded', async () => {

    const firstPostition = ride.data[0]
    const firstPositionData = await getLocationData(firstPostition.latitude, firstPostition.longitude)

    const mapElement = document.createElement("div")
    mapElement.style = "width:100px;height:100px"
    mapElement.className = "bg-primary rounded-4 "

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill "


    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} km/h`
    maxSpeedDiv.className = "h5"

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstPositionData.city} - ${firstPositionData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `distance: ${getDistance(ride.data)}`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    document.querySelector('#data').appendChild(dataElement)

    const map = L.map('mapDetail')
    map.setView([firstPostition.latitude, firstPostition.longitude], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: "@andre_matheus32",
        maxZoom: 20,
    }).addTo(map);

    const positionArray = ride.data.map(position => {
        return [position.latitude, position.longitude]
    })
    const polyLine = L.polyline(positionArray, { color: "blue" })
    polyLine.addTo(map)

    map.fitBounds(polyLine.getBounds())

    const deleteButton = document.querySelector('#deleteButton')
    deleteButton.addEventListener('click', () => {
        deleteRide(rideID)
        window.location.href = "./index.html"
    })

})