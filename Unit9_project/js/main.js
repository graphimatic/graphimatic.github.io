
//config object from firebase to initialize firebase

  var config = {
    apiKey: "AIzaSyBx4hqLgJcSmB19j490VwtyFvrYqJ-H4CU",
    authDomain: "reservation-site-3111e.firebaseapp.com",
    databaseURL: "https://reservation-site-3111e.firebaseio.com",
    projectId: "reservation-site-3111e",
    storageBucket: "reservation-site-3111e.appspot.com",
    messagingSenderId: "627030577864"
  };
  
  firebase.initializeApp(config);

//connect to database
  var database = firebase.database();

//when reservation form is submitted

//define reservation data object
var reservationData = {}

//get day chosen
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
  });

// event listener
// when user submits the form
$('.reservation-form').on('submit', function(e) {
  e.preventDefault();

  //get name inputed
  reservationData.name = $('.reservation-name').val();
  
	// create a section for reservations data in your db
	var reservationsReference = database.ref('reservations');
 
	 // POST reservationData object to Firebase database w/ firebase's push() method 
	reservationsReference.push(reservationData);
});

// handlebars

function getReservations() {

	database.ref('reservations').on('value', function(results) {
		var allReservations = results.val();
		$('.reservations').empty();

		for(var reservation in allReservations) {

			var context = {
				name: allReservations[reservation].name,
				day: allReservations[reservation].day,
				reservationId: reservation
				};

			var source = $("#reservation-template").html();

  			var template = Handlebars.compile(source);

  			var reservationListItem = template(context);

  			$('.reservations').append(reservationListItem);

		}
	});
}
getReservations();


// google maps API

function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 14
		});
}