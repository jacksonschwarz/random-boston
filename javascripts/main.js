let map;
let la;
let ln;
let scale;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10
  });
}
/*
  Returns a marker object.
  (a) and (b) are the coordinates of the initial point
  (x) and (y) are the random coordinates of the destination
*/
function placeMarker(a, b, x, y){
  return {
    coords: [x, y],
    url: "https://maps.google.com?saddr="+a+","+b+"&daddr="+x+","+y
  }
}
/*
  Returns an array containing two random points, adjusted for scale.
*/
function randomDirection(scale){
  let randX=Math.random()/scale
  let randY=Math.random()/scale
  let chance=[1,2,3,4][Math.round(Math.random()*4)]
  switch (chance) {
    case 1:
      break;
    case 2:
      randX*=-1
      break;
    case 3:
      randY*=-1
      break;
    case 4:
      randX*=-1
      randY*=-1
      break;
  }
  return [randX, randY];
}
/*
  Parses the scope radio buttons.
  Returns the index of the selected radio button
  Otherwise it will return false, so be sure to tell the user to enter a scope!
*/
function parseScope(){
  let radios=$('input[type=radio]')
  let index=-1;
  for(r of radios){
    if(r.checked){
      index=radios.index(r);
    }
  }
  switch (index) {
      case 0:
        return 150;
      case 1:
        return 100;
      case 2:
        return 50;
      case 3:
        return 25;
      case 4:
        return 1;
      default:
        return false;

  }
}
$( document ).ready(function(){
  $("#map").hide();
  $("#submit").click(function(){
    if($("#postal-address").val() && parseScope()){
    let markers=$("#marker-amount").val()
    //scale=$("scope").val()
    scale=parseScope();
    $("#map").show();
    $("#map").googleMap();
    $("#map").addMarker({
      address:$("#postal-address").val(),
      success:function(e){
        for(let i=0;i<markers;i++){
          let randX=randomDirection(scale)[0];
          let randY=randomDirection(scale)[1];
          $("#map").addMarker(placeMarker(e.lat, e.lon, (e.lat+randX), (e.lon+randY)))
        }
      }
    });
  }
  else{
    Materialize.toast("Error: Please fill out the entire form.", 1750, "red rounded");
  }
});
});
