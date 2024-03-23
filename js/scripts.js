// Define pokemonRepository IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    { name: "Charizard", height: 1, types: ["poison"] },
    { name: "Pikachu", height: 0.4, types: ["grass"] },
    { name: "Clefairy", height: 0.6, types: ["normal"] },
    { name: "Growlithe", height: 0.7, types: ["ghost"] },
  ];

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


  // Return an object with add, getAll, and addListItem functions as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
    showDetails: showDetails
  };
})();

// Use forEach loop to iterate over each Pokémon in the repository and add list items
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});