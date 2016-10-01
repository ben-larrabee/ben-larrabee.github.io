// Variable Declaration
var gFront = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var gBack = "&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";
var newLocation ="";
var howmany = 0;
var markerdata = { myLatLng: {lat: 37, lng: -90}, location: "Somewhere"};
var rowstring;
var latlng = {lat : 38, lng : -83};
var mapstring = "";
var markerlocation;
var refill = [];
var markers =[
  { myLatLng: {
    lat: 38.06, lng: -82.67 }, location: "Louisa"
  }
];

// -------------------------------------------------
$(document).ready(function(){
  $(".hider").hide();
  // -= rules to figure out what space to fill next when a card is killed =-//
  $(".close").click(function(){
    alert("buh-bye");
  })
//-= rules for button click to add a new map card =-//
  $("#submitter").click(function(ev){
    ev.preventDefault();
    // gets the latlng
    var addy = $("#zipcode").val();   
    var myRequest = (gFront.concat(addy)).concat(gBack);
    $.ajax(myRequest, {dataType: "json"}).done(function(chip){
      // create new card applying bootstrap
      if (howmany == 0) {
        var rowfill = $("#rowholder").html();
        $("#map").append(rowfill);
      }
      var cardfill = $("#cardholder").html();
      markerLocation = chip.results[0].formatted_address;
      cardfill = cardfill.replace("@@location@@", markerLocation);
      mapstring = "map"+howmany;
      cardfill = cardfill.replace("@@map#@@", mapstring);
      $("#row1").append(cardfill);

      latlng.lat = (chip.results[0].geometry.location.lat);
      latlng.lng = (chip.results[0].geometry.location.lng);

      howmany++;
      // draw a map within a new target card
      setTimeout(function() { initMap(mapstring); }, 500);
    });
  });//end submitter.buttonclick

  // $("p").click(function(){
  //   var tempText = $(this).html();
  //   tempText=tempText[0];
  //   var rowNum = parseInt(tempText);
  //   $("#markerlist").remove();
  //   markers.splice(rowNum, 1);
  //   howmany--;
  //   for (var i in markers) {
  //     $("#markerlist").append("<p id='" + i + "'>"+ i + "*: " + markers[i].location + ": " + markers[i].myLatLng.lat + ", " + markers[i].myLatLng.lng + "</p>");
  //   }
  // });

//-= rules for button click to redraw map =-//
//   $("#drawer").click(function(ev){
//     ev.preventDefault();
//     var map;
//     function initMap() {
//       map = new google.maps.Map(document.getElementById('map'), {
//         center: markers[0].myLatLng,
//         zoom: 8
//       });

// //      for (marker in markers) {
//         var marker = new google.maps.Marker({
//         position: {lat: 37, lng: -84.1},
//         map: map,
//         title: "Somewhere"
//         });
//       }
// //    }
//   });
});
//////////////////////////////
// function marker(latit, lng, location) {
//     this.myLatLng = {};
//     this.myLatLng.lat = latit;
//     this.myLatLng.lng = lng;
//     this.location = location;
// }

function initMap() {  //removed paramter markerLocation to test
  var map;
  map = new google.maps.Map(document.getElementById(mapstring), {
  center: latlng,
  zoom: 8
  });
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: markerLocation
  });
}
// can probably ignore the rest of these

// function deleteMarkers() {
//   markers = [];
//   howmany = 0;
//   $("#markerlist").empty();
//   initMap();
// }
// function clearMarkers() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: markers[howmany].myLatLng,
//     zoom: 8
//   });
// }
// function showMarkers() {
//   initMap();
// }