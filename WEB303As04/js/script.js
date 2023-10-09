/*
    Assignment #4
    Malav Kalathia
*/

$(function () {
    
    if (!navigator.geolocation) {
        document.getElementById('locationhere').textContent = "Geolocation is not supported by your browser.";
        return;
    }
    
    navigator.geolocation.getCurrentPosition(processLocation, displayError);
    
    function processLocation(position) {
        let currentLat = position.coords.latitude;
        let currentLon = position.coords.longitude;
    
        document.getElementById('locationhere').textContent = `Latitude: ${currentLat} °, Longitude: ${currentLon} °`;
    
        try {
            let storedLoc = JSON.parse(localStorage.getItem('location'));
    
            if (storedLoc) {
                let dist = calcDistanceBetweenPoints(currentLat, currentLon, storedLoc.latitude, storedLoc.longitude);
                let oldLocElement = document.createElement('p');
                oldLocElement.textContent = `Previous Latitude: ${storedLoc.latitude} °, Previous Longitude: ${storedLoc.longitude} °`;
    
                let welcomeBackHeader = document.createElement('h3');
                welcomeBackHeader.textContent = 'Welcome back!';
    
                let distElement = document.createElement('p');
                distElement.textContent = `You traveled ${dist.toFixed(2)} meters since your last visit.`;
    
                let parentElem = document.getElementById('locationhere').parentNode;
                parentElem.appendChild(oldLocElement);
                parentElem.appendChild(welcomeBackHeader);
                parentElem.appendChild(distElement);
            } else {
                let firstTimeHeader = document.createElement('h3');
                firstTimeHeader.textContent = 'Welcome for the first time!';
                document.getElementById('locationhere').parentNode.appendChild(firstTimeHeader);
            }
    
            localStorage.setItem('location', JSON.stringify({ latitude: currentLat, longitude: currentLon }));
        } catch (e) {
            handleLocalStorageError(e);
        }
    }
    
    function displayError() {
        document.getElementById('locationhere').textContent = "You must allow geolocation to use this application.";
    }
    
    function handleLocalStorageError(error) {
        console.error("Error accessing or manipulating localStorage:", error);
    
    }
    


    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});

