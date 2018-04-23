 $(document).ready(function() {
 	/*  Once the page loads, it asks for the location of the user, the calls the apicalls function
 	in order to display the current weather.
 	*/
 	if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(apicalls);
    }
    else {
        map.innerHTML = "Geolocation is not supported by this browser.";
    }
 })



function apicalls(position){
	// Use an ajax call to retrieve data from the API.
	// The cors-anywhere where is needed in order to not get the Darksky api to work with my app
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +position.coords.latitude+ ","+position.coords.longitude+'&radius=1500&open_now=true&key=AIzaSyAuUPoGlzbmfs5vynVKx19mz40kGhtiWK4'; 
    
    $.ajax({
        type: "GET",
        url:proxyurl+url,
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
         console.log(resultData.results);
         // displayweather(resultData);
        },
        error : function(jqXHR, textStatus, errorThrown) {
         //If there is an error retriving data from the API, an error is displayed, either the apikey has expired or there is no data for the geolocation
         var map = document.getElementsByClassName("googlemap");
            map[0].innerHTML = "The Weather App has run into an error" +errorThrown;
        },//    
    });
    document.getElementById("waiting").innerHTML = "<h1>Your Location</h1>";
    var loc = {lat: position.coords.latitude, lng:position.coords.longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: loc,
    });
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title:"Me",
    });


}


