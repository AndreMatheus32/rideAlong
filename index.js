const rideListElement = document.querySelector('#rideList');
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-2 align-items-center gap-2 shadow-sm "
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", () => {
        window.location.href = `./details.html?id=${ride.id}`
    })

    const mapID = `map${ride.id}`

    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px;height:100px"
    mapElement.className = "bg-primary rounded-4 "


    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill "

    const firstPostition = ride.data[0]
    const firstPositionData = await getLocationData(firstPostition.latitude, firstPostition.longitude)

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

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapID, {
        zoomControl : false
    })
    map.setView([firstPostition.latitude, firstPostition.longitude], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 20,
    }).addTo(map);
    
    L.marker([firstPostition.latitude , firstPostition.longitude]).addTo(map)


})
