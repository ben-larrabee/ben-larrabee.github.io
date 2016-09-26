// Variable Declaration
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var gFront = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var gBack = "&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";
var newLocation ="";
var days_forecast =6;

// -------------------------------------------------
$(document).ready(function(){

//-= rules for button click to reload the cards =-//
  $("#submitter").click(function(ev){
    ev.preventDefault();
    var addy = $("#zipcode").val();
    var days_forecast = $("#days-forecast").val();
    // if (typeof addy == "number"){  // type validation
    //   addy = addy.toString();
    // }
    
    var myRequest = (gFront.concat(addy)).concat(gBack);
    $.ajax(myRequest, {dataType: "json"}).done(function(chip){
      var latNum=(chip.results[0].geometry.location.lat);
      var lat = latNum.toString();
      var lngNum=(chip.results[0].geometry.location.lng);
      var lng = lngNum.toString();
      newLocation = "https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/"+lat+"," + lng;
      if (window.innerWidth < 768) {
        var viewSize = "small";
      } else {
        var viewSize = "medium";
      }
      cardBuilder(chip, newLocation, days_forecast, viewSize);
   });
 });//end submitter.buttonclick

  $(".hider").hide();
});

//--------------------------
// Function declarations
var cardBuilder = function(loca, url, a) {
  $.ajax( url, {dataType: "jsonp"} ).done(function(data){
    for (i = 0; i < a; i++) {
      var cardfill = $("#cardholder").html();
      if (i == 0) {
        var rowfill = $("#rowholder").html();
        rowfill = rowfill.replace("@@row@@", "row-one");
        $("#putItInMe").html(rowfill);
        cardfill = cardfill.replace("@@currenttemp@@", (round(data.currently.temperature))+"&#8457;");
      } else {
        cardfill = cardfill.replace("@@currenttemp@@", "&nbsp;");
      }
      if (i == 3) {
        var rowfill = $("#rowholder").html();
        rowfill = rowfill.replace("@@row@@", "row-two");
        $("#putItInMe").append(rowfill);
      }
      var date = data.currently.time*1000;
      var dateInfo = new Date(date + 86400000 * i);
      var dayOfWeek = days[dateInfo.getDay()];
      cardfill = cardfill.replace("@@dayOfWeek@@", dayOfWeek);
      cardfill = cardfill.replace("@@month0@@", (dateInfo.getMonth()+1));
      cardfill = cardfill.replace("@@day0@@", dateInfo.getDate()); 
      cardfill = cardfill.replace("@@year0@@", dateInfo.getFullYear());
      cardfill = cardfill.replace(/@@summary@@/g, data.currently.summary);
      cardfill = cardfill.replace("@@tempMin0@@", round(data.daily.data[i].temperatureMin));
      cardfill = cardfill.replace("@@tempMax0@@", round(data.daily.data[i].temperatureMax));
      cardfill = cardfill.replace("@@precip0@@", toPercent(data.daily.data[i].precipProbability));
      if (i <= 2) {
        $("#row-one").append(cardfill);
      } else { $("#row-two").append(cardfill);
      }
    }
    
  });
  $(".back").hide();
}

var cardBuilder = function(loca, url, a, viewSize) {
  $("#location").html(loca.results[0].formatted_address);
  $.ajax( url, {dataType: "jsonp"} ).done(function(data){
    $("body").css("background-image", data.daily.data[0].icon+".jpg");
    for (i = 0; i < a; i++) {
      var cardfill = $("#cardholder").html();
      if (i == 0) {
        var rowfill = $("#rowholder").html();
        rowfill = rowfill.replace("@@row@@", "row-one");
        $("#putItInMe").html(rowfill);
        cardfill = cardfill.replace("@@currenttemp@@", (round(data.currently.temperature))+"&#8457;");
      } else {
        cardfill = cardfill.replace("@@currenttemp@@", "&nbsp;");
      }
      if (viewSize == "medium") {
        if (i == 3) {
          var rowfill = $("#rowholder").html();
          rowfill = rowfill.replace("@@row@@", "row-two");
          $("#putItInMe").append(rowfill);
        }
      } else {

        if (i != 0) {
          var rows = ["row-one", "row-two", "row-three", "row-four", "row-five", "row-six"];
          var rowfill = $("#rowholder").html();
          rowfill = rowfill.replace("@@row@@", rows[i]);
          $("#putItInMe").append(rowfill);
        }
      }
      var date = data.currently.time*1000;
      var dateInfo = new Date(date + 86400000 * i);
      var dayOfWeek = days[dateInfo.getDay()];
      cardfill = cardfill.replace("@@dayOfWeek@@", dayOfWeek);
      cardfill = cardfill.replace("@@month0@@", (dateInfo.getMonth()+1));
      cardfill = cardfill.replace("@@day0@@", dateInfo.getDate()); 
      cardfill = cardfill.replace("@@year0@@", dateInfo.getFullYear());
      cardfill = cardfill.replace("@@summary@@", data.daily.data[i].icon);
      cardfill = cardfill.replace("@@summary@@", data.daily.data[i].icon);
      cardfill = cardfill.replace("@@tempMin0@@", round(data.daily.data[i].temperatureMin));
      cardfill = cardfill.replace("@@tempMax0@@", round(data.daily.data[i].temperatureMax));
      cardfill = cardfill.replace("@@precip0@@", toPercent(data.daily.data[i].precipProbability));
      if (viewSize == "medium") {
        if (i <= 2) {
          $("#row-one").append(cardfill);
        } else { 
          $("#row-two").append(cardfill);
        }
      } else {
        cardfill = cardfill.replace(/col-sm-4/g, "col-xs-12");
        switch (i) {
          case 0:
            $("#row-one").append(cardfill);
            break;
          case 1:
            $("#row-two").append(cardfill);
            break;
          case 2:
            $("#row-three").append(cardfill);
            break;
          case 3:
            $("#row-four").append(cardfill);
            break;
          case 4:
            $("#row-five").append(cardfill);
            break;
          case 5:
            $("#row-six").append(cardfill);
            break;
        }
      }
    }
  });
    
  $(".back").hide();

  $(".flipper").bind("click", function(){
    $(this).parent().siblings().toggle();
  });

  $(".card").bind( {
    mouseenter: function(){
      $(".card").css("opacity", "0.4");
      $(this).css("opacity", "1.0");
    }, 
    mouseleave: function(){
      $(".card").css("opacity", "0.7");
    }
    });
}

function round(num){
  return Math.round(num);
}

function toPercent(num){
  if(!num) { return 0; }
  return Math.round((num*100));
}
/* --- wish I could have made it work
//
// $(".card").flip({
// axis: 'y',
// trigger: 'click'
// });
//
------------*/