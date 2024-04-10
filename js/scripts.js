//  Define pokemonRepository IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Function to display loading message
  function showLoadingMessage() {
    let loadingMessage = document.createElement("div");
    loadingMessage.classList.add("loading-message");
    loadingMessage.innerText = "Loading...";
    document.body.appendChild(loadingMessage);
  }

  // Function to hide loading message
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  // Define add and getAll functions
  function add(pokemon) {
    // Check if the parameter is an object and contains all expected keys
    if (
      typeof pokemon === "object" &&
      pokemon !== null &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      // Log an error if the parameter is not valid
      console.error(
        "Invalid argument. The parameter must be an object containing all expected keys: name, height, and types."
      );
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Function to add a list item for a Pokémon
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item"); // Add Bootstrap list-group-item class
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary"); // Add Bootstrap button classes
    button.innerText = pokemon.name;
    button.setAttribute("data-toggle", "modal"); // Add data-toggle attribute
    button.setAttribute("data-target", "#pokemonModal"); // Add data-target attribute
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    // Add event listener to the button
    $(button).on("click", function () {
      showDetails(pokemon);
    });

    // Check if the height is above a certain value
    let isTall = pokemon.height > 0.6;

    // Add a note if the height is above a certain value
    if (isTall) {
      button.text(pokemon.name + " - Wow, that’s big!");
    }
  }

  // Function to show details of a Pokémon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log("Details loaded:", pokemon);
      showModal(pokemon);
      // More functionality will be added here later
    });
  }

  // Function to load the list of Pokémon from the API
  async function LoadList() {
    showLoadingMessage();
    try {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.results.forEach((pokemon) => {
          let pokemonObject = {
            name: pokemon.name,
            detailsUrl: pokemon.url,
          };
          add(pokemonObject);
        });
      } catch (error) {
        console.error("Error loading Pokémon list:", error);
      }
    } finally {
      return hideLoadingMessage();
    }
  }

  // Function to load details of a Pokémon
  async function loadDetails(pokemon) {
    showLoadingMessage();
    try {
      try {
        const response = await fetch(pokemon.detailsUrl);
        const data = await response.json();
        pokemon.imageUrl = data.sprites.front_default;
        pokemon.height = data.height;
        pokemon.types = data.types.map((type) => type.type.name);
      } catch (error) {
        console.error("Error loading Pokémon details:", error);
      }
    } finally {
      return hideLoadingMessage();
    }
  }

  // Function to show the modal
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    // Clear existing content
    modalBody.empty();
    modalTitle.empty();

    // Set modal title
    modalTitle.text(pokemon.name);

    // Create and set image element
    let imageElement = $('<img class="modal-img">').attr(
      "src",
      pokemon.imageUrl
    );

    // Create and set height element
    let heightElement = $("<p>").html(
      "<strong>Height:</strong> " + pokemon.height
    );

    // Append elements to the modal body
    modalBody.append(imageElement);
    modalBody.append(heightElement);

    // Show the modal
    $("#pokemonModal").modal("show");
  }
  // Attach event listener to hide modal when pressing Escape key
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // Function to hide the modal
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // Return an object with add, getAll, addListItem, showDetails, LoadList, and loadDetails functions as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    LoadList: LoadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

// Load the list of Pokémon from the API
pokemonRepository.LoadList().then(function () {
  // Use forEach loop to iterate over each Pokémon in the repository and add list items
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
