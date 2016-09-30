// Variable Declaration
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var gFront = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var gBack = "&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";
var newLocation ="";
var map;
var markerdata = { myLatLng: {lat: 37, lng: -90}, location: "Somewhere"};
var markers =[
  { myLatLng: {
    lat: 38.06, lng: -82.67 }, location: "Louisa"
  }
];

// -------------------------------------------------
$(document).ready(function(){

//-= rules for button click to reload the cards =-//
  $("#submitter").click(function(ev){
    ev.preventDefault();
    // gets the latlng
    var addy = $("#zipcode").val();    
    var myRequest = (gFront.concat(addy)).concat(gBack);
    $.ajax(myRequest, {dataType: "json"}).done(function(chip){
      markerdata.myLatLng.lat=(chip.results[0].geometry.location.lat);
      markerdata.myLatLng.lng=(chip.results[0].geometry.location.lng);
      markerdata.location =(chip.results[0].formatted_address);
      markers.push(markerdata);

    });
 });//end submitter.buttonclick

 $("#drawer").click(function(ev){
    ev.preventDefault();

          var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: markers[0].myLatLng,
          zoom: 8
        });
        for (marker in markers) {
              var marker = new google.maps.Marker({
    position: marker.myLatLng,
    map: map,
    title: marker.location
  });
        }
      }
});
});
