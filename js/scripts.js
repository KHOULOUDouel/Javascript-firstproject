let pokemonList = [
  { name: "Charizard", height: 1, types: ["poison"] },
  { name: "Pikachu", height: 0.4, types: ["grass"] },
  { name: "Clefairy", height: 0.6, types: ["normal"] },
  { name: "Growlithe", height: 0.7, types: ["ghost"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  let pokemon = pokemonList[i];

  // Check if the height is above a certain value
  let isTall = pokemon.height > 0.6;

  // Use document.write() to display the Pokémon with name and height
  document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);

  // Add a note if the height is above a certain value
  if (isTall) {
    document.write(" : Wow, that’s big!");
  }
}
