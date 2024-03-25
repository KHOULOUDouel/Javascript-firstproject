// Define pokemonRepository IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Define add and getAll functions
  function add(pokemon) {
    // Check if the parameter is an object and contains all expected keys
    if (typeof pokemon === 'object' && pokemon !== null && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      // Log an error if the parameter is not valid
      console.error('Invalid argument. The parameter must be an object containing all expected keys: name, height, and types.');
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Function to add a list item for a Pokémon
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    // Add event listener to the button
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    
    // Check if the height is above a certain value
    let isTall = pokemon.height > 0.6;

    // Add a note if the height is above a certain value
    if (isTall) {
      button.innerText += " - Wow, that’s big!";
    }
  }

  // Function to show details of a Pokémon
  function showDetails(pokemon) {
    console.log(pokemon);
    // More functionality will be added here later
  }

  // Function to load the list of Pokémon from the API
  function loadList() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.results.forEach(pokemon => {
          let pokemonObject = {
            name: pokemon.name,
            detailsUrl: pokemon.url
          };
          add(pokemonObject);
        });
      })
      .catch(error => {
        console.error('Error loading Pokémon list:', error);
      });
  }
  // Function to load details of a Pokémon
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(data => {
        pokemon.imageUrl = data.sprites.front_default;
        pokemon.height = data.height;
        pokemon.types = data.types.map(type => type.type.name);
      })
      .catch(error => {
        console.error('Error loading Pokémon details:', error);
      });
  }

  // Return an object with add, getAll, and addListItem functions as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
    loadList: loadList
    loadDetails: loadDetails
  };
})();
// Load the list of Pokémon from the API
pokemonRepository.loadList().then(function() {
// Use forEach loop to iterate over each Pokémon in the repository and add list items
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

    