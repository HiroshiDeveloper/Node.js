var message, map, marker, myLatlng;
var infowindow = new google.maps.InfoWindow();
 
function start_func(){
	get_location();
}
  
function get_location(){
	document.getElementById("area_name").innerHTML = 'Get a location';
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition
  		(successCallback,errorCallback);
  	} else {
  		message = "Cannot use geolocation on this browser";
  		document.getElementById("area_name").innerHTML = message;
  	}
}

function successCallback(pos) {
	var Potition_latitude = pos.coords.latitude;
	var Potition_longitude = pos.coords.longitude;
	
   	initialize(Potition_latitude,Potition_longitude);
}
    
function errorCallback(error) {
    	message = "Not allowed to get the location";
	document.getElementById("area_name").innerHTML = message;
}
     
function initialize(x,y) {
     	document.getElementById("area_name").innerHTML = 'Getting information of google map';
      
     	// add infromation from Geolocation
     	// MapTypeId: HYBRID, ROADMAP, SATELLITE or TERRAIN
     	myLatlng = new google.maps.LatLng(x,y);
     	var mapOptions = {
   		zoom: 14,
		enableHightAccuracy: true,
	     	center: myLatlng,
	     	mapTypeId: google.maps.MapTypeId.ROADMAP
    	 }
       
     	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var marker = new google.maps.Marker({
   		position: myLatlng,
	     	map: map,
		title:"Your position"
     	});

     	get_area_name(myLatlng);
	
	/*
     	service = new google.maps.places.PlacesService(map);
     	service.textSearch(mapOptions, callback);
	*/
}
     
function callback(results, status){
	
	if(status == google.maps.places.PlacesServiceStatus.OK){
		for(var i=0; i<results.length; i++){
			createMarker(results[i]);
		}
	}
}

function get_area_name(latLng_now){
	// Get address
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({latLng: latLng_now}, function(results, status){
       		if(status == google.maps.GeocoderStatus.OK){
		      	document.getElementById("area_name").innerHTML = results[0].formatted_address + "<br/>";
	       	} else {
		      	// Error
       		}
      	});
}

function showMap(keyWord){
	var request = {
	       location: myLatlng,
	       radius: '3000',
	       query: keyWord
	};
	service	= new google.maps.places.PlacesService(map);
     	service.textSearch(request, callback);
}


function createMarker(place) {
	var marker = new google.maps.Marker({
		position: place.geometry.location,
		map: map,
		title : place.name
	});


	google.maps.event.addListener(marker, 'click', function() {
		
		var s ="";

		/* icon + place name */
		s+="<div class='ttl cf'>";
		s+=(place.icon)?"<img width='32' height='32' src='"+place.icon+"' style='float:left;margin-right:5px;' />":"";
		s+=(place.name)?"<b>"+place.name+"</b>":"?";
		s+="</div>";
		s+="<div class='detail'>";
		
		/* address */
		if(place.formatted_address){
			s+="<p>"+place.formatted_address+"</p>";
		}

		/* reviews */
		if(place.rating){
			    s+="<p>Reviews："+place.rating+"</p>";
		}

		/* pictures */
		console.log("=== CHECK ===");
		console.log(place.photos[0].getUrl);
		if(place.photos && place.photos.length>=1){
			    s+="<img src='"+place.photos[0].getUrl({"maxWidth":100,"maxHeight":100})+"'/>";
		}





		
		infowindow.setContent("<div class='infowin'>"+s+"</div>");
		infowindow.open(map, this);
	});
}

