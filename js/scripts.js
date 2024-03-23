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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // Return an object with add and getAll functions as keys
  return {
    add: add,
    getAll: getAll
  };
})();

// Use forEach loop to iterate over each Pokémon in the repository
pokemonRepository.getAll().forEach(function(pokemon) {
  let isTall = pokemon.height > 0.6;

  // Use document.write() to display the Pokémon with name and height
  document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);

  // Add a note if the height is above a certain value
  if (isTall) {
    document.write(" : Wow, that’s big!");
  }
});

// Define add function
function add(pokemon) {
  // Check if the parameter is an object
  if (typeof pokemon === 'object' && pokemon !== null) {
    //  } else {
    pokemonList.push(pokemon);
  } else {
    // Log an error if the parameter is not an object
    console.error('Invalid argument. Only objects can be added to the pokemonList.');
  }
}

// Define add function
function add(pokemon) {
  // Check if the parameter is an object and contains all expected keys
  if (typeof pokemon === 'object' && pokemon !== null && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
    // Add the pokemon to the pokemonList
    pokemonList.push(pokemon);
  } else {
    // Log an error if the parameter is not valid
    console.error('Invalid argument. The parameter must be an object containing all expected keys: name, height, and types.');
  }
}

// Function to get all Pokémon
function getAll() {
  return pokemonList;
}