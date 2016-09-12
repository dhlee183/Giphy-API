$(document).ready(function() {

		var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 
						'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat',
						'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog'];

		function displayAnimalInfo(){

		var animal = $(this).attr('data-name');
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q='  + animal + "&y=&limit=10&api_key=dc6zaTOxFJmzC";
		
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);

			$('#animalsView').empty()

			for (i = 0; i < response.data.length; i++) {

			var animalDiv = $('<div class="animal">');

			var rating = response.data[i].rating;

			var p = $('<p>').text( "Rating: " + rating);

			animalDiv.append(p);

			var image = $('<img>').attr("src", response.data[i].images.original.url);

			animalDiv.append(image);

			$('#animalsView').prepend(animalDiv);

			}
		});

	}

	function renderButtons(){ 

		$('#buttonsView').empty();

		for (var i = 0; i < animals.length; i++){

		    var a = $('<button>') 

		    a.addClass('animal');

		    a.attr('data-name', animals[i]);

		    a.text(animals[i]);
		     
		    $('#buttonsView').append(a); 
		}
	}

	$('#addAnimal').on('click', function(){

		var animal = $('#animal-input').val().trim();

		animals.push(animal);
		
		renderButtons();

		return false;
	})

	$(document).on('click', '.animal', displayAnimalInfo);

	renderButtons();

});