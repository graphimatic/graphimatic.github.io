


  var config = {
    apiKey: "AIzaSyBx4hqLgJcSmB19j490VwtyFvrYqJ-H4CU",
    authDomain: "reservation-site-3111e.firebaseapp.com",
    databaseURL: "https://reservation-site-3111e.firebaseio.com",
    projectId: "reservation-site-3111e",
    storageBucket: "reservation-site-3111e.appspot.com",
    messagingSenderId: "627030577864"
  };
  firebase.initializeApp(config);



function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 14
		});
}