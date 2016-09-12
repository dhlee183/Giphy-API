$(document).ready(function() {

	// Array of animals displayed when the page loads
	var animals = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 
					'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat',
					'chicken', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog'];

	// Function to generate the ratings and gifs in the HTML
	function displayAnimalInfo(){

	// Variable created to give each of the animals an attribute of data-name	
	var animalSelection = $(this).attr('data-name');

	// Variable created for the Giphy API link with search parameters (q) using the animalSelection variable, 
	// rating parameter, limit parameter set to 10, and the public API key  
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q='  + animalSelection + "&rating=&limit=10&api_key=dc6zaTOxFJmzC";

	// AJAX call is created for each of the animals being selected		
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		console.log(response);

		// This clears out the currents gifs so that when new gifs are selected they are not stacked on top of each other
		$('#animalsView').empty()

		// for loop to cycle through the gifs
		for (i = 0; i < response.data.length; i++) {

		// Variable created to dynamically generate a div with a class of animalInfo to hold the ratings and images
		var animalDiv = $('<div class="animalInfo">');

		// Variable to get the rating from the Giphy API
		var rating = response.data[i].rating;

		// Variable that dynamically generates a p tag with the rating
		var p = $('<p>').text( "Rating: " + rating);

		// The p tag is given a class of ratings
		p.addClass('ratings')

		// The p tag is appended to the animal div created earlier
		animalDiv.append(p);

		// Variable created to dynamically generate an img tag
		var img = $('<img>')

		// The img tag is given an attribute of src which is set equal to a still image of the gif
		img.attr("src", response.data[i].images.original_still.url);

		// The img tag is given an attribute of data-still which is set equal to a still image of the gif
		img.attr("data-still", response.data[i].images.original_still.url);

		// The img tag is given an attribute of data-animate which is set equal to an animated image of the gif
		img.attr("data-animate", response.data[i].images.original.url);

		// The img tag is given an attribute of data-state which is set equal to a value of still
		img.attr("data-state", "still");

		// The img tag is given a class of animalImg
		img.addClass('animalImg')

		// The img tag is appended to the animal div created earlier
		animalDiv.append(img);

		// The dynamically created animal div is prepended to the animalsView div in the HTML to display the gif info
		$('#animalsView').prepend(animalDiv);

		}
	});

	};

	// This event listener is used to play and pause the gif
	$(document).on('click', '.animalImg', function() {
				
		// Variable created to look for the data-state attribute on click of the gif
		var state = $(this).attr('data-state');

		// This if statement says when the state variable is equal to still, the gif gets its source link from the data-animate attribute to play the gif and data-state attribute is changed from still to animate
		if (state == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}
		// Otherwise, if state is not equal to still, the gif is paused and the gif gets its source link from the data-still attribute and changes the data-state attribute from animate to still
		else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}

	});

	// Function to generate the animal buttons in the HTML
	function renderButtons(){ 

		// This prevents repeat buttons and it removes animals prior to adding new animals
		$('#buttonsView').empty();

		// for loop to cycle through the animals array
		for (var i = 0; i < animals.length; i++){

		    // Variable created to dynamically generate a button tag
		    var a = $('<button>') 

		    // Class of animal is added to the button tag
		    a.addClass('animal');

		    // Attribute of data-name is added to the button tag
		    a.attr('data-name', animals[i]);

		    // Provides the initial button text
		    a.text(animals[i]);

		    // This appends the button tag to the buttonsView div in the HTML
		    $('#buttonsView').append(a); 
		}
	}

	// Event listener for the submit buttom to add new animals to the button list
	$('#addAnimal').on('click', function(){

		// Variable created for the new animals entered into the input line
		var animalPick = $('#animal-input').val().trim();

		// if/else statement created so that new buttons are only created when a user enters an animal into the input line (this prevents empty buttons from being created on click)
		if (animalPick == "") {

			return false
		}
		else {

			animals.push(animalPick);
		
			renderButtons();

		}

		// This clears out the input line after a new animal is submitted
		$('#animal-input').val("");

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

	// Event listener for when a user clicks on an animal button on the webpage it calls the displayAnimalInfo function to display the specific animals ratings and gifs
	$(document).on('click', '.animal', displayAnimalInfo);

	// This calls the renderButtons() function
	renderButtons();

});