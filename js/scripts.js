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
    const modalContainer = document.querySelector("#modal-container");
    // Clear all existing modal content
    modalContainer.innerHTML = "";

    // Create modal
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    // Add name and height information to modal content
    let titleElement = document.createElement("h1");
    titleElement.innerText = "Name: " + pokemon.name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    // Create an <img> element
    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", pokemon.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);

    // Append modal to its container
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
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
