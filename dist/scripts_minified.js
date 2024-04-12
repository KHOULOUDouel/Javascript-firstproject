let pokemonRepository=function(){let e=[];function t(){let e=document.createElement("div");e.classList.add("loading-message"),e.innerText="Loading...",document.body.appendChild(e)}function a(){let e=document.querySelector(".loading-message");e&&e.remove()}function n(t){"object"==typeof t&&null!==t&&"name"in t&&"detailsUrl"in t?e.push(t):console.error("Invalid argument. The parameter must be an object containing all expected keys: name, height, and types.")}function o(){return e}function i(e){r(e).then(function(){var t;let a,n,o,i;console.log("Details loaded:",e),t=e,a=$(".modal-body"),n=$(".modal-title"),a.empty(),n.empty(),n.text(t.name),o=$('<img class="modal-img">').attr("src",t.imageUrl),i=$("<p>").html("<strong>Height:</strong> "+t.height),a.append(o),a.append(i),$("#pokemonModal").modal("show")})}async function l(){t();try{try{let e=await fetch("https://pokeapi.co/api/v2/pokemon/?limit=150"),o=await e.json();o.results.forEach(e=>{let t={name:e.name,detailsUrl:e.url};n(t)})}catch(i){console.error("Error loading Pok\xe9mon list:",i)}}finally{return a()}}async function r(e){t();try{try{let n=await fetch(e.detailsUrl),o=await n.json();e.imageUrl=o.sprites.front_default,e.height=o.height,e.types=o.types.map(e=>e.type.name)}catch(i){console.error("Error loading Pok\xe9mon details:",i)}}finally{return a()}}return window.addEventListener("keydown",e=>{let t=document.querySelector("#modal-container");"Escape"===e.key&&t.classList.contains("is-visible")&&document.querySelector("#modal-container").classList.remove("is-visible")}),{add:n,getAll:o,addListItem:function e(t){let a=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("list-group-item");let o=document.createElement("button");o.classList.add("btn","btn-primary"),o.innerText=t.name,o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemonModal"),n.appendChild(o),a.appendChild(n),$(o).on("click",function(){i(t)});t.height>.6&&o.text(t.name+" - Wow, that’s big!")},showDetails:i,LoadList:l,loadDetails:r,showLoadingMessage:t,hideLoadingMessage:a}}();pokemonRepository.LoadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
