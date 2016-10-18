var message;
 
function start_func(){
	console.log("PASS0");
	get_location();
}
  
function get_location(){
	console.log("PASS");
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
     var myLatlng = new google.maps.LatLng(x,y);
     var mapOptions = {
	     zoom: 17,
	     center: myLatlng,
	     mapTypeId: google.maps.MapTypeId.ROADMAP
     }
       
     var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
     var marker = new google.maps.Marker({
     	     position: myLatlng,
	     map: map,
	     title:"Your position"
     });
     get_area_name(myLatlng);
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
