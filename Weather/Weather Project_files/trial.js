// Variable Declaration
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var gFront = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var gBack = "&key=AIzaSyC3EFAGe9WBrT4FeTfw7X3P4LyVvQXV_Hw";

var louisa ="https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/38.0634,-82.6267";

var newLocation ="https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/89.5,0";//probably should be empty at definition

var loca = {
  results : [
    {
      address_components : [
        [], { long_name : "Louisa" }, { short_name : "KY"}
      ]
    }
  ]
};

// -------------------------------------------------
$(function(){

  //-= the default screen, built with Louisa =-//
  //for (var a = 0; a <=5; a++) {
  //  cardBuilder(loca, louisa, a);  //this is the default behavior, using static input
  //}
//-= rules for card behavior with mouse interaction =-// Deffer until later, non-essential

  $("#card").flip({
  axis: 'y',
  trigger: 'click'
  });

  $(".card").on({
    mouseenter: function(){
        $(".card").css("opacity", "0.3");
        $(this).css("opacity", "1.0");
    }, 
    mouseleave: function(){
        $(".card").css("opacity", "0.7");
    } 
  });

//-= rules for button click to reload the cards =-//
  // $("button").click(function(ev){
  //   ev.preventDefault();
  //   var addy = $("#zipcode").val();
  //   if (typeof addy == "number"){
  //     addy = addy.toString();
  //   }
  //   alert(addy);
  //   // text3 = text1.concat("	",text2)
  //   var myRequest = (gFront.concat(addy)).concat(gBack);
  //   alert("here's the request: "+myRequest);
  //   $.ajax(myRequest, {dataType: "json"}).done(function(chip){  //begin googleapi  
  //     var latNum=(chip.results[0].geometry.location.lat);
  //     var lat = latNum.toString();
  //     var lngNum=(chip.results[0].geometry.location.lng);
  //     var lng = lngNum.toString();
  //     console.log("I have info: "+lat+", and "+lng+".");
  //     newLocation = "https://api.darksky.net/forecast/c0188a72d861db401edede8a318711f6/"+lat+"," + lng;
  //      for (var a = 0; a <=5; a++) {
  //        cardBuilder(chip, newLocation, a);
  //      }
//    });//end googleapis
//  });//end buttonclick
});//end function
//--------------------------
// Function declarations

var cardBuilder = function(loca, url, a){
  var html = "";
  var wrapperA = "<div class='container wrapper'><div class='row padded'>";
  var wrapperB = "</div> </div>";
  var cardA1 = "<div class='col-sm-4'><div class='well card' id='card";
  var cardA2 = "'><h3 class = 'card-title'><span class='dayOfWeek'>";
  var cardB = "</span><br /><span id = 'date'>";
  var cardC = "</span></h3>";
  var cardD = "<h1><span id='currentTemp'>";
  var cardE = "</span>&#8457;</h1>";
  var cardF = "<br /><p><span id = 'summary' class='card-text'>";
  var cardG = "</span></p><hr /><table class = 'table' style='color:white'><tr><td>MIN</td><td>MAX</td><td>Chance of Rain</td></tr><tr><td><span id='minTemp'>";
  var cardH = "</span>&#8457;</td><td><span id='maxTemp'>";
  var cardI = "</span>&#8457;</td><td><span id='chanceRain'>";
  var cardJ = "</span>%</td></tr></table><hr /></div></div>";
  var build = $("#putItInMe");

  $.ajax( url, {dataType: "jsonp"} ).done(function(data){
    $("#location").html(loca.results[0].address_components[1].long_name);
    $("#location").append(" , "+ loca.results[0].address_components[2].short_name);
    var date = data.currently.time*1000;
    if (a == 0) {
      html=(wrapperA);
    }
    if (a == 3) {
      html+=(wrapperB + wrapperA);
    }
    html+=(cardA1);
    html+= a.toString();
    html+=(cardA2);
    var dateInfo = new Date(date + 86400000 * a);
    html+=(days[dateInfo.getDay()]); 
    html+=(cardB);
    html+=((dateInfo.getMonth()+1) + "/" + dateInfo.getDate()+ "/" + dateInfo.getFullYear()); 
    html+=(cardC);
    if(a == 0){
      html+=(cardD);
      html+=(round(data.currently.temperature));
      html+=(cardE);
    } else {
      html+=("<h1>&ensp;</h1>");
    }
    html+=(cardF);
    html+=(data.currently.summary);
    html+=(cardG);
    html+=(round(data.daily.data[a].temperatureMin));
    html+=(cardH);
    html+=(round(data.daily.data[a].temperatureMax));
    html+=(cardI);
    html+=(toPercent(data.daily.data[a].precipProbability));
    html+=(cardJ);
    if (a == 5) {
      html+=(wrapperB);
    }    

    build.html(html);
    html = ""; 
  });
}

function round(num){
  return Math.round(num);
}

function toPercent(num){
  if(!num) { return 0; }
  return Math.round((num*100));
}
