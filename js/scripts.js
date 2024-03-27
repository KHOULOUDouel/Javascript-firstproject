// Define pokemonRepository IIFE
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
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    // Add event listener to the button
    button.addEventListener("click", function () {
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
    showModal(pokemon);
    loadDetails(pokemon).then(function () {
      console.log("Details loaded:", pokemon);
      // More functionality will be added here later
    });
  }

  // Function to load the list of Pokémon from the API
  function LoadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((pokemon) => {
          let pokemonObject = {
            name: pokemon.name,
            detailsUrl: pokemon.url,
          };
          add(pokemonObject);
        });
      })
      .catch((error) => {
        console.error("Error loading Pokémon list:", error);
      })
      .finally(() => hideLoadingMessage());
  }

  // Function to load details of a Pokémon
  function loadDetails(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then((response) => response.json())
      .then((data) => {
        pokemon.imageUrl = data.sprites.front_default;
        pokemon.height = data.height;
        pokemon.types = data.types.map((type) => type.type.name);
      })
      .catch((error) => {
        console.error("Error loading Pokémon details:", error);
      })
      .finally(() => hideLoadingMessage());
  }
  // Function to show the modal
  function showModal(pokemon) {
    // Create modal
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Create modal content
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.innerText = `You clicked on ${pokemon.name}!`;

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(modal);
  }

  // Function to hide the modal
  function hideModal() {
    let modal = document.querySelector(".modal");
    if (modal) {
      modal.remove();
    }
  }

  // Attach event listener to hide modal
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      hideModal();
    }
  });

  // Function to show the modal
function showModal(pokemon) {
  // Create modal
  let modal = document.createElement("div");
  modal.classList.add("modal");

  // Create modal content
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.innerText = `You clicked on ${pokemon.name}!`;

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

  // Attach event listener to hide modal when clicking outside of it
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      hideModal();
    }
  });

  // Attach event listener to hide modal when pressing Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideModal();
    }
  });
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
