//@prepros-prepend common.js

//@prepros-prepend ../lib/lightbox/js/lightbox.min.js

function initMap() {
  var point = {lat: 52.521807, lng: 13.413086}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: point
  })
  var marker = new google.maps.Marker({
    position: point,
    map: map,
  })
}
