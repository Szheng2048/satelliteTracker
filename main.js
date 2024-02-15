let locationOfAdress = document.querySelector("#location")
let satelliteCode = document.querySelector("#norad")
let adress
let satellite
locationOfAdress.addEventListener("change",(event)=>{
    adress = event.target.value
    adress = encodeURI(adress)
    console.log(adress)
})
let latitude
let longitute

satelliteCode.addEventListener("change",(event)=>{
    satellite = event.target.value
})




let geoCodeAPI = `https://geocode.maps.co/search?q=${adress}&api_key=${apiKey}`

// fetch(geoCodeAPI)
//     .then((address)=>{
//         console.log(address)
//     })

const searchButton = document.querySelector("button")
searchButton.addEventListener('click',()=>{
    fetch(geoCodeAPI)
        .then((response)=>{
            return response.json()
        })
        .then((object)=>{
            latitude = object[0].lat
            longitute = object[0].lon
            let satellitePassesAPI = `https://satellites.fly.dev/passes/${satellite}?lat=${latitude}&lon=${longitute}&limit=1&days=15&visible_only=true`
            return fetch(satellitePassesAPI)
        })
        .then ((response)=>{
            return response.json()
        })
        .then((object)=>{
            if(object[0].visible){
                let newElement = document.createElement("p")
                newElement.innerHTML = `The Satellite will rise at ${object[0].rise.utc_datetime}and the satellite will culminate at ${object[0].culmination.utc_datetime} and will set at ${object[0].set.utc_datetime}.`
                let appendage = document.getElementById("answer")
                appendage.appendChild(newElement)
            } else {
                let newElement = document.createElement("p")
                newElement.innerHTML = "The satelite will not be visible within the next 15 days"
                let appendage = document.getElementById("answer")
                appendage.appendChild(newElement)
            }
        })
})