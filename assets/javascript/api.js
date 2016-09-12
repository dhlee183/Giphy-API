$(document).ready(function() {

	var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 
					'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat',
					'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog'];

	function displayAnimalInfo(){

	var animalSelection = $(this).attr('data-name');
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q='  + animalSelection + "&y=&limit=10&api_key=dc6zaTOxFJmzC";
		
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		console.log(response);

		$('#animalsView').empty()

		for (i = 0; i < response.data.length; i++) {

		var animalDiv = $('<div class="animalInfo">');

		var rating = response.data[i].rating;

		var p = $('<p>').text( "Rating: " + rating);

		animalDiv.append(p);

		var img = $('<img>')

		img.attr("src", response.data[i].images.original_still.url);

		img.attr("data-still", response.data[i].images.original_still.url);

		img.attr("data-animate", response.data[i].images.original.url);

		img.attr("data-state", "still");

		img.addClass('animalImg')

		animalDiv.append(img);

		$('#animalsView').prepend(animalDiv);

		}
	});

	};

	$(document).on('click', '.animalImg', function() {
				
		var state = $(this).attr('data-state');

		if (state == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}

	});


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

		var animalPick = $('#animal-input').val().trim();

		animals.push(animalPick);
		
		renderButtons();

		return false;
	})

	$(document).on('click', '.animal', displayAnimalInfo);

	renderButtons();

});