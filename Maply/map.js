// Variable Declaration
var gFront = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var gBack = "&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";
var newLocation ="";
var howmany = 0;
var markerdata = { myLatLng: {lat: 37, lng: -90}, location: "Somewhere"};
var markers =[
  { myLatLng: {
    lat: 38.06, lng: -82.67 }, location: "Louisa"
  }
];

// -------------------------------------------------
$(document).ready(function(){

//-= rules for button click to add a marker =-//
  $("#submitter").click(function(ev){
    ev.preventDefault();
    // gets the latlng
    var addy = $("#zipcode").val();    
    var myRequest = (gFront.concat(addy)).concat(gBack);
    $.ajax(myRequest, {dataType: "json"}).done(function(chip){
      markers.push(new marker(
        (chip.results[0].geometry.location.lat),
        (chip.results[0].geometry.location.lng),
        (chip.results[0].formatted_address)
        ));
      howmany++;
      $("#markerlist").append("<p id='" + howmany + "'>"+ howmany + "*: " + markers[howmany].location + ": " + markers[howmany].myLatLng.lat + ", " + markers[howmany].myLatLng.lng + "</p>");
      setTimeout(function() { initMap(); }, 500);

    });
  });//end submitter.buttonclick
  $("p").click(function(){
    var tempText = $(this).html();
    tempText=tempText[0];
    var rowNum = parseInt(tempText);
    $("#markerlist").remove();
    markers.splice(rowNum, 1);
    howmany--;
    for (var i in markers) {
      $("#markerlist").append("<p id='" + i + "'>"+ i + "*: " + markers[i].location + ": " + markers[i].myLatLng.lat + ", " + markers[i].myLatLng.lng + "</p>");
    }
  });

//-= rules for button click to redraw map =-//
  $("#drawer").click(function(ev){
    ev.preventDefault();
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: markers[0].myLatLng,
        zoom: 8
      });

//      for (marker in markers) {
        var marker = new google.maps.Marker({
        position: {lat: 37, lng: -84.1},
        map: map,
        title: "Somewhere"
        });
      }
//    }
  });
});
//////////////////////////////
function marker(latit, lng, location) {
    this.myLatLng = {};
    this.myLatLng.lat = latit;
    this.myLatLng.lng = lng;
    this.location = location;
}

function initMap() {
  if (markers[howmany]) {
    map = new google.maps.Map(document.getElementById('map'), {
    center: markers[howmany].myLatLng,
    zoom: 8
    });
  } else {
    map = new google.maps.Map($("#map"), {
      center: { lat: 45, lng: -80 },
      zoom: 3
    });
  }
  
  for (var i in markers){
  var marker = new google.maps.Marker({
    position: markers[i].myLatLng,
    map: map,
    title: markers[i].location
  });
  }
}
function deleteMarkers() {
  markers = [];
  howmany = 0;
  $("#markerlist").empty();
  initMap();
}
function clearMarkers() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: markers[howmany].myLatLng,
    zoom: 8
  });
}
function showMarkers() {
  initMap();
}