let currentSlide = 0;

function fetchPokemonAPI(showShiny = false) {
  let baseURL = "https://pokeapi.co/api/v2/pokemon";

  fetch(`${baseURL}?limit=151`)
    .then((res) => res.json())
    .then((data) => {
      displayPokemonUI(data.results, showShiny);
    });
}

fetchPokemonAPI();






function displayPokemonUI(pokemon, showShiny) {
  const sliderContainer = document.querySelector(".works");
  sliderContainer.innerHTML = "";

  pokemon.forEach((pokemon, index) => {
    let pokemonURL = pokemon.url.split("pokemon/")[1].split("/")[0];
    if (showShiny) {
      pokemonURL = `shiny/${pokemonURL}`;
    }

    let pokemonHTML = `
      <div class="slide">
        <h1>${pokemon.name}</h1>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonURL}.png">
      </div>
    `;

    sliderContainer.insertAdjacentHTML("beforeend", pokemonHTML);
  });

  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function showSlide(n) {
    if (n < 0) {
      currentSlide = totalSlides - 1;
    } else if (n >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = n;
    }
    slides.forEach((slide) => (slide.style.display = "none"));
    slides[currentSlide].style.display = "block";
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // show initial slide
  showSlide(currentSlide);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", prevSlide);
  sliderContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", nextSlide);
  sliderContainer.appendChild(nextButton);

  const shinyButton = document.createElement("button");
  shinyButton.textContent = "Toggle Shiny";
  sliderContainer.appendChild(shinyButton);

  function toggleShiny() {
    showShiny = !showShiny;
    displayPokemonUI(pokemon, showShiny);
    shinyButton.classList.toggle("active");
  }

  shinyButton.addEventListener("click", toggleShiny);
}
