
// // form validation
	
// // find the input field
// 

// //blur event (the user 'leaves' the email field)

// nameInput.addEventListener('blur', function() {

// 	if (nameInput.value.length === 0) {

// 		document.getElementById('message').innerText = 'Please enter your name';
// 		nameInput.className = 'error';

// 	} else {
// 		document.getElementById('message').innerText = '';
// 		nameInput.className = '';
// 	}
// });



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
var reservationData = {};

$(document).ready(function() { 
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

		// validate and then clear the form

		var nameInput = document.getElementById('name');

		if (nameInput.value.length === 0) {

			document.getElementById('message').innerText = 'Please enter your name';
			nameInput.className = 'error';

		} else {
			document.getElementById('message').innerText = '';
			nameInput.className = '';
		}
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
	// cancel a reservation

	$('.reservations').on('click', '.delete', function(e) {
		e.preventDefault();

		// get this parent's data id 
		var cell = $(this).parent();

		var reservationId = cell.data('id');
		
		var reservationsReference = database.ref('reservations');

		// go to firebase and delete this entry
		reservationsReference.child(reservationId).remove();

	});
	getReservations();


});



// google maps API

function initMap() {

	var styles = [
		{ featureType: 'all',
			elementType: 'labels.text.stroke',
			stylers: [
				{ visibility: 'off' }
			]
		},
		{ featureType: 'administrative', 
		elementType: 'labels.text',
		stylers: [
			{ color: '#2d333a'}
			]

		},
		{ featureType: 'poi', 
			elementType: 'labels.text',
			stylers: [
				{ visibility: 'off'}
			]
		},
		{ featureType: 'poi.park', 
			elementType: 'labels.text',
			stylers: [
				{ color: '#43a82d'}
			]
		},
		{ featureType: 'poi', 
		elementType: 'labels.icon',
		stylers: [
			{ visibility: 'off'}
			]

		},
		{ featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{ visibility: 'off' }
			]

		},
		{ featureType: 'road.highway',
		elementType: 'labels.icon',
		stylers: [
			{ visibility: 'off' }
			]

		},
		{ featureType: 'water',
			stylers: [
				{ color: '#a0bad6' }
			]
		}, 
		{ featureType: 'landscape',
		  elementType: 'geometry',
		  stylers: [
				{ color: '#f2f2f2'}
				]
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry',
				stylers: [
					{ color: '#e8f2dc'}
				]
			
		}
	];

	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 15,
		styles: styles
		});

	var marker = new google.maps.Marker({
		position: {lat: 40.8054491, lng: -73.9654415},
		map: map,
		title: 'Monks Café'
	}); 
}